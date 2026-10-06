import apiClient from './client';

export const milestoneApi = {
  getMilestones: (projectId) => apiClient.get(`/projects/${projectId}/milestones`),
  createMilestone: (projectId, data) => apiClient.post(`/projects/${projectId}/milestones`, data),
  updateMilestone: (projectId, milestoneId, data) => apiClient.put(`/projects/${projectId}/milestones/${milestoneId}`, data),
  generateMilestones: (projectId, data) => apiClient.post(`/projects/${projectId}/milestones/generate`, data),
};

export const { getMilestones, createMilestone, updateMilestone, generateMilestones } = milestoneApi;
export default milestoneApi;
