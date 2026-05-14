// TransformNode.js — VectorShift-style Transform node

import { useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const TransformNode = ({ id, data, selected }) => {
  const [transformType, setTransformType] = useState(data?.transformType || 'map');
  const [expression, setExpression] = useState(data?.expression || '');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="Transform"
      icon="⚡"
      headerColor="linear-gradient(135deg, #eab308, #f59e0b)"
      description="Transform data using expressions."
      inputHandles={[{ id: 'input', label: 'Input', position: 50 }]}
      outputHandles={[{ id: 'output', label: 'Output', position: 50 }]}
      outputFields={[{ name: 'result', type: 'Any' }]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field__label">Type</label>
        <select
          className="node-field__select"
          value={transformType}
          onChange={(e) => { setTransformType(e.target.value); updateNodeField(id, 'transformType', e.target.value); }}
        >
          <option value="map">Map</option>
          <option value="reduce">Reduce</option>
          <option value="flatten">Flatten</option>
          <option value="sort">Sort</option>
        </select>
      </div>
      <div className="node-field">
        <label className="node-field__label">Expression</label>
        <input
          className="node-field__input"
          placeholder="e.g. item.toUpperCase()"
          value={expression}
          onChange={(e) => { setExpression(e.target.value); updateNodeField(id, 'expression', e.target.value); }}
        />
      </div>
    </BaseNode>
  );
};
