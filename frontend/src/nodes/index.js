// nodes/index.js — Central export for all node types

import { InputNode } from './inputNode';
import { OutputNode } from './outputNode';
import { LLMNode } from './llmNode';
import { TextNode } from './textNode';
import { APINode } from './APINode';
import { FilterNode } from './FilterNode';
import { TransformNode } from './TransformNode';
import { MergeNode } from './MergeNode';
import { NoteNode } from './NoteNode';
import { KnowledgeBaseNode } from './KnowledgeBaseNode';
import { KBLoaderNode } from './KBLoaderNode';
import { SearchNode } from './SearchNode';

// Re-export all node components
export {
  InputNode,
  OutputNode,
  LLMNode,
  TextNode,
  APINode,
  FilterNode,
  TransformNode,
  MergeNode,
  NoteNode,
  KnowledgeBaseNode,
  KBLoaderNode,
  SearchNode,
};

// ReactFlow nodeTypes registry
export const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  filter: FilterNode,
  transform: TransformNode,
  merge: MergeNode,
  note: NoteNode,
  knowledgeBase: KnowledgeBaseNode,
  kbLoader: KBLoaderNode,
  search: SearchNode,
};
