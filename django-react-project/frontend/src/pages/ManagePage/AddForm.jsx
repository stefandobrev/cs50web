import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

import { saveExercise } from './helpersManage';
import { DefaultForm } from './DefaultForm';

const AddForm = ({ muscleGroups, onExerciseAdded }) => {
  const { reset } = useFormContext();
  const [message, setMessage] = useState(null);

  const onSubmit = async (submittedExerciseData) => {
    const response = await saveExercise(submittedExerciseData);
    const { type, text } = response;

    if (type === 'error') {
      setMessage({ type, text });
      return;
    }

    if (type === 'success') {
      toast.success(text);
      onExerciseAdded();
      reset();
      reset({
        steps: [],
        mistakes: [],
      });
      setMessage(null);
    }
  };

  return (
    <DefaultForm
      submittedExerciseData={onSubmit}
      muscleGroups={muscleGroups}
      message={message}
      title={
        <h2 className='text-start text-2xl font-semibold px-2 mb-3 sticky top-0 bg-white z-10'>
          Add Exercise
        </h2>
      }
    />
  );
};

export default AddForm;
