import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import useBlogAdmin from "../../hooks/useBlogAdmin";
import blogApi from "../../api/blogApi";

vi.mock("../../api/blogApi", () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}));

describe("useBlogAdmin hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should load blogs on mount", async () => {
    const mockBlogs = [
      { id: 1, title: "Post 1" },
      { id: 2, title: "Post 2" },
    ];
    blogApi.getAll.mockResolvedValue(mockBlogs);

    const { result } = renderHook(() => useBlogAdmin());

    await waitFor(() => expect(result.current.blogs.length).toBe(2));

    expect(blogApi.getAll).toHaveBeenCalled();
    expect(result.current.blogs).toEqual(mockBlogs);
  });

  it("should open and reset blog form for creation", () => {
    const { result } = renderHook(() => useBlogAdmin());

    act(() => {
      result.current.handleOpenBlogFormCreate();
    });

    expect(result.current.showBlogForm).toBe(true);
    expect(result.current.blogFormMode).toBe("create");
    expect(result.current.blogForm.title).toBe("");
  });

  it("should open blog form for editing", async () => {
    const { result } = renderHook(() => useBlogAdmin());

    const blog = { id: 1, title: "Edit Me", status: "DRAFT" };

    act(() => {
      result.current.handleOpenBlogFormEdit(blog);
    });

    expect(result.current.showBlogForm).toBe(true);
    expect(result.current.blogFormMode).toBe("edit");
    expect(result.current.editingBlogId).toBe(1);
    expect(result.current.blogForm.title).toBe("Edit Me");
  });

  it("should handle blog field change", () => {
    const { result } = renderHook(() => useBlogAdmin());

    act(() => {
      result.current.handleBlogFieldChange({ target: { name: "title", value: "New Title" } });
    });

    expect(result.current.blogForm.title).toBe("New Title");
  });

  it("should submit blog in create mode successfully", async () => {
    const createdBlog = { id: 1, title: "Created Blog" };
    blogApi.create.mockResolvedValue(createdBlog);

    const { result } = renderHook(() => useBlogAdmin());

    act(() => {
      result.current.handleOpenBlogFormCreate();
      result.current.handleBlogFieldChange({ target: { name: "title", value: "Created Blog" } });
      result.current.handleBlogFieldChange({
        target: { name: "content", value: "Some blog content" }, // >=10 chars
      });
      result.current.handleBlogFieldChange({ target: { name: "category", value: "Tech" } });
    });

    let submitResult;
    await act(async () => {
      submitResult = await result.current.handleBlogSubmit({ preventDefault: () => {} });
    });

    expect(blogApi.create).toHaveBeenCalled();
    expect(submitResult.success).toBe(true);
    expect(result.current.blogs[0]).toEqual(createdBlog);
    expect(result.current.showBlogForm).toBe(false);
  });

  it("should delete blog successfully", async () => {
    blogApi.remove.mockResolvedValue(true);

    const initialBlogs = [{ id: 1, title: "Delete Me" }];
    blogApi.getAll.mockResolvedValue(initialBlogs);

    const { result } = renderHook(() => useBlogAdmin());

    await waitFor(() => expect(result.current.blogs.length).toBe(1));

    let deleteResult;
    await act(async () => {
      deleteResult = await result.current.deleteBlog(1);
    });

    expect(blogApi.remove).toHaveBeenCalledWith(1);
    expect(deleteResult).toBe(true);
    expect(result.current.blogs.length).toBe(0);
  });

  it("should handle blog submission validation errors", async () => {
    const { result } = renderHook(() => useBlogAdmin());

    act(() => {
      result.current.handleOpenBlogFormCreate();
    });

    let submitResult;
    await act(async () => {
      submitResult = await result.current.handleBlogSubmit({ preventDefault: () => {} });
    });

    expect(submitResult.success).toBe(false);
    expect(Object.keys(result.current.blogFormErrors)).toContain("title");
    expect(result.current.blogFormLoading).toBe(false);
  });
});