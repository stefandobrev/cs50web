import api from '../../utils/api';

export const fetchMuscleGroups = async () => {
  const response = await api('exercises/fetch-muscle-groups/', 'GET');
  if (!response.ok) throw new Error('Failed to fetch muscle groups.');
  return response.json();
};
