// llmNode.js — LLM node remodeled into OpenAI node with VariableInput

import { useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';
import { VariableInput } from '../components/VariableInput';
import { SettingsPopover } from '../components/SettingsPopover';

export const LLMNode = ({ id, data, selected }) => {
  const [model, setModel] = useState(data?.model || 'chatgpt-4o-latest');
  const [systemPrompt, setSystemPrompt] = useState(data?.systemPrompt || '');
  const [userPrompt, setUserPrompt] = useState(data?.userPrompt || '');
  const [name, setName] = useState(data?.name || 'openai_0');
  const [showSettings, setShowSettings] = useState(false);
  const updateNodeField = useStore((s) => s.updateNodeField);

  const headerActions = (
    <>
      <button className="base-node__header-btn" title="Refresh">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.22-10.27l-3.26 2.84"/>
        </svg>
      </button>
      <div style={{ position: 'relative' }}>
        <button className="base-node__header-btn" title="Settings" onClick={() => setShowSettings(!showSettings)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="3"></circle>
            <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
          </svg>
        </button>
        {showSettings && <SettingsPopover onClose={() => setShowSettings(false)} />}
      </div>
    </>
  );

  return (
    <BaseNode
      id={id}
      title="OpenAI"
      icon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z"></path>
          <path d="M12 12L2.5 7.5"></path>
          <path d="M12 12l9.5 4.5"></path>
        </svg>
      }
      headerColor="#e2e6fa"
      headerActions={headerActions}
      inputHandles={[
        { id: 'system', label: 'System', position: 33 },
        { id: 'prompt', label: 'Prompt', position: 66 },
      ]}
      outputHandles={[{ id: 'response', label: '', position: 20 }, { id: 'input_tokens', label: '', position: 50 }]}
      outputFields={[
        { name: 'response', type: 'Stream<Text>', desc: 'The output of the LLM' },
        { name: 'tokens_used', type: 'Integer', desc: 'Total number of tokens used in the LLM call' },
        { name: 'input_tokens', type: 'Integer', desc: 'Total number of input tokens used in the LLM call' },
        { name: 'output_tokens', type: 'Integer', desc: 'Total number of output tokens used in the LLM call' },
        { name: 'credits_used', type: 'Decimal', desc: 'Total number of AI credits used in the LLM call' },
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
      
      <div className="openai-info-banner">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        Ensure that the Type in the output node is "Streamed Text"
      </div>

      <div className="node-field">
        <label className="node-field__label" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#333', fontSize: '11px', fontWeight: '600' }}>
          System (Instructions)
          <span className="icon-help">?</span>
          <span className="badge badge--text" style={{ marginLeft: 'auto' }}>Text +</span>
        </label>
        <VariableInput
          value={systemPrompt}
          onChange={(val) => { setSystemPrompt(val); updateNodeField(id, 'systemPrompt', val); }}
          placeholder="You are a helpful assistant..."
          nodeId={id}
          handleId="system"
          multiline={true}
        />
      </div>
      <div className="node-field">
        <label className="node-field__label" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#333', fontSize: '11px', fontWeight: '600' }}>
          Prompt
          <span className="icon-help">?</span>
          <span className="badge badge--text" style={{ marginLeft: 'auto' }}>Text +</span>
        </label>
        <VariableInput
          value={userPrompt}
          onChange={(val) => { setUserPrompt(val); updateNodeField(id, 'userPrompt', val); }}
          placeholder="Type &#34;{{&#34; to utilize variables"
          nodeId={id}
          handleId="prompt"
          multiline={true}
        />
      </div>
      <div className="node-field">
        <label className="node-field__label" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#333', fontSize: '11px', fontWeight: '600' }}>
          Model
          <span className="icon-help">?</span>
          <span className="badge badge--dropdown" style={{ marginLeft: 'auto' }}>Dropdown</span>
        </label>
        <select
          className="node-field__select"
          value={model}
          onChange={(e) => { setModel(e.target.value); updateNodeField(id, 'model', e.target.value); }}
        >
          <option value="chatgpt-4o-latest">chatgpt-4o-latest</option>
          <option value="gpt-4o">GPT-4o</option>
          <option value="gpt-4o-mini">GPT-4o Mini</option>
          <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
          <option value="claude-3-opus">Claude 3 Opus</option>
        </select>
      </div>

      <div className="node-field" style={{ flexDirection: 'row', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
        <input type="checkbox" id={`api-key-${id}`} className="checkbox-input" />
        <label htmlFor={`api-key-${id}`} style={{ fontSize: '11px', color: '#333', cursor: 'pointer' }}>Use Personal API Key</label>
      </div>
    </BaseNode>
  );
};
