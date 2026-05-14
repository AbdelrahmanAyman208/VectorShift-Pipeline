// inputNode.js — VectorShift-style Input node

import { useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data, selected }) => {
  const [currName, setCurrName] = useState(data?.inputName || id.replace('customInput-', 'input_'));
  const [inputType, setInputType] = useState(data?.inputType || 'Text');
  const updateNodeField = useStore((s) => s.updateNodeField);

  const handleNameChange = (e) => {
    setCurrName(e.target.value);
    updateNodeField(id, 'inputName', e.target.value);
  };

  const handleTypeChange = (e) => {
    setInputType(e.target.value);
    updateNodeField(id, 'inputType', e.target.value);
  };

  return (
    <BaseNode
      id={id}
      title="Input"
      icon="⬇️"
      headerColor="linear-gradient(135deg, #0ea5e9, #0284c7)"
      description="Pass data of different types into your workflow."
      outputHandles={[{ id: 'value', label: 'Value', position: 50 }]}
      outputFields={[{ name: currName, type: inputType }]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field__label">Name</label>
        <input className="node-field__input" value={currName} onChange={handleNameChange} />
      </div>
      <div className="node-field">
        <label className="node-field__label">Type</label>
        <select className="node-field__select" value={inputType} onChange={handleTypeChange}>
          <option value="Text">Text</option>
          <option value="File">File</option>
        </select>
      </div>
    </BaseNode>
  );
};
