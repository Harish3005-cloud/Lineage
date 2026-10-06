import apiClient from './client';

export const projectApi = {
  getProjects: (params) => apiClient.get('/projects', { params }),
  getProjectById: (id) => apiClient.get(`/projects/${id}`),
  createProject: (data) => apiClient.post('/projects', data),
  updateProject: (id, data) => apiClient.put(`/projects/${id}`, data),
  getProjectTeam: (id) => apiClient.get(`/projects/${id}/team`),
  applyToProject: (id, data) => apiClient.post(`/projects/${id}/apply`, data),
  getRecommendedProjects: (params) => apiClient.get('/projects/recommended', { params }),
  getProjectTrustOverview: (id) => apiClient.get(`/projects/${id}/trust-overview`),
};

export const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  getProjectTeam,
  applyToProject,
  getRecommendedProjects,
  getProjectTrustOverview,
} = projectApi;

export default projectApi;
