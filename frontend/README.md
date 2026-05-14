# VectorShift Frontend Technical Assessment

A production-quality **node-based pipeline builder** built with React, ReactFlow, Zustand, and FastAPI. Features the **Protoplasm** design system — a dark, glassy aesthetic with animated gradient borders, glowing handles, and glassmorphism panels.

---

## ✨ Features Implemented

### Part 1 — Node Abstraction
- **`BaseNode.js`** — Reusable base component accepting handles, header config, icon, and children
- **9 total node types**, all built on BaseNode:

| Node | Icon | Description |
|------|------|-------------|
| **Input** | ⬇️ | Pipeline data entry point (Text / File) |
| **Output** | ⬆️ | Pipeline data exit point (Text / Image) |
| **LLM** | 🤖 | Language model with system + prompt inputs |
| **Text** | ✏️ | Text template with dynamic variable handles |
| **API** | 🔌 | HTTP request (GET/POST/PUT/DELETE) |
| **Filter** | 🔽 | Conditional routing (include/exclude) with dual outputs |
| **Transform** | ⚡ | Data transformation (map/reduce/flatten/sort) |
| **Merge** | 🔀 | Multi-input merge (concat/zip/join) |
| **Note** | 📝 | Decorative documentation node with color picker |

### Part 2 — Protoplasm Design System
- Deep void dark canvas with dot-grid overlay
- Glassmorphism sidebar with categorized, draggable node pills
- Top bar with gradient branding + pill-shaped "▶ Run Pipeline" button
- Nodes feature `backdrop-filter: blur(12px)`, animated border glow, hover lift
- Cyan glow for input handles, purple glow for output handles
- Dark-themed ReactFlow controls, minimap, and smoothstep edges
- Inter font (400/500/600) from Google Fonts
- CSS custom properties for full theme consistency

### Part 3 — Text Node Logic
- **Auto-resize**: Width scales with longest line (220–600px), height with line count
- **Dynamic variable handles**: Regex `/\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g` extracts `{{ variable }}` patterns
- Handles appear/disappear in real-time as variables are typed
- Evenly spaced along the left side with floating labels on hover

### Part 4 — Backend Integration
- **Frontend**: POST `{ nodes, edges }` to `/pipelines/parse` on submit
- Loading spinner during request, styled modal for results
- Success modal shows: node count, edge count, DAG validity
- Error modal with red border for connection/server failures
- **Backend**: FastAPI with CORS, Pydantic validation, Kahn's algorithm DAG check

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** ≥ 16
- **Python** ≥ 3.9
- **pip** packages: `fastapi`, `uvicorn`, `python-multipart`

### 1. Start the Backend
```bash
cd backend
pip install fastapi uvicorn python-multipart
python -m uvicorn main:app --reload --port 8000
```
Backend runs at **http://localhost:8000**

### 2. Start the Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs at **http://localhost:3000**

---

## 📁 Project Structure

```
frontend_technical_assessment/
├── backend/
│   └── main.py                  # FastAPI server (CORS + DAG validation)
│
└── frontend/
    └── src/
        ├── nodes/
        │   ├── BaseNode.js      # Core node abstraction
        │   ├── inputNode.js     # Input node
        │   ├── outputNode.js    # Output node
        │   ├── llmNode.js       # LLM node
        │   ├── textNode.js      # Text node (auto-resize + variable handles)
        │   ├── APINode.js       # API request node
        │   ├── FilterNode.js    # Conditional filter node
        │   ├── TransformNode.js # Data transformation node
        │   ├── MergeNode.js     # Multi-input merge node
        │   ├── NoteNode.js      # Documentation/note node
        │   └── index.js         # Central exports + nodeTypes registry
        ├── styles/
        │   └── globals.css      # Protoplasm design system
        ├── App.js               # App shell (top bar + sidebar + canvas)
        ├── ui.js                # ReactFlow canvas
        ├── toolbar.js           # Sidebar with draggable node pills
        ├── draggableNode.js     # Draggable pill component
        ├── submit.js            # Submit button + modal
        ├── store.js             # Zustand state management
        └── index.js             # React entry point
```

---

## 🔌 API Reference

### `POST /pipelines/parse`

**Request Body:**
```json
{
  "nodes": [{ "id": "llm-1", "type": "llm", ... }],
  "edges": [{ "source": "text-1", "target": "llm-1", ... }]
}
```

**Response:**
```json
{
  "num_nodes": 3,
  "num_edges": 2,
  "is_dag": true
}
```

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend Framework | React 18 |
| Node Graph | ReactFlow 11 |
| State Management | Zustand |
| Styling | Vanilla CSS (Protoplasm design system) |
| Backend | FastAPI (Python) |
| DAG Validation | Kahn's Algorithm (BFS topological sort) |
