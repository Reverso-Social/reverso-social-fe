import { describe, it, expect, vi, beforeEach } from 'vitest';
import blogApi from '../../api/blogApi';
import axiosInstance from '../../config/axios';

vi.mock('../../config/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe('blogApi', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getAll: obtiene todos los posts sin filtros', async () => {
    const mockData = [{ id: 1, title: 'Post 1' }];

    axiosInstance.get.mockResolvedValue({ data: mockData });

    const result = await blogApi.getAll();

    expect(axiosInstance.get).toHaveBeenCalledWith('/blogposts', {
      params: {},
    });
    expect(result).toEqual(mockData);
  });

  it('getAll: aplica filtros de status y category', async () => {
    axiosInstance.get.mockResolvedValue({ data: [] });

    await blogApi.getAll({ status: 'DRAFT', category: 'SEO' });

    expect(axiosInstance.get).toHaveBeenCalledWith('/blogposts', {
      params: {
        status: 'DRAFT',
        category: 'SEO',
      },
    });
  });

  it('getPublished: obtiene solo posts publicados', async () => {
    axiosInstance.get.mockResolvedValue({ data: [] });

    await blogApi.getPublished();

    expect(axiosInstance.get).toHaveBeenCalledWith('/blogposts', {
      params: { status: 'PUBLISHED' },
    });
  });

  it('getLatest: obtiene los últimos posts con límite', async () => {
    const mockData = [{ id: 1 }];

    axiosInstance.get.mockResolvedValue({ data: mockData });

    const result = await blogApi.getLatest(3);

    expect(axiosInstance.get).toHaveBeenCalledWith('/blogposts/latest', {
      params: { limit: 3 },
    });
    expect(result).toEqual(mockData);
  });

  it('getLatest: usa límite por defecto', async () => {
    axiosInstance.get.mockResolvedValue({ data: [] });

    await blogApi.getLatest();

    expect(axiosInstance.get).toHaveBeenCalledWith('/blogposts/latest', {
      params: { limit: 5 },
    });
  });

  it('getById: obtiene un post por id', async () => {
    const mockPost = { id: 1, title: 'Post' };

    axiosInstance.get.mockResolvedValue({ data: mockPost });

    const result = await blogApi.getById(1);

    expect(axiosInstance.get).toHaveBeenCalledWith('/blogposts/1');
    expect(result).toEqual(mockPost);
  });

  it('getBySlug: obtiene un post por slug', async () => {
    const mockPost = { slug: 'test-post' };

    axiosInstance.get.mockResolvedValue({ data: mockPost });

    const result = await blogApi.getBySlug('test-post');

    expect(axiosInstance.get).toHaveBeenCalledWith('/blogposts/slug/test-post');
    expect(result).toEqual(mockPost);
  });

  it('create: crea un post con FormData', async () => {
    const postData = {
      title: 'Título',
      subtitle: 'Sub',
      content: 'Contenido',
      category: 'SEO',
      status: 'DRAFT',
      image: new File(['img'], 'image.png', { type: 'image/png' }),
    };

    const responseData = { id: 1 };

    axiosInstance.post.mockResolvedValue({ data: responseData });

    const result = await blogApi.create(postData);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      '/blogposts',
      expect.any(FormData),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    expect(result).toEqual(responseData);
  });

  it('update: actualiza un post existente', async () => {
    const updateData = {
      title: 'Nuevo título',
      subtitle: 'Nuevo sub',
      content: 'Contenido',
      category: 'SEO',
      status: 'PUBLISHED',
    };

    axiosInstance.put.mockResolvedValue({ data: updateData });

    const result = await blogApi.update(1, updateData);

    expect(axiosInstance.put).toHaveBeenCalledWith(
      '/blogposts/1',
      expect.any(FormData),
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    expect(result).toEqual(updateData);
  });

  it('remove: elimina un post y devuelve true', async () => {
    axiosInstance.delete.mockResolvedValue({});

    const result = await blogApi.remove(1);

    expect(axiosInstance.delete).toHaveBeenCalledWith('/blogposts/1');
    expect(result).toBe(true);
  });

  it('propaga errores correctamente', async () => {
    axiosInstance.get.mockRejectedValue(new Error('API Error'));

    await expect(blogApi.getAll()).rejects.toThrow('API Error');
  });
});