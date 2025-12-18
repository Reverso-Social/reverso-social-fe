import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

vi.mock("../../api/contactService", () => ({
  default: {
    create: vi.fn(() => Promise.resolve({ success: true })),
  },
}));

import ContactModal from "../../components/ContactModal/ContactModal";
import contactService from "../../api/contactService";

describe("ContactModal Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderModal = (props = {}) =>
    render(
      <MemoryRouter>
        <ContactModal open={true} onClose={vi.fn()} {...props} />
      </MemoryRouter>
    );

  it("does not render anything when open = false", () => {
    render(
      <MemoryRouter>
        <ContactModal open={false} onClose={() => {}} />
      </MemoryRouter>
    );

    expect(screen.queryByText("Contáctanos")).toBeNull();
  });

  it("renders the modal when open = true", () => {
    renderModal();

    expect(screen.getByText("Contáctanos")).toBeInTheDocument();
    expect(
      screen.getByText("Estamos aquí para escucharte.")
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitting an empty form", () => {
    renderModal();

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(
      screen.getByText("El nombre es obligatorio")
    ).toBeInTheDocument();
    expect(
      screen.getByText("El email es obligatorio")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Cuéntanos tus intereses")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Debes aceptar la política de privacidad")
    ).toBeInTheDocument();

    expect(contactService.create).not.toHaveBeenCalled();
  });

  it("submits the form successfully and shows success modal", async () => {
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <ContactModal open={true} onClose={onClose} />
      </MemoryRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText("Tu nombre completo"),
      { target: { value: "Ana" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("tu@email.com"),
      { target: { value: "ana@example.com" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Organizacion o colectivo"),
      { target: { value: "Reverso Social" } }
    );

    fireEvent.change(
      screen.getByPlaceholderText(
        "¿Qué te interesa o en qué podemos colaborar?"
      ),
      { target: { value: "Consultoría en igualdad" } }
    );

    fireEvent.click(
      screen.getByLabelText(/política de protección de datos/i)
    );

    fireEvent.click(
      screen.getByRole("button", { name: /enviar/i })
    );

    await waitFor(() => {
      expect(contactService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          nombre: "Ana",
          email: "ana@example.com",
          entidad: "Reverso Social",
          intereses: "Consultoría en igualdad",
        })
      );
    });

    expect(onClose).toHaveBeenCalled();

    expect(
      screen.getByText("Mensaje enviado")
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        "¡Gracias por escribirnos! Nos pondremos en contacto contigo pronto."
      )
    ).toBeInTheDocument();
  });

  it("closes the modal when clicking on the overlay", () => {
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <ContactModal open={true} onClose={onClose} />
      </MemoryRouter>
    );

    const overlay = document.querySelector(".contact-modal__overlay");
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalled();
  });

  it("closes the modal when clicking on the close button", () => {
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <ContactModal open={true} onClose={onClose} />
      </MemoryRouter>
    );

    const closeButton = document.querySelector(".contact-modal__close");
    fireEvent.click(closeButton);

    expect(onClose).toHaveBeenCalled();
  });
});