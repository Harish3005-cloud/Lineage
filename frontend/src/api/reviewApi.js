import apiClient from './client';

export const reviewApi = {
  getReviews: (params) => apiClient.get('/reviews', { params }),
  createReview: (data) => apiClient.post('/reviews', data),
  updateReview: (id, data) => apiClient.put(`/reviews/${id}`, data),
};

export const { getReviews, createReview, updateReview } = reviewApi;
export default reviewApi;
