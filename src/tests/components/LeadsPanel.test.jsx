import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import LeadsPanel from "../../components/LeadsPanel/LeadsPanel";


vi.mock("../../api/authService", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    isAdmin: vi.fn(),
  };
});

describe("LeadsPanel component", () => {
  const mockLeads = [
    {
      id: 1,
      name: "Luisa Gomez",
      email: "luisa@example.com",
      resourceTitle: "Resource A",
      downloadCount: 2,
      createdAt: "2025-01-01T10:00:00Z",
      lastDownloadedAt: "2025-01-02T12:00:00Z",
      originalCreatedAt: "2025-01-01T10:00:00Z",
    },
    {
      id: 2,
      name: "Erika Martinez",
      email: "erika@example.com",
      resourceTitle: "Resource B",
      downloadCount: 1,
      createdAt: "2025-01-03T09:30:00Z",
      lastDownloadedAt: null,
      originalCreatedAt: "2025-01-03T09:30:00Z",
    },
  ];

  const defaultProps = {
    loading: false,
    error: "",
    count: mockLeads.length,
    leads: mockLeads,
    page: 1,
    setPage: vi.fn(),
    pageSize: 10,
    search: "",
    setSearch: vi.fn(),
    onExport: vi.fn(),
    onDelete: vi.fn(),
    sortConfig: { key: "createdAt", direction: "desc" },
    onSort: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders leads table correctly", () => {
    render(<LeadsPanel {...defaultProps} />);

    expect(screen.getByText((content) => content.includes("Luisa Gomez"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Erika Martinez"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("luisa@example.com"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("erika@example.com"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Resource A"))).toBeInTheDocument();
    expect(screen.getByText((content) => content.includes("Resource B"))).toBeInTheDocument();
  });

  it("renders loading state", () => {
    render(<LeadsPanel {...defaultProps} loading={true} />);
    expect(screen.getByText("Cargando leads...")).toBeInTheDocument();
  });

  it("renders error state", () => {
    render(<LeadsPanel {...defaultProps} error="Error cargando leads" />);
    expect(screen.getByText("Error cargando leads")).toBeInTheDocument();
  });

  it("renders empty state", () => {
    render(<LeadsPanel {...defaultProps} count={0} leads={[]} />);
    expect(screen.getByText("No hay leads de descarga disponibles.")).toBeInTheDocument();
  });

  it("calls onExport when export button is clicked", () => {
    render(<LeadsPanel {...defaultProps} />);
    const exportButton = screen.getByText("📥 Exportar CSV");
    fireEvent.click(exportButton);
    expect(defaultProps.onExport).toHaveBeenCalled();
  });

  it("calls onSort when column headers are clicked", () => {
    render(<LeadsPanel {...defaultProps} />);
    const fechaRegistroHeader = screen.getByText((content) => content.includes("Fecha Registro"));
    fireEvent.click(fechaRegistroHeader);
    expect(defaultProps.onSort).toHaveBeenCalledWith("createdAt");

    const ultimaDescargaHeader = screen.getByText((content) => content.includes("Última Descarga"));
    fireEvent.click(ultimaDescargaHeader);
    expect(defaultProps.onSort).toHaveBeenCalledWith("lastDownloadedAt");
  });

  it("calls setPage when Pagination changes page", () => {
    render(<LeadsPanel {...defaultProps} />);
    defaultProps.setPage(2);
    expect(defaultProps.setPage).toHaveBeenCalledWith(2);
  });
});