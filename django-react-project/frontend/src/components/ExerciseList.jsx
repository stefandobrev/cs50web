import { useState } from 'react';

export const ExerciseList = ({ exerciseTitles, onSelectExercise }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredExercises = exerciseTitles.filter((exercise) =>
    exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(exerciseTitles);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className='flex flex-col w-full sm:max-w-sm bg-white p-4 overflow-y-auto max-h-[50vh] lg:max-h-[67vh]'>
      <input
        type='text'
        placeholder='Search Exercises'
        value={searchQuery}
        onChange={handleSearchChange}
        className='mb-4 p-3 border rounded w-full focus:outline-blue-500'
      />

      <ul className='space-y-2'>
        {filteredExercises.map((exercise) => (
          <li
            key={exercise.id}
            className='p-2 cursor-pointer hover:bg-gray-200 active:bg-gray-200 rounded'
            onClick={() => onSelectExercise(exercise)}
          >
            {exercise.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
