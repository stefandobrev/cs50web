import { useState, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { fetchMuscleGroups, createExercise } from './helpersManage';
import PageTitle from '../../components/PageTitle';
import ManageForm from './ManageForm';

export const ManagePage = () => {
  const methods = useForm();
  const [muscleGroups, setMuscleGroups] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getMuscleGroups = async () => {
      const fetchedMuscleGroups = await fetchMuscleGroups();
      const transformedMuscleGroups = fetchedMuscleGroups.map((group) => ({
        label: group.name,
        value: group.slug,
      }));
      setMuscleGroups(transformedMuscleGroups);
    };

    getMuscleGroups();
  }, []);

  const onSubmit = async (exerciseData) => {
    const { type, text } = await createExercise(exerciseData);

    if (type === error) {
      setMessage(type, text);
      return;
    }

    if (type === success) {
      toast.success(text);
      method.reset();
    }
  };
  return (
    <div className='flex items-center justify-center h-full'>
      <PageTitle title='Manage' />
      <div className='bg-white p-5 rounded shadow-md w-full max-w-sm'>
        <h2 className='text-2xl font-semibold text-center mb-3'>
          Manage Exercises
        </h2>
        <FormProvider {...methods}>
          <ManageForm
            exerciseData={onSubmit}
            muscleGroups={muscleGroups}
            message={message}
          />
        </FormProvider>
      </div>
    </div>
  );
};
