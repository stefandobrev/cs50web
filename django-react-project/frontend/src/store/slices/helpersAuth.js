import api from '../../utils/api';

export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await api('user/refresh-token/', 'POST', {
      refresh: refreshToken,
    });

    if (!response.ok) {
      throw new Error('Failed to refresh token');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message || 'Failed to refresh token');
  }
};
