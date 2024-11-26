import { logout, setTokens } from '../store/slices/authSlice';

let storeInstance = null;

export const initializeStore = (store) => {
  storeInstance = store;
};

async function refreshToken() {
  if (!storeInstance) {
    throw new Error('Store not initialized');
  }

  const state = storeInstance.getState();
  const refreshToken = state.auth.refreshToken;

  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  try {
    const response = await fetch('/api/user/refresh-token/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ refresh: refreshToken }),
    });

    if (!response.ok) {
      throw new Error('Refresh failed');
    }

    const data = await response.json();
    storeInstance.dispatch(setTokens(data));
    return data.access;
  } catch (error) {
    storeInstance.dispatch(logout());
    throw error;
  }
}

const api = async (path, method, data = null) => {
  if (!storeInstance) {
    throw new Error('Store not initialized');
  }

  const state = storeInstance.getState();
  let accessToken = state.auth.accessToken;

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
  };

  let response = await fetch(`/api/${path}`, {
    method: method,
    headers: headers,
    ...(data ? { body: JSON.stringify(data) } : {}),
  });

  // If unauthorized, try to refresh token
  if (response.status === 401 && state.auth.refreshToken) {
    try {
      accessToken = await refreshToken();

      // Retry original request with new token
      response = await fetch(`/api/${path}`, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        ...(data ? { body: JSON.stringify(data) } : {}),
      });
    } catch (error) {
      storeInstance.dispatch(logout());
      throw new Error('Authentication failed');
    }
  }

  return response;
};

export default api;
