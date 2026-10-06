import apiClient from './client';

export const matchingApi = {
  getMatches: (projectId, params) => apiClient.get(`/projects/${projectId}/matches`, { params }),
  inviteCandidate: (projectId, userId) => {
    const payload = typeof userId === 'object' && userId !== null ? userId : { userId };
    return apiClient.post(`/projects/${projectId}/invite`, payload);
  },
};

export const { getMatches, inviteCandidate } = matchingApi;
export default matchingApi;
