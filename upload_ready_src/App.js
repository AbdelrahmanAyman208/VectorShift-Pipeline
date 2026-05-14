// App.js — VectorShift layout: top bar → toolbar → canvas

import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';
import './styles/globals.css';

function App() {
  return (
    <div className="app-shell">
      {/* ── Top Bar ── */}
      <div className="top-bar">
        <span className="top-bar__brand">VectorShift Pipeline</span>
        <SubmitButton />
      </div>

      {/* ── Horizontal Toolbar (tabs + node pills) ── */}
      <PipelineToolbar />

      {/* ── Full-width Canvas ── */}
      <div className="main-layout">
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
