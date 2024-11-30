import api from '../../utils/api';

export const loginUser = async (userData) => {
  try {
    const response = await api('user/login/', 'POST', userData);
    const data = await response.json();

    return {
      type: 'success',
      user: data.user,
      tokens: {
        access: data.access,
        refresh: data.refresh,
      },
    };
  } catch (error) {
    return {
      type: 'error',
      text: 'An unexpected error occurred. Please try again later.',
    };
  }
};
