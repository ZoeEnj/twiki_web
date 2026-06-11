const STORAGE_KEY = "twiki_api_base";

const demoRecords = [
  {
    key: "8813f87c0bdd11eba7f7acde48001122",
    orig_id: "8813f87c0bdd11eba7f7acde48001122",
    split: "dev",
    type: "compositional",
    question: "Who is the mother of the director of film Polish-Russian War (Film)?",
    answer: "Małgorzata Braunek",
    relations: ["director", "mother"],
    primary_relation: "director",
    has_gold: true,
    context: [
      {
        title: "Polish-Russian War (film)",
        sentences: [
          "Polish-Russian War",
          "(Wojna polsko-ruska) is a 2009 Polish film directed by Xawery Żuławski based on the novel Polish-Russian War under the white-red flag by Dorota Masłowska.",
        ],
      },
      {
        title: "Xawery Żuławski",
        sentences: [
          "Xawery Żuławski (born 22 December 1971 in Warsaw) is a Polish film director.",
          "In 1995 he graduated National Film School in Łódź.",
          "He is the son of actress Małgorzata Braunek and director Andrzej Żuławski.",
        ],
      },
    ],
    supporting_facts: [
      {
        rank: 1,
        title: "Polish-Russian War (film)",
        sent_id: 1,
        sentence: "(Wojna polsko-ruska) is a 2009 Polish film directed by Xawery Żuławski based on the novel Polish-Russian War under the white-red flag by Dorota Masłowska.",
      },
      {
        rank: 2,
        title: "Xawery Żuławski",
        sent_id: 2,
        sentence: "He is the son of actress Małgorzata Braunek and director Andrzej Żuławski.",
      },
    ],
    evidences: [
      { rank: 1, subject: "Polish-Russian War", relation: "director", object: "Xawery Żuławski" },
      { rank: 2, subject: "Xawery Żuławski", relation: "mother", object: "Małgorzata Braunek" },
    ],
  },
  {
    key: "61a46987092f11ebbdaeac1f6bf848b6",
    orig_id: "61a46987092f11ebbdaeac1f6bf848b6",
    split: "dev",
    type: "comparison",
    question: "Which film came out first, Blind Shaft or The Mask Of Fu Manchu?",
    answer: "The Mask Of Fu Manchu",
    relations: ["publication date"],
    primary_relation: "publication date",
    has_gold: true,
    context: [
      {
        title: "Blind Shaft",
        sentences: [
          "Blind Shaft is a 2003 film about a pair of brutal con artists operating in the illegal coal mines of present-day northern China.",
          "The film was written and directed by Li Yang.",
        ],
      },
      {
        title: "The Mask of Fu Manchu",
        sentences: [
          "The Mask of Fu Manchu is a 1932 pre-Code adventure film directed by Charles Brabin.",
          "It was written by Irene Kuhn, Edgar Allan Woolf and John Willard based on the 1932 novel of the same name by Sax Rohmer.",
        ],
      },
    ],
    supporting_facts: [
      {
        rank: 1,
        title: "Blind Shaft",
        sent_id: 0,
        sentence: "Blind Shaft is a 2003 film about a pair of brutal con artists operating in the illegal coal mines of present-day northern China.",
      },
      {
        rank: 2,
        title: "The Mask of Fu Manchu",
        sent_id: 0,
        sentence: "The Mask of Fu Manchu is a 1932 pre-Code adventure film directed by Charles Brabin.",
      },
    ],
    evidences: [
      { rank: 1, subject: "Blind Shaft", relation: "publication date", object: "2003" },
      { rank: 2, subject: "The Mask of Fu Manchu", relation: "publication date", object: "1932" },
    ],
  },
  {
    key: "8981e1ce0bb011ebab90acde48001122",
    orig_id: "8981e1ce0bb011ebab90acde48001122",
    split: "dev",
    type: "inference",
    question: "Who is Charles Bretagne Marie De La Trémoille's paternal grandfather?",
    answer: "Charles Armand René de La Trémoille",
    relations: ["father"],
    primary_relation: "father",
    has_gold: true,
    context: [
      {
        title: "Charles Bretagne Marie de La Trémoille",
        sentences: [
          "Prince Charles Bretagne Marie de La Trémoille, 8th Duke of Thouars, was the son of Jean Bretagne Charles de La Trémoille.",
        ],
      },
      {
        title: "Jean Bretagne Charles de La Trémoille",
        sentences: [
          "Prince Jean-Bretagne-Charles de La Trémoille was a French soldier and the son of Charles Armand René de La Trémoille.",
        ],
      },
    ],
    supporting_facts: [
      {
        rank: 1,
        title: "Charles Bretagne Marie de La Trémoille",
        sent_id: 0,
        sentence: "Prince Charles Bretagne Marie de La Trémoille, 8th Duke of Thouars, was the son of Jean Bretagne Charles de La Trémoille.",
      },
      {
        rank: 2,
        title: "Jean Bretagne Charles de La Trémoille",
        sent_id: 0,
        sentence: "Prince Jean-Bretagne-Charles de La Trémoille was a French soldier and the son of Charles Armand René de La Trémoille.",
      },
    ],
    evidences: [
      { rank: 1, subject: "Charles Bretagne Marie de La Trémoille", relation: "father", object: "Jean Bretagne Charles de La Trémoille" },
      { rank: 2, subject: "Jean Bretagne Charles de La Trémoille", relation: "father", object: "Charles Armand René de La Trémoille" },
    ],
  },
  {
    key: "298f23b8088a11ebbd6eac1f6bf848b6",
    orig_id: "298f23b8088a11ebbd6eac1f6bf848b6",
    split: "dev",
    type: "bridge_comparison",
    question: "Which film has the director who was born later, El Extraño Viaje or Love In Pawn?",
    answer: "El Extraño Viaje",
    relations: ["date of birth", "director"],
    primary_relation: "date of birth",
    has_gold: true,
    context: [
      {
        title: "El extraño viaje",
        sentences: ["El extraño viaje is a 1964 Spanish black drama film directed by Fernando Fernán Gómez."],
      },
      {
        title: "Love in Pawn",
        sentences: ["Love in Pawn is a 1953 British comedy film directed by Charles Saunders and starring Bernard Braden and Barbara Kelly."],
      },
      {
        title: "Fernando Fernán Gómez",
        sentences: ["Fernando Fernández Gómez (28 August 1921 - 21 November 2007) was a Spanish actor, screenwriter and film director."],
      },
      {
        title: "Charles Saunders (director)",
        sentences: ["Charles Joel Saunders (8 April 1904 - April 1997) was an English film director and screenwriter."],
      },
    ],
    supporting_facts: [
      { rank: 1, title: "El extraño viaje", sent_id: 0, sentence: "El extraño viaje is a 1964 Spanish black drama film directed by Fernando Fernán Gómez." },
      { rank: 2, title: "Love in Pawn", sent_id: 0, sentence: "Love in Pawn is a 1953 British comedy film directed by Charles Saunders and starring Bernard Braden and Barbara Kelly." },
      { rank: 3, title: "Fernando Fernán Gómez", sent_id: 0, sentence: "Fernando Fernández Gómez (28 August 1921 - 21 November 2007) was a Spanish actor, screenwriter and film director." },
      { rank: 4, title: "Charles Saunders (director)", sent_id: 0, sentence: "Charles Joel Saunders (8 April 1904 - April 1997) was an English film director and screenwriter." },
    ],
    evidences: [
      { rank: 1, subject: "El extraño viaje", relation: "director", object: "Fernando Fernán Gómez" },
      { rank: 2, subject: "Love in Pawn", relation: "director", object: "Charles Saunders" },
      { rank: 3, subject: "Fernando Fernán Gómez", relation: "date of birth", object: "28 August 1921" },
      { rank: 4, subject: "Charles Saunders (director)", relation: "date of birth", object: "8 April 1904" },
    ],
  },
];

for (const row of demoRecords) {
  row.n_context_pages = row.context.length;
  row.n_supporting_facts = row.supporting_facts.length;
  row.n_evidences = row.evidences.length;
}

const state = {
  apiBase: initialApiBase(),
  client: null,
  apiOnline: false,
  mode: "static",
  results: [],
  selectedKey: "",
  selectedPath: null,
  clusters: [],
  activeClusterKey: "",
  showLabels: true,
  activeView: initialView(),
  searchRun: 0,
  pathRun: 0,
};

function initialView() {
  const view = window.location.hash.replace("#", "");
  return ["path", "evidence", "support", "entity"].includes(view) ? view : "path";
}

const els = {
  apiForm: document.querySelector("#apiForm"),
  apiBase: document.querySelector("#apiBase"),
  modeStatus: document.querySelector("#modeStatus"),
  questionsCount: document.querySelector("#questionsCount"),
  evidenceCount: document.querySelector("#evidenceCount"),
  clustersCount: document.querySelector("#clustersCount"),
  searchForm: document.querySelector("#searchForm"),
  keyword: document.querySelector("#keyword"),
  typeFilter: document.querySelector("#typeFilter"),
  relationFilter: document.querySelector("#relationFilter"),
  splitFilter: document.querySelector("#splitFilter"),
  goldFilter: document.querySelector("#goldFilter"),
  limitFilter: document.querySelector("#limitFilter"),
  resetSearch: document.querySelector("#resetSearch"),
  results: document.querySelector("#results"),
  resultCount: document.querySelector("#resultCount"),
  resultTemplate: document.querySelector("#resultTemplate"),
  graphTitle: document.querySelector("#graphTitle"),
  graphCanvas: document.querySelector("#graphCanvas"),
  fitGraph: document.querySelector("#fitGraph"),
  toggleLabels: document.querySelector("#toggleLabels"),
  copySummary: document.querySelector("#copySummary"),
  selectedState: document.querySelector("#selectedState"),
  answerText: document.querySelector("#answerText"),
  questionMeta: document.querySelector("#questionMeta"),
  evidenceList: document.querySelector("#evidenceList"),
  supportList: document.querySelector("#supportList"),
  contextList: document.querySelector("#contextList"),
  clusters: document.querySelector("#clusters"),
  reloadClusters: document.querySelector("#reloadClusters"),
  retrieveForm: document.querySelector("#retrieveForm"),
  retrieveKeyword: document.querySelector("#retrieveKeyword"),
  retrieveScope: document.querySelector("#retrieveScope"),
  retrievalMode: document.querySelector("#retrievalMode"),
  retrieveResults: document.querySelector("#retrieveResults"),
  stats: document.querySelector("#stats"),
  toastHost: document.querySelector("#toastHost"),
};

function initialApiBase() {
  const stored = safeStorageGet(STORAGE_KEY);
  if (window.TWIKI_AUTO_CONNECT_API === true && stored !== null) return normalizeApiBase(stored);
  const configured = normalizeApiBase(window.TWIKI_API_BASE || "");
  if (configured) return configured;
  return "";
}

function normalizeApiBase(value) {
  let base = String(value || "").trim();
  if (!base) return "";
  if (base === "/") return "";
  if (/^(localhost|127\.0\.0\.1|\[::1\])/i.test(base)) {
    base = `http://${base}`;
  }
  base = base.replace(/\/+$/, "");
  return base.endsWith("/api") ? base.slice(0, -4) : base;
}

function safeStorageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

function safeStorageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // Private mode can block storage. The page still works in memory.
  }
}

function endpoint(path) {
  return `${state.apiBase}${path}`;
}

async function fetchJson(path, timeout = 10000) {
  if (!state.apiBase) throw new Error("数据源未配置");
  const controller = new AbortController();
  const timer = window.setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(endpoint(path), {
      signal: controller.signal,
      headers: { Accept: "application/json" },
    });
    const body = await response.json().catch(() => ({}));
    if (!response.ok) {
      throw new Error(body.error || `${response.status} ${response.statusText}`);
    }
    return body;
  } finally {
    window.clearTimeout(timer);
  }
}

function createRemoteApiClient() {
  return {
    mode: "api",
    label: "Graph Engine",
    detail: "2Wiki evidence ready",
    health: () => fetchJson("/api/health", 7000),
    search: (params) => fetchJson(`/api/search?${params.toString()}`),
    question: (key) => fetchJson(`/api/question/${encodeURIComponent(key)}`),
    path: (key) => fetchJson(`/api/question/${encodeURIComponent(key)}/path`),
    evidenceSearch: (params) => fetchJson(`/api/evidence/search?${params.toString()}`),
    retrieve: (q, scope, limit = 20) =>
      fetchJson(`/api/retrieve?q=${encodeURIComponent(q)}&scope=${encodeURIComponent(scope)}&limit=${encodeURIComponent(limit)}`),
    clusters: (limit = 12) => fetchJson(`/api/clusters?limit=${encodeURIComponent(limit)}`),
    clusterQuestions: (clusterKey, limit = 20) =>
      fetchJson(`/api/cluster/${encodeURIComponent(clusterKey)}/questions?limit=${encodeURIComponent(limit)}`),
    stats: () => fetchJson("/api/stats"),
  };
}

function createGraphDataClient() {
  if (window.TWikiGraphEngine && window.TWIKI_GRAPH_DATA) {
    return window.TWikiGraphEngine.createClient(window.TWIKI_GRAPH_DATA);
  }
  return createEmbeddedGraphClient();
}

function createEmbeddedGraphClient() {
  return {
    mode: "local",
    label: "Graph Engine",
    detail: "2Wiki evidence ready",
    health: () => Promise.resolve(demoHealth()),
    search: (params) => delay(demoSearch(params), 20),
    question: (key) => {
      const row = demoRecords.find((item) => item.key === key);
      return row ? Promise.resolve({ ...publicQuestion(row), context: row.context, supporting_facts: row.supporting_facts, evidences: row.evidences }) : Promise.reject(new Error(`question not found: ${key}`));
    },
    path: (key) => {
      const row = demoRecords.find((item) => item.key === key);
      return row ? Promise.resolve(buildDemoPath(row)) : Promise.reject(new Error(`question not found: ${key}`));
    },
    evidenceSearch: (params) => delay(demoRetrieve(params.get("q") || "", "entity"), 20),
    retrieve: (q, scope) => delay(demoRetrieve(q, scope), 20),
    clusters: () => delay(demoClusters(), 20),
    clusterQuestions: (clusterKey, limit = 20) => {
      const cluster = demoClusters().find((item) => item.key === clusterKey);
      return Promise.resolve((cluster?.examples || []).slice(0, limit));
    },
    stats: () => delay(demoStats(), 20),
  };
}

function setGraphDataClient() {
  state.client = createGraphDataClient();
  state.apiOnline = false;
  state.mode = "local";
  return state.client;
}

function activeClient() {
  if (!state.client) setGraphDataClient();
  return state.client;
}

async function fallbackToGraphData(error) {
  const client = setGraphDataClient();
  const health = await client.health().catch(() => demoHealth());
  setMode("ok", "Graph Engine", "2Wiki evidence ready");
  setCounts(health.collections || {});
  return client;
}

function publicQuestion(row) {
  return {
    key: row.key,
    orig_id: row.orig_id,
    split: row.split,
    type: row.type,
    question: row.question,
    answer: row.answer,
    relations: row.relations || [],
    primary_relation: row.primary_relation || "",
    has_gold: row.has_gold !== false,
    n_context_pages: row.n_context_pages ?? row.context?.length ?? 0,
    n_supporting_facts: row.n_supporting_facts ?? row.supporting_facts?.length ?? 0,
    n_evidences: row.n_evidences ?? row.evidences?.length ?? 0,
    cluster_key: row.cluster_key || clusterKey(row),
  };
}

function clusterKey(row) {
  return `${row.type || "unknown"}::${row.primary_relation || row.relations?.[0] || "unknown"}`;
}

async function checkHealth() {
  if (els.apiBase) els.apiBase.value = state.apiBase;
  if (!state.apiBase) {
    const client = setGraphDataClient();
    const data = await client.health().catch(() => demoHealth());
    setMode("ok", client.label || "Graph Engine", client.detail || "2Wiki evidence ready");
    setCounts(data.collections || {});
    return;
  }

  try {
    state.client = createRemoteApiClient();
    const data = await fetchJson("/api/health", 7000);
    state.apiOnline = true;
    state.mode = "api";
    setMode("ok", "Graph Engine", "2Wiki evidence ready");
    setCounts(data.collections || {});
  } catch (error) {
    await fallbackToGraphData(error);
    toast(`数据服务已切换到本地可用模式：${shortError(error)}`);
  }
}

function demoHealth() {
  return {
    status: "demo",
    collections: {
      questions: demoRecords.length,
      evidence_triples: demoRecords.reduce((sum, row) => sum + row.evidences.length, 0),
      clusters: demoClusters().length,
    },
  };
}

function setMode(status, title, detail) {
  const dot = els.modeStatus.querySelector(".dot");
  dot.className = `dot ${status === "ok" ? "ok" : status === "fail" ? "fail" : "pending"}`;
  els.modeStatus.querySelector("strong").textContent = title;
  els.modeStatus.querySelector("small").textContent = detail;
}

function setCounts(collections) {
  els.questionsCount.textContent = formatNumber(collections.questions);
  els.evidenceCount.textContent = formatNumber(collections.evidence_triples || collections.evidence || 0);
  els.clustersCount.textContent = formatNumber(collections.clusters);
}

function getSearchParams() {
  const params = new URLSearchParams();
  const keyword = els.keyword.value.trim();
  if (keyword) params.set("q", keyword);
  if (els.typeFilter.value) params.set("type", els.typeFilter.value);
  if (els.relationFilter.value) params.set("relation", els.relationFilter.value);
  if (els.splitFilter.value) params.set("split", els.splitFilter.value);
  if (els.goldFilter.checked) params.set("has_gold", "true");
  params.set("limit", els.limitFilter.value);
  return params;
}

function rowsFromResponse(payload, keys = ["results", "questions", "rows", "items"]) {
  if (Array.isArray(payload)) return payload;
  if (!payload || typeof payload !== "object") return [];
  for (const key of keys) {
    if (Array.isArray(payload[key])) return payload[key];
  }
  return [];
}

async function runSearch(event) {
  if (event) event.preventDefault();
  const runId = ++state.searchRun;
  const params = getSearchParams();
  renderLoading(els.results, "正在检索候选问题...");
  try {
    const payload = await activeClient().search(params);
    if (runId !== state.searchRun) return;
    state.results = rowsFromResponse(payload);
    renderResults();
    if (state.results[0]) {
      await selectQuestion(state.results[0].key);
    } else {
      clearSelectionState("没有匹配问题");
      renderEmpty(els.results, "未搜索到结果", "尝试减少关键词、取消关系过滤或扩大 Top-K。");
    }
  } catch (error) {
    if (runId !== state.searchRun) return;
    if (state.apiOnline) {
      await fallbackToGraphData(error);
    }
    const fallbackRows = await activeClient().search(params).catch(() => []);
    state.results = rowsFromResponse(fallbackRows);
    renderResults();
    if (state.results[0]) {
      await selectQuestion(state.results[0].key);
    } else {
      clearSelectionState("没有匹配问题");
      renderEmpty(els.results, "未搜索到结果", "当前数据集中没有匹配记录。");
    }
    toast(`检索服务已恢复到可用数据源：${shortError(error)}`);
  }
}

function demoSearch(params) {
  const tokens = (params.get("q") || "")
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);
  const type = params.get("type") || "";
  const relation = (params.get("relation") || "").toLowerCase();
  const split = params.get("split") || "";
  const hasGold = params.get("has_gold") === "true";
  const limit = clamp(Number(params.get("limit")), 1, 80, 20);

  return demoRecords
    .filter((row) => {
      const text = searchableText(row);
      return !tokens.length || tokens.every((token) => text.includes(token));
    })
    .filter((row) => !type || row.type === type)
    .filter((row) => !relation || row.relations.some((rel) => rel.toLowerCase() === relation))
    .filter((row) => !split || row.split === split)
    .filter((row) => !hasGold || row.has_gold)
    .slice(0, limit)
    .map(publicQuestion);
}

function searchableText(row) {
  return [
    row.question,
    row.answer,
    row.type,
    row.relations.join(" "),
    row.evidences.map((ev) => `${ev.subject} ${ev.relation} ${ev.object}`).join(" "),
    row.supporting_facts.map((sf) => `${sf.title} ${sf.sentence}`).join(" "),
  ]
    .join(" ")
    .toLowerCase();
}

function renderResults() {
  els.results.textContent = "";
  els.resultCount.textContent = String(state.results.length);
  if (!state.results.length) return;
  const fragment = document.createDocumentFragment();
  for (const row of state.results) {
    const card = els.resultTemplate.content.firstElementChild.cloneNode(true);
    card.dataset.key = row.key;
    card.classList.toggle("active", row.key === state.selectedKey);
    card.querySelector(".result-type").textContent = row.type || "unknown";
    card.querySelector(".result-question").textContent = row.question || "(empty question)";
    card.querySelector(".result-answer").textContent = `Answer: ${row.answer || "no gold answer"}`;
    card.querySelector(".result-relations").textContent = [
      `split:${row.split || "-"}`,
      `evidence:${row.n_evidences ?? 0}`,
      `relations:${(row.relations || []).join(", ") || "-"}`,
    ].join(" · ");
    card.addEventListener("click", () => selectQuestion(row.key));
    fragment.appendChild(card);
  }
  els.results.appendChild(fragment);
}

async function selectQuestion(key) {
  const runId = ++state.pathRun;
  state.selectedKey = key;
  state.selectedPath = null;
  renderResults();
  clearSelected("正在加载多跳路径...");
  renderLoading(els.graphCanvas, "正在绘制路径图...");

  try {
    const path = await activeClient().path(key);
    if (runId !== state.pathRun) return;
    state.selectedPath = normalizePath(path);
    renderSelectedPath();
  } catch (error) {
    if (runId !== state.pathRun) return;
    if (state.apiOnline) {
      await fallbackToGraphData(error);
      try {
        const path = await activeClient().path(key);
        if (runId !== state.pathRun) return;
        state.selectedPath = normalizePath(path);
        renderSelectedPath();
        return;
      } catch (staticError) {
        error = staticError;
      }
    }
    const current = state.results.find((row) => row.key === key) || { key };
    state.selectedPath = normalizePath({
      question: current,
      nodes: [],
      edges: [],
      support: [],
      evidences: [],
      context: [],
    });
    renderSelectedPath();
    renderEmpty(els.graphCanvas, "路径接口不可用", shortError(error));
    toast(`路径接口不可用：${shortError(error)}`);
  }
}

function normalizePath(path) {
  const question = path?.question || {};
  return {
    question,
    nodes: Array.isArray(path?.nodes) ? path.nodes : [],
    edges: Array.isArray(path?.edges) ? path.edges : [],
    support: Array.isArray(path?.support) ? path.support : [],
    evidences: Array.isArray(path?.evidences) ? path.evidences : [],
    context: Array.isArray(path?.context) ? path.context : [],
  };
}

function buildDemoPath(row) {
  const nodes = new Map();
  const edges = [];
  const addNode = (id, label, detail, kind) => {
    if (!id || nodes.has(id)) return;
    nodes.set(id, { id, label, detail, kind });
  };
  const addEdge = (source, target, label) => edges.push({ source, target, label });
  const qid = `q:${row.key}`;
  const aid = `a:${row.key}`;
  addNode(qid, "Question", row.question, "question");
  addNode(aid, "Answer", row.answer, "answer");
  addEdge(qid, aid, "answer");

  row.evidences.forEach((evidence, index) => {
    const subjectId = `entity:${slug(evidence.subject)}`;
    const objectId = `entity:${slug(evidence.object)}`;
    const relationId = `evidence:${row.key}:${index + 1}`;
    addNode(subjectId, evidence.subject, "subject entity", "entity");
    addNode(objectId, evidence.object, "object entity", "entity");
    addNode(relationId, evidence.relation, `${evidence.subject} -> ${evidence.object}`, "evidence");
    addEdge(qid, subjectId, "uses");
    addEdge(subjectId, relationId, evidence.relation);
    addEdge(relationId, objectId, "entity");
    if (evidence.object.toLowerCase() === row.answer.toLowerCase()) {
      addEdge(objectId, aid, "matches answer");
    }
  });

  row.supporting_facts.forEach((support) => {
    const pageId = `page:${slug(support.title)}`;
    const sentId = `sentence:${row.key}:${support.rank}`;
    addNode(pageId, support.title, "support page", "page");
    addNode(sentId, `${support.title} #${support.sent_id}`, support.sentence, "sentence");
    addEdge(qid, sentId, `support ${support.rank}`);
    addEdge(pageId, sentId, "contains");
  });

  return {
    question: publicQuestion(row),
    nodes: Array.from(nodes.values()),
    edges,
    support: row.supporting_facts,
    evidences: row.evidences,
    context: row.context,
  };
}

function renderSelectedPath() {
  const path = state.selectedPath;
  if (!path) return;
  els.graphTitle.textContent = path.question.question || "多跳路径";
  els.selectedState.textContent = path.question.key ? "已选择" : "未选择";
  els.answerText.textContent = path.question.answer || "无金标答案";
  renderQuestionMeta(path);
  renderEvidenceList(path.evidences);
  renderSupportList(path.support);
  renderContextList(path.context);
  renderActiveView();
}

function clearSelected(title) {
  els.graphTitle.textContent = title;
  els.answerText.textContent = "-";
  els.questionMeta.textContent = "";
  els.evidenceList.textContent = "";
  els.supportList.textContent = "";
  els.contextList.textContent = "";
  els.selectedState.textContent = "未选择";
}

function clearSelectionState(title) {
  state.selectedKey = "";
  state.selectedPath = null;
  clearSelected(title);
  renderEmpty(els.graphCanvas, title, "当前筛选条件没有可展示的多跳路径。");
}

function renderQuestionMeta(path) {
  els.questionMeta.textContent = "";
  const q = path.question || {};
  const rows = [
    ["Question ID", q.orig_id || q.key || "-"],
    ["类型", q.type || "-"],
    ["split", q.split || "-"],
    ["关系", (q.relations || []).join(", ") || "-"],
    ["Context", q.n_context_pages ?? path.context.length],
    ["Support", q.n_supporting_facts ?? path.support.length],
    ["Evidence", q.n_evidences ?? path.evidences.length],
  ];
  for (const [name, value] of rows) {
    const dt = document.createElement("dt");
    dt.textContent = name;
    const dd = document.createElement("dd");
    dd.textContent = String(value);
    els.questionMeta.append(dt, dd);
  }
}

function renderEvidenceList(rows) {
  els.evidenceList.textContent = "";
  if (!rows.length) {
    renderEmpty(els.evidenceList, "暂无 evidence triples", "test split 或未导入证据时会出现该状态。");
    return;
  }
  for (const row of rows) {
    const item = document.createElement("article");
    item.className = "evidence-item";
    const title = document.createElement("strong");
    title.textContent = `${row.rank ?? ""}. ${row.subject} -> ${row.object}`;
    const body = document.createElement("p");
    body.textContent = `relation: ${row.relation}`;
    item.append(title, body);
    els.evidenceList.appendChild(item);
  }
}

function renderSupportList(rows) {
  els.supportList.textContent = "";
  if (!rows.length) {
    renderEmpty(els.supportList, "暂无 supporting facts", "该问题没有返回金标支持句。");
    return;
  }
  for (const row of rows) {
    const item = document.createElement("article");
    item.className = "support-item";
    const title = document.createElement("strong");
    title.textContent = `${row.rank ?? ""}. ${row.title} / sent ${row.sent_id}`;
    const body = document.createElement("p");
    body.textContent = row.sentence || "(sentence text missing)";
    item.append(title, body);
    els.supportList.appendChild(item);
  }
}

function renderContextList(rows) {
  els.contextList.textContent = "";
  if (!rows.length) {
    const li = document.createElement("li");
    li.textContent = "暂无 context";
    els.contextList.appendChild(li);
    return;
  }
  for (const row of rows.slice(0, 8)) {
    const li = document.createElement("li");
    li.textContent = `${row.title} (${row.sentences?.length ?? 0} sentences)`;
    els.contextList.appendChild(li);
  }
}

function renderActiveView() {
  const path = state.selectedPath;
  applyActiveTab();
  if (!path) {
    renderEmpty(els.graphCanvas, "暂无选中问题", "先从左侧候选问题中选择一条记录。");
    return;
  }
  if (state.activeView === "evidence") {
    renderEvidenceBoard(path.evidences);
  } else if (state.activeView === "support") {
    renderSupportBoard(path.support);
  } else if (state.activeView === "entity") {
    renderEntityBoard(path.evidences);
  } else {
    renderGraph(path.nodes, path.edges);
  }
}

function setActiveView(view, updateHash = false) {
  state.activeView = ["path", "evidence", "support", "entity"].includes(view) ? view : "path";
  applyActiveTab();
  if (updateHash && window.location.hash.replace("#", "") !== state.activeView) {
    window.location.hash = state.activeView;
  }
  renderActiveView();
}

function applyActiveTab() {
  document.querySelectorAll(".tab").forEach((tab) => {
    tab.classList.toggle("active", tab.dataset.view === state.activeView);
  });
}

function renderEvidenceBoard(rows) {
  els.graphCanvas.textContent = "";
  const board = document.createElement("div");
  board.className = "view-board";
  const title = document.createElement("h3");
  title.textContent = "Evidence Triples";
  board.appendChild(title);
  if (!rows.length) {
    renderEmpty(board, "暂无 evidence triples", "该问题未返回金标三元组。");
  } else {
    rows.forEach((row) => {
      const item = document.createElement("article");
      item.className = "board-row";
      item.innerHTML = `<strong>${escapeHtml(row.subject)} <span>${escapeHtml(row.relation)}</span> ${escapeHtml(row.object)}</strong><p>rank ${row.rank ?? "-"}</p>`;
      board.appendChild(item);
    });
  }
  els.graphCanvas.appendChild(board);
}

function renderSupportBoard(rows) {
  els.graphCanvas.textContent = "";
  const board = document.createElement("div");
  board.className = "view-board";
  const title = document.createElement("h3");
  title.textContent = "Supporting Facts";
  board.appendChild(title);
  if (!rows.length) {
    renderEmpty(board, "暂无 supporting facts", "该问题未返回金标支持句。");
  } else {
    rows.forEach((row) => {
      const item = document.createElement("article");
      item.className = "board-row";
      item.innerHTML = `<strong>${escapeHtml(row.title)} / sent ${escapeHtml(row.sent_id)}</strong><p>${escapeHtml(row.sentence || "(sentence text missing)")}</p>`;
      board.appendChild(item);
    });
  }
  els.graphCanvas.appendChild(board);
}

function renderEntityBoard(rows) {
  els.graphCanvas.textContent = "";
  const board = document.createElement("div");
  board.className = "view-board entity-board";
  const title = document.createElement("h3");
  title.textContent = "实体邻居";
  board.appendChild(title);
  const seen = new Set();
  rows.forEach((row) => {
    const key = `${row.subject}::${row.object}::${row.relation}`;
    if (seen.has(key)) return;
    seen.add(key);
    const item = document.createElement("article");
    item.className = "board-row";
    item.innerHTML = `<strong>${escapeHtml(row.subject)} → ${escapeHtml(row.object)}</strong><p>relation: ${escapeHtml(row.relation)}</p>`;
    board.appendChild(item);
  });
  if (seen.size === 0) renderEmpty(board, "暂无实体邻居", "该问题没有可展示的 evidence entity。");
  els.graphCanvas.appendChild(board);
}

function renderGraph(rawNodes, rawEdges) {
  els.graphCanvas.textContent = "";
  els.graphCanvas.classList.toggle("hide-labels", !state.showLabels);
  const { nodes, edges } = sanitizeGraph(rawNodes, rawEdges);
  if (!nodes.length) {
    renderEmpty(els.graphCanvas, "没有图谱数据", "后端未返回 nodes / edges。");
    return;
  }

  const width = Math.max(900, els.graphCanvas.clientWidth || 900);
  const height = Math.max(560, els.graphCanvas.clientHeight || 560);
  const svg = svgEl("svg", { viewBox: `0 0 ${width} ${height}` });
  const defs = svgEl("defs");
  const marker = svgEl("marker", {
    id: "arrow",
    markerWidth: "8",
    markerHeight: "8",
    refX: "7",
    refY: "4",
    orient: "auto",
  });
  marker.appendChild(svgEl("path", { d: "M0,0 L8,4 L0,8 Z", fill: "#6f7b7d" }));
  defs.appendChild(marker);
  svg.appendChild(defs);

  const positions = layoutNodes(nodes, width, height);
  const edgeLayer = svgEl("g");
  const labelLayer = svgEl("g");
  const nodeLayer = svgEl("g");
  svg.append(edgeLayer, labelLayer, nodeLayer);

  for (const edge of edges) {
    const source = positions.get(edge.source);
    const target = positions.get(edge.target);
    if (!source || !target) continue;
    const curve = edgePath(source, target);
    edgeLayer.appendChild(
      svgEl("path", {
        d: curve,
        class: `graph-edge ${edgeClass(edge.label)}`,
        "marker-end": "url(#arrow)",
      })
    );

    const mid = midpoint(source, target);
    const label = svgEl("text", {
      x: String(mid.x),
      y: String(mid.y - 7),
      class: "edge-label",
      "text-anchor": "middle",
    });
    label.textContent = truncate(edge.label, 24);
    labelLayer.appendChild(label);
  }

  for (const node of nodes) {
    nodeLayer.appendChild(renderGraphNode(node, positions.get(node.id)));
  }

  els.graphCanvas.appendChild(svg);
}

function sanitizeGraph(rawNodes, rawEdges) {
  const byId = new Map();
  for (const node of rawNodes || []) {
    const id = String(node.id || "");
    if (!id || byId.has(id)) continue;
    byId.set(id, {
      id,
      label: String(node.label || id),
      detail: String(node.detail || ""),
      kind: safeKind(node.kind),
    });
  }
  const edges = [];
  for (const edge of rawEdges || []) {
    const source = edgeEndpoint(edge.source ?? edge.source_id ?? edge.from);
    const target = edgeEndpoint(edge.target ?? edge.target_id ?? edge.to);
    if (source && target && byId.has(source) && byId.has(target)) {
      edges.push({ source, target, label: String(edge.label || "edge") });
    }
  }
  return { nodes: Array.from(byId.values()), edges };
}

function safeKind(kind) {
  return ["question", "answer", "entity", "evidence", "sentence", "page"].includes(kind) ? kind : "entity";
}

function edgeEndpoint(value) {
  if (typeof value === "string") return value;
  if (value && typeof value === "object" && value.id) return String(value.id);
  return "";
}

function layoutNodes(nodes, width, height) {
  const map = new Map();
  const groups = {
    question: nodes.filter((node) => node.kind === "question"),
    entity: nodes.filter((node) => node.kind === "entity"),
    evidence: nodes.filter((node) => node.kind === "evidence"),
    sentence: nodes.filter((node) => node.kind === "sentence"),
    page: nodes.filter((node) => node.kind === "page"),
    answer: nodes.filter((node) => node.kind === "answer"),
  };
  place(groups.question, 0.10, [0.50], width, height, map);
  place(groups.entity, 0.34, spread(groups.entity.length, 0.22, 0.78), width, height, map);
  place(groups.evidence, 0.55, spread(groups.evidence.length, 0.25, 0.75), width, height, map);
  place(groups.answer, 0.88, [0.50], width, height, map);
  place(groups.page, 0.72, spread(groups.page.length, 0.15, 0.36), width, height, map);
  place(groups.sentence, 0.72, spread(groups.sentence.length, 0.56, 0.88), width, height, map);
  return map;
}

function place(nodes, xRatio, yRatios, width, height, map) {
  nodes.forEach((node, index) => {
    map.set(node.id, {
      ...node,
      x: width * xRatio,
      y: height * (yRatios[index] ?? yRatios[yRatios.length - 1] ?? 0.5),
    });
  });
}

function spread(count, start, end) {
  if (count <= 0) return [];
  if (count === 1) return [(start + end) / 2];
  return Array.from({ length: count }, (_unused, index) => start + ((end - start) * index) / (count - 1));
}

function edgePath(source, target) {
  const dx = Math.max(70, Math.abs(target.x - source.x));
  const c1 = source.x + dx * 0.38;
  const c2 = target.x - dx * 0.38;
  return `M ${source.x} ${source.y} C ${c1} ${source.y}, ${c2} ${target.y}, ${target.x} ${target.y}`;
}

function midpoint(source, target) {
  return { x: (source.x + target.x) / 2, y: (source.y + target.y) / 2 };
}

function renderGraphNode(node, pos) {
  const group = svgEl("g", { class: `graph-node ${node.kind}`, transform: `translate(${pos.x}, ${pos.y})` });
  group.addEventListener("click", () => {
    inspectNode(node);
  });
  const color = nodeColor(node.kind);
  if (node.kind === "evidence" || node.kind === "page") {
    group.appendChild(svgEl("rect", { x: "-26", y: "-22", width: "52", height: "44", rx: "8", fill: color }));
  } else {
    group.appendChild(svgEl("circle", { r: node.kind === "question" ? "30" : "25", fill: color }));
  }
  const icon = svgEl("text", {
    x: "0",
    y: node.kind === "evidence" || node.kind === "page" ? "6" : "8",
    "text-anchor": "middle",
    fill: "#fff",
    "font-size": "18",
    "font-weight": "800",
  });
  icon.textContent = nodeIcon(node.kind);
  group.appendChild(icon);

  const label = svgEl("text", {
    x: node.kind === "question" ? "-44" : "34",
    y: "42",
    class: "node-label",
    "text-anchor": node.kind === "question" ? "middle" : "start",
  });
  label.textContent = truncate(node.label, 30);
  const detail = svgEl("text", {
    x: node.kind === "question" ? "-44" : "34",
    y: "58",
    class: "node-detail",
    "text-anchor": node.kind === "question" ? "middle" : "start",
  });
  detail.textContent = truncate(node.detail, 34);
  const title = svgEl("title");
  title.textContent = `${node.label}\n${node.detail}`;
  group.append(label, detail, title);
  return group;
}

function inspectNode(node) {
  els.selectedState.textContent = node.kind;
  els.answerText.textContent = node.label || "-";
  els.questionMeta.textContent = "";
  const rows = [
    ["节点类型", node.kind],
    ["节点 ID", node.id],
    ["名称", node.label],
    ["说明", node.detail || "-"],
  ];
  rows.forEach(([name, value]) => {
    const dt = document.createElement("dt");
    dt.textContent = name;
    const dd = document.createElement("dd");
    dd.textContent = String(value);
    els.questionMeta.append(dt, dd);
  });

  const path = state.selectedPath;
  if (path) {
    const detail = String(node.detail || "");
    if (node.kind === "evidence") {
      const matches = path.evidences.filter((row) => detail.includes(row.subject) || detail.includes(row.object) || node.label === row.relation);
      renderEvidenceList(matches.length ? matches : path.evidences);
      renderSupportList([]);
    } else if (node.kind === "sentence" || node.kind === "page") {
      const matches = path.support.filter((row) => node.label.includes(row.title) || detail.includes(row.sentence));
      renderSupportList(matches.length ? matches : path.support);
      renderEvidenceList([]);
    }
  }
  toast(`${node.kind}: ${node.label}`);
}

function nodeColor(kind) {
  return {
    question: "#2f66d9",
    entity: "#17898c",
    evidence: "#e76245",
    sentence: "#d99a2b",
    page: "#61804f",
    answer: "#dc5449",
  }[kind] || "#68757a";
}

function nodeIcon(kind) {
  return {
    question: "?",
    entity: "E",
    evidence: "R",
    sentence: "S",
    page: "P",
    answer: "A",
  }[kind] || "N";
}

function edgeClass(label) {
  const text = String(label || "").toLowerCase();
  if (text.includes("support")) return "support";
  if (text.includes("contain")) return "contains";
  if (text.includes("answer") || text.includes("matches")) return "answer";
  return "relation";
}

async function loadClusters() {
  renderLoading(els.clusters, "正在加载聚类...");
  try {
    const rows = await activeClient().clusters(12);
    state.clusters = rowsFromResponse(rows, ["clusters", "results", "rows", "items"]);
    renderClusters();
  } catch (error) {
    if (state.apiOnline) await fallbackToGraphData(error);
    const rows = await activeClient().clusters(12).catch(() => demoClusters());
    state.clusters = rowsFromResponse(rows, ["clusters", "results", "rows", "items"]);
    renderClusters();
    toast(`聚类服务已恢复到可用数据源：${shortError(error)}`);
  }
}

function demoClusters() {
  const grouped = new Map();
  for (const row of demoRecords) {
    const key = clusterKey(row);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key).push(row);
  }
  return Array.from(grouped.entries()).map(([key, rows]) => {
    const first = rows[0];
    const keywords = Array.from(new Set([first.type, first.primary_relation, ...first.relations])).filter(Boolean);
    return {
      key,
      cluster_id: `${first.type} / ${first.primary_relation}`,
      source: "type_relation_fallback",
      size: rows.length,
      keywords,
      examples: rows.map(publicQuestion),
    };
  });
}

function renderClusters() {
  els.clusters.textContent = "";
  if (!state.clusters.length) {
    renderEmpty(els.clusters, "暂无聚类", "请运行后端聚类或使用 fallback 聚类。");
    return;
  }
  const max = Math.max(...state.clusters.map((row) => Number(row.size) || 0), 1);
  for (const cluster of state.clusters) {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "cluster-card";
    card.classList.toggle("active", cluster.key === state.activeClusterKey);
    const title = document.createElement("strong");
    title.textContent = `簇 ${cluster.cluster_id ?? cluster.key}`;
    const meta = document.createElement("small");
    meta.textContent = `${formatNumber(cluster.size)} questions · ${cluster.source || "cluster"}`;
    const words = document.createElement("div");
    words.className = "keyword-row";
    for (const word of (cluster.keywords || []).slice(0, 5)) words.appendChild(tag(word));
    const bar = document.createElement("div");
    bar.className = "cluster-bar";
    const fill = document.createElement("span");
    fill.style.width = `${Math.max(8, Math.min(100, ((Number(cluster.size) || 0) / max) * 100))}%`;
    bar.appendChild(fill);
    card.append(title, meta, words, bar);
    card.addEventListener("click", () => selectCluster(cluster));
    els.clusters.appendChild(card);
  }
}

async function selectCluster(cluster) {
  state.activeClusterKey = cluster.key;
  renderClusters();
  try {
    const rows = await activeClient().clusterQuestions(cluster.key, 20);
    state.results = rowsFromResponse(rows).map(publicQuestion);
    renderResults();
    if (state.results[0]) await selectQuestion(state.results[0].key);
    toast(`已加载 ${cluster.cluster_id} 的代表问题。`);
  } catch (error) {
    if (state.apiOnline) {
      await fallbackToGraphData(error);
      const rows = await activeClient().clusterQuestions(cluster.key, 20).catch(() => cluster.examples || []);
      state.results = rowsFromResponse(rows).map(publicQuestion);
      renderResults();
      if (state.results[0]) await selectQuestion(state.results[0].key);
      return;
    }
    toast(`聚类下钻失败：${shortError(error)}`);
  }
}

async function loadStats() {
  renderLoading(els.stats, "正在加载统计...");
  try {
    const data = await activeClient().stats();
    renderStats(data);
  } catch (error) {
    if (state.apiOnline) await fallbackToGraphData(error);
    const data = await activeClient().stats().catch(() => demoStats());
    renderStats(data);
    toast(`统计服务已恢复到可用数据源：${shortError(error)}`);
  }
}

function demoStats() {
  const byType = countBy(demoRecords, (row) => row.type);
  const bySplit = countBy(demoRecords, (row) => row.split);
  const topRelations = countBy(demoRecords.flatMap((row) => row.relations), (rel) => rel);
  return { by_type: byType, by_split: bySplit, top_relations: topRelations };
}

function countBy(rows, selector) {
  const counts = new Map();
  rows.forEach((row) => {
    const key = selector(row) || "unknown";
    counts.set(key, (counts.get(key) || 0) + 1);
  });
  return Array.from(counts.entries())
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

function renderStats(data) {
  els.stats.textContent = "";
  const rows = [...metricRows(data.by_type), ...metricRows(data.top_relations).slice(0, 4)];
  if (!rows.length) {
    renderEmpty(els.stats, "暂无统计", "后端未返回统计数据。");
    return;
  }
  const max = Math.max(...rows.map((row) => Number(row.value) || 0), 1);
  rows.slice(0, 8).forEach((row, index) => {
    const item = document.createElement("div");
    item.className = "bar-row";
    const name = document.createElement("span");
    name.textContent = row.name;
    const track = document.createElement("div");
    track.className = "bar-track";
    const fill = document.createElement("div");
    fill.className = `bar-fill ${index % 2 ? "alt" : ""}`;
    fill.style.width = `${Math.max(4, Math.min(100, ((Number(row.value) || 0) / max) * 100))}%`;
    track.appendChild(fill);
    const value = document.createElement("strong");
    value.textContent = formatNumber(row.value);
    item.append(name, track, value);
    els.stats.appendChild(item);
  });
}

function metricRows(value) {
  if (Array.isArray(value)) return value;
  if (value && typeof value === "object") {
    return Object.entries(value).map(([name, count]) => ({ name, value: count }));
  }
  return [];
}

async function runRetrieve(event) {
  if (event) event.preventDefault();
  const q = els.retrieveKeyword.value.trim();
  const scope = els.retrieveScope.value;
  els.retrievalMode.textContent = scope;
  renderLoading(els.retrieveResults, "正在检索候选证据...");
  try {
    const rows = await activeClient().retrieve(q, scope, 20);
    renderRetrieveResults(rowsFromResponse(rows));
  } catch (error) {
    if (state.apiOnline) await fallbackToGraphData(error);
    const rows = await activeClient().retrieve(q, scope, 20).catch(() => demoRetrieve(q, scope));
    renderRetrieveResults(rowsFromResponse(rows));
    toast(`候选检索服务已恢复到可用数据源：${shortError(error)}`);
  }
}

function demoRetrieve(q, scope) {
  const keyword = q.toLowerCase();
  if (!keyword) return [];
  const hits = [];
  for (const row of demoRecords) {
    if (["all", "question"].includes(scope) && `${row.question} ${row.answer}`.toLowerCase().includes(keyword)) {
      hits.push({ question_key: row.key, scope: "question", score: 1, title: row.type, snippet: row.question });
    }
    if (["all", "sentence"].includes(scope)) {
      row.supporting_facts.forEach((sf) => {
        if (`${sf.title} ${sf.sentence}`.toLowerCase().includes(keyword)) {
          hits.push({ question_key: row.key, scope: "sentence", score: 0.82, title: `${sf.title} #${sf.sent_id}`, snippet: sf.sentence });
        }
      });
    }
    if (["all", "entity"].includes(scope)) {
      row.evidences.forEach((ev) => {
        if (`${ev.subject} ${ev.relation} ${ev.object}`.toLowerCase().includes(keyword)) {
          hits.push({ question_key: row.key, scope: "entity", score: 0.74, title: ev.relation, snippet: `${ev.subject} -> ${ev.object}` });
        }
      });
    }
  }
  return hits.slice(0, 20);
}

function renderRetrieveResults(rows) {
  els.retrieveResults.textContent = "";
  if (!rows.length) {
    renderEmpty(els.retrieveResults, "没有候选证据", "换一个关系名、实体名或问题关键词。");
    return;
  }
  rows.forEach((row) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "retrieve-item";
    const title = document.createElement("strong");
    title.textContent = `${row.scope} · ${row.title}`;
    const body = document.createElement("p");
    body.textContent = row.snippet;
    item.append(title, body);
    item.addEventListener("click", () => selectQuestion(row.question_key));
    els.retrieveResults.appendChild(item);
  });
}

function copyCurrentSummary() {
  const path = state.selectedPath;
  if (!path) {
    toast("当前没有可复制的路径。");
    return;
  }
  const lines = [
    `Question: ${path.question.question}`,
    `Answer: ${path.question.answer}`,
    `Type: ${path.question.type}`,
    "Evidence:",
    ...path.evidences.map((ev) => `- ${ev.subject} --${ev.relation}--> ${ev.object}`),
    "Supporting facts:",
    ...path.support.map((sf) => `- ${sf.title} #${sf.sent_id}: ${sf.sentence}`),
  ];
  const text = lines.join("\n");
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    navigator.clipboard.writeText(text).then(
      () => toast("路径摘要已复制。"),
      () => toast(text)
    );
  } else {
    toast(text);
  }
}

function renderLoading(container, message) {
  container.textContent = "";
  const box = document.createElement("div");
  box.className = "loading";
  box.textContent = message;
  container.appendChild(box);
}

function renderEmpty(container, title, detail) {
  container.textContent = "";
  const box = document.createElement("div");
  box.className = "empty";
  const strong = document.createElement("strong");
  strong.textContent = title;
  const p = document.createElement("p");
  p.textContent = detail;
  box.append(strong, p);
  container.appendChild(box);
}

function tag(value) {
  const span = document.createElement("span");
  span.className = "tag";
  span.textContent = String(value);
  return span;
}

function toast(message) {
  const node = document.createElement("div");
  node.className = "toast";
  node.textContent = message;
  els.toastHost.appendChild(node);
  window.setTimeout(() => node.remove(), 4200);
}

function svgEl(name, attrs = {}) {
  const node = document.createElementNS("http://www.w3.org/2000/svg", name);
  for (const [key, value] of Object.entries(attrs)) node.setAttribute(key, value);
  return node;
}

function slug(value) {
  let hash = 0;
  const text = String(value || "");
  for (let i = 0; i < text.length; i += 1) hash = (hash * 31 + text.charCodeAt(i)) >>> 0;
  return String(hash);
}

function truncate(value, max) {
  const text = String(value ?? "");
  return text.length > max ? `${text.slice(0, Math.max(0, max - 1))}…` : text;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function formatNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString("en-US") : "-";
}

function clamp(value, min, max, fallback) {
  const number = Number.isFinite(value) ? value : fallback;
  return Math.min(max, Math.max(min, number));
}

function delay(value, ms) {
  return new Promise((resolve) => window.setTimeout(() => resolve(value), ms));
}

function shortError(error) {
  if (!error) return "unknown error";
  if (error.name === "AbortError") return "request aborted";
  return truncate(error.message || String(error), 110);
}

function bindEvents() {
  if (els.apiForm && els.apiBase) {
    els.apiForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      state.apiBase = normalizeApiBase(els.apiBase.value);
      safeStorageSet(STORAGE_KEY, state.apiBase);
      await checkHealth();
      await runSearch();
      await loadClusters();
      await loadStats();
      await runRetrieve();
    });
  }

  els.searchForm.addEventListener("submit", runSearch);
  [els.typeFilter, els.relationFilter, els.splitFilter, els.goldFilter, els.limitFilter].forEach((control) => {
    control.addEventListener("change", runSearch);
  });

  els.resetSearch.addEventListener("click", () => {
    els.keyword.value = "director mother";
    els.typeFilter.value = "";
    els.relationFilter.value = "";
    els.splitFilter.value = "";
    els.goldFilter.checked = true;
    els.limitFilter.value = "20";
    runSearch();
  });

  els.fitGraph.addEventListener("click", () => {
    if (state.selectedPath && state.activeView === "path") {
      renderGraph(state.selectedPath.nodes, state.selectedPath.edges);
    } else {
      toast("切换到多跳路径视图后再适应图谱。");
    }
  });

  els.toggleLabels.addEventListener("click", () => {
    state.showLabels = !state.showLabels;
    els.toggleLabels.setAttribute("aria-pressed", String(state.showLabels));
    if (state.selectedPath && state.activeView === "path") renderGraph(state.selectedPath.nodes, state.selectedPath.edges);
  });

  els.copySummary.addEventListener("click", copyCurrentSummary);
  els.reloadClusters.addEventListener("click", loadClusters);
  els.retrieveForm.addEventListener("submit", runRetrieve);

  document.querySelectorAll(".tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      setActiveView(tab.dataset.view || "path", true);
    });
  });

  let resizeTimer = 0;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      if (state.selectedPath && state.activeView === "path") renderGraph(state.selectedPath.nodes, state.selectedPath.edges);
    }, 120);
  });

  window.addEventListener("hashchange", () => {
    setActiveView(initialView(), false);
  });
}

async function init() {
  bindEvents();
  if (els.apiBase) els.apiBase.value = state.apiBase;
  await checkHealth();
  await runSearch();
  await loadClusters();
  await loadStats();
  await runRetrieve();
}

init();
