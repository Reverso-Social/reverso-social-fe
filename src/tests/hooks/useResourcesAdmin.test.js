import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import useResourcesAdmin from "../../hooks/useResourcesAdmin";
import resourceService from "../../api/resourceService";

vi.mock("../../api/resourceService", () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
    uploadFile: vi.fn(),
  },
}));

describe("useResourcesAdmin hook", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should load resources on mount", async () => {
    const mockResources = [
      { id: 1, title: "Resource 1" },
      { id: 2, title: "Resource 2" },
    ];
    resourceService.getAll.mockResolvedValue(mockResources);

    const { result } = renderHook(() => useResourcesAdmin());

    await waitFor(() => expect(result.current.resources.length).toBe(2));

    expect(resourceService.getAll).toHaveBeenCalled();
    expect(result.current.resources).toEqual(mockResources);
    expect(result.current.resourcesLoading).toBe(false);
  });

  it("should handle resource load error", async () => {
    resourceService.getAll.mockRejectedValue(new Error("Network Error"));

    const { result } = renderHook(() => useResourcesAdmin());

    await waitFor(() => expect(result.current.resourcesLoading).toBe(false));

    expect(result.current.resourcesError).toBe("No se pudieron cargar los recursos");
  });

  it("should open and close resource form", () => {
    const { result } = renderHook(() => useResourcesAdmin());

    act(() => result.current.handleOpenResourceFormCreate());
    expect(result.current.showResourceForm).toBe(true);
    expect(result.current.resourceFormMode).toBe("create");

    const resource = { id: 1, title: "Resource 1", type: "GUIDE" };
    act(() => result.current.handleOpenResourceFormEdit(resource));
    expect(result.current.showResourceForm).toBe(true);
    expect(result.current.resourceFormMode).toBe("edit");
    expect(result.current.resourceForm.title).toBe("Resource 1");

    act(() => result.current.handleCloseResourceForm());
    expect(result.current.showResourceForm).toBe(false);
  });

  it("should handle field changes", () => {
    const { result } = renderHook(() => useResourcesAdmin());

    act(() =>
      result.current.handleResourceFieldChange({
        target: { name: "title", value: "New Resource", type: "text" },
      })
    );

    expect(result.current.resourceForm.title).toBe("New Resource");
  });

  it("should handle local file change", () => {
    const { result } = renderHook(() => useResourcesAdmin());
    const file = new File(["file content"], "file.pdf", { type: "application/pdf" });

    act(() =>
      result.current.handleLocalFileChange({ target: { name: "localFile", files: [file] } })
    );

    expect(result.current.resourceFiles.localFile).toEqual(file);
  });

  it("should submit resource in create mode successfully", async () => {
    resourceService.uploadFile.mockResolvedValue("file-url");
    resourceService.create.mockResolvedValue({ id: 1, title: "Resource 1" });
    resourceService.getAll.mockResolvedValue([{ id: 1, title: "Resource 1" }]);

    const { result } = renderHook(() => useResourcesAdmin());

    act(() =>
      result.current.handleResourceFieldChange({
        target: { name: "title", value: "Resource 1", type: "text" },
      })
    );

    act(() => {
      result.current.handleLocalFileChange({
        target: { name: "localFile", files: [new File(["data"], "file.pdf")] },
      });
    });

    let submitResult;
    await act(async () => {
      submitResult = await result.current.handleResourceSubmit();
    });

    expect(resourceService.uploadFile).toHaveBeenCalled();
    expect(resourceService.create).toHaveBeenCalled();
    expect(submitResult.success).toBe(true);
  });

  it("should delete resource successfully", async () => {
    resourceService.delete.mockResolvedValue();
    resourceService.getAll.mockResolvedValue([{ id: 2, title: "Resource 2" }]);

    const { result } = renderHook(() => useResourcesAdmin());

    act(() => result.current.setResourceSearch("")); 
    act(() => result.current.setResourcePage(1));

    act(() => result.current.loadResources());

    let deleteResult;
    await act(async () => {
      deleteResult = await result.current.deleteResource(1);
    });

    expect(resourceService.delete).toHaveBeenCalledWith(1);
    expect(deleteResult.success).toBe(true);
  });
});