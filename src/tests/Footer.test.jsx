import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "../components/Footer/Footer";

describe("Footer Component", () => {
  it("renderiza el footer y su contenido principal", () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const logo = screen.getByAltText("Reverso Social");
    expect(logo).not.toBeNull();
    const title = screen.getByText("Reverso Social");
    expect(title).not.toBeNull();

    const description = screen.getByText(
      /Consultoría Social de Género comprometida con la transformación feminista de la sociedad./i
    );
    expect(description).not.toBeNull();

    const navHeading = screen.getByText("Navegación");
    expect(navHeading).not.toBeNull();
    screen.getByText("Sobre nosotras");
    screen.getByText("Servicios");
    screen.getByText("Incidencia");
    screen.getByText("Recursos");

    const contactHeading = screen.getByText("Contacto");
    expect(contactHeading).not.toBeNull();
    screen.getByText("reversocial@reversocial.org");
    screen.getByText("+34 000 000 000");
    screen.getByText(/C\/Blas de Otero, 69, 11ºD/i);

    screen.getByLabelText("LinkedIn");
    screen.getByLabelText("Instagram");
    screen.getByLabelText("Twitter/X");

    screen.getByText(/© 2025 Reverso Social/i);
    screen.getByText("Política de Privacidad");
    screen.getByText("Cookies");
    screen.getByText("Aviso Legal");

    const intranetBtn = screen.getByText("Intranet");
    expect(intranetBtn).not.toBeNull();

    const modal = screen.queryByText("Contáctanos");
    expect(modal).toBeNull();
  });
});