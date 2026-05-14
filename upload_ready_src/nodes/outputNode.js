// outputNode.js — Output node remodeled with Settings header, custom fields, and toggle

import { useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';
import { VariableInput } from '../components/VariableInput';

export const OutputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.outputName || id.replace('customOutput-', 'output_'));
  const [outputType, setOutputType] = useState(data?.outputType || 'Text');
  const [outputValue, setOutputValue] = useState(data?.outputValue || '');
  const [formatOutput, setFormatOutput] = useState(data?.formatOutput || true);
  const updateNodeField = useStore((s) => s.updateNodeField);

  const headerActions = (
    <button className="base-node__header-btn" title="Settings">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
      </svg>
    </button>
  );

  return (
    <BaseNode
      id={id}
      title="Output"
      icon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      }
      headerColor="#e2e6fa"
      headerActions={headerActions}
      description="Output data of different types from your workflow."
      inputHandles={[{ id: 'value', label: '', position: 50 }]}
      showOutputs={false}
      selected={selected}
    >
      <div className="node-field">
        <input
          className="node-field__input"
          style={{ textAlign: 'center', background: '#d3d7f4', border: 'none', borderRadius: '4px', fontWeight: '500', color: '#5b52a3' }}
          value={currName}
          onChange={(e) => { setCurrName(e.target.value); updateNodeField(id, 'outputName', e.target.value); }}
        />
      </div>

      <div className="node-field">
        <label className="node-field__label" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#333', fontSize: '11px', fontWeight: '600' }}>
          Type
          <span className="badge badge--dropdown" style={{ marginLeft: 'auto' }}>Dropdown</span>
        </label>
        <select
          className="node-field__select"
          value={outputType}
          onChange={(e) => { setOutputType(e.target.value); updateNodeField(id, 'outputType', e.target.value); }}
        >
          <option value="Text">Text</option>
          <option value="Image">Image</option>
        </select>
      </div>

      <div className="node-field">
        <label className="node-field__label" style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#333', fontSize: '11px', fontWeight: '600' }}>
          Output <span style={{ color: '#ef4444' }}>*</span>
          <span className="badge badge--text" style={{ marginLeft: 'auto' }}>Text +</span>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" style={{ marginLeft: '2px', cursor: 'pointer' }}><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
        </label>
        <VariableInput
          value={outputValue}
          onChange={(val) => { setOutputValue(val); updateNodeField(id, 'outputValue', val); }}
          placeholder=""
          nodeId={id}
          handleId="value"
          multiline={false}
        />
      </div>

      <div className="node-field" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', marginBottom: '4px' }}>
        <span style={{ fontSize: '11px', color: '#333', fontWeight: '500' }}>Format output</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '11px', color: '#333' }}>{formatOutput ? 'Yes' : 'No'}</span>
          <label className="toggle-switch" style={{ margin: 0 }}>
            <input 
              type="checkbox" 
              checked={formatOutput} 
              onChange={(e) => { setFormatOutput(e.target.checked); updateNodeField(id, 'formatOutput', e.target.checked); }} 
            />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </BaseNode>
  );
};
