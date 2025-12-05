import axiosInstance from '../config/axios';

const contactService = {
  getAll: async () => {
    try {
      console.log('📞 Intentando obtener contactos...');
      console.log('🔑 Token actual:', localStorage.getItem('reverso_token'));
      
      const response = await axiosInstance.get('/contacts');
      
      console.log('✅ Contactos recibidos:', response.data);
      return response.data;
    } catch (error) {
      console.error('❌ Error al obtener contactos:', error.response || error);
      throw error;
    }
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