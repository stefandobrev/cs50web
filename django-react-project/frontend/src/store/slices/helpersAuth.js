import api from '../../utils/api';

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const data = await api('user/refresh-token/', 'POST', {
      refresh: refreshToken,
    });
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to refresh token');
  }
};
