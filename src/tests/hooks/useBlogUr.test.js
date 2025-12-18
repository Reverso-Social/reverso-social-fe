import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import useBlogUrl from '../../hooks/useBlogUrl';

describe('useBlogUrl hook', () => {
  it('returns null if no cover image is provided', () => {
    const { result } = renderHook(() => useBlogUrl());
    expect(result.current.getImageUrl(null)).toBeNull();
    expect(result.current.getImageUrl(undefined)).toBeNull();
  });

  it('returns full URL if the cover image already has http/https', () => {
    const { result } = renderHook(() => useBlogUrl());
    expect(result.current.getImageUrl('https://example.com/image.jpg')).toBe('https://example.com/image.jpg');
    expect(result.current.getImageUrl('http://example.com/image.jpg')).toBe('http://example.com/image.jpg');
  });

  it('prepends API_ORIGIN to relative URLs', () => {
    const { result } = renderHook(() => useBlogUrl());

    expect(result.current.getImageUrl('images/pic.jpg')).toBe(
      `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/images/pic.jpg`
    );

    expect(result.current.getImageUrl('/images/pic.jpg')).toBe(
      `${import.meta.env.VITE_API_URL || 'http://localhost:8080'}/images/pic.jpg`
    );
  });
});