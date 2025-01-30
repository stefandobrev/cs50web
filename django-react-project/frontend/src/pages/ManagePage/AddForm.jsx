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

    console.log(submittedExerciseData);
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
      title={'Add Exercise'}
    />
  );
};

export default AddForm;
