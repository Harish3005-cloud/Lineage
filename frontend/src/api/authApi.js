import apiClient from './client';

export const authApi = {
  login: (email, password) => {
    const payload = typeof email === 'object' && email !== null ? email : { email, password };
    return apiClient.post('/auth/login', payload);
  },
  register: (userData) => apiClient.post('/auth/register', userData),
  getCurrentUser: () => apiClient.get('/auth/me'),
  logout: () => apiClient.post('/auth/logout'),
};

export const { login, register, getCurrentUser, logout } = authApi;
export default authApi;
