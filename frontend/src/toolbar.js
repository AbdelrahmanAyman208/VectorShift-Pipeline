// toolbar.js — Horizontal top toolbar with category tabs (VectorShift style)

import { useState } from 'react';
import { DraggableNode } from './draggableNode';
import {
  InputIcon, OutputIcon, LLMIcon, TextIcon,
  TransformIcon, FilterIcon, APIIcon, MergeIcon, NoteIcon,
  KnowledgeBaseIcon, KBLoaderIcon, SearchIcon,
} from './icons';

const categories = {
  General: [
    { type: 'customInput', label: 'Input', icon: <InputIcon size={16} color="#fff" />, iconBg: '#0ea5e9' },
    { type: 'customOutput', label: 'Output', icon: <OutputIcon size={16} color="#fff" />, iconBg: '#8b5cf6' },
    { type: 'text', label: 'Text', icon: <TextIcon size={16} color="#fff" />, iconBg: '#f59e0b' },
    { type: 'note', label: 'Note', icon: <NoteIcon size={16} color="#fff" />, iconBg: '#f43f5e' },
  ],
  LLMs: [
    { type: 'llm', label: 'LLM', icon: <LLMIcon size={16} color="#fff" />, iconBg: '#14b8a6' },
  ],
  'Knowledge Base': [
    { type: 'knowledgeBase', label: 'Knowledge', icon: <KnowledgeBaseIcon size={16} color="#fff" />, iconBg: '#7c3aed' },
    { type: 'kbLoader', label: 'KB Loader', icon: <KBLoaderIcon size={16} color="#fff" />, iconBg: '#6d28d9' },
    { type: 'search', label: 'Search', icon: <SearchIcon size={16} color="#fff" />, iconBg: '#4f46e5' },
  ],
  'Data Transformation': [
    { type: 'transform', label: 'Transform', icon: <TransformIcon size={16} color="#fff" />, iconBg: '#eab308' },
    { type: 'filter', label: 'Filter', icon: <FilterIcon size={16} color="#fff" />, iconBg: '#3b82f6' },
    { type: 'merge', label: 'Merge', icon: <MergeIcon size={16} color="#fff" />, iconBg: '#06b6d4' },
  ],
  Integrations: [
    { type: 'api', label: 'API', icon: <APIIcon size={16} color="#fff" />, iconBg: '#a855f7' },
  ],
};

const tabNames = Object.keys(categories);

export const PipelineToolbar = () => {
  const [activeTab, setActiveTab] = useState('General');

  return (
    <div className="toolbar-top">
      {/* Category Tabs */}
      <div className="toolbar-tabs">
        {tabNames.map((tab) => (
          <button
            key={tab}
            className={`toolbar-tab ${activeTab === tab ? 'toolbar-tab--active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Node Pills Row */}
      <div className="toolbar-nodes">
        {categories[activeTab].map((node) => (
          <DraggableNode
            key={node.type}
            type={node.type}
            label={node.label}
            icon={node.icon}
            iconBg={node.iconBg}
          />
        ))}
      </div>
    </div>
  );
};
