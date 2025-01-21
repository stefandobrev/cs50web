export const MuscleGroup = ({ id, name, onClick, onHover, children }) => (
  <g
    onClick={() => onClick?.(id, name)}
    onMouseEnter={() => onHover?.(name)}
    onMouseLeave={() => onHover?.('')}
    id={id}
  >
    {children}
  </g>
);
