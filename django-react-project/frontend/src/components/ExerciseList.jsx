import { useState } from 'react';
import Select from 'react-select';

const SearchInput = ({ value, onChange }) => (
  <input
    type='text'
    placeholder='Search Exercises'
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className='mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out w-full'
  />
);

const MuscleGroupFilter = ({
  muscleGroups,
  selectedMuscleGroups,
  onChange,
}) => (
  <div className='mb-4'>
    <label className='block font-semibold mb-2 text-gray-700'>
      Filter by Muscle Group
    </label>
    <Select
      isMulti
      options={muscleGroups}
      onChange={(selectedOptions) =>
        onChange(selectedOptions ? selectedOptions.map((opt) => opt.value) : [])
      }
      value={muscleGroups.filter((group) =>
        selectedMuscleGroups.includes(group.value)
      )}
      className='w-full'
    />
  </div>
);

const SortFilter = ({ sortBy, onChange }) => (
  <div className='mb-4'>
    <label className='block font-semibold mb-2 text-gray-700'>Sort by</label>
    <Select
      options={[
        { label: 'Newest', value: 'created_at' },
        { label: 'Last Edited', value: 'updated_at' },
      ]}
      onChange={(selectedOption) =>
        onChange(selectedOption ? selectedOption.value : null)
      }
      value={
        sortBy
          ? {
              label: sortBy === 'created_at' ? 'Newest' : 'Last Edited',
              value: sortBy,
            }
          : null
      }
      isClearable
      placeholder='No filter'
      className='w-full'
    />
  </div>
);

const ExerciseListItems = ({ exercises, onSelectExercise }) => (
  <ul className='space-y-2'>
    {exercises.map((exercise) => (
      <li
        key={exercise.id}
        className='p-3 cursor-pointer rounded-lg transition duration-200 ease-in-out hover:bg-blue-100 active:bg-blue-200'
        onClick={() => onSelectExercise(exercise)}
      >
        <span className='text-gray-700'>{exercise.title}</span>
      </li>
    ))}
  </ul>
);

export const ExerciseList = ({
  exerciseTitles,
  onSelectExercise,
  muscleGroups,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState([]);
  const [sortBy, setSortBy] = useState(null);

  const filteredExercises = exerciseTitles
    .filter((exercise) =>
      exercise.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter((exercise) =>
      selectedMuscleGroups.length
        ? selectedMuscleGroups.includes(exercise.primary_group__slug)
        : true
    );

  const sortedExercises = [...filteredExercises].sort((a, b) => {
    if (sortBy === 'created_at')
      return new Date(b.created_at) - new Date(a.created_at);
    if (sortBy === 'updated_at')
      return new Date(b.updated_at) - new Date(a.updated_at);
    return 0;
  });

  return (
    <div className='flex flex-col w-full sm:max-w-sm bg-white p-6 rounded-lg overflow-y-auto max-h-[50vh] lg:max-h-[67vh]'>
      <h2 className='text-xl font-semibold text-gray-800 mb-4'>
        Exercise List
      </h2>
      <SearchInput value={searchQuery} onChange={setSearchQuery} />
      <MuscleGroupFilter
        muscleGroups={muscleGroups}
        selectedMuscleGroups={selectedMuscleGroups}
        onChange={setSelectedMuscleGroups}
      />
      <SortFilter sortBy={sortBy} onChange={setSortBy} />
      <ExerciseListItems
        exercises={sortedExercises}
        onSelectExercise={onSelectExercise}
      />
    </div>
  );
};
