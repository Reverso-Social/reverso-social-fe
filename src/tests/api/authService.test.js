import { describe, it, expect, vi, beforeEach } from 'vitest';
import authService from '../../api/authService';
import axiosInstance from '../../config/axios';

vi.mock('../../config/axios', () => ({
  default: {
    post: vi.fn(),
  },
}));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('login: llama al endpoint y guarda token y usuario', async () => {
    const mockResponse = {
      token: 'fake-token',
      email: 'test@test.com',
      role: 'ADMIN',
      fullName: 'Test User',
    };

    axiosInstance.post.mockResolvedValue({ data: mockResponse });

    const result = await authService.login('test@test.com', '123456');

    expect(axiosInstance.post).toHaveBeenCalledWith('/auth/login', {
      email: 'test@test.com',
      password: '123456',
    });

    expect(localStorage.getItem('reverso_token')).toBe('fake-token');

    expect(JSON.parse(localStorage.getItem('reverso_user'))).toEqual({
      email: 'test@test.com',
      role: 'ADMIN',
      fullName: 'Test User',
    });

    expect(result).toEqual(mockResponse);
  });

  it('login: no guarda nada si no hay token', async () => {
    const mockResponse = {
      email: 'test@test.com',
    };

    axiosInstance.post.mockResolvedValue({ data: mockResponse });

    await authService.login('test@test.com', '123456');

    expect(localStorage.getItem('reverso_token')).toBeNull();
    expect(localStorage.getItem('reverso_user')).toBeNull();
  });

  it('login: propaga errores', async () => {
    axiosInstance.post.mockRejectedValue(new Error('Unauthorized'));

    await expect(
      authService.login('test@test.com', 'wrong')
    ).rejects.toThrow('Unauthorized');
  });

  it('logout: elimina token y usuario', () => {
    localStorage.setItem('reverso_token', 'token');
    localStorage.setItem('reverso_user', '{}');

    authService.logout();

    expect(localStorage.getItem('reverso_token')).toBeNull();
    expect(localStorage.getItem('reverso_user')).toBeNull();
  });

  it('getCurrentUser: devuelve el usuario si existe', () => {
    const user = { email: 'test@test.com', role: 'ADMIN' };
    localStorage.setItem('reverso_user', JSON.stringify(user));

    const result = authService.getCurrentUser();

    expect(result).toEqual(user);
  });

  it('getCurrentUser: devuelve null si no hay usuario', () => {
    const result = authService.getCurrentUser();

    expect(result).toBeNull();
  });

  it('isAuthenticated: devuelve true si hay token', () => {
    localStorage.setItem('reverso_token', 'token');

    expect(authService.isAuthenticated()).toBe(true);
  });

  it('isAuthenticated: devuelve false si no hay token', () => {
    expect(authService.isAuthenticated()).toBe(false);
  });

  it('hasRole: valida el rol correctamente', () => {
    localStorage.setItem(
      'reverso_user',
      JSON.stringify({ role: 'ADMIN' })
    );

    expect(authService.hasRole('ADMIN')).toBe(true);
    expect(authService.hasRole('EDITOR')).toBe(false);
  });

  it('isAdmin: devuelve true solo para ADMIN', () => {
    localStorage.setItem(
      'reverso_user',
      JSON.stringify({ role: 'ADMIN' })
    );

    expect(authService.isAdmin()).toBe(true);
  });

  it('isEditor: devuelve true para ADMIN y EDITOR', () => {
    localStorage.setItem(
      'reverso_user',
      JSON.stringify({ role: 'EDITOR' })
    );

    expect(authService.isEditor()).toBe(true);

    localStorage.setItem(
      'reverso_user',
      JSON.stringify({ role: 'ADMIN' })
    );

    expect(authService.isEditor()).toBe(true);
  });
});