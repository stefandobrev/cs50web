import Select from 'react-select';
import { formatDistanceToNow } from 'date-fns';

export const SearchInput = ({ value, onChange }) => (
  <input
    type='text'
    placeholder='Search exercise'
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className='mb-4 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-logoRed focus:border-logoRed transition duration-200 ease-in-out w-full'
  />
);

export const MuscleGroupFilter = ({
  muscleGroups,
  selectedMuscleGroups,
  onChange,
}) => (
  <div className='mb-4'>
    <label className='block font-semibold mb-2 text-gray-700 '>
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
      classNamePrefix='react-select'
      className='w-full'
    />
  </div>
);

export const SortFilter = ({ sortBy, onChange }) => (
  <div className='mb-4'>
    <label className='block font-semibold mb-2 text-gray-700'>Sort by</label>
    <Select
      options={[
        { label: 'Last Created', value: 'created_at' },
        { label: 'Last Edited', value: 'updated_at' },
      ]}
      onChange={(selectedOption) =>
        onChange(selectedOption ? selectedOption.value : null)
      }
      value={
        sortBy
          ? {
              label: sortBy === 'created_at' ? 'Last Created' : 'Last Edited',
              value: sortBy,
            }
          : null
      }
      isClearable
      placeholder='--'
      classNamePrefix='react-select'
      className='w-full'
    />
  </div>
);

export const ExerciseListItems = ({ exercises, onSelectExercise, sortBy }) => (
  <ul className='space-y-2'>
    {exercises.map((exercise) => {
      const timestamp =
        sortBy === 'created_at' ? exercise.created_at : exercise.updated_at;
      const timeAgo = sortBy
        ? formatDistanceToNow(new Date(timestamp), { addSuffix: true })
        : null;

      return (
        <li
          key={exercise.id}
          className='p-3 cursor-pointer rounded-lg transition duration-200 ease-in-out hover:bg-gray-200 active:bg-gray-200 flex justify-between'
          onClick={() => onSelectExercise(exercise)}
        >
          <span className='text-gray-800'>{exercise.title}</span>
          {timeAgo && (
            <span className='text-sm text-[rgba(195,42,42,1)]'>{timeAgo}</span>
          )}
        </li>
      );
    })}
  </ul>
);

export const TabButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`w-24 h-full flex flex-col items-center justify-center rounded-md hover:bg-gray-800 active:bg-gray-800 transition ${
      isActive ? 'text-white bg-gray-800' : 'text-gray-300 active:text-white'
    }`}
  >
    <span>{label}</span>
  </button>
);
