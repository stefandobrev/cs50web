import { useState, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { toast } from 'react-toastify';

import { EditButton } from '../../components/Buttons/EditButtons';

import {
  saveExercise,
  fetchExerciseData,
  deleteExercise,
} from './helpersManage';
import { DefaultForm } from './DefaultForm';
import DeleteConfirmation from './DeleteConfirmation';

const EditForm = ({
  muscleGroups,
  exercise,
  onExerciseUpdated,
  mode,
  launchAddMode,
  handleAddButtonClick,
}) => {
  const [message, setMessage] = useState('');
  const [exerciseData, setExerciseData] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
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
  }, [watch(), exerciseData]);

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

      const updatedData = await fetchExerciseData(exercise.id);
      setExerciseData(updatedData);
    }
  };

  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    const response = await deleteExercise(exercise.id);
    const { type, text } = response;

    if (type === 'error') {
      toast.error(text);
      setMessage({ type, text });
      return;
    }

    if (type === 'success') {
      toast.success(text);
      onExerciseUpdated();
      launchAddMode();
    }
  };

  const editFormTitle = (
    <div className='flex justify-between items-center px-2'>
      <h2 className='text-2xl font-semibold text-center mb-3 sticky top-0 bg-white z-10'>
        Edit Exercise
      </h2>
      <EditButton onClick={handleAddButtonClick}>Add New Exercise</EditButton>
    </div>
  );

  return (
    <>
      <DefaultForm
        submittedExerciseData={onSubmit}
        muscleGroups={muscleGroups}
        message={message}
        mode={mode}
        title={editFormTitle}
        exerciseData={exerciseData}
        hasChanges={hasChanges}
        handleDeleteButton={handleDelete}
      />

      {isDeleteDialogOpen && (
        <DeleteConfirmation
          onConfirm={handleDeleteConfirm}
          onClose={() => setIsDeleteDialogOpen(false)}
          title={exercise.title}
        />
      )}
    </>
  );
};
export default EditForm;
