import hashlib
import json
import os
from collections import Counter, defaultdict
from functools import lru_cache
from pathlib import Path

from flask import Flask, jsonify, request
from werkzeug.exceptions import HTTPException


BASE_DIR = Path(__file__).resolve().parents[2]
DEFAULT_DATA_PATH = BASE_DIR / "2WikiMultihopQA" / "dev.jsonl"
DATA_PATH = Path(os.getenv("TWIKI_DATA_PATH", str(DEFAULT_DATA_PATH))).resolve()
DATA_LIMIT = int(os.getenv("TWIKI_DATA_LIMIT", "0") or "0")
CORS_ORIGINS = os.getenv("CORS_ORIGINS", "*")
DEBUG_ERRORS = os.getenv("TWIKI_DEBUG_ERRORS", "0") == "1"

app = Flask(__name__)


@app.after_request
def add_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = CORS_ORIGINS
    response.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type, Accept"
    return response


@app.errorhandler(Exception)
def handle_exception(error):
    if isinstance(error, HTTPException):
        return (
            jsonify(
                {
                    "error": error.name,
                    "description": error.description,
                    "status_code": error.code,
                }
            ),
            error.code,
        )
    app.logger.exception("Unhandled API error")
    payload = {
        "error": "internal server error",
        "type": error.__class__.__name__,
    }
    if DEBUG_ERRORS:
        payload["detail"] = str(error)
    return jsonify(payload), 500


def parse_jsonish(value, fallback=None):
    if fallback is None:
        fallback = []
    if value in (None, ""):
        return fallback
    if isinstance(value, (list, dict)):
        return value
    if isinstance(value, str):
        try:
            return json.loads(value)
        except json.JSONDecodeError:
            return fallback
    return fallback


def safe_limit(default=30, max_value=100):
    try:
        value = int(request.args.get("limit", default))
    except (TypeError, ValueError):
        value = default
    return max(1, min(value, max_value))


def short(text, n=160):
    value = "" if text is None else str(text)
    return value if len(value) <= n else value[: n - 1] + "…"


def stable_key(*parts):
    raw = "||".join(str(part) for part in parts)
    return hashlib.sha1(raw.encode("utf-8")).hexdigest()[:16]


def normalize_context(raw_context):
    rows = []
    for item in parse_jsonish(raw_context):
        if isinstance(item, dict):
            title = item.get("title", "")
            sentences = item.get("content") or item.get("sentences") or []
        elif isinstance(item, (list, tuple)) and len(item) >= 2:
            title, sentences = item[0], item[1]
        else:
            continue
        rows.append(
            {
                "title": str(title),
                "sentences": [str(sentence) for sentence in (sentences or [])],
            }
        )
    return rows


def normalize_support(raw_support, context):
    support_rows = []
    context_by_title = {row["title"].lower(): row for row in context}
    for rank, item in enumerate(parse_jsonish(raw_support), start=1):
        if isinstance(item, dict):
            title = item.get("title", "")
            sent_id = item.get("sent_id", item.get("sentence_id", 0))
        elif isinstance(item, (list, tuple)) and len(item) >= 2:
            title, sent_id = item[0], item[1]
        else:
            continue
        try:
            sent_id_int = int(sent_id)
        except (TypeError, ValueError):
            sent_id_int = 0
        sentences = context_by_title.get(str(title).lower(), {}).get("sentences", [])
        sentence = sentences[sent_id_int] if 0 <= sent_id_int < len(sentences) else ""
        support_rows.append(
            {
                "rank": rank,
                "title": str(title),
                "sent_id": sent_id_int,
                "sentence": sentence,
            }
        )
    return support_rows


def normalize_evidences(raw_evidences):
    rows = []
    for rank, item in enumerate(parse_jsonish(raw_evidences), start=1):
        if isinstance(item, dict):
            subject = item.get("fact") or item.get("subject") or ""
            relation = item.get("relation") or item.get("predicate") or ""
            obj = item.get("entity") or item.get("object") or ""
        elif isinstance(item, (list, tuple)) and len(item) >= 3:
            subject, relation, obj = item[0], item[1], item[2]
        else:
            continue
        rows.append(
            {
                "rank": rank,
                "subject": str(subject),
                "relation": str(relation),
                "object": str(obj),
            }
        )
    return rows


def normalize_record(raw, split):
    context = normalize_context(raw.get("context"))
    supporting_facts = normalize_support(raw.get("supporting_facts"), context)
    evidences = normalize_evidences(raw.get("evidences"))
    answer = str(raw.get("answer") or "")
    qtype = str(raw.get("type") or "")
    qid = str(raw.get("_id") or raw.get("id") or stable_key(raw.get("question"), answer))
    searchable = " ".join(
        [
            str(raw.get("question") or ""),
            answer,
            qtype,
            " ".join(f'{e["subject"]} {e["relation"]} {e["object"]}' for e in evidences),
            " ".join(
                " ".join([row["title"], " ".join(row["sentences"][:4])])
                for row in context[:10]
            ),
        ]
    ).lower()
    relation_path = [row["relation"] for row in evidences if row["relation"]]
    relations = sorted(set(relation_path))
    primary_relation = relation_path[0] if relation_path else "unknown"
    return {
        "key": qid,
        "orig_id": qid,
        "split": split,
        "type": qtype,
        "question": str(raw.get("question") or ""),
        "answer": answer,
        "context": context,
        "supporting_facts": supporting_facts,
        "evidences": evidences,
        "relations": relations,
        "relation_path": relation_path,
        "primary_relation": primary_relation,
        "has_gold": bool(answer or supporting_facts or evidences),
        "n_context_pages": len(context),
        "n_supporting_facts": len(supporting_facts),
        "n_evidences": len(evidences),
        "_searchable": searchable,
    }


def infer_split(path):
    name = path.name.lower()
    if name.startswith("train"):
        return "train"
    if name.startswith("test"):
        return "test"
    if name.startswith("dev") or name.startswith("validation"):
        return "dev"
    return "unknown"


@lru_cache(maxsize=1)
def load_records():
    if not DATA_PATH.exists():
        raise FileNotFoundError(f"2Wiki JSONL not found: {DATA_PATH}")
    split = infer_split(DATA_PATH)
    records = []
    with DATA_PATH.open("r", encoding="utf-8") as handle:
        for index, line in enumerate(handle, start=1):
            if DATA_LIMIT and index > DATA_LIMIT:
                break
            line = line.strip()
            if not line:
                continue
            records.append(normalize_record(json.loads(line), split))
    by_key = {row["key"]: row for row in records}
    return records, by_key


def all_records():
    return load_records()[0]


def record_by_key(qid):
    return load_records()[1].get(qid)


def public_question(row):
    cluster_key = cluster_key_for(row)
    return {
        "key": row["key"],
        "orig_id": row["orig_id"],
        "split": row["split"],
        "type": row["type"],
        "question": row["question"],
        "answer": row["answer"],
        "relations": row["relations"],
        "relation_path": row["relation_path"],
        "primary_relation": row["primary_relation"],
        "has_gold": row["has_gold"],
        "n_context_pages": row["n_context_pages"],
        "n_supporting_facts": row["n_supporting_facts"],
        "n_evidences": row["n_evidences"],
        "cluster_key": cluster_key,
    }


def cluster_key_for(row):
    return stable_key("fallback", row["type"], row["primary_relation"])


def build_clusters():
    grouped = defaultdict(list)
    for row in all_records():
        grouped[(row["type"], row["primary_relation"])].append(row)

    clusters = []
    for (qtype, relation), rows in grouped.items():
        keywords = [item for item in [qtype, relation] if item and item != "unknown"]
        relation_counter = Counter(rel for row in rows for rel in row["relations"])
        for rel, _count in relation_counter.most_common(5):
            if rel not in keywords:
                keywords.append(rel)
        clusters.append(
            {
                "key": stable_key("fallback", qtype, relation),
                "cluster_id": f"{qtype or 'unknown'} / {relation}",
                "source": "type_relation_fallback",
                "size": len(rows),
                "keywords": keywords[:8],
                "examples": [public_question(row) for row in rows[:5]],
            }
        )
    clusters.sort(key=lambda item: item["size"], reverse=True)
    return clusters


@lru_cache(maxsize=1)
def cached_clusters():
    return build_clusters()


@lru_cache(maxsize=1)
def cached_stats():
    rows = all_records()
    by_type = Counter(row["type"] or "unknown" for row in rows)
    by_split = Counter(row["split"] for row in rows)
    relations = Counter(rel for row in rows for rel in row["relations"])
    support_hist = Counter(str(row["n_supporting_facts"]) for row in rows)
    return {
        "by_type": [{"name": name, "value": value} for name, value in by_type.most_common()],
        "by_split": [{"name": name, "value": value} for name, value in by_split.most_common()],
        "top_relations": [
            {"name": name, "value": value} for name, value in relations.most_common(12)
        ],
        "support_histogram": [
            {"name": name, "value": value} for name, value in support_hist.most_common()
        ],
    }


def search_rows(rows, keyword, qtype, relation, split, has_gold):
    tokens = [token for token in keyword.lower().split() if token]
    for row in rows:
        if tokens and not all(token in row["_searchable"] for token in tokens):
            continue
        if qtype and row["type"] != qtype:
            continue
        if split and row["split"] != split:
            continue
        if relation and relation.lower() not in {rel.lower() for rel in row["relations"]}:
            continue
        if has_gold in {"true", "false"} and row["has_gold"] != (has_gold == "true"):
            continue
        yield row


def add_node(nodes, node_id, label, detail, kind, score=None):
    if not node_id or node_id in nodes:
        return
    node = {
        "id": node_id,
        "label": short(label, 48),
        "detail": short(detail, 180),
        "kind": kind,
    }
    if score is not None:
        node["score"] = score
    nodes[node_id] = node


def add_edge(edges, source, target, label):
    if source and target:
        edges.append({"source": source, "target": target, "label": short(label, 42)})


def build_path(row):
    nodes = {}
    edges = []
    qid = f"q:{row['key']}"
    aid = f"a:{row['key']}"
    add_node(nodes, qid, "Question", row["question"], "question")
    add_node(nodes, aid, "Answer", row["answer"] or "No gold answer", "answer")
    add_edge(edges, qid, aid, "answer")

    for evidence in row["evidences"]:
        subject_id = f"e:{stable_key('subject', evidence['subject'])}"
        object_id = f"e:{stable_key('object', evidence['object'])}"
        relation_id = f"r:{row['key']}:{evidence['rank']}"
        add_node(nodes, subject_id, evidence["subject"], "evidence subject", "entity")
        add_node(nodes, object_id, evidence["object"], "evidence object", "entity")
        add_node(
            nodes,
            relation_id,
            evidence["relation"],
            f"{evidence['subject']} -> {evidence['object']}",
            "evidence",
        )
        add_edge(edges, qid, subject_id, "uses")
        add_edge(edges, subject_id, relation_id, evidence["relation"])
        add_edge(edges, relation_id, object_id, "entity")
        if row["answer"] and evidence["object"].lower() == row["answer"].lower():
            add_edge(edges, object_id, aid, "matches answer")

    for support in row["supporting_facts"]:
        page_id = f"p:{stable_key('page', support['title'])}"
        sent_id = f"s:{row['key']}:{support['rank']}"
        add_node(nodes, page_id, support["title"], "support page", "page")
        add_node(
            nodes,
            sent_id,
            f"{support['title']} #{support['sent_id']}",
            support["sentence"],
            "sentence",
        )
        add_edge(edges, qid, sent_id, f"support {support['rank']}")
        add_edge(edges, page_id, sent_id, "contains")

    valid = set(nodes)
    edges = [edge for edge in edges if edge["source"] in valid and edge["target"] in valid]
    return {
        "question": public_question(row),
        "nodes": list(nodes.values()),
        "edges": edges,
        "support": row["supporting_facts"],
        "evidences": row["evidences"],
        "context": row["context"][:12],
    }


@app.get("/")
def index():
    return jsonify(
        {
            "name": "2WikiMultihopQA Evidence Workbench API",
            "status": "running",
            "data_path": str(DATA_PATH),
        }
    )


@app.get("/api/health")
def health():
    rows = all_records()
    collections = {
        "questions": len(rows),
        "context_pages": sum(row["n_context_pages"] for row in rows),
        "supporting_facts": sum(row["n_supporting_facts"] for row in rows),
        "evidence_triples": sum(row["n_evidences"] for row in rows),
        "clusters": len(cached_clusters()),
    }
    return jsonify(
        {
            "status": "ok",
            "dataset": "2WikiMultihopQA",
            "source": str(DATA_PATH),
            "loaded_limit": DATA_LIMIT or None,
            "collections": collections,
        }
    )


@app.get("/api/search")
def search():
    keyword = request.args.get("q", "").strip()[:200]
    qtype = request.args.get("type", "").strip()
    relation = request.args.get("relation", "").strip()
    split = request.args.get("split", "").strip()
    has_gold = request.args.get("has_gold", "").strip().lower()
    limit = safe_limit()
    rows = list(search_rows(all_records(), keyword, qtype, relation, split, has_gold))[:limit]
    return jsonify([public_question(row) for row in rows])


@app.get("/api/question/<qid>")
def question_detail(qid):
    row = record_by_key(qid)
    if not row:
        return jsonify({"error": "question not found", "key": qid}), 404
    data = public_question(row)
    data.update(
        {
            "context": row["context"],
            "supporting_facts": row["supporting_facts"],
            "evidences": row["evidences"],
        }
    )
    return jsonify(data)


@app.get("/api/question/<qid>/path")
def question_path(qid):
    row = record_by_key(qid)
    if not row:
        return jsonify({"error": "question not found", "key": qid}), 404
    return jsonify(build_path(row))


@app.get("/api/evidence/search")
def evidence_search():
    keyword = request.args.get("q", "").strip().lower()[:200]
    limit = safe_limit(default=30, max_value=80)
    hits = []
    for row in all_records():
        for evidence in row["evidences"]:
            text = f"{evidence['subject']} {evidence['relation']} {evidence['object']}".lower()
            if keyword and keyword not in text:
                continue
            hits.append(
                {
                    "question_key": row["key"],
                    "question": row["question"],
                    "answer": row["answer"],
                    "rank": evidence["rank"],
                    "subject": evidence["subject"],
                    "relation": evidence["relation"],
                    "object": evidence["object"],
                    "source": "evidence_triples",
                }
            )
            if len(hits) >= limit:
                return jsonify(hits)
    return jsonify(hits)


@app.get("/api/retrieve")
def retrieve():
    keyword = request.args.get("q", "").strip().lower()[:200]
    scope = request.args.get("scope", "all").strip()
    limit = safe_limit(default=30, max_value=80)
    hits = []
    if scope not in {"all", "question", "sentence", "entity"}:
        return (
            jsonify(
                {
                    "error": "invalid scope",
                    "scope": scope,
                    "allowed": ["all", "question", "sentence", "entity"],
                }
            ),
            400,
        )
    if not keyword:
        return jsonify([])

    for row in all_records():
        if scope in {"all", "question"} and keyword in f"{row['question']} {row['answer']}".lower():
            hits.append(
                {
                    "question_key": row["key"],
                    "scope": "question",
                    "score": 1.0,
                    "title": row["type"],
                    "snippet": short(row["question"], 220),
                }
            )
        if scope in {"all", "sentence"}:
            for support in row["supporting_facts"]:
                haystack = f"{support['title']} {support['sentence']}".lower()
                if keyword in haystack:
                    hits.append(
                        {
                            "question_key": row["key"],
                            "scope": "sentence",
                            "score": 0.82,
                            "title": f"{support['title']} #{support['sent_id']}",
                            "snippet": short(support["sentence"], 260),
                        }
                    )
        if scope in {"all", "entity"}:
            for evidence in row["evidences"]:
                haystack = f"{evidence['subject']} {evidence['relation']} {evidence['object']}".lower()
                if keyword in haystack:
                    hits.append(
                        {
                            "question_key": row["key"],
                            "scope": "entity",
                            "score": 0.74,
                            "title": evidence["relation"],
                            "snippet": f"{evidence['subject']} -> {evidence['object']}",
                        }
                    )
        if len(hits) >= limit:
            break
    return jsonify(hits[:limit])


@app.get("/api/clusters")
def clusters():
    limit = safe_limit(default=12, max_value=50)
    return jsonify(cached_clusters()[:limit])


@app.get("/api/cluster/<cluster_key>/questions")
def cluster_questions(cluster_key):
    limit = safe_limit(default=20, max_value=100)
    rows = [row for row in all_records() if cluster_key_for(row) == cluster_key]
    return jsonify([public_question(row) for row in rows[:limit]])


@app.get("/api/stats")
def stats():
    return jsonify(cached_stats())


if __name__ == "__main__":
    port = int(os.getenv("PORT", "5001"))
    app.run(host="0.0.0.0", port=port, debug=os.getenv("FLASK_DEBUG", "0") == "1")
