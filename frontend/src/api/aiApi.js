import apiClient from './client';

export const aiApi = {
  sendMessage: (projectId, message) => {
    const payload = typeof message === 'object' && message !== null ? message : { message };
    return apiClient.post(`/projects/${projectId}/ai/chat`, payload);
  },
  getAIActions: (projectId) => apiClient.get(`/projects/${projectId}/ai/actions`),
  getGatewayInfo: (projectId) => apiClient.get(`/projects/${projectId}/ai/gateway`),
};

export const { sendMessage, getAIActions, getGatewayInfo } = aiApi;
export default aiApi;
