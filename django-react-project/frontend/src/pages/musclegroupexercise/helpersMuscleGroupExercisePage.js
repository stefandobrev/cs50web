import api from '../../utils/api';

export const fetchExercises = async (id) => {
  const response = await api(`exercises/group/${id}/`, 'GET');
  if (!response.ok) {
    throw new Error('Failed to fetch exercises.');
  }
  return response.json();
};
