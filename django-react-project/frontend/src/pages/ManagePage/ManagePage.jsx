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
  const [selectedMuscleSVG, setSelectedMuscleSVG] = useState(null);

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

  const handleMuscleClick = (muscle) => {
    methods.setValue('primary_group', muscle);
    setSelectedMuscleSVG(muscle);
  };

  useEffect(() => {
    const subscription = methods.watch((values) => {
      if (values.primary_group) {
        setSelectedMuscleSVG(values.primary_group);
      } else {
        setSelectedMuscleSVG(null);
      }
    });
    return () => subscription.unsubscribe();
  }, [methods]);

  return (
    <>
      <div className='sticky top-20 z-50 bg-gray-600 border-t border-gray-800 lg:hidden flex justify-around p-2 h-16'>
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
      <div className='h-full relative'>
        <PageTitle title='Manage' />

        <div className='h-full flex flex-col lg:flex-row'>
          <div
            className={`w-full flex flex-col items-center lg:w-1/4 p-4 ${
              activeTab !== 'exercise' ? 'hidden lg:block' : ''
            }`}
          >
            <ExerciseList
              refreshTitlesKey={refreshTitleListKey}
              onSelectExercise={handleSelectExercise}
              muscleGroups={muscleGroups}
            />
          </div>

          <div
            className={`bg-white flex justify-center w-full lg:w-1/2 p-5 ${
              activeTab !== 'form' ? 'hidden lg:flex' : ''
            }`}
          >
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

          <div
            className={`w-full lg:w-1/4 p-4 ${
              activeTab !== 'anatomy' ? 'hidden lg:block' : ''
            }`}
          >
            <MuscleAnatomyView
              handleMuscleClick={handleMuscleClick}
              selectedMuscle={selectedMuscleSVG}
            />
          </div>
        </div>
      </div>
    </>
  );
};
