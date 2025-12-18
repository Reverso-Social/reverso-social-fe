import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, beforeEach, vi } from "vitest";
import ResourcesPanel from "../../components/ResourcesPanel/ResourcesPanel";

describe("ResourcesPanel component", () => {
  const mockResources = [
    {
      id: 1,
      title: "Guía de Igualdad",
      type: "GUIDE",
      isPublic: true,
      downloadCount: 10,
      createdAt: "2025-01-01T10:00:00Z",
    },
    {
      id: 2,
      title: "Informe de Diversidad",
      type: "REPORT",
      isPublic: false,
      downloadCount: 5,
      createdAt: "2025-01-02T11:30:00Z",
    },
  ];

  const defaultProps = {
    loading: false,
    error: "",
    count: mockResources.length,
    resources: mockResources,
    page: 1,
    setPage: vi.fn(),
    pageSize: 10,
    search: "",
    setSearch: vi.fn(),
    showForm: false,
    formMode: "create",
    form: { title: "", type: "GUIDE", description: "", isPublic: false },
    formErrors: {},
    formLoading: false,
    files: { localFile: null, localImage: null },
    wordCount: 0,
    onOpenCreate: vi.fn(),
    onOpenEdit: vi.fn(),
    onCloseForm: vi.fn(),
    onFieldChange: vi.fn(),
    onFileChange: vi.fn(),
    onSubmit: vi.fn(),
    onDelete: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders resources table correctly", () => {
    render(<ResourcesPanel {...defaultProps} />);
    expect(screen.getByText("Guía de Igualdad")).toBeInTheDocument();
    expect(screen.getByText("Informe de Diversidad")).toBeInTheDocument();
    expect(screen.getByText("GUIDE")).toBeInTheDocument();
    expect(screen.getByText("REPORT")).toBeInTheDocument();
    expect(screen.getByText("Público")).toBeInTheDocument();
    expect(screen.getByText("Privado")).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(<ResourcesPanel {...defaultProps} loading={true} />);
    expect(screen.getByText("Cargando recursos...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(<ResourcesPanel {...defaultProps} error="Error cargando recursos" />);
    expect(screen.getByText("Error cargando recursos")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<ResourcesPanel {...defaultProps} count={0} resources={[]} />);
    expect(screen.getByText("No hay recursos disponibles.")).toBeInTheDocument();
  });

  it("calls onOpenCreate when add button is clicked", () => {
    render(<ResourcesPanel {...defaultProps} />);
    fireEvent.click(screen.getByText("+ Añadir Recurso"));
    expect(defaultProps.onOpenCreate).toHaveBeenCalled();
  });

  it("calls onOpenEdit when edit button is clicked", () => {
    render(<ResourcesPanel {...defaultProps} />);
    const editButtons = screen.getAllByText("Editar");
    fireEvent.click(editButtons[0]);
    expect(defaultProps.onOpenEdit).toHaveBeenCalledWith(mockResources[0]);
  });

  it("calls onDelete when delete button is clicked", () => {
    render(<ResourcesPanel {...defaultProps} />);
    const deleteButtons = screen.getAllByText("Eliminar");
    fireEvent.click(deleteButtons[0]);
    expect(defaultProps.onDelete).toHaveBeenCalledWith(mockResources[0]);
  });

  it("renders form when showForm is true", () => {
    render(<ResourcesPanel {...defaultProps} showForm={true} />);
    expect(screen.getByText("Añadir Recurso")).toBeInTheDocument();
    expect(screen.getByText("Crear Recurso")).toBeInTheDocument();
  });

  it("calls onCloseForm when cancel button is clicked in form", () => {
    render(<ResourcesPanel {...defaultProps} showForm={true} />);
    fireEvent.click(screen.getByText("Cancelar"));
    expect(defaultProps.onCloseForm).toHaveBeenCalled();
  });

  it("calls onSubmit when form is submitted", () => {
  const { container } = render(<ResourcesPanel {...defaultProps} showForm={true} />);
  const form = container.querySelector("form");
  fireEvent.submit(form);
  expect(defaultProps.onSubmit).toHaveBeenCalled();
});
});