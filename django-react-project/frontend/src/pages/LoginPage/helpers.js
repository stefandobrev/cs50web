import api from '../../utils/api';

export const loginUser = async (userData) => {
  return api('user/login/', 'POST', userData);
};
