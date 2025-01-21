import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

import { saveExercise } from './helpersManage';
import { DefaultForm } from './DefaultForm';

const AddForm = ({ muscleGroups, onExerciseAdded }) => {
  const { reset } = useFormContext();
  const [message, setMessage] = useState('');

  const onSubmit = async (submittedExerciseData) => {
    const response = await saveExercise(submittedExerciseData);
    const { type, text } = response;

    if (type === 'error') {
      setMessage({ type, text });
      return;
    }

    if (type === 'success') {
      toast.success(text);
      setMessage({ type, text });
      onExerciseAdded();
    }
  };

  useEffect(() => {
    if (message.type === 'success') {
      reset();
      setMessage('');
    }
  }, [message, reset]);

  return (
    <>
      <h2 className='text-2xl font-semibold text-center mb-3'>Add Exercise</h2>
      <DefaultForm
        submittedExerciseData={onSubmit}
        muscleGroups={muscleGroups}
        message={message}
      />
    </>
  );
};
export default AddForm;
