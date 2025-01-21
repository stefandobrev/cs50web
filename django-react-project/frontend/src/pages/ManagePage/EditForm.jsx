import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { saveExercise } from './helpersManage';
import { DefaultForm } from './DefaultForm';

const EditForm = ({ muscleGroups, exercise, onExerciseUpdated }) => {
  const [message, setMessage] = useState('');

  const onSubmit = async (submittedExerciseData) => {
    pass;
  };
  return (
    <>
      <h2 className='text-2xl font-semibold text-center mb-3'>Edit Exercise</h2>
      <DefaultForm
        submittedExerciseData={onSubmit}
        muscleGroups={muscleGroups}
        message={message}
      />
    </>
  );
};
export default EditForm;
