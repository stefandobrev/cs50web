import Select from 'react-select';
import { formatDistanceToNow } from 'date-fns';

export const SearchInput = ({ value, onChange }) => (
  <input
    type='text'
    placeholder='Search exercise'
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className='duration-170 mb-4 w-full rounded-lg border border-gray-300 p-2 transition ease-in-out focus:border-logoRed focus:outline-none focus:ring-2 focus:ring-logoRed'
  />
);

export const MuscleGroupFilter = ({
  muscleGroups,
  selectedMuscleGroups,
  onChange,
}) => (
  <div className='mb-4'>
    <label className='mb-2 block font-semibold text-gray-700'>
      Filter by Muscle Group
    </label>
    <Select
      isMulti
      options={muscleGroups}
      onChange={(selectedOptions) =>
        onChange(selectedOptions ? selectedOptions.map((opt) => opt.value) : [])
      }
      value={muscleGroups.filter((group) =>
        selectedMuscleGroups.includes(group.value),
      )}
      classNamePrefix='react-select'
      className='w-full'
    />
  </div>
);

export const SortFilter = ({ sortBy, onChange }) => (
  <div className='mb-4'>
    <label className='mb-2 block font-semibold text-gray-700'>Sort by</label>
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
          className='duration-170 hover:bg-gray-170 active:bg-gray-170 flex cursor-pointer justify-between rounded-lg p-3 transition ease-in-out'
          onClick={() => onSelectExercise(exercise)}
        >
          {timeAgo ? (
            <div className='flex w-full justify-between'>
              <span className='max-w-[70%] truncate text-gray-800'>
                {exercise.title}
              </span>
              <span className='text-end text-sm text-logoRed'>{timeAgo}</span>
            </div>
          ) : (
            <span className='max-w-[85%] truncate text-gray-800'>
              {exercise.title}
            </span>
          )}
        </li>
      );
    })}
  </ul>
);

export const TabButton = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex h-full w-24 flex-col items-center justify-center rounded-md transition hover:bg-gray-800 active:bg-gray-800 ${
      isActive ? 'bg-gray-800 text-white' : 'text-gray-300 active:text-white'
    }`}
  >
    <span>{label}</span>
  </button>
);
