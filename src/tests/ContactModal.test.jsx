import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import ContactModal from "../components/ContactModal/ContactModal";
import contactService from "../api/contactService";


vi.mock("../api/contactService", () => ({
  default: {
    create: vi.fn(() => Promise.resolve({ success: true })),
  },
}));

const renderModal = (props = {}) =>
  render(
    <MemoryRouter>
      <ContactModal open={true} onClose={vi.fn()} {...props} />
    </MemoryRouter>
  );

describe("ContactModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("no renderiza el modal si open = false", () => {
    render(
      <MemoryRouter>
        <ContactModal open={false} onClose={() => {}} />
      </MemoryRouter>
    );

    expect(screen.queryByText("Contáctanos")).not.toBeInTheDocument();
  });

  it("renderiza el modal cuando open = true", () => {
    renderModal();

    expect(screen.getByText("Contáctanos")).toBeInTheDocument();
    expect(
      screen.getByText("Estamos aquí para escucharte.")
    ).toBeInTheDocument();
  });

  it("muestra errores si se envía el formulario vacío", () => {
    renderModal();

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    expect(screen.getByText("El nombre es obligatorio")).toBeInTheDocument();
    expect(screen.getByText("El email es obligatorio")).toBeInTheDocument();
    expect(
      screen.getByText("Cuéntanos tus intereses")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Debes aceptar la política de privacidad")
    ).toBeInTheDocument();
  });

  it("envía el formulario correctamente y muestra el modal de éxito", async () => {
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

    // ✔️ Aceptar política (clave)
    fireEvent.click(screen.getByLabelText(/acepto la/i));

    fireEvent.click(screen.getByRole("button", { name: /enviar/i }));

    await waitFor(() => {
      expect(contactService.create).toHaveBeenCalledWith({
        nombre: "Ana",
        email: "ana@example.com",
        entidad: "Reverso Social",
        intereses: "Consultoría en igualdad",
      });
    });

    expect(onClose).toHaveBeenCalled();

    await waitFor(() => {
      expect(screen.getByText("Mensaje enviado")).toBeInTheDocument();
      expect(
        screen.getByText(
          "¡Gracias por escribirnos! Nos pondremos en contacto contigo pronto."
        )
      ).toBeInTheDocument();
    });
  });

  it("cierra el modal al hacer click en el overlay", () => {
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <ContactModal open={true} onClose={onClose} />
      </MemoryRouter>
    );

    fireEvent.click(document.querySelector(".contact-modal__overlay"));

    expect(onClose).toHaveBeenCalled();
  });

  it("cierra el modal al hacer click en el botón cerrar", () => {
    const onClose = vi.fn();

    render(
      <MemoryRouter>
        <ContactModal open={true} onClose={onClose} />
      </MemoryRouter>
    );

    fireEvent.click(document.querySelector(".contact-modal__close"));

    expect(onClose).toHaveBeenCalled();
  });
});