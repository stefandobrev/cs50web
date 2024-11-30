import api from '../../utils/api';

export const updateUserProfile = async (profileData) => {
  try {
    const response = await api('user/profile/', 'PUT', profileData);

    if (!response.ok) {
      throw new Error('Failed to update profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};
