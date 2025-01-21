import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { fetchMuscleGroups, fetchExerciseTitles } from './helpersManage';
import { ExerciseList } from '../../components/ExerciseList';
import PageTitle from '../../components/PageTitle';
import AddForm from './AddForm';
import EditForm from './EditForm';
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
  };

  const setHoveredMuscle = () => {};

  const [muscleView, setMuscleView] = useState('front'); // front, back
  const toggleMuscleView = () => {
    setMuscleView(muscleView === 'front' ? 'back' : 'front');
  };

  return (
    <div className='flex flex-col h-full lg:flex-row'>
      <PageTitle title='Manage' />
      <div className='w-full lg:w-2/6 p-4 flex flex-col items-center justify-start'>
        {mode !== 'add' && (
          <button
            onClick={handleAddButtonClick}
            className='px-4 py-2 bg-red-500 hover:bg-red-600 font-semibold text-white rounded-lg'
          >
            Add New Exercise
          </button>
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
            />
          )}
        </FormProvider>
      </div>
      <div className='w-full lg:w-2/6 p-4 flex flex-col items-center justify-center'>
        <button
          onClick={toggleMuscleView}
          className={`px-4 py-2 rounded-lg text-white font-semibold shadow-md transition duration-300 
    ${
      muscleView === 'front'
        ? 'bg-blue-500 hover:bg-blue-600'
        : 'bg-green-500 hover:bg-green-600'
    }`}
        >
          {muscleView === 'front' ? 'Show back' : 'Show front'}
        </button>

        {muscleView === 'front' ? <FrontAnatomy /> : <BackAnatomy />}
      </div>
    </div>
  );
};
