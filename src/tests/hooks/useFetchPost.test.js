import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import useFetchPost from "../../hooks/useFetchPost";
import blogApi from "../../api/blogApi";

// Mock blogApi
vi.mock("../../api/blogApi", () => ({
  default: {
    getBySlug: vi.fn(),
  },
}));

describe("useFetchPost hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch post data successfully", async () => {
    const mockPost = { id: 1, title: "Test Post" };
    blogApi.getBySlug.mockResolvedValue(mockPost);

    const { result } = renderHook(() => useFetchPost("test-slug"));

    // Loading starts as true
    expect(result.current.loading).toBe(true);

    // Wait for async update
    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(blogApi.getBySlug).toHaveBeenCalledWith("test-slug");
    expect(result.current.post).toEqual(mockPost);
    expect(result.current.error).toBe("");
  });

  it("should set error if post is not found", async () => {
    blogApi.getBySlug.mockRejectedValue(new Error("Not found"));

    const { result } = renderHook(() => useFetchPost("invalid-slug"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(blogApi.getBySlug).toHaveBeenCalledWith("invalid-slug");
    expect(result.current.post).toBeNull();
    expect(result.current.error).toBe("Artículo no encontrado.");
  });

  it("should not call API if slug is falsy", async () => {
    const { result } = renderHook(() => useFetchPost(""));

    expect(blogApi.getBySlug).not.toHaveBeenCalled();
    expect(result.current.post).toBeNull();
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe("");
  });
});