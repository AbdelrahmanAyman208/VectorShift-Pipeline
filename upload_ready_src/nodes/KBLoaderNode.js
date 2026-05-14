// KBLoaderNode.js — Knowledge Base Loader node

import { useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const KBLoaderNode = ({ id, data, selected }) => {
  const [source, setSource] = useState(data?.source || 'file');
  const [url, setUrl] = useState(data?.url || '');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="KB Loader"
      icon="📥"
      headerColor="linear-gradient(135deg, #6d28d9, #4f46e5)"
      description="Load documents into a knowledge base from files, URLs, or integrations."
      inputHandles={[{ id: 'data', label: 'Data', position: 50 }]}
      outputHandles={[{ id: 'status', label: 'Status', position: 50 }]}
      outputFields={[{ name: 'status', type: 'Text' }]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field__label">Source Type</label>
        <select
          className="node-field__select"
          value={source}
          onChange={(e) => { setSource(e.target.value); updateNodeField(id, 'source', e.target.value); }}
        >
          <option value="file">File Upload</option>
          <option value="url">URL Scrape</option>
          <option value="gdrive">Google Drive</option>
          <option value="notion">Notion</option>
        </select>
      </div>
      {source === 'url' && (
        <div className="node-field">
          <label className="node-field__label">URL</label>
          <input
            className="node-field__input"
            placeholder="https://example.com/docs"
            value={url}
            onChange={(e) => { setUrl(e.target.value); updateNodeField(id, 'url', e.target.value); }}
          />
        </div>
      )}
    </BaseNode>
  );
};
