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
    const setChangedFields = (initData, updatedData) => {
      const changedFields = {};
      for (const key in initData) {
        if (Array.isArray(initData[key]) && Array.isArray(updatedData[key])) {
          if (
            initData[key].length !== updatedData[key].length ||
            !initData[key].every(
              (val, index) => val === updatedData[key][index]
            )
          ) {
            changedFields[key] = updatedData[key];
          }
        } else if (initData[key] !== updatedData[key]) {
          changedFields[key] = updatedData[key];
        }
      }
      return changedFields;
    };

    const changedData = setChangedFields(exerciseData, submittedExerciseData);
    console.log('Initial data: ', exerciseData);
    console.log('Updated data: ', changedData);
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
