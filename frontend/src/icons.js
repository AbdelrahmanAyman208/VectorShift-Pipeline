// icons.js — Clean SVG line icons matching VectorShift's style

const Icon = ({ children, size = 16, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    {children}
  </svg>
);

export const InputIcon = ({ size, color }) => (
  <Icon size={size} color={color}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M12 8v8" />
    <path d="M8 12l4 4 4-4" />
  </Icon>
);

export const OutputIcon = ({ size, color }) => (
  <Icon size={size} color={color}>
    <rect x="3" y="3" width="18" height="18" rx="3" />
    <path d="M12 16V8" />
    <path d="M8 12l4-4 4 4" />
  </Icon>
);

export const LLMIcon = ({ size, color }) => (
  <Icon size={size} color={color}>
    <rect x="4" y="4" width="16" height="16" rx="3" />
    <circle cx="9" cy="10" r="1.5" fill={color} stroke="none" />
    <circle cx="15" cy="10" r="1.5" fill={color} stroke="none" />
    <path d="M9 15c0 0 1.5 2 3 2s3-2 3-2" />
  </Icon>
);

export const TextIcon = ({ size, color }) => (
  <Icon size={size} color={color}>
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="8" y1="13" x2="16" y2="13" />
    <line x1="8" y1="17" x2="12" y2="17" />
  </Icon>
);

export const TransformIcon = ({ size, color }) => (
  <Icon size={size} color={color}>
    <polyline points="16 3 21 3 21 8" />
    <line x1="4" y1="20" x2="21" y2="3" />
    <polyline points="21 16 21 21 16 21" />
    <line x1="15" y1="15" x2="21" y2="21" />
    <line x1="4" y1="4" x2="9" y2="9" />
  </Icon>
);

export const FilterIcon = ({ size, color }) => (
  <Icon size={size} color={color}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </Icon>
);

export const APIIcon = ({ size, color }) => (
  <Icon size={size} color={color}>
    <circle cx="12" cy="12" r="2" />
    <path d="M12 2v4" /><path d="M12 18v4" />
    <path d="M4.93 4.93l2.83 2.83" /><path d="M16.24 16.24l2.83 2.83" />
    <path d="M2 12h4" /><path d="M18 12h4" />
    <path d="M4.93 19.07l2.83-2.83" /><path d="M16.24 7.76l2.83-2.83" />
  </Icon>
);

export const MergeIcon = ({ size, color }) => (
  <Icon size={size} color={color}>
    <path d="M8 6H3v4h5" />
    <path d="M8 14H3v4h5" />
    <path d="M16 9h5v6h-5" />
    <path d="M8 8l4 4-4 4" />
  </Icon>
);

export const NoteIcon = ({ size, color }) => (
  <Icon size={size} color={color}>
    <path d="M16 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V8z" />
    <polyline points="16 3 16 8 21 8" />
  </Icon>
);

export const KnowledgeBaseIcon = ({ size, color }) => (
  <Icon size={size} color={color}>
    <path d="M4 19.5A2.5 2.5 0 016.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" />
    <line x1="8" y1="7" x2="16" y2="7" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </Icon>
);

export const KBLoaderIcon = ({ size, color }) => (
  <Icon size={size} color={color}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </Icon>
);

export const SearchIcon = ({ size, color }) => (
  <Icon size={size} color={color}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </Icon>
);
