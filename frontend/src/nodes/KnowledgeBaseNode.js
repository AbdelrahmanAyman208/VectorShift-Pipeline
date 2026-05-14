// KnowledgeBaseNode.js — Knowledge Base Reader node with VariableInput

import { useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';
import { VariableInput } from '../components/VariableInput';
import { SearchableSelect } from '../components/SearchableSelect';

const MOCK_KNOWLEDGE_BASES = [
  { id: 'wikipedia', name: 'Wikipedia' },
  { id: 'flyio', name: 'Fly.io' },
  { id: 'temp', name: 'Temp' },
  { id: 'temp2', name: 'Temp2' },
  { id: 'test_debugging', name: 'Test for debugging' },
  { id: 'test', name: 'Test' },
  { id: 'test13', name: 'Test13' },
  { id: 'test14', name: 'Test14' },
  { id: 'test15', name: 'Test15' },
];

export const KnowledgeBaseNode = ({ id, data, selected }) => {
  const [name, setName] = useState(data?.name || id.replace('knowledgeBase-', 'knowledge_base_'));
  const [searchQuery, setSearchQuery] = useState(data?.searchQuery || '');
  const [kbName, setKbName] = useState(data?.kbName || '');
  const updateNodeField = useStore((s) => s.updateNodeField);

  const headerActions = (
    <>
      <button className="base-node__header-btn" title="Refresh">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.22-10.27l-3.26 2.84"/>
        </svg>
      </button>
      <button className="base-node__header-btn" title="Settings">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
      </button>
    </>
  );

  return (
    <BaseNode
      id={id}
      title="Knowledge Base Reader"
      icon="📥"
      headerColor="#e2e6fa"
      headerActions={headerActions}
      description="Semantically query a knowledge base that can contain files, scraped URLs, and data from synced integrations (e.g., Google Drive)."
      inputHandles={[
        { id: 'search_query', label: 'Search Query', position: 40 },
        { id: 'kb_input', label: 'KB', position: 70 },
      ]}
      outputHandles={[{ id: 'chunks', label: 'Chunks', position: 35 }, { id: 'metadata', label: 'Metadata', position: 65 }]}
      outputFields={[
        { name: 'chunks', type: 'List[Text]' },
        { name: 'citation_metadata', type: 'List[Text]' },
      ]}
      selected={selected}
    >
      <div className="node-field">
        <input
          className="node-field__input"
          style={{ textAlign: 'center', background: '#d3d7f4', border: 'none', borderRadius: '4px', fontWeight: '500', color: '#5b52a3' }}
          value={name}
          onChange={(e) => { setName(e.target.value); updateNodeField(id, 'name', e.target.value); }}
        />
      </div>
      <div className="node-field">
        <label className="node-field__label" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#333', fontSize: '11px', fontWeight: '600' }}>
          Search Query <span style={{ color: '#ef4444' }}>*</span>
          <span style={{ cursor: 'help', color: '#6b7280', fontSize: '12px' }}>?</span>
          <span style={{ marginLeft: 'auto', background: '#6366f1', color: 'white', padding: '2px 4px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold' }}>Text +</span>
        </label>
        <VariableInput
          value={searchQuery}
          onChange={(val) => { setSearchQuery(val); updateNodeField(id, 'searchQuery', val); }}
          placeholder="Type &#34;{{&#34; to utilize variables"
          multiline={false}
          nodeId={id}
          handleId="search_query"
        />
      </div>
      <div className="node-field">
        <label className="node-field__label" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#4f46e5', fontSize: '11px', fontWeight: '600' }}>
          Knowledge Base <span style={{ color: '#ef4444' }}>*</span>
          <span style={{ cursor: 'help', color: '#6b7280', fontSize: '12px' }}>?</span>
          <span style={{ marginLeft: 'auto', background: '#4f46e5', color: 'white', padding: '2px 4px', borderRadius: '4px', fontSize: '9px', fontWeight: 'bold' }}>Dropdown</span>
        </label>
        <SearchableSelect
          options={MOCK_KNOWLEDGE_BASES}
          value={kbName}
          onChange={(val) => { setKbName(val); updateNodeField(id, 'kbName', val); }}
          placeholder="Select"
        />
      </div>
    </BaseNode>
  );
};
