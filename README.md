# 2WikiMultihopQA 多跳证据工作台

本仓库是课程大作业的 Web 展示项目，用于演示 2WikiMultihopQA 数据集上的问题检索、多跳证据链查询、证据三元组展示、简单聚类和图谱可视化。

## 目录说明

```text
backend/                 Flask 后端接口
frontend/                前端页面与可视化代码
frontend/data/           页面检索索引数据
.github/workflows/       GitHub Pages 自动部署配置
README.md                项目说明
```

## 本地运行顺序

建议先启动后端，再启动前端页面。

### 1. 启动后端

Windows PowerShell：

```powershell
cd D:\数据集\twiki_web\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt

$env:TWIKI_DATA_PATH = "D:\数据集\2WikiMultihopQA\dev.jsonl"
$env:PORT = "5001"
python app.py
```

Linux / 华为云主机：

```bash
cd ~/twiki_web/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

export TWIKI_DATA_PATH=/path/to/2WikiMultihopQA/dev.jsonl
export PORT=5001
gunicorn -w 2 -b 0.0.0.0:5001 app:app
```

后端检查：

```bash
curl "http://127.0.0.1:5001/api/health"
curl "http://127.0.0.1:5001/api/search?q=director&type=compositional&limit=5"
```

### 2. 启动前端

```bash
cd twiki_web/frontend
python -m http.server 8080
```

浏览器打开：

```text
http://127.0.0.1:8080
```

## GitHub Pages 托管

仓库已提供 GitHub Actions 配置，会把 `frontend/` 发布为 GitHub Pages 页面。

推送代码后，在 GitHub 仓库中设置：

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

之后每次推送到 `main` 分支，GitHub 会自动部署前端页面。

访问地址格式：

```text
https://<your-user>.github.io/twiki_web/
```

## 主要功能

```text
问题关键词检索
问题类型、关系类型、数据 split 过滤
多跳证据链图谱
Evidence Triples 展示
Supporting Facts 展示
实体邻居展示
简单聚类浏览
候选证据检索
统计信息展示
```

## 接口说明

后端提供以下接口：

```text
GET /api/health
GET /api/search?q=&type=&relation=&split=&has_gold=&limit=
GET /api/question/<qid>
GET /api/question/<qid>/path
GET /api/evidence/search?q=&limit=
GET /api/retrieve?q=&scope=all|question|sentence|entity&limit=
GET /api/clusters?limit=
GET /api/cluster/<cluster_key>/questions?limit=
GET /api/stats
```

多跳路径接口返回：

```json
{
  "question": {},
  "nodes": [{ "id": "q:...", "label": "Question", "detail": "...", "kind": "question" }],
  "edges": [{ "source": "q:...", "target": "a:...", "label": "answer" }],
  "support": [],
  "evidences": [],
  "context": []
}
```

