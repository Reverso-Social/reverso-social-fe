import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import ContactsPanel from "../../components/ContactsPanel/ContactsPanel";
import * as authService from "../../api/authService";

vi.mock("../../api/authService", async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    isAdmin: vi.fn(),
  };
});

describe("ContactsPanel component", () => {
  const mockContacts = [
    {
      id: 1,
      fullName: "Luisa",
      email: "luisa@example.com",
      message: "Hola ",
      status: "PENDING",
      createdAt: "2025-01-01T00:00:00Z",
    },
    {
      id: 2,
      fullName: "Erika",
      email: "erika@example.com",
      message: "Mensaje de prueba",
      status: "IN_PROGRESS",
      createdAt: "2025-01-02T00:00:00Z",
    },
  ];

  const onViewMock = vi.fn();
  const onStatusChangeMock = vi.fn();
  const onDeleteMock = vi.fn();

  beforeEach(() => {
    onViewMock.mockClear();
    onStatusChangeMock.mockClear();
    onDeleteMock.mockClear();
    authService.isAdmin.mockReturnValue(true); 
  });

  

  it("calls onView when clicking the view button", () => {
    render(
      <ContactsPanel
        contacts={mockContacts}
        loading={false}
        error=""
        onView={onViewMock}
        onStatusChange={onStatusChangeMock}
        onDelete={onDeleteMock}
      />
    );

    const viewButtons = screen.getAllByRole("button", { name: /ver detalle del contacto/i });
    fireEvent.click(viewButtons[0]);
    expect(onViewMock).toHaveBeenCalledWith(mockContacts[0]);
  });

  it("calls onStatusChange when changing the status select", () => {
    render(
      <ContactsPanel
        contacts={mockContacts}
        loading={false}
        error=""
        onView={onViewMock}
        onStatusChange={onStatusChangeMock}
        onDelete={onDeleteMock}
      />
    );

    const statusSelects = screen.getAllByRole("combobox");
    fireEvent.change(statusSelects[0], { target: { value: "RESOLVED" } });
    expect(onStatusChangeMock).toHaveBeenCalledWith(mockContacts[0].id, "RESOLVED");
  });

  it("shows loading, error and empty states correctly", () => {
    const { rerender } = render(
      <ContactsPanel
        contacts={[]}
        loading={true}
        error=""
        onView={onViewMock}
        onStatusChange={onStatusChangeMock}
        onDelete={onDeleteMock}
      />
    );

    expect(screen.getByText("Cargando contactos...")).toBeInTheDocument();

    rerender(
      <ContactsPanel
        contacts={[]}
        loading={false}
        error="Error de prueba"
        onView={onViewMock}
        onStatusChange={onStatusChangeMock}
        onDelete={onDeleteMock}
      />
    );

    expect(screen.getByText("Error de prueba")).toBeInTheDocument();

    rerender(
      <ContactsPanel
        contacts={[]}
        loading={false}
        error=""
        onView={onViewMock}
        onStatusChange={onStatusChangeMock}
        onDelete={onDeleteMock}
      />
    );

    expect(screen.getByText("No hay contactos disponibles.")).toBeInTheDocument();
  });
});