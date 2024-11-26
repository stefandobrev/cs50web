import api from '../../utils/api';

export const addUser = async (userRegisterData) => {
  try {
    const responseAddUser = await api(
      'user/create-user/',
      'POST',
      userRegisterData
    );

    if (!responseAddUser.ok) {
      const errorAddUserData = await responseAddUser.json();

      // Check if errorAddUserData contains a 'text' field with errors
      let errorMessage = 'Something went wrong';
      if (errorAddUserData.username || errorAddUserData.email) {
        errorMessage = 'Username/Email unavailable';
      }

      return {
        type: 'error',
        text: errorMessage,
      };
    }

    return {
      type: 'success',
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      type: 'error',
    };
  }
};
