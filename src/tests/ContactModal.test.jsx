import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";


vi.mock("../services/contactMock", () => ({
  contactMock: {
    add: vi.fn(() => ({ id: 1 })),
    getAll: vi.fn(() => []),
  },
}));

import ContactModal from "../components/ContactModal/ContactModal";
import { contactMock } from "../services/contactMock";

describe("ContactModal Component", () => {
  it("no renderiza nada si open = false", () => {
    const { container } = render(<ContactModal open={false} onClose={() => {}} />);
    expect(container.children.length).to.equal(0);
  });

  it("renderiza el modal cuando open = true", () => {
    render(<ContactModal open={true} onClose={() => {}} />);
    screen.getByText("Contáctanos");
    screen.getByText("Estamos aqui para escucharte.");
    expect(true).to.equal(true);
  });

  it("muestra errores cuando se envía el formulario vacío", () => {
    render(<ContactModal open={true} onClose={() => {}} />);
    const submitBtn = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(submitBtn);

    screen.getByText("El nombre es obligatorio");
    screen.getByText("El email es obligatorio");
    screen.getByText("Cuentanos tus intereses");

    expect(true).to.equal(true);
  });

  it("llama a contactMock.add y onClose al enviar datos válidos", () => {
    const onClose = vi.fn();

    render(<ContactModal open={true} onClose={onClose} />);

    const nombreInput = screen.getByPlaceholderText("Tu nombre completo");
    const emailInput = screen.getByPlaceholderText("tu@email.com");
    const entidadInput = screen.getByPlaceholderText("Organizacion o colectivo");
    const interesesTextarea = screen.getByPlaceholderText(
      "Que te interesa o en que podemos colaborar?"
    );

    fireEvent.change(nombreInput, { target: { value: "Ana" } });
    fireEvent.change(emailInput, { target: { value: "ana@example.com" } });
    fireEvent.change(entidadInput, { target: { value: "Reverso Social" } });
    fireEvent.change(interesesTextarea, { target: { value: "Consultoría en igualdad" } });

    const submitBtn = screen.getByRole("button", { name: /enviar/i });
    fireEvent.click(submitBtn);

    expect(contactMock.add).toHaveBeenCalled();
    expect(contactMock.add).toHaveBeenCalledWith({
      nombre: "Ana",
      email: "ana@example.com",
      entidad: "Reverso Social",
      intereses: "Consultoría en igualdad",
    });

    expect(onClose).toHaveBeenCalled();
  });
});
