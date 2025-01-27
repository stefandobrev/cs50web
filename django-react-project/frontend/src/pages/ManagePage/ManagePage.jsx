import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { fetchMuscleGroups, fetchExerciseTitles } from './helpersManage';
import { ExerciseList } from '../../components/ExerciseList';
import PageTitle from '../../components/PageTitle';
import AddForm from './AddForm';
import EditForm from './EditForm';
import { EditButton, ToggleButton } from '../../components/Buttons/EditButtons';
import FrontAnatomy from '../../components/Anatomy/FrontAnatomy';
import BackAnatomy from '../../components/Anatomy/BackAnatomy';

export const ManagePage = () => {
  const methods = useForm();
  const [mode, setMode] = useState('add');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [exerciseTitles, setExerciseTitles] = useState([]);

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

  const [muscleView, setMuscleView] = useState('front');
  const toggleMuscleView = () => {
    setMuscleView(muscleView === 'front' ? 'back' : 'front');
  };

  return (
    <div className='flex flex-col h-full lg:flex-row'>
      <PageTitle title='Manage' />
      <div className='w-full lg:w-2/6 p-4 flex flex-col items-center justify-start'>
        {mode !== 'add' && (
          <EditButton onClick={handleAddButtonClick} variant='red'>
            Add New Exercise
          </EditButton>
        )}
        <ExerciseList
          exerciseTitles={exerciseTitles}
          onSelectExercise={handleSelectExercise}
        />
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
      <div className='w-full lg:w-2/6 p-4 flex flex-col items-center justify-center'>
        <ToggleButton
          onClick={toggleMuscleView}
          variant={muscleView === 'front' ? 'blue' : 'green'}
        >
          {muscleView === 'front' ? 'Show back' : 'Show front'}
        </ToggleButton>
        {muscleView === 'front' ? <FrontAnatomy /> : <BackAnatomy />}
      </div>
    </div>
  );
};
