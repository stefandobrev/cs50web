import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { fetchMuscleGroups } from './helpersManage';
import PageTitle from '../../components/PageTitle';
import AddForm from './AddForm';
import EditForm from './EditForm';
import { EditButton, ToggleButton } from '../../components/Buttons/EditButtons';
import MuscleAnatomyView from './MuscleAnatomyView';
import { ExerciseList } from './ExerciseList';

export const ManagePage = () => {
  const methods = useForm();
  const [mode, setMode] = useState('add');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [isExerciseListVisible, setIsExerciseListVisible] = useState(false);
  const [refreshTitleListKey, setRefreshTitleListKey] = useState(0);

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

  const triggerRefresh = () => setRefreshTitleListKey((prev) => prev + 1);

  const launchAddMode = () => {
    setMode('add');
    setSelectedExercise(null);
    methods.reset();
  };

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
    setMode('edit');
  };

  const handleAddButtonClick = () => {
    launchAddMode();
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
        <ToggleButton
          onClick={toggleExerciseListVisibility}
          className='lg:hidden'
        >
          {isExerciseListVisible ? 'Hide Exercises' : 'Show Exercises'}
        </ToggleButton>

        {isExerciseListVisible && (
          <ExerciseList
            refreshTitlesKey={refreshTitleListKey}
            onSelectExercise={handleSelectExercise}
            muscleGroups={muscleGroups}
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
              launchAddMode={launchAddMode}
              handleAddButtonClick={handleAddButtonClick}
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
