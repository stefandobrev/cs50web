export const MuscleGroup = ({
  id,
  name,
  onClick,
  setHoveredMuscle,
  children,
}) => (
  <g
    onClick={() => onClick(id)}
    onMouseEnter={() => setHoveredMuscle(name)}
    onMouseLeave={() => setHoveredMuscle('')}
    id={id}
  >
    {children}
  </g>
);
