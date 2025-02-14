import { useState, useEffect, useRef } from 'react';

import { fetchExerciseTitles } from './helpersManage';
import { EditButton } from '../../components/buttons/EditButtons';
import {
  SearchInput,
  MuscleGroupFilter,
  SortFilter,
  ExerciseListItems,
} from './ManagePageComponents';

import Spinner from '../../components/Spinner';

const INITIAL_OFFSET = 0;
const ITEMS_PER_PAGE = 10;
const defaultFilters = {
  searchQuery: '',
  sortBy: null,
  offset: INITIAL_OFFSET,
  selectedMuscleGroups: [],
  hasMore: true,
  loadMore: false,
};

export const ExerciseList = ({
  refreshTitlesKey,
  onSelectExercise,
  muscleGroups,
}) => {
  const [exerciseTitles, setExerciseTitles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [
    { searchQuery, sortBy, offset, selectedMuscleGroups, hasMore, loadMore },
    setExerciseProps,
  ] = useState(defaultFilters);

  const listContainerRef = useRef(null);

  useEffect(() => {
    handleExercisePropsUpdate({
      hasMore: true,
      loadMore: false,
    });
    setIsLoading(true);
    loadExerciseTitles();
  }, [searchQuery, sortBy, selectedMuscleGroups, refreshTitlesKey]);

  useEffect(() => {
    if (hasMore && loadMore) {
      loadExerciseTitles(offset);
    }
  }, [loadMore]);

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        listContainerRef.current.scrollHeight ===
        listContainerRef.current.scrollTop +
          listContainerRef.current.clientHeight;
      if (bottom && hasMore) {
        setExerciseProps((prevState) => ({ ...prevState, loadMore: true }));
      }
    };

    const listContainer = listContainerRef.current;
    listContainer.addEventListener('scroll', handleScroll);

    return () => {
      listContainer.removeEventListener('scroll', handleScroll);
    };
  }, [hasMore]);

  const handleExercisePropsUpdate = (newValues) => {
    setExerciseProps((prevValues) => {
      return {
        ...prevValues,
        ...newValues,
      };
    });
  };

  const loadExerciseTitles = async (offset) => {
    const currentOffset = offset ?? INITIAL_OFFSET;
    setIsLoading(true);

    const exerciseTitlesData = await fetchExerciseTitles({
      offset: currentOffset,
      search: searchQuery,
      sort: sortBy,
      muscleGroups: selectedMuscleGroups,
    });

    handleExercisePropsUpdate({
      offset: currentOffset + ITEMS_PER_PAGE,
      loadMore: false,
    });

    if (exerciseTitlesData.length < ITEMS_PER_PAGE) {
      handleExercisePropsUpdate({ hasMore: false });
    }

    if (currentOffset === INITIAL_OFFSET) {
      setExerciseTitles(exerciseTitlesData);
    } else if (exerciseTitlesData.length > 0) {
      setExerciseTitles((prevTitles) => [...prevTitles, ...exerciseTitlesData]);
    }

    setIsLoading(false);
  };

  const resetFilters = () => {
    handleExercisePropsUpdate(defaultFilters);
  };

  return (
    <>
      <div className='flex flex-col w-full sm:max-w-sm bg-white px-6 rounded-lg'>
        <div className='flex justify-between items-center px-2 mb-4'>
          <h2 className='text-xl font-semibold text-gray-800'>Exercise List</h2>
          <EditButton onClick={resetFilters} variant='grayDark'>
            Reset
          </EditButton>
        </div>
        <SearchInput
          value={searchQuery}
          onChange={(value) =>
            handleExercisePropsUpdate({ searchQuery: value })
          }
        />
        <MuscleGroupFilter
          muscleGroups={muscleGroups}
          selectedMuscleGroups={selectedMuscleGroups}
          onChange={(value) =>
            handleExercisePropsUpdate({ selectedMuscleGroups: value })
          }
        />
        <SortFilter
          sortBy={sortBy}
          onChange={(value) => handleExercisePropsUpdate({ sortBy: value })}
        />
      </div>
      <div
        ref={listContainerRef}
        className='flex flex-col w-full sm:max-w-sm bg-white px-6 rounded-lg overflow-y-auto max-h-[40vh] lg:max-h-[47vh]'
      >
        {isLoading ? (
          <Spinner loading={true} className='min-h-[40vh] lg:min-h-[47vh]' />
        ) : (
          <ExerciseListItems
            exercises={exerciseTitles}
            onSelectExercise={onSelectExercise}
            sortBy={sortBy}
          />
        )}
      </div>
    </>
  );
};
