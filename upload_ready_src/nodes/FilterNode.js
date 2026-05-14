// FilterNode.js — VectorShift-style Filter node

import { useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data, selected }) => {
  const [condition, setCondition] = useState(data?.condition || '');
  const [mode, setMode] = useState(data?.mode || 'include');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="Filter"
      icon="🔽"
      headerColor="linear-gradient(135deg, #3b82f6, #2563eb)"
      description="Route data based on conditions."
      inputHandles={[{ id: 'input', label: 'Input', position: 50 }]}
      outputHandles={[
        { id: 'matched', label: 'Matched', position: 35 },
        { id: 'unmatched', label: 'Unmatched', position: 65 },
      ]}
      outputFields={[
        { name: 'matched', type: 'Any' },
        { name: 'unmatched', type: 'Any' },
      ]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field__label">Condition</label>
        <textarea
          className="node-field__textarea"
          placeholder="e.g. value > 10"
          value={condition}
          onChange={(e) => { setCondition(e.target.value); updateNodeField(id, 'condition', e.target.value); }}
        />
      </div>
      <div className="node-field">
        <label className="node-field__label">Mode</label>
        <div className="node-toggle">
          <button
            className={`node-toggle__option ${mode === 'include' ? 'node-toggle__option--active' : ''}`}
            onClick={() => { setMode('include'); updateNodeField(id, 'mode', 'include'); }}
          >Include</button>
          <button
            className={`node-toggle__option ${mode === 'exclude' ? 'node-toggle__option--active' : ''}`}
            onClick={() => { setMode('exclude'); updateNodeField(id, 'mode', 'exclude'); }}
          >Exclude</button>
        </div>
      </div>
    </BaseNode>
  );
};
