import { logout, setTokens } from '../store/slices/authSlice';
import { refreshAccessToken } from '../store/slices/helpersAuth';
import { toast } from 'react-toastify';

let storeInstance = null;
let navigate;
let isRefreshing = false;
let refreshSubscribers = []; // Array to hold pending requests

// Helper to process queue
const onRefreshed = (token) => {
  refreshSubscribers.forEach((callback) => callback(token));
  refreshSubscribers = [];
};

// Helper to add to queue
const addRefreshSubscriber = (callback) => {
  refreshSubscribers.push(callback);
};

export const initializeStore = (store) => {
  storeInstance = store;
};

export const setNavigate = (nav) => {
  navigate = nav;
};

export const makeRequest = async (path, method, data, token) => {
  const headers = {
    'Content-Type': 'application/json',
    ...(token &&
      path !== 'user/refresh-token/' && { Authorization: `Bearer ${token}` }),
  };

  return fetch(`/api/${path}`, {
    method: method,
    headers: headers,
    ...(data ? { body: JSON.stringify(data) } : {}),
  });
};

const refreshToken = async () => {
  const state = storeInstance.getState();
  const refreshToken = state.auth.refreshToken;

  const data = await refreshAccessToken(refreshToken);

  if (!data || data.error) {
    storeInstance.dispatch(logout());
    toast.info('Session expired. Please log in again.');
    if (navigate) {
      navigate('/login');
    }
    throw new Error('Session expired. Please log in again.');
  }

  storeInstance.dispatch(setTokens(data));
  onRefreshed(data.access);
  return data.access;
};

const api = async (path, method, data = null) => {
  if (!storeInstance) {
    throw new Error('Store not initialized');
  }

  let accessToken = storeInstance.getState().auth.accessToken;

  try {
    let response = await makeRequest(path, method, data, accessToken);

    if (response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          accessToken = await refreshToken();
        } finally {
          isRefreshing = false;
        }
      } else {
        const newToken = await new Promise((resolve) => {
          addRefreshSubscriber((token) => {
            resolve(token);
          });
        });
        accessToken = newToken;
      }
      response = await makeRequest(path, method, data, accessToken);
    }

    return response;
  } catch (error) {
    throw error;
  }
};

export default api;
