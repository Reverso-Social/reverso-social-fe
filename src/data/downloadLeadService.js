import apiClient from '../config/axios';

const downloadLeadService = {
  async createLead(data) {
    const response = await apiClient.post('/download-leads', data);
    return response.data;
  },

  async getAllLeads() {
    const response = await apiClient.get('/download-leads');
    return response.data;
  },

  async getLeadsByResource(resourceId) {
    const response = await apiClient.get(`/download-leads/resource/${resourceId}`);
    return response.data;
  },

  async deleteLead(id) {
    const response = await apiClient.delete(`/download-leads/${id}`);
    return response.data;
  }
};

export default downloadLeadService;