// NoteNode.js — Decorative documentation node

import { useState } from 'react';
import BaseNode from './BaseNode';

export const NoteNode = ({ id, data, selected }) => {
  const [text, setText] = useState(data?.text || '');
  const [color, setColor] = useState(data?.color || '#7c3aed');

  return (
    <BaseNode
      id={id}
      title="Note"
      icon="📝"
      headerColor={`linear-gradient(135deg, ${color}88, ${color}44)`}
      description="Add documentation to your pipeline."
      showOutputs={false}
      selected={selected}
      className="note-node"
      style={{
        background: `${color}10`,
        borderColor: `${color}30`,
      }}
    >
      <div className="node-field">
        <textarea
          className="node-field__textarea"
          placeholder="Add a note..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{ minHeight: 60 }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <span className="node-field__label" style={{ margin: 0 }}>Color</span>
        <input
          type="color"
          className="node-color-picker"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
    </BaseNode>
  );
};
