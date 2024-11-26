import api from '../../utils/api';

export const fetchUserProfile = async () => {
  try {
    const response = await api('user/profile/', 'GET');

    if (!response.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const fetchUserProfileData = await response.json();
    return fetchUserProfileData;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};
