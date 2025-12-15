import axiosInstance from '../config/axios';

const resourceService = {
  getAll: async () => {
    const response = await axiosInstance.get('/resources');
    return response.data;
  },

  getPublic: async () => {
    const response = await axiosInstance.get('/resources/public');
    return response.data;
  },

  getById: async (id) => {
    const response = await axiosInstance.get(`/resources/${id}`);
    return response.data;
  },

  getByType: async (type) => {
    const response = await axiosInstance.get(`/resources/type/${type}`);
    return response.data;
  },

  uploadFile: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axiosInstance.post('/resources/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data.fileUrl;
  },

  create: async (resourceData) => {
    const response = await axiosInstance.post('/resources', resourceData);
    return response.data;
  },

  update: async (id, resourceData) => {
    const response = await axiosInstance.patch(`/resources/${id}`, resourceData);
    return response.data;
  },

  delete: async (id) => {
    await axiosInstance.delete(`/resources/${id}`);
  },
};

export default resourceService;