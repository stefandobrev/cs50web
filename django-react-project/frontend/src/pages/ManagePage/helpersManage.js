import api from '../../utils/api';

export const fetchMuscleGroups = async () => {
  const response = await api('exercises/fetch-muscle-groups/', 'GET');
  if (!response.ok) throw new Error('Failed to fetch muscle groups.');
  return response.json();
};

export const fetchExerciseTitles = async () => {
  const response = await api('exercises/fetch-exercise-titles/', 'GET');
  if (!response.ok) throw new Error('Failed to fetch exercises.');
  return response.json();
};

export const fetchExerciseData = async (id) => {
  const response = await api(`exercises/fetch-exercise/${id}/`, 'GET');
  if (!response.ok) throw new Error('Failed to fetch exercise.');
  return response.json();
};

export const saveExercise = async (exerciseData, id = null) => {
  try {
    const isEditMode = Boolean(id);
    let response;

    if (isEditMode) {
      response = await api(
        `exercises/update-exercise/${id}/`,
        'PUT',
        exerciseData
      );
    } else {
      response = await api('exercises/create-exercise/', 'POST', exerciseData);
    }

    if (!response.ok) {
      const errorData = await response.json();

      const key = Object.keys(errorData)[0];
      const errorMessage = errorData[key]?.[0] || 'Something went wrong';

      return {
        type: 'error',
        text: errorMessage,
      };
    }

    const successMessage = isEditMode
      ? 'Exercise updated successfully!'
      : 'Exercise created successfully!';

    return {
      type: 'success',
      text: successMessage,
    };
  } catch (error) {
    console.log('Error', error);
    return {
      type: 'error',
      text: 'An unexpected error occurred. Please try again later.',
    };
  }
};
