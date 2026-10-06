import apiClient from './client';

export const rewardApi = {
  getRewards: (params) => apiClient.get('/rewards', { params }),
  getEscrow: (projectId) => apiClient.get(`/projects/${projectId}/escrow`),
  getPayouts: (params) => apiClient.get('/payouts', { params }),
};

export const { getRewards, getEscrow, getPayouts } = rewardApi;
export default rewardApi;
