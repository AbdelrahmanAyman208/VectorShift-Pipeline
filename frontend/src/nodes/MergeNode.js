// MergeNode.js — VectorShift-style Merge node

import { useState } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

export const MergeNode = ({ id, data, selected }) => {
  const [strategy, setStrategy] = useState(data?.strategy || 'concat');
  const updateNodeField = useStore((s) => s.updateNodeField);

  return (
    <BaseNode
      id={id}
      title="Merge"
      icon="🔀"
      headerColor="linear-gradient(135deg, #06b6d4, #0891b2)"
      description="Combine multiple data streams."
      inputHandles={[
        { id: 'a', label: 'A', position: 25 },
        { id: 'b', label: 'B', position: 50 },
        { id: 'c', label: 'C', position: 75 },
      ]}
      outputHandles={[{ id: 'output', label: 'Output', position: 50 }]}
      outputFields={[{ name: 'merged', type: 'Any' }]}
      selected={selected}
    >
      <div className="node-field">
        <label className="node-field__label">Strategy</label>
        <select
          className="node-field__select"
          value={strategy}
          onChange={(e) => { setStrategy(e.target.value); updateNodeField(id, 'strategy', e.target.value); }}
        >
          <option value="concat">Concat</option>
          <option value="zip">Zip</option>
          <option value="join">Join</option>
        </select>
      </div>
    </BaseNode>
  );
};
