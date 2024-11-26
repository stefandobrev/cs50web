import api from '../../utils/api';

export const updateUserProfile = async (userProfileData) => {
  try {
    const responseUpdateProfile = await api(
      'user/profile/',
      'PUT',
      userProfileData
    );

    if (!responseUpdateProfile.ok) {
      throw new Error('Failed to fetch user profile');
    }

    const fetchUserProfileData = await responseUpdateProfile.json();
    return fetchUserProfileData;
  } catch (error) {
    console.error('Error fetching profile:', error);
  }
};
