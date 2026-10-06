import apiClient from './client';

export const userApi = {
  getUsers: (params) => apiClient.get('/users', { params }),
  getUserById: (id) => apiClient.get(`/users/${id}`),
  updateUser: (id, data) => apiClient.put(`/users/${id}`, data),
  getUserSkills: (id) => apiClient.get(`/users/${id}/skills`),
};

export const { getUsers, getUserById, updateUser, getUserSkills } = userApi;
export default userApi;
