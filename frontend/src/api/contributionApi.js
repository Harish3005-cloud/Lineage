import apiClient from './client';

export const contributionApi = {
  getContributions: (params) => apiClient.get('/contributions', { params }),
  getContributionById: (id) => apiClient.get(`/contributions/${id}`),
  submitContribution: (data) => apiClient.post('/contributions', data),
  getContributionIntegrity: (id) => apiClient.get(`/contributions/${id}/integrity`),
};

export const {
  getContributions,
  getContributionById,
  submitContribution,
  getContributionIntegrity,
} = contributionApi;

export default contributionApi;
