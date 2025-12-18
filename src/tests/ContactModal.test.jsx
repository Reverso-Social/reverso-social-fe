import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";


vi.mock("../api/contactService", () => ({
  default: {
    create: vi.fn(() => Promise.resolve({ success: true })),
  },
}));

import ContactModal from "../components/ContactModal/ContactModal";
import contactService from "../api/contactService";

describe("ContactModal Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("no renderiza nada si open = false", () => {
    render(<ContactModal open={false} onClose={() => { }} />);
    const title = screen.queryByText("Contáctanos");
    expect(title).toBeNull();
  });

  it("renderiza el modal cuando open = true", () => {
    render(<ContactModal open={true} onClose={() => { }} />);
    expect(screen.queryByText("Contáctanos")).not.toBeNull();
    expect(screen.queryByText("Estamos aquí para escucharte.")).not.toBeNull();
  });

  it("muestra errores cuando se envía el formulario vacío", () => {
    render(<ContactModal open={true} onClose={() => { }} />);
    const submitBtn = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(submitBtn);

    expect(screen.queryByText("El nombre es obligatorio")).not.toBeNull();
    expect(screen.queryByText("El email es obligatorio")).not.toBeNull();
    expect(screen.queryByText("Cuéntanos tus intereses")).not.toBeNull();
  });

  it("guarda datos válidos y muestra mensaje de éxito", async () => {
    const onClose = vi.fn();
    render(<ContactModal open={true} onClose={onClose} />);

    fireEvent.change(screen.getByPlaceholderText("Tu nombre completo"), { target: { value: "Ana" } });
    fireEvent.change(screen.getByPlaceholderText("tu@email.com"), { target: { value: "ana@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Organizacion o colectivo"), { target: { value: "Reverso Social" } });
    fireEvent.change(
      screen.getByPlaceholderText("¿Qué te interesa o en qué podemos colaborar?"),
      { target: { value: "Consultoría en igualdad" } }
    );

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

    expect(screen.queryByText("Mensaje enviado")).not.toBeNull();
    expect(screen.queryByText("¡Gracias por escribirnos! Nos pondremos en contacto contigo pronto.")).not.toBeNull();
  });

  it("cierra el modal al hacer click en el overlay", () => {
    const onClose = vi.fn();
    render(<ContactModal open={true} onClose={onClose} />);

    const overlay = document.querySelector(".contact-modal__overlay");
    fireEvent.click(overlay);

    expect(onClose).toHaveBeenCalled();
  });

  it("cierra el modal al hacer click en la X", () => {
    const onClose = vi.fn();
    render(<ContactModal open={true} onClose={onClose} />);

    const closeBtn = document.querySelector(".contact-modal__close");
    fireEvent.click(closeBtn);

    expect(onClose).toHaveBeenCalled();
  });
});
