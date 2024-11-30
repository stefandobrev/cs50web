import api from '../../utils/api';

export const fetchUserProfile = async () => {
  try {
    const response = await api('user/profile/', 'GET');

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};
