export const MuscleGroup = ({
  id,
  name,
  onClick,
  onHover,
  selectedMuscle,
  children,
}) => {
  const isSelected = selectedMuscle === id;

  return (
    <g
      onClick={() => onClick?.(id, name)}
      onMouseEnter={() => onHover?.(name)}
      onMouseLeave={() => onHover?.('')}
      id={id}
      className={`cursor-pointer ${
        isSelected
          ? 'fill-red-500'
          : 'fill-[#e6e7e8] hover:fill-red-300 active:fill-red-300'
      }`}
    >
      {children}
    </g>
  );
};
