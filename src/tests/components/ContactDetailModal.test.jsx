import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ContactDetailModal from "../../components/ContactDetailModal/ContactDetailModal";

describe("ContactDetailModal component", () => {
  const mockContact = {
    fullName: "John Doe",
    email: "john@example.com",
    message: "Este es un mensaje de prueba",
    status: "PENDING",
    createdAt: "2025-12-18T12:00:00Z",
    updatedAt: "2025-12-18T15:30:00Z",
    acceptsPrivacy: true,
    userName: "Admin User",
  };

  const onClose = vi.fn();

  beforeEach(() => {
    onClose.mockClear();
  });

  it("renders nothing when not open", () => {
    const { container } = render(
      <ContactDetailModal contact={mockContact} open={false} onClose={onClose} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders all fields correctly when open", () => {
    render(<ContactDetailModal contact={mockContact} open={true} onClose={onClose} />);

    expect(screen.getByText("Detalle del Contacto")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByText("Admin User")).toBeInTheDocument();
    expect(screen.getByText("Este es un mensaje de prueba")).toBeInTheDocument();
    expect(screen.getByText("Pendiente")).toBeInTheDocument();
    expect(screen.getByText("Sí")).toBeInTheDocument();

    const dateElements = screen.getAllByText(/18\/12\/2025/);
    expect(dateElements.length).toBeGreaterThanOrEqual(2);
  });

  it("calls onClose when clicking on the close button", () => {
    render(<ContactDetailModal contact={mockContact} open={true} onClose={onClose} />);
    const closeButton = screen.getByLabelText("Cerrar");
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("calls onClose when clicking on the overlay", () => {
  render(<ContactDetailModal contact={mockContact} open={true} onClose={onClose} />);
  const overlay = document.querySelector(".contact-detail-modal__overlay");
  fireEvent.click(overlay);
  expect(onClose).toHaveBeenCalledTimes(1);
});

it("does not call onClose when clicking inside the modal content", () => {
  render(<ContactDetailModal contact={mockContact} open={true} onClose={onClose} />);
  const content = document.querySelector(".contact-detail-modal__container");
  fireEvent.click(content);
  expect(onClose).not.toHaveBeenCalled();
});
});