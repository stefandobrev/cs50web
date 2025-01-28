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
  }, [exercise.id]);

  const onSubmit = async (submittedExerciseData) => {
    pass;
  };
  return (
    <DefaultForm
      submittedExerciseData={onSubmit}
      muscleGroups={muscleGroups}
      message={message}
      mode={mode}
      title={'Edit Exercise'}
      exerciseData={exerciseData}
    />
  );
};
export default EditForm;
