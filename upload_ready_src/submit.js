// submit.js — Part 4: Pipeline submission with modal feedback

import { useState, useCallback } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(null); // { type: 'success'|'error', data }

  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8000/pipelines/parse', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();
      setModal({ type: 'success', data });
    } catch (err) {
      setModal({ type: 'error', message: err.message || 'Failed to connect to backend.' });
    } finally {
      setLoading(false);
    }
  }, [nodes, edges]);

  const closeModal = () => setModal(null);

  return (
    <>
      <button
        className="submit-btn"
        onClick={handleSubmit}
        disabled={loading}
        type="button"
      >
        {loading ? <span className="spinner" /> : '▶'}
        {loading ? 'Analyzing...' : 'Run Pipeline'}
      </button>

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div
            className={`modal ${modal.type === 'error' ? 'modal--error' : ''}`}
            onClick={(e) => e.stopPropagation()}
          >
            {modal.type === 'success' ? (
              <>
                <div className="modal__header">
                  <span className="modal__header-icon">✅</span>
                  <span>Pipeline Analysis</span>
                </div>
                <div className="modal__row">
                  <span className="modal__label">Nodes</span>
                  <span className="modal__value">{modal.data.num_nodes}</span>
                </div>
                <div className="modal__row">
                  <span className="modal__label">Edges</span>
                  <span className="modal__value">{modal.data.num_edges}</span>
                </div>
                <div className="modal__row">
                  <span className="modal__label">DAG Valid</span>
                  <span className={`modal__value ${modal.data.is_dag ? 'modal__value--success' : 'modal__value--error'}`}>
                    {modal.data.is_dag ? '✅ Yes' : '❌ No'}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="modal__header">
                  <span className="modal__header-icon">❌</span>
                  <span>Pipeline Error</span>
                </div>
                <p className="modal__error-msg">{modal.message}</p>
              </>
            )}
            <button className="modal__close-btn" onClick={closeModal}>
              Dismiss
            </button>
          </div>
        </div>
      )}
    </>
  );
};
