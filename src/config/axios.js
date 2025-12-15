import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Configuración base para ambas instancias
const baseConfig = {
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
};

// Instancia pública (sin interceptores de auth)
export const publicApi = axios.create(baseConfig);

// Instancia privada (con interceptores)
export const privateApi = axios.create(baseConfig);

// Interceptor para añadir el token JWT a todas las peticiones privadas
privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('reverso_token');
    console.log('🔐 Interceptor - Token encontrado:', token ? 'Sí' : 'No');
    // console.log('🌐 Interceptor - URL:', config.url);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log('✅ Token añadido al header');
    } else {
      console.warn('⚠️ No hay token para enviar en petición privada');
    }

    return config;
  },
  (error) => {
    console.error('❌ Error en request interceptor:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar respuestas y errores (401)
privateApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('reverso_token');
      localStorage.removeItem('reverso_user');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Mantenemos el default export como privateApi para no romper código existente
export default privateApi;