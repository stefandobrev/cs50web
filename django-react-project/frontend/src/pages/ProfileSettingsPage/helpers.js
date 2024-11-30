import api from '../../utils/api';

export const fetchUserSettings = async () => {
  const response = await api('user/settings/', 'GET');
  if (!response.ok) throw new Error('Failed to fetch settings');
  return response.json();
};

export const updateUserSettings = async (data) => {
  const response = await api('user/settings/', 'PUT', data);
  if (!response.ok) throw new Error('Failed to update settings');
  return response.json();
};
