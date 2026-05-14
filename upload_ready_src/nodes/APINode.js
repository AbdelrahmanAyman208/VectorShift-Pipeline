// APINode.js — VectorShift-style API node

import { useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const APINode = ({ id, data, selected }) => {
  const [url, setUrl] = useState(data?.url || '');
  const [method, setMethod] = useState(data?.method || 'GET');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="API"
      icon="🔌"
      headerColor="linear-gradient(135deg, #a855f7, #7c3aed)"
      description="Make HTTP requests to external services."
      inputHandles={[{ id: 'payload', label: 'Payload', position: 50 }]}
      outputHandles={[{ id: 'response', label: 'Response', position: 50 }]}
      outputFields={[{ name: 'response', type: 'JSON' }]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field__label">URL</label>
        <input
          className="node-field__input"
          placeholder="https://api.example.com"
          value={url}
          onChange={(e) => { setUrl(e.target.value); updateNodeField(id, 'url', e.target.value); }}
        />
      </div>
      <div className="node-field">
        <label className="node-field__label">Method</label>
        <select
          className="node-field__select"
          value={method}
          onChange={(e) => { setMethod(e.target.value); updateNodeField(id, 'method', e.target.value); }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
    </BaseNode>
  );
};
