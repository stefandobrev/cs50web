import MuscleTile from './MuscleTile';

const MuscleGrid = ({ exercisesData }) => {
  return (
    <div className='max-h-[650px] overflow-y-auto rounded-xl border border-gray-100 bg-gray-50 shadow-sm dark:border-gray-700 dark:bg-gray-800'>
      <div className='grid grid-cols-1 gap-4 p-4 md:grid-cols-2 lg:grid-cols-3'>
        {exercisesData?.map((exercise) => (
          <MuscleTile exercise={exercise} />
        ))}
      </div>
    </div>
  );
};

export default MuscleGrid;
