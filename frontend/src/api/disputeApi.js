import apiClient from './client';

export const disputeApi = {
  getDisputes: (params) => apiClient.get('/disputes', { params }),
  createDispute: (data) => apiClient.post('/disputes', data),
  resolveDispute: (id, data) => apiClient.put(`/disputes/${id}/resolve`, data),
};

export const { getDisputes, createDispute, resolveDispute } = disputeApi;
export default disputeApi;
