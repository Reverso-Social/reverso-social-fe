import { describe, it, expect, vi, beforeEach } from 'vitest';
import resourceService from '../../api/resourceService';
import axiosInstance from '../../config/axios';

vi.mock('../../config/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    patch: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('resourceService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAll: debe obtener todos los recursos', async () => {
    const mockData = [{ id: 1, title: 'Recurso 1' }];

    axiosInstance.get.mockResolvedValue({ data: mockData });

    const result = await resourceService.getAll();

    expect(axiosInstance.get).toHaveBeenCalledWith('/resources');
    expect(result).toEqual(mockData);
  });

  it('getPublic: debe obtener recursos públicos', async () => {
    const mockData = [{ id: 2, title: 'Recurso público' }];

    axiosInstance.get.mockResolvedValue({ data: mockData });

    const result = await resourceService.getPublic();

    expect(axiosInstance.get).toHaveBeenCalledWith('/resources/public');
    expect(result).toEqual(mockData);
  });

  it('getById: debe obtener un recurso por id', async () => {
    const mockResource = { id: 1, title: 'Recurso' };

    axiosInstance.get.mockResolvedValue({ data: mockResource });

    const result = await resourceService.getById(1);

    expect(axiosInstance.get).toHaveBeenCalledWith('/resources/1');
    expect(result).toEqual(mockResource);
  });

  it('getByType: debe obtener recursos por tipo', async () => {
    const mockResources = [{ id: 3, type: 'ebook' }];

    axiosInstance.get.mockResolvedValue({ data: mockResources });

    const result = await resourceService.getByType('ebook');

    expect(axiosInstance.get).toHaveBeenCalledWith('/resources/type/ebook');
    expect(result).toEqual(mockResources);
  });

  it('uploadFile: debe subir un archivo y devolver la URL', async () => {
    const mockFile = new File(['file content'], 'test.pdf', {
      type: 'application/pdf',
    });

    axiosInstance.post.mockResolvedValue({
      data: { fileUrl: 'https://test.com/file.pdf' },
    });

    const result = await resourceService.uploadFile(mockFile);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      '/resources/upload',
      expect.any(FormData),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    expect(result).toBe('https://test.com/file.pdf');
  });

  it('create: debe crear un recurso', async () => {
    const resourceData = { title: 'Nuevo recurso' };
    const responseData = { id: 1, ...resourceData };

    axiosInstance.post.mockResolvedValue({ data: responseData });

    const result = await resourceService.create(resourceData);

    expect(axiosInstance.post).toHaveBeenCalledWith('/resources', resourceData);
    expect(result).toEqual(responseData);
  });

  it('update: debe actualizar un recurso', async () => {
    const resourceData = { title: 'Recurso actualizado' };

    axiosInstance.patch.mockResolvedValue({ data: resourceData });

    const result = await resourceService.update(1, resourceData);

    expect(axiosInstance.patch).toHaveBeenCalledWith(
      '/resources/1',
      resourceData
    );
    expect(result).toEqual(resourceData);
  });

  it('delete: debe eliminar un recurso', async () => {
    axiosInstance.delete.mockResolvedValue({});

    await resourceService.delete(1);

    expect(axiosInstance.delete).toHaveBeenCalledWith('/resources/1');
  });

  it('maneja errores correctamente', async () => {
    axiosInstance.get.mockRejectedValue(new Error('Server Error'));

    await expect(resourceService.getAll()).rejects.toThrow('Server Error');
  });
});