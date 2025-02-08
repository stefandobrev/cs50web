import Select from 'react-select';

export const SearchInput = ({ value, onChange }) => (
  <input
    type='text'
    placeholder='Search exercise'
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className='mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out w-full'
  />
);

export const MuscleGroupFilter = ({
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

export const SortFilter = ({ sortBy, onChange }) => (
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
      placeholder='--'
      className='w-full'
    />
  </div>
);

export const ExerciseListItems = ({ exercises, onSelectExercise }) => (
  <ul className='space-y-2'>
    {exercises.map((exercise) => (
      <li
        key={exercise.id}
        className='p-3 cursor-pointer rounded-lg transition duration-200 ease-in-out hover:bg-gray-200 active:bg-gray-200'
        onClick={() => onSelectExercise(exercise)}
      >
        <span className='text-gray-700'>{exercise.title}</span>
      </li>
    ))}
  </ul>
);
