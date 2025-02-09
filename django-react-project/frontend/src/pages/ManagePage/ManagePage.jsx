import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { fetchMuscleGroups } from './helpersManage';
import { TabButton } from './managePageComponents';
import PageTitle from '../../components/PageTitle';
import AddForm from './AddForm';
import EditForm from './EditForm';
import MuscleAnatomyView from './MuscleAnatomyView';
import { ExerciseList } from './ExerciseList';

export const ManagePage = () => {
  const methods = useForm();
  const [mode, setMode] = useState('add');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [refreshTitleListKey, setRefreshTitleListKey] = useState(0);
  const [activeTab, setActiveTab] = useState('form');

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
    setActiveTab('form');
  };

  const handleAddButtonClick = () => {
    launchAddMode();
  };

  return (
    <div className='h-full relative'>
      {/* Page Title */}
      <PageTitle title='Manage' />

      {/* === Large Screen Layout === */}
      <div className='hidden lg:flex h-full flex-row'>
        {/* Exercise List Column */}
        <div className='w-full lg:w-1/4 p-4'>
          <ExerciseList
            refreshTitlesKey={refreshTitleListKey}
            onSelectExercise={handleSelectExercise}
            muscleGroups={muscleGroups}
          />
        </div>

        {/* Form Column */}
        <div className='bg-white flex justify-center w-full lg:w-1/2 p-5'>
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

        {/* Muscle Anatomy Column */}
        <div className='w-full lg:w-1/4 p-4'>
          <MuscleAnatomyView />
        </div>
      </div>

      {/* === Small Screen Layout === */}
      <div className='lg:hidden'>
        {/* Conditionally render the active view */}
        {activeTab === 'exercise' && (
          <div className='w-full p-4 flex flex-col items-center'>
            <ExerciseList
              refreshTitlesKey={refreshTitleListKey}
              onSelectExercise={handleSelectExercise}
              muscleGroups={muscleGroups}
            />
          </div>
        )}
        {activeTab === 'form' && (
          <div className='bg-white flex justify-center w-full p-5'>
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
        )}
        {activeTab === 'anatomy' && (
          <div className='w-full p-4'>
            <MuscleAnatomyView />
          </div>
        )}
      </div>

      {/* === Bottom Tabs for Small Screens === */}
      <div className='bottom-0 left-0 right-0 bg-gray-600 border-t border-gray-800 lg:hidden flex justify-around p-2 h-16'>
        <TabButton
          label='Exercises'
          isActive={activeTab === 'exercise'}
          onClick={() => setActiveTab('exercise')}
        />
        <TabButton
          label='Form'
          isActive={activeTab === 'form'}
          onClick={() => setActiveTab('form')}
        />
        <TabButton
          label='Anatomy'
          isActive={activeTab === 'anatomy'}
          onClick={() => setActiveTab('anatomy')}
        />
      </div>
    </div>
  );
};
