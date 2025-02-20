const Heading = ({ muscleGroupName, exercisesData }) => {
  const isPlural = exercisesData?.length === 1;
  const exrcisesCounter = `${exercisesData?.length} exercise${isPlural ? '' : 's'} available`;

  return (
    <div className='mb-4 flex flex-col items-center justify-center'>
      <h1 className='p-4 text-2xl font-bold md:text-3xl'>
        {muscleGroupName} Exercises
      </h1>
      <p className='mt-2 text-gray-600 dark:text-gray-300'>
        {exercisesData && exrcisesCounter}
      </p>
    </div>
  );
};
export default Heading;
