// textNode.js — Part 3: Auto-resize + dynamic variable handles

import { useState, useMemo, useCallback } from 'react';
import BaseNode from './BaseNode';
import { useStore } from '../store';

const VAR_REGEX = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
const MIN_WIDTH = 220;
const MAX_WIDTH = 600;
const LINE_HEIGHT = 24;

export const TextNode = ({ id, data, selected }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const updateNodeField = useStore((s) => s.updateNodeField);

  const handleTextChange = useCallback((e) => {
    setCurrText(e.target.value);
    updateNodeField(id, 'text', e.target.value);
  }, [id, updateNodeField]);

  // Extract unique variable names from {{ var }} patterns
  const variableHandles = useMemo(() => {
    const seen = new Set();
    const handles = [];
    let match;
    const regex = new RegExp(VAR_REGEX.source, VAR_REGEX.flags);
    while ((match = regex.exec(currText)) !== null) {
      const name = match[1];
      if (!seen.has(name)) {
        seen.add(name);
        handles.push({ id: name, label: name });
      }
    }
    return handles;
  }, [currText]);

  // Position handles evenly along the left side
  const inputHandles = useMemo(() => {
    const count = variableHandles.length;
    if (count === 0) return [];
    return variableHandles.map((h, i) => ({
      ...h,
      position: ((i + 1) / (count + 1)) * 100,
    }));
  }, [variableHandles]);

  // Auto-resize width based on longest line
  const computedWidth = useMemo(() => {
    const lines = currText.split('\n');
    const maxLineLen = Math.max(...lines.map((l) => l.length));
    return Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, maxLineLen * 8.5));
  }, [currText]);

  // Auto-resize height based on line count
  const computedHeight = useMemo(() => {
    const lineCount = currText.split('\n').length;
    return Math.max(40, lineCount * LINE_HEIGHT);
  }, [currText]);

  return (
    <BaseNode
      id={id}
      title="Text"
      icon="✏️"
      headerColor="linear-gradient(135deg, #10b981, #059669)"
      inputHandles={inputHandles}
      outputHandles={[{ id: 'output', label: 'Output', position: 50 }]}
      width={computedWidth}
      selected={selected}
      style={{ transition: 'width 0.15s ease' }}
    >
      <div className="node-field">
        <label className="node-field__label">Text</label>
        <textarea
          className="node-field__textarea"
          value={currText}
          onChange={handleTextChange}
          style={{ height: computedHeight }}
        />
      </div>
    </BaseNode>
  );
};
