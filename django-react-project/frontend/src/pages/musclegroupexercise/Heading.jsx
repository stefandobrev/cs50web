import SearchInput from '../../components/inputs/SearchInput';

const Heading = ({ muscleGroupName, exercisesData, value, onChange }) => {
  const isPlural = exercisesData?.length !== 1;
  const exercisesCounter = `${exercisesData?.length} exercise${isPlural ? 's' : ''} available`;

  return (
    <div className='flex flex-col'>
      <h1 className='flex justify-center p-4 text-2xl font-bold md:text-3xl'>
        {muscleGroupName} Exercises
      </h1>
      <div className='relative flex w-full flex-col-reverse items-center gap-y-4 lg:flex-row'>
        <div className='lg:absolute lg:left-4'>
          <SearchInput
            value={value}
            onChange={onChange}
            className='w-80 max-w-md lg:w-70'
          />
        </div>
        <p className='w-full text-center text-gray-600 lg:mx-auto dark:text-gray-300'>
          {exercisesData && exercisesCounter}
        </p>
      </div>
    </div>
  );
};

export default Heading;
