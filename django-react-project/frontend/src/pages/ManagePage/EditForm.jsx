import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

import { saveExercise, fetchExerciseData } from './helpersManage';
import { DefaultForm } from './DefaultForm';

const EditForm = ({ muscleGroups, exercise, onExerciseUpdated, mode }) => {
  const [message, setMessage] = useState('');
  const [exerciseData, setExerciseData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const { watch } = useFormContext();

  useEffect(() => {
    const loadExerciseData = async () => {
      const data = await fetchExerciseData(exercise.id);
      setExerciseData(data);
    };
    loadExerciseData();
  }, [exercise.id]);

  const getChangedFields = (initData, updatedData) => {
    const changedFields = {};
    for (const key in initData) {
      if (Array.isArray(initData[key]) && Array.isArray(updatedData[key])) {
        if (
          initData[key].length !== updatedData[key].length ||
          !initData[key].every((val, index) => val === updatedData[key][index])
        ) {
          changedFields[key] = updatedData[key];
        }
      } else if (initData[key] !== updatedData[key]) {
        changedFields[key] = updatedData[key];
      }
    }
    return changedFields;
  };

  useEffect(() => {
    if (!exerciseData) return;

    const formValues = watch();
    const changedData = getChangedFields(exerciseData, formValues);
    setHasChanges(Object.keys(changedData).length > 0);
  }, [exerciseData, watch]);

  const onSubmit = async (submittedExerciseData) => {
    const changedData = getChangedFields(exerciseData, submittedExerciseData);
    const response = await saveExercise(changedData, exercise.id);
    const { type, text } = response;

    if (type === 'error') {
      toast.error(text);
      setMessage({ type, text });
      return;
    }

    if (type === 'success') {
      toast.success(text);
      onExerciseUpdated();
      setMessage(null);
    }
  };

  return (
    <DefaultForm
      submittedExerciseData={onSubmit}
      muscleGroups={muscleGroups}
      message={message}
      mode={mode}
      title={'Edit Exercise'}
      exerciseData={exerciseData}
      hasChanges={hasChanges}
    />
  );
};
export default EditForm;
