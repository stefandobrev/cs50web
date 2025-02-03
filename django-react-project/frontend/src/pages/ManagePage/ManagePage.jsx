import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { fetchMuscleGroups, fetchExerciseTitles } from './helpersManage';
import { ExerciseList } from '../../components/ExerciseList';
import PageTitle from '../../components/PageTitle';
import AddForm from './AddForm';
import EditForm from './EditForm';
import { EditButton, ToggleButton } from '../../components/Buttons/EditButtons';
import MuscleAnatomyView from './MuscleAnatomyView';

export const ManagePage = () => {
  const methods = useForm();
  const [mode, setMode] = useState('add');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [exerciseTitles, setExerciseTitles] = useState([]);
  const [isExerciseListVisible, setIsExerciseListVisible] = useState(false);

  useEffect(() => {
    const loadMuscleGroups = async () => {
      const muscleGroupsData = await fetchMuscleGroups();
      const transformedMuscleGroups = muscleGroupsData.map((group) => ({
        label: group.name,
        value: group.slug,
      }));
      setMuscleGroups(transformedMuscleGroups);
    };

    loadMuscleGroups();
  }, []);

  useEffect(() => {
    const loadExerciseTitles = async () => {
      const exerciseTitlesData = await fetchExerciseTitles();
      setExerciseTitles(exerciseTitlesData);
    };

    loadExerciseTitles();
  }, [refreshKey]);

  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
    setMode('edit');
  };

  const handleAddButtonClick = () => {
    setMode('add');
    setSelectedExercise(null);
    methods.reset();
  };

  const toggleExerciseListVisibility = () => {
    setIsExerciseListVisible((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsExerciseListVisible(true);
      } else {
        setIsExerciseListVisible(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [selectedExercise]);

  return (
    <div className='flex flex-col h-full lg:flex-row'>
      <PageTitle title='Manage' />
      <div className='w-full lg:w-2/6 p-4 flex flex-col items-center justify-start gap-5'>
        {mode !== 'add' && (
          <EditButton onClick={handleAddButtonClick} variant='red'>
            Add New Exercise
          </EditButton>
        )}

        <ToggleButton
          onClick={toggleExerciseListVisibility}
          className='lg:hidden'
        >
          {isExerciseListVisible ? 'Hide Exercises' : 'Show Exercises'}
        </ToggleButton>

        {isExerciseListVisible && (
          <ExerciseList
            exerciseTitles={exerciseTitles}
            onSelectExercise={handleSelectExercise}
          />
        )}
      </div>
      <div className='bg-white w-full lg:w-5/6 p-5 flex flex-col items-center justify-start'>
        <FormProvider {...methods}>
          {mode === 'add' ? (
            <AddForm
              muscleGroups={muscleGroups}
              onExerciseAdded={triggerRefresh}
            />
          ) : (
            <EditForm
              muscleGroups={muscleGroups}
              exercise={selectedExercise}
              onExerciseUpdated={triggerRefresh}
              mode={mode}
            />
          )}
        </FormProvider>
      </div>
      <div className='w-full lg:w-2/6 p-4'>
        <MuscleAnatomyView />
      </div>
    </div>
  );
};
