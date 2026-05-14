// SearchNode.js — Semantic Search node

import { useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const SearchNode = ({ id, data, selected }) => {
  const [topK, setTopK] = useState(data?.topK || '5');
  const [threshold, setThreshold] = useState(data?.threshold || '0.7');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="Search"
      icon="🔍"
      headerColor="linear-gradient(135deg, #4f46e5, #7c3aed)"
      description="Perform semantic search over a knowledge base or vector store."
      inputHandles={[
        { id: 'query', label: 'Query', position: 35 },
        { id: 'kb', label: 'KB', position: 65 },
      ]}
      outputHandles={[{ id: 'results', label: 'Results', position: 50 }]}
      outputFields={[
        { name: 'results', type: 'List[Text]' },
        { name: 'scores', type: 'List[Float]' },
      ]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field__label">Top K Results</label>
        <input
          className="node-field__input"
          type="number"
          min="1"
          max="50"
          value={topK}
          onChange={(e) => { setTopK(e.target.value); updateNodeField(id, 'topK', e.target.value); }}
        />
      </div>
      <div className="node-field">
        <label className="node-field__label">Similarity Threshold</label>
        <input
          className="node-field__input"
          type="number"
          step="0.05"
          min="0"
          max="1"
          value={threshold}
          onChange={(e) => { setThreshold(e.target.value); updateNodeField(id, 'threshold', e.target.value); }}
        />
      </div>
    </BaseNode>
  );
};
