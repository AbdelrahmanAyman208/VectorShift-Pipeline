// BaseNode.js — VectorShift-style dual-panel node with Protoplasm theme
// ──────────────────────────────────────────────────────────────────────

import { memo, useState } from 'react';
import { Handle, Position } from 'reactflow';

/**
 * BaseNode — Core visual component matching VectorShift's node structure.
 *
 * @param {string}   props.id             — ReactFlow node ID
 * @param {string}   props.title          — Node header title
 * @param {string}   props.icon           — Emoji or JSX icon in header
 * @param {string}   [props.headerColor]  — CSS gradient for header
 * @param {string}   [props.description]  — Description text under header
 * @param {Array}    [props.inputHandles] — [{ id, label, position }]
 * @param {Array}    [props.outputHandles]— [{ id, label, position }]
 * @param {Array}    [props.outputFields] — [{ name, type }] for outputs panel
 * @param {number}   [props.width]        — Node width override
 * @param {boolean}  [props.selected]     — Selected state
 * @param {boolean}  [props.showOutputs]  — Show right outputs panel
 * @param {string}   [props.className]    — Extra CSS class
 * @param {Object}   [props.style]        — Extra inline styles
 * @param {React.ReactNode} props.children — Body content (left panel)
 */
const BaseNode = ({
  id,
  title,
  icon,
  headerColor,
  description,
  inputHandles = [],
  outputHandles = [],
  outputFields = [],
  children,
  width,
  selected = false,
  showOutputs = true,
  className = '',
  style = {},
  headerActions,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  const headerStyle = headerColor ? { background: headerColor } : undefined;
  const hasOutputPanel = showOutputs && outputFields.length > 0 && !collapsed;

  return (
    <div
      className={`base-node ${selected ? 'base-node--selected' : ''} ${className}`}
      style={{ width: width || (hasOutputPanel ? 420 : 240), ...style }}
    >
      {/* ── Header ── */}
      <div className="base-node__header" style={headerStyle}>
        <div className="base-node__header-left">
          {icon && <span className="base-node__header-icon">{icon}</span>}
          <span className="base-node__header-title">{title}</span>
        </div>
        <div className="base-node__header-right" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
          {headerActions}
          <button
            className="base-node__header-btn base-node__close"
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="16"></line>
                <line x1="8" y1="12" x2="16" y2="12"></line>
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="15" y1="9" x2="9" y2="15"></line>
                <line x1="9" y1="9" x2="15" y2="15"></line>
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ── Description ── */}
      {description && !collapsed && (
        <div className="base-node__desc">{description}</div>
      )}

      {/* ── Body: dual panel or single ── */}
      {!collapsed && (
        <div className={`base-node__content ${hasOutputPanel ? 'base-node__content--dual' : ''}`}>
          {/* Left panel: fields */}
          <div className="base-node__panel-left">
            {children}
          </div>

          {/* Right panel: outputs */}
          {hasOutputPanel && (
            <div className="base-node__panel-right">
              <div className="base-node__panel-right-header">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                <span>Outputs</span>
              </div>
              <div className="base-node__outputs-help">
                Type "{'{{'}" in downstream nodes to leverage output fields.
              </div>
              <div className="base-node__outputs-table-header">
                <span>Output Fields</span>
                <span>Type</span>
              </div>
              <div className="base-node__output-fields">
                {outputFields.map((f) => (
                  <div key={f.name} className="base-node__output-field">
                    <div className="base-node__output-field-top">
                      <span className="base-node__output-name">{f.name}</span>
                      <span className={`badge badge--${f.type.toLowerCase().split('<')[0]}`}>{f.type}</span>
                    </div>
                    {f.desc && <div className="base-node__output-desc">{f.desc}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── Input Handles (left, cyan glow) ── */}
      {inputHandles.map((h) => (
        <div
          key={h.id}
          className="handle-wrapper"
          style={{
            position: 'absolute',
            left: 0,
            top: `${h.position}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Handle
            type="target"
            position={Position.Left}
            id={`${id}-${h.id}`}
            style={{ position: 'relative', transform: 'none' }}
          />
          <span className="handle-label handle-label--left">{h.label}</span>
        </div>
      ))}

      {/* ── Output Handles (right, purple glow) ── */}
      {outputHandles.map((h) => (
        <div
          key={h.id}
          className="handle-wrapper"
          style={{
            position: 'absolute',
            right: 0,
            top: `${h.position}%`,
            transform: 'translate(50%, -50%)',
          }}
        >
          <Handle
            type="source"
            position={Position.Right}
            id={`${id}-${h.id}`}
            style={{ position: 'relative', transform: 'none' }}
          />
          <span className="handle-label handle-label--right">{h.label}</span>
        </div>
      ))}
    </div>
  );
};

export default memo(BaseNode);
