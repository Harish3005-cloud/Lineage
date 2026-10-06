import apiClient from './client';

export const ledgerApi = {
  getLedgerEntries: (params) => apiClient.get('/ledger', { params }),
  getLedgerEntry: (id) => apiClient.get(`/ledger/${id}`),
  appendLedgerEntry: (data) => apiClient.post('/ledger', data),
  verifyLedger: () => apiClient.get('/ledger/verify'),
};

export const { getLedgerEntries, getLedgerEntry, appendLedgerEntry, verifyLedger } = ledgerApi;
export default ledgerApi;
