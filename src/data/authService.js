import axiosInstance from '../config/axios';

const authService = {
  login: async (email, password) => {
    const response = await axiosInstance.post('/auth/login', {
      email,
      password,
    });
    
    if (response.data.token) {
      localStorage.setItem('reverso_token', response.data.token);
      localStorage.setItem('reverso_user', JSON.stringify({
        email: response.data.email,
        role: response.data.role,
        fullName: response.data.fullName,
      }));
    }
    
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('reverso_token');
    localStorage.removeItem('reverso_user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('reverso_user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('reverso_token');
  },

  hasRole: (role) => {
    const user = authService.getCurrentUser();
    return user?.role === role;
  },

  isAdmin: () => {
    return authService.hasRole('ADMIN');
  },

  isEditor: () => {
    const user = authService.getCurrentUser();
    return user?.role === 'ADMIN' || user?.role === 'EDITOR';
  },
};

export default authService;