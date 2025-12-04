import axiosInstance from '../config/axios';

const serviceService = {
  // Categorías
  getCategories: async (page = 0, size = 12) => {
    const response = await axiosInstance.get('/service-categories', {
      params: { page, size, sortBy: 'sortOrder', sortDir: 'ASC' }
    });
    return response.data;
  },

  getActiveCategories: async () => {
    const response = await axiosInstance.get('/service-categories/active');
    return response.data;
  },

  getCategoryById: async (id) => {
    const response = await axiosInstance.get(`/service-categories/${id}`);
    return response.data;
  },

  // Servicios
  getServices: async (page = 0, size = 12) => {
    const response = await axiosInstance.get('/services', {
      params: { page, size, sortBy: 'sortOrder', sortDir: 'ASC' }
    });
    return response.data;
  },

  getServiceById: async (id) => {
    const response = await axiosInstance.get(`/services/${id}`);
    return response.data;
  },

  getServicesByCategory: async (categoryId) => {
    const response = await axiosInstance.get(`/services/category/${categoryId}/active`);
    return response.data;
  },

  // Features de servicios
  getServiceFeatures: async (serviceId) => {
    const response = await axiosInstance.get(`/service-features/service/${serviceId}/ordered`);
    return response.data;
  },

  createService: async (serviceData) => {
    const response = await axiosInstance.post('/services', serviceData);
    return response.data;
  },

  updateService: async (id, serviceData) => {
    const response = await axiosInstance.put(`/services/${id}`, serviceData);
    return response.data;
  },

  deleteService: async (id) => {
    await axiosInstance.delete(`/services/${id}`);
  },
};

export default serviceService;