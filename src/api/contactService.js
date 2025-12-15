import privateApi, { publicApi } from '../config/axios';

const contactService = {
  getAll: async () => {
    const response = await privateApi.get('/contacts');
    return response.data;
  },

  create: async (contactData) => {
    // Usamos publicApi para enviar el contacto sin token
    const response = await publicApi.post('/contacts', {
      fullName: contactData.nombre,
      email: contactData.email,
      message: contactData.intereses,
      acceptsPrivacy: true,
    });
    return response.data;
  },

  getById: async (id) => {
    const response = await privateApi.get(`/contacts/${id}`);
    return response.data;
  },

  updateStatus: async (id, status) => {
    const response = await privateApi.patch(`/contacts/${id}/status`, null, {
      params: { status }
    });
    return response.data;
  },

  delete: async (id) => {
    await privateApi.delete(`/contacts/${id}`);
  },
};

export default contactService;