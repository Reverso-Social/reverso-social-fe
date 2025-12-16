import axiosInstance from '../config/axios';

const contactService = {
  getAll: async () => {
    const response = await axiosInstance.get('/contacts');
    return response.data;
  },

  create: async (contactData) => {
    const response = await axiosInstance.post('/contacts', {
      fullName: contactData.nombre,
      email: contactData.email,
      message: contactData.intereses,
      acceptsPrivacy: true,
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/contacts/${id}`);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await axiosInstance.patch(`/contacts/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  },

  delete: async (id) => {
    await axiosInstance.delete(`/contacts/${id}`);
  },
};

export default contactService;