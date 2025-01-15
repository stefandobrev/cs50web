import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import {
  fetchMuscleGroups,
  fetchExerciseTitles,
  saveExercise,
} from './helpersManage';
import { ExerciseList } from '../../components/ExerciseList';
import PageTitle from '../../components/PageTitle';
import ManageForm from './ManageForm';

export const ManagePage = () => {
  const methods = useForm();
  const {
    reset,
    formState: { isSubmitSuccessful },
  } = methods;
  const [mode, setMode] = useState('add');
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [exerciseTitles, setExerciseTitles] = useState([]);
  const [message, setMessage] = useState('');

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
  }, []);

  const onSubmit = async (submittedExerciseData) => {
    let response;

    if (mode === 'add') {
      response = await saveExercise(submittedExerciseData);
    } else if (mode === 'edit' && selectedExercise) {
      response = await saveExercise(submittedExerciseData, selectedExercise.id);
    }

    const { type, text } = response;

    if (type === 'error') {
      setMessage({ type, text });
      return;
    }

    if (type === 'success') {
      toast.success(text);
      setMessage({ type, text });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful && message.type === 'success' && mode === 'add') {
      reset();
      setMessage('');
    }
  }, [isSubmitSuccessful, reset, message]);

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
    setMode('edit');
  };

  return (
    <div className='flex flex-col h-full lg:flex-row'>
      <PageTitle title='Manage' />
      <div className='w-full lg:w-1/6 p-4 flex flex-col items-center justify-center'>
        <ExerciseList
          exerciseTitles={exerciseTitles}
          onSelectExercise={handleSelectExercise}
        />
      </div>
      <div className='bg-white w-full lg:w-5/6 p-5 flex flex-col items-center justify-center'>
        <FormProvider {...methods}>
          <ManageForm
            submittedExerciseData={onSubmit}
            muscleGroups={muscleGroups}
            message={message}
            mode={mode}
            selectedExercise={selectedExercise}
          />
        </FormProvider>
      </div>
    </div>
  );
};
