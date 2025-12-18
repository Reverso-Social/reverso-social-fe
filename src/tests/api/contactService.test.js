import { describe, it, expect, vi, beforeEach } from 'vitest';
import contactService from '../../api/contactService';
import axiosInstance from '../../config/axios';

// Mock de axiosInstance
vi.mock('../../config/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('contactService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAll: debe obtener todos los contactos', async () => {
    const mockData = [{ id: 1, fullName: 'Test User' }];

    axiosInstance.get.mockResolvedValue({ data: mockData });

    const result = await contactService.getAll();

    expect(axiosInstance.get).toHaveBeenCalledWith('/contacts');
    expect(result).toEqual(mockData);
  });

  it('create: debe crear un contacto con el payload correcto', async () => {
    const contactData = {
      nombre: 'Juan Pérez',
      email: 'juan@test.com',
      intereses: 'Marketing digital',
    };

    const responseData = { id: 1 };

    axiosInstance.post.mockResolvedValue({ data: responseData });

    const result = await contactService.create(contactData);

    expect(axiosInstance.post).toHaveBeenCalledWith('/contacts', {
      fullName: 'Juan Pérez',
      email: 'juan@test.com',
      message: 'Marketing digital',
      acceptsPrivacy: true,
    });

    expect(result).toEqual(responseData);
  });

  it('getById: debe obtener un contacto por id', async () => {
    const mockContact = { id: 1, fullName: 'Test User' };

    axiosInstance.get.mockResolvedValue({ data: mockContact });

    const result = await contactService.getById(1);

    expect(axiosInstance.get).toHaveBeenCalledWith('/contacts/1');
    expect(result).toEqual(mockContact);
  });

  it('updateStatus: debe actualizar el estado del contacto', async () => {
    const mockResponse = { success: true };

    axiosInstance.patch.mockResolvedValue({ data: mockResponse });

    const result = await contactService.updateStatus(1, 'CONTACTED');

    expect(axiosInstance.patch).toHaveBeenCalledWith(
      '/contacts/1/status',
      null,
      { params: { status: 'CONTACTED' } }
    );

    expect(result).toEqual(mockResponse);
  });

  it('delete: debe eliminar un contacto', async () => {
    axiosInstance.delete.mockResolvedValue({});

    await contactService.delete(1);

    expect(axiosInstance.delete).toHaveBeenCalledWith('/contacts/1');
  });

  it('maneja errores correctamente', async () => {
    axiosInstance.get.mockRejectedValue(new Error('Network Error'));

    await expect(contactService.getAll()).rejects.toThrow('Network Error');
  });
});