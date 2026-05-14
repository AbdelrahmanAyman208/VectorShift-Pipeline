// draggableNode.js — Vertical card pill for horizontal toolbar (VectorShift style)

export const DraggableNode = ({ type, label, icon, iconBg = '#7c3aed' }) => {
  const onDragStart = (event, nodeType) => {
    const appData = { nodeType };
    event.target.style.cursor = 'grabbing';
    event.dataTransfer.setData('application/reactflow', JSON.stringify(appData));
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div
      className="draggable-card"
      onDragStart={(event) => onDragStart(event, type)}
      onDragEnd={(event) => (event.target.style.cursor = 'grab')}
      draggable
    >
      <span className="draggable-card__icon-box" style={{ background: iconBg }}>
        {icon}
      </span>
      <span className="draggable-card__label">{label}</span>
    </div>
  );
};