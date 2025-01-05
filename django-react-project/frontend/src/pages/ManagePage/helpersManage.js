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

      let errorMessage = 'Something';

      return {
        type: 'error',
        text: errorMessage,
      };
    }

    console.log('Success');
    return {
      type: 'success',
      text: 'Exercise created successfully!',
    };
  } catch (error) {
    console.log('Error', error);
    return { type: 'error' };
  }
};
