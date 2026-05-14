import { useState } from 'react';

export const SettingsPopover = ({ onClose }) => {
  const [maxTokens, setMaxTokens] = useState(16384);
  const [temperature, setTemperature] = useState(0.5);
  const [topP, setTopP] = useState(0.5);

  return (
    <div className="settings-popover">
      <div className="settings-popover__header">
        <span>Settings</span>
        <button className="settings-popover__close" onClick={onClose}>✕</button>
      </div>

      <div className="settings-popover__body">
        <div className="settings-popover__field">
          <div className="settings-popover__label">
            Provider <span className="badge badge--dropdown">Dropdown</span>
          </div>
          <select className="settings-popover__select">
            <option>OpenAI</option>
          </select>
        </div>

        <div className="settings-popover__field">
          <div className="settings-popover__label">
            Max Tokens <span className="icon-help">?</span> <span className="badge badge--integer">Integer</span>
          </div>
          <input 
            type="number" 
            className="settings-popover__input" 
            value={maxTokens} 
            onChange={(e) => setMaxTokens(e.target.value)} 
          />
        </div>

        <div className="settings-popover__field">
          <div className="settings-popover__label">
            Temperature <span className="icon-help">?</span> <span className="badge badge--decimal">Decimal</span>
          </div>
          <input 
            type="number" 
            step="0.1"
            className="settings-popover__input" 
            value={temperature} 
            onChange={(e) => setTemperature(e.target.value)} 
          />
          <input 
            type="range" 
            min="0" max="1" step="0.1" 
            className="settings-popover__slider" 
            value={temperature} 
            onChange={(e) => setTemperature(e.target.value)} 
          />
        </div>

        <div className="settings-popover__field">
          <div className="settings-popover__label">
            Top P <span className="icon-help">?</span> <span className="badge badge--decimal">Decimal</span>
          </div>
          <input 
            type="number" 
            step="0.1"
            className="settings-popover__input" 
            value={topP} 
            onChange={(e) => setTopP(e.target.value)} 
          />
          <input 
            type="range" 
            min="0" max="1" step="0.1" 
            className="settings-popover__slider" 
            value={topP} 
            onChange={(e) => setTopP(e.target.value)} 
          />
        </div>

        <div className="settings-popover__field settings-popover__field--toggle">
          <div className="settings-popover__label">
            Stream Response <span className="icon-help">?</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="settings-popover__field settings-popover__field--toggle">
          <div className="settings-popover__label">
            Json Output <span className="icon-help">?</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="settings-popover__field settings-popover__field--toggle">
          <div className="settings-popover__label">
            Show Sources <span className="icon-help">?</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="toggle-slider"></span>
          </label>
        </div>

        <div className="settings-popover__field settings-popover__field--toggle">
          <div className="settings-popover__label">
            Show Confidence <span className="icon-help">?</span>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" />
            <span className="toggle-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
};
