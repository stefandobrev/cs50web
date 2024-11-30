import api from '../../utils/api';

export const registerUser = async (userData) => {
  try {
    const response = await api('user/create-user/', 'POST', userData);

    if (!response.ok) {
      const errorData = await response.json();

      let errorMessage = 'Something went wrong';
      if (errorData.username || errorData.email) {
        errorMessage = 'Username/Email unavailable';
      }

      return {
        type: 'error',
        text: errorMessage,
      };
    }

    return { type: 'success' };
  } catch (error) {
    console.error('Error:', error);
    return { type: 'error' };
  }
};
