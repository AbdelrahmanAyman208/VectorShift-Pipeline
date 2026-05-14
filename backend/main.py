from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from collections import defaultdict, deque


app = FastAPI()

# CORS — allow frontend dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelineData(BaseModel):
    nodes: list
    edges: list


def is_dag(nodes: list, edges: list) -> bool:
    """Check if the pipeline forms a valid DAG using Kahn's algorithm (BFS topological sort)."""
    node_ids = set()
    for n in nodes:
        nid = n.get("id") if isinstance(n, dict) else n
        if nid:
            node_ids.add(nid)

    if not node_ids:
        return True

    adj = defaultdict(list)
    in_degree = defaultdict(int)

    # Initialize in-degree for all nodes
    for nid in node_ids:
        in_degree[nid] = 0

    for edge in edges:
        if isinstance(edge, dict):
            src = edge.get("source")
            tgt = edge.get("target")
        else:
            continue

        if src and tgt and src in node_ids and tgt in node_ids:
            adj[src].append(tgt)
            in_degree[tgt] += 1

    # BFS: start with nodes that have in-degree 0
    queue = deque([nid for nid in node_ids if in_degree[nid] == 0])
    visited = 0

    while queue:
        current = queue.popleft()
        visited += 1
        for neighbor in adj[current]:
            in_degree[neighbor] -= 1
            if in_degree[neighbor] == 0:
                queue.append(neighbor)

    return visited == len(node_ids)


@app.get("/")
def read_root():
    return {"Ping": "Pong"}


@app.post("/pipelines/parse")
def parse_pipeline(data: PipelineData):
    num_nodes = len(data.nodes)
    num_edges = len(data.edges)
    dag_valid = is_dag(data.nodes, data.edges)

    return {
        "num_nodes": num_nodes,
        "num_edges": num_edges,
        "is_dag": dag_valid,
    }
