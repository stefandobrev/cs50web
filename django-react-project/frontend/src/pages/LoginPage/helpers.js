import api from '../../utils/api';

export const loginUser = async (userLoginData) => {
  try {
    const responseLoginUser = await api('user/login/', 'POST', userLoginData);
    if (!responseLoginUser.ok) {
      return {
        type: 'error',
      };
    }

    const responseData = await responseLoginUser.json();
    const tokens = {
      access: responseData.access,
      refresh: responseData.refresh,
    };

    return {
      type: 'success',
      user: responseData.user,
      tokens,
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      type: 'error',
      text: 'An unexpected error occurred. Please try again later.',
    };
  }
};
