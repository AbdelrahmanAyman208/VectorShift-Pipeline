// VariableInput.js — VectorShift-style variable reference input
// When user types {{ it shows a dropdown to pick a node + output

import { useState, useRef, useCallback, useEffect } from 'react';
import { useStore } from '../store';

const VAR_REGEX = /\{\{\s*([a-zA-Z0-9_.$]+)\s*\}\}/g;

export const VariableInput = ({ value, onChange, placeholder, multiline = true, nodeId, handleId }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [step, setStep] = useState(1); // 1 = select node, 2 = select output
  const [selectedNode, setSelectedNode] = useState(null);
  const inputRef = useRef(null);
  const previewRef = useRef(null);
  const nodes = useStore((s) => s.nodes);
  const onConnect = useStore((s) => s.onConnect);

  // Get all other nodes (not self)
  const otherNodes = nodes.filter((n) => n.id !== nodeId);

  // Get outputs for a selected node type
  const getNodeOutputs = (node) => {
    const type = node.type;
    const outputMap = {
      customInput: [{ name: 'text', label: 'The inputted text', handleId: 'value' }],
      text: [{ name: 'output', label: 'Text output', handleId: 'output' }],
      llm: [{ name: 'response', label: 'LLM response', handleId: 'response' }, { name: 'tokens_used', label: 'Tokens used', handleId: 'response' }],
      api: [{ name: 'response', label: 'API response', handleId: 'response' }],
      filter: [{ name: 'matched', label: 'Matched items', handleId: 'matched' }, { name: 'unmatched', label: 'Unmatched items', handleId: 'unmatched' }],
      transform: [{ name: 'result', label: 'Transform result', handleId: 'output' }],
      merge: [{ name: 'merged', label: 'Merged output', handleId: 'output' }],
      knowledgeBase: [{ name: 'chunks', label: 'Retrieved chunks', handleId: 'chunks' }, { name: 'citation_metadata', label: 'Citations', handleId: 'metadata' }],
      search: [{ name: 'results', label: 'Search results', handleId: 'results' }, { name: 'scores', label: 'Similarity scores', handleId: 'results' }],
    };
    return outputMap[type] || [{ name: 'output', label: 'Output' }];
  };

  const getNodeLabel = (node) => {
    return node.data?.inputName || node.data?.outputName || node.data?.name || node.id;
  };

  const getNodeTypeLabel = (node) => {
    const labels = {
      customInput: 'Input', customOutput: 'Output', llm: 'LLM', text: 'Text',
      api: 'API', filter: 'Filter', transform: 'Transform', merge: 'Merge',
      knowledgeBase: 'Knowledge Base', kbLoader: 'KB Loader', search: 'Search', note: 'Note',
    };
    return labels[node.type] || node.type;
  };

  // Detect {{ typing
  const handleChange = useCallback((e) => {
    const val = e.target.value;
    onChange(val);

    // Check if user just typed {{
    const cursorPos = e.target.selectionStart;
    const textBefore = val.substring(0, cursorPos);
    if (textBefore.endsWith('{{')) {
      setShowDropdown(true);
      setStep(1);
      setSelectedNode(null);
    }
  }, [onChange]);

  const handleScroll = (e) => {
    if (previewRef.current) {
      previewRef.current.scrollTop = e.target.scrollTop;
      previewRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  // Select a node
  const handleSelectNode = (node) => {
    setSelectedNode(node);
    setStep(2);
  };

  // Select an output and insert the variable
  const handleSelectOutput = (output) => {
    const nodeName = getNodeLabel(selectedNode);
    const varRef = `${nodeName}.${output.name}`;

    // Replace the trailing {{ with the full variable reference
    const cursorPos = inputRef.current?.selectionStart || value.length;
    const textBefore = value.substring(0, cursorPos);
    const textAfter = value.substring(cursorPos);

    // Find the last {{ and replace it
    const lastBrace = textBefore.lastIndexOf('{{');
    if (lastBrace !== -1) {
      const newValue = textBefore.substring(0, lastBrace) + `{{ ${varRef} }}` + textAfter;
      onChange(newValue);
    }

    // Automatically create the connection
    if (onConnect && handleId) {
      const sourceHandleId = output.handleId || output.name;
      onConnect({
        source: selectedNode.id,
        sourceHandle: `${selectedNode.id}-${sourceHandleId}`,
        target: nodeId,
        targetHandle: `${nodeId}-${handleId}`,
      });
    }

    setShowDropdown(false);
    setStep(1);
    setSelectedNode(null);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClick = (e) => {
      if (!e.target.closest('.var-input-wrapper')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  // Auto-expand textarea to fit content
  useEffect(() => {
    if (multiline && inputRef.current) {
      inputRef.current.style.height = 'auto';
      inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
  }, [value, multiline]);

  // Parse value to render with pills
  const renderPreview = () => {
    const parts = [];
    let lastIndex = 0;
    let match;
    const regex = new RegExp(VAR_REGEX.source, VAR_REGEX.flags);

    while ((match = regex.exec(value)) !== null) {
      if (match.index > lastIndex) {
        parts.push({ type: 'text', value: value.substring(lastIndex, match.index) });
      }
      parts.push({ type: 'var', value: match[1] });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < value.length) {
      parts.push({ type: 'text', value: value.substring(lastIndex) });
    }

    if (parts.length === 0 || (parts.length === 1 && parts[0].type === 'text' && !parts[0].value)) {
      return null;
    }

    return (
      <div className="var-preview" ref={previewRef}>
        {parts.map((p, i) =>
          p.type === 'var' ? (
            <span key={i} className="var-pill">
              <span className="var-pill__icon">⊞</span>
              {p.value}
              <button className="var-pill__remove" onClick={() => {
                const newVal = value.replace(`{{ ${p.value} }}`, '').replace(`{{${p.value}}}`, '');
                onChange(newVal.trim());
              }}>×</button>
            </span>
          ) : (
            <span key={i}>{p.value}</span>
          )
        )}
      </div>
    );
  };

  const Tag = multiline ? 'textarea' : 'input';

  return (
    <div className={`var-input-wrapper ${multiline ? 'var-input-wrapper--multiline' : ''}`}>
      <div className="var-input-container">
        {renderPreview()}
        <Tag
          ref={inputRef}
          className={`var-input-field ${multiline ? 'node-field__textarea' : 'node-field__input'}`}
          placeholder={placeholder || 'Type {{ to reference outputs'}
          value={value}
          onChange={handleChange}
          onScroll={handleScroll}
          style={multiline ? { minHeight: 50, overflow: 'hidden' } : {}}
          spellCheck="false"
        />
      </div>

      {showDropdown && (
        <div className="var-dropdown">
          <div className="var-dropdown__header">
            <span className="var-dropdown__step">{step}</span>
            <span>{step === 1 ? 'Select Node' : 'Select Output'}</span>
            {step === 2 && (
              <button className="var-dropdown__back" onClick={() => setStep(1)}>←</button>
            )}
          </div>
          <div className="var-dropdown__list">
            {step === 1 ? (
              otherNodes.length === 0 ? (
                <div className="var-dropdown__empty">No other nodes on canvas</div>
              ) : (
                otherNodes.map((node) => (
                  <button
                    key={node.id}
                    className="var-dropdown__item"
                    onClick={() => handleSelectNode(node)}
                  >
                    <span className="var-dropdown__item-icon">⊞</span>
                    <span className="var-dropdown__item-name">{getNodeLabel(node)}</span>
                    <span className="var-dropdown__item-type">{getNodeTypeLabel(node)}</span>
                  </button>
                ))
              )
            ) : (
              getNodeOutputs(selectedNode).map((output) => (
                <button
                  key={output.name}
                  className="var-dropdown__item"
                  onClick={() => handleSelectOutput(output)}
                >
                  <span className="var-dropdown__item-name">{output.name}</span>
                  <span className="var-dropdown__item-desc">{output.label}</span>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
