import api from '../../utils/api';

export const fetchMuscleGroups = async () => {
  const response = await api('exercises/fetch-muscle-groups/', 'GET');
  if (!response.ok) throw new Error('Failed to fetch muscle groups.');
  return response.json();
};

export const createExercise = async (exerciseData) => {
  try {
    const response = await api(
      'exercises/create-exercise/',
      'POST',
      exerciseData
    );

    if (!response.ok) {
      const errorData = await response.json();

      const key = Object.keys(errorData)[0];
      const errorMessage = errorData[key]?.[0] || 'Something went wrong';

      return {
        type: 'error',
        text: errorMessage,
      };
    }

    return {
      type: 'success',
      text: 'Exercise created successfully!',
    };
  } catch (error) {
    console.log('Error', error);
    return {
      type: 'error',
      text: 'An unexpected error occurred. Please try again later.',
    };
  }
};
