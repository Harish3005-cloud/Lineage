import apiClient from './client';

export const charterApi = {
  getCharter: (projectId) => apiClient.get(`/projects/${projectId}/charter`),
  createCharter: (projectId, data) => apiClient.post(`/projects/${projectId}/charter`, data),
  updateCharter: (projectId, data) => apiClient.put(`/projects/${projectId}/charter`, data),
  acceptCharter: (projectId) => apiClient.post(`/projects/${projectId}/charter/accept`),
};

export const { getCharter, createCharter, updateCharter, acceptCharter } = charterApi;
export default charterApi;
