(function () {
  "use strict";

  const ENGINE_NAME = "twiki-graph-engine";

  function createClient(payload) {
    const data = normalizePayload(payload);
    const records = data.questions;
    const byKey = new Map(records.map((row) => [row.key, row]));
    const clusters = data.clusters.length ? data.clusters : buildClusters(records);
    const stats = data.stats || buildStats(records);
    const collections = data.meta.collections || collectionCounts(records, clusters);

    return {
      mode: "local",
      label: "Graph Engine",
      detail: "2Wiki evidence ready",
      health,
      search,
      question,
      path,
      evidenceSearch,
      retrieve,
      clusters: listClusters,
      clusterQuestions,
      stats: () => Promise.resolve(clone(stats)),
    };

    function health() {
      return Promise.resolve({
        status: "ok",
        dataset: data.meta.dataset || "2WikiMultihopQA",
        mode: "local",
        engine: ENGINE_NAME,
        source: data.meta.source || "static sample data",
        sample_size: records.length,
        source_records: data.meta.source_records || records.length,
        collections,
      });
    }

    function search(params) {
      const query = params instanceof URLSearchParams ? params : new URLSearchParams(params || "");
      const tokens = tokenize(query.get("q") || "");
      const type = query.get("type") || "";
      const relation = (query.get("relation") || "").toLowerCase();
      const split = query.get("split") || "";
      const hasGold = query.get("has_gold") || "";
      const limit = clamp(Number(query.get("limit")), 1, 100, 20);

      const rows = records
        .map((row) => ({ row, score: scoreQuestion(row, tokens) }))
        .filter(({ row, score }) => {
          if (tokens.length && score <= 0) return false;
          if (type && row.type !== type) return false;
          if (split && row.split !== split) return false;
          if (relation && !row.relations.some((rel) => rel.toLowerCase() === relation)) return false;
          if (hasGold === "true" && !row.has_gold) return false;
          if (hasGold === "false" && row.has_gold) return false;
          return true;
        })
        .sort((a, b) => b.score - a.score || b.row.n_evidences - a.row.n_evidences)
        .slice(0, limit)
        .map(({ row }) => publicQuestion(row));

      return Promise.resolve(rows);
    }

    function question(key) {
      const row = byKey.get(key);
      if (!row) return Promise.reject(notFound(`question not found: ${key}`));
      return Promise.resolve({
        ...publicQuestion(row),
        context: clone(row.context),
        supporting_facts: clone(row.supporting_facts),
        evidences: clone(row.evidences),
      });
    }

    function path(key) {
      const row = byKey.get(key);
      if (!row) return Promise.reject(notFound(`question not found: ${key}`));
      return Promise.resolve(buildPath(row));
    }

    function evidenceSearch(params) {
      const query = params instanceof URLSearchParams ? params : new URLSearchParams(params || "");
      const keyword = String(query.get("q") || "").trim().toLowerCase();
      const limit = clamp(Number(query.get("limit")), 1, 80, 30);
      const hits = [];

      for (const row of records) {
        for (const evidence of row.evidences) {
          const text = `${evidence.subject} ${evidence.relation} ${evidence.object}`.toLowerCase();
          if (keyword && !text.includes(keyword)) continue;
          hits.push({
            question_key: row.key,
            question: row.question,
            answer: row.answer,
            rank: evidence.rank,
            subject: evidence.subject,
            relation: evidence.relation,
            object: evidence.object,
            source: "static_evidence_triples",
          });
          if (hits.length >= limit) return Promise.resolve(hits);
        }
      }
      return Promise.resolve(hits);
    }

    function retrieve(q, scope = "all", limit = 20) {
      const keyword = String(q || "").trim().toLowerCase();
      const scopes = new Set(["all", "question", "sentence", "entity"]);
      if (!scopes.has(scope)) return Promise.reject(badRequest(`invalid scope: ${scope}`));
      if (!keyword) return Promise.resolve([]);

      const maxRows = clamp(Number(limit), 1, 80, 20);
      const hits = [];
      const tokens = tokenize(keyword);

      for (const row of records) {
        if (["all", "question"].includes(scope)) {
          const text = `${row.question} ${row.answer} ${row.type}`.toLowerCase();
          const score = scoreText(text, tokens);
          if (score > 0) {
            hits.push({
              question_key: row.key,
              scope: "question",
              score,
              title: row.type || "question",
              snippet: row.question,
            });
          }
        }

        if (["all", "sentence"].includes(scope)) {
          for (const support of row.supporting_facts) {
            const text = `${support.title} ${support.sentence}`.toLowerCase();
            const score = scoreText(text, tokens);
            if (score > 0) {
              hits.push({
                question_key: row.key,
                scope: "sentence",
                score: score * 0.88,
                title: `${support.title} #${support.sent_id}`,
                snippet: support.sentence,
              });
            }
          }
        }

        if (["all", "entity"].includes(scope)) {
          for (const evidence of row.evidences) {
            const text = `${evidence.subject} ${evidence.relation} ${evidence.object}`.toLowerCase();
            const score = scoreText(text, tokens);
            if (score > 0) {
              hits.push({
                question_key: row.key,
                scope: "entity",
                score: score * 0.78,
                title: evidence.relation,
                snippet: `${evidence.subject} -> ${evidence.object}`,
              });
            }
          }
        }
      }

      hits.sort((a, b) => b.score - a.score || a.scope.localeCompare(b.scope));
      return Promise.resolve(hits.slice(0, maxRows));
    }

    function listClusters(limit = 12) {
      const maxRows = clamp(Number(limit), 1, 100, 12);
      return Promise.resolve(clone(clusters.slice(0, maxRows)));
    }

    function clusterQuestions(clusterKey, limit = 20) {
      const maxRows = clamp(Number(limit), 1, 100, 20);
      const rows = records
        .filter((row) => row.cluster_key === clusterKey)
        .slice(0, maxRows)
        .map(publicQuestion);
      return Promise.resolve(rows);
    }
  }

  function normalizePayload(payload) {
    const source = payload || {};
    const questions = Array.isArray(source.questions) ? source.questions : [];
    return {
      meta: source.meta || {},
      questions: questions.map(normalizeQuestion),
      clusters: Array.isArray(source.clusters) ? source.clusters : [],
      stats: source.stats || null,
    };
  }

  function normalizeQuestion(row) {
    const evidences = Array.isArray(row.evidences) ? row.evidences : [];
    const context = Array.isArray(row.context) ? row.context : [];
    const support = Array.isArray(row.supporting_facts) ? row.supporting_facts : [];
    const relationPath = Array.isArray(row.relation_path)
      ? row.relation_path
      : evidences.map((item) => item.relation).filter(Boolean);
    const relations = Array.isArray(row.relations)
      ? row.relations
      : Array.from(new Set(relationPath));
    const primary = row.primary_relation || relationPath[0] || "unknown";
    return {
      ...row,
      key: String(row.key || row.orig_id || stableKey(row.question, row.answer)),
      split: row.split || "dev",
      type: row.type || "unknown",
      question: String(row.question || ""),
      answer: String(row.answer || ""),
      context,
      supporting_facts: support,
      evidences,
      relations,
      relation_path: relationPath,
      primary_relation: primary,
      has_gold: row.has_gold !== false,
      n_context_pages: row.n_context_pages ?? context.length,
      n_supporting_facts: row.n_supporting_facts ?? support.length,
      n_evidences: row.n_evidences ?? evidences.length,
      cluster_key: row.cluster_key || stableKey("fallback", row.type, primary),
    };
  }

  function publicQuestion(row) {
    return {
      key: row.key,
      orig_id: row.orig_id || row.key,
      split: row.split,
      type: row.type,
      question: row.question,
      answer: row.answer,
      relations: row.relations,
      relation_path: row.relation_path,
      primary_relation: row.primary_relation,
      has_gold: row.has_gold,
      n_context_pages: row.n_context_pages,
      n_supporting_facts: row.n_supporting_facts,
      n_evidences: row.n_evidences,
      cluster_key: row.cluster_key,
    };
  }

  function buildPath(row) {
    const nodes = new Map();
    const edges = [];
    const qid = `q:${row.key}`;
    const aid = `a:${row.key}`;
    addNode(nodes, qid, "Question", row.question, "question");
    addNode(nodes, aid, "Answer", row.answer || "No gold answer", "answer");
    addEdge(edges, qid, aid, "answer");

    for (const evidence of row.evidences) {
      const subjectId = `e:${stableKey("subject", evidence.subject)}`;
      const objectId = `e:${stableKey("object", evidence.object)}`;
      const relationId = `r:${row.key}:${evidence.rank}`;
      addNode(nodes, subjectId, evidence.subject, "evidence subject", "entity");
      addNode(nodes, objectId, evidence.object, "evidence object", "entity");
      addNode(nodes, relationId, evidence.relation, `${evidence.subject} -> ${evidence.object}`, "evidence");
      addEdge(edges, qid, subjectId, "uses");
      addEdge(edges, subjectId, relationId, evidence.relation);
      addEdge(edges, relationId, objectId, "entity");
      if (row.answer && evidence.object.toLowerCase() === row.answer.toLowerCase()) {
        addEdge(edges, objectId, aid, "matches answer");
      }
    }

    for (const support of row.supporting_facts) {
      const pageId = `p:${stableKey("page", support.title)}`;
      const sentId = `s:${row.key}:${support.rank}`;
      addNode(nodes, pageId, support.title, "support page", "page");
      addNode(nodes, sentId, `${support.title} #${support.sent_id}`, support.sentence, "sentence");
      addEdge(edges, qid, sentId, `support ${support.rank}`);
      addEdge(edges, pageId, sentId, "contains");
    }

    const valid = new Set(nodes.keys());
    return {
      question: publicQuestion(row),
      nodes: Array.from(nodes.values()),
      edges: edges.filter((edge) => valid.has(edge.source) && valid.has(edge.target)),
      support: clone(row.supporting_facts),
      evidences: clone(row.evidences),
      context: clone(row.context),
    };
  }

  function addNode(nodes, id, label, detail, kind) {
    if (!id || nodes.has(id)) return;
    nodes.set(id, {
      id,
      label: truncate(label, 48),
      detail: truncate(detail, 180),
      kind,
    });
  }

  function addEdge(edges, source, target, label) {
    if (source && target) edges.push({ source, target, label: truncate(label, 42) });
  }

  function buildClusters(records) {
    const grouped = new Map();
    for (const row of records) {
      if (!grouped.has(row.cluster_key)) grouped.set(row.cluster_key, []);
      grouped.get(row.cluster_key).push(row);
    }
    return Array.from(grouped.entries())
      .map(([key, rows]) => {
        const first = rows[0];
        const keywords = Array.from(new Set([first.type, first.primary_relation, ...first.relations])).filter(Boolean);
        return {
          key,
          cluster_id: `${first.type || "unknown"} / ${first.primary_relation || "unknown"}`,
          source: "static_type_relation",
          size: rows.length,
          keywords,
          examples: rows.slice(0, 6).map(publicQuestion),
        };
      })
      .sort((a, b) => b.size - a.size);
  }

  function buildStats(records) {
    return {
      by_type: countBy(records, (row) => row.type || "unknown"),
      by_split: countBy(records, (row) => row.split || "unknown"),
      top_relations: countBy(records.flatMap((row) => row.relations), (rel) => rel || "unknown").slice(0, 12),
      support_histogram: countBy(records, (row) => String(row.n_supporting_facts)),
    };
  }

  function collectionCounts(records, clusters) {
    return {
      questions: records.length,
      context_pages: records.reduce((sum, row) => sum + row.n_context_pages, 0),
      supporting_facts: records.reduce((sum, row) => sum + row.n_supporting_facts, 0),
      evidence_triples: records.reduce((sum, row) => sum + row.n_evidences, 0),
      clusters: clusters.length,
    };
  }

  function countBy(rows, selector) {
    const map = new Map();
    rows.forEach((row) => {
      const key = selector(row) || "unknown";
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);
  }

  function searchableText(row) {
    return [
      row.question,
      row.answer,
      row.type,
      row.evidences.map((ev) => `${ev.subject} ${ev.relation} ${ev.object}`).join(" "),
      row.context.map((page) => `${page.title} ${page.sentences.join(" ")}`).join(" "),
    ]
      .join(" ")
      .toLowerCase();
  }

  function scoreQuestion(row, tokens) {
    if (!tokens.length) return row.n_evidences + row.n_supporting_facts;
    const allText = searchableText(row);
    if (!tokens.every((token) => allText.includes(token))) return 0;

    const relationText = `${row.relations.join(" ")} ${row.relation_path.join(" ")}`.toLowerCase();
    const questionText = `${row.question} ${row.answer} ${row.type}`.toLowerCase();
    const evidenceText = row.evidences.map((ev) => `${ev.subject} ${ev.relation} ${ev.object}`).join(" ").toLowerCase();
    const supportText = row.supporting_facts.map((sf) => `${sf.title} ${sf.sentence}`).join(" ").toLowerCase();

    let score = 1;
    score += fieldScore(relationText, tokens) * 16;
    score += fieldScore(evidenceText, tokens) * 6;
    score += fieldScore(questionText, tokens) * 4;
    score += fieldScore(supportText, tokens) * 2;
    if (tokens.every((token) => relationText.includes(token))) score += 80;
    return score;
  }

  function scoreText(text, tokens) {
    if (!tokens.length) return 1;
    let score = 0;
    for (const token of tokens) {
      const index = text.indexOf(token);
      if (index === -1) return 0;
      score += index < 80 ? 3 : 1;
    }
    return score;
  }

  function fieldScore(text, tokens) {
    let score = 0;
    for (const token of tokens) {
      if (text.includes(token)) score += 1;
    }
    return score;
  }

  function tokenize(value) {
    return String(value || "")
      .toLowerCase()
      .split(/\s+/)
      .map((token) => token.trim())
      .filter(Boolean);
  }

  function stableKey(...parts) {
    let hash = 2166136261;
    const raw = parts.map((part) => String(part || "")).join("||");
    for (let i = 0; i < raw.length; i += 1) {
      hash ^= raw.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(16).padStart(8, "0");
  }

  function notFound(message) {
    const error = new Error(message);
    error.status = 404;
    return error;
  }

  function badRequest(message) {
    const error = new Error(message);
    error.status = 400;
    return error;
  }

  function clamp(value, min, max, fallback) {
    const number = Number.isFinite(value) ? value : fallback;
    return Math.min(max, Math.max(min, number));
  }

  function truncate(value, max) {
    const text = String(value ?? "");
    return text.length > max ? `${text.slice(0, Math.max(0, max - 1))}…` : text;
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  window.TWikiGraphEngine = { createClient };
})();
