import axiosInstance from '../config/axios';

const downloadLeadService = {
  async createLead(data) {
    const response = await axiosInstance.post('/download-leads', data); 
    return response.data;
  },

  async getAllLeads() {
    const response = await axiosInstance.get('/download-leads'); 
    return response.data;
  },

  async getLeadsByResource(resourceId) {
    const response = await axiosInstance.get(`/download-leads/resource/${resourceId}`); 
    return response.data;
  },

  async deleteLead(id) {
    await axiosInstance.delete(`/download-leads/${id}`); 
  }
};

export default downloadLeadService;