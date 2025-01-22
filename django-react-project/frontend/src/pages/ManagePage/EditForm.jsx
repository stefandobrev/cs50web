import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { saveExercise, fetchExerciseData } from './helpersManage';
import { DefaultForm } from './DefaultForm';

const EditForm = ({ muscleGroups, exercise, onExerciseUpdated, mode }) => {
  const [message, setMessage] = useState('');
  const [exerciseData, setExerciseData] = useState(null);

  useEffect(() => {
    const loadExerciseData = async () => {
      const data = await fetchExerciseData(exercise.id);
      setExerciseData(data);
    };
    loadExerciseData();
  }, [exercise]);

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
        mode={mode}
      />
    </>
  );
};
export default EditForm;
