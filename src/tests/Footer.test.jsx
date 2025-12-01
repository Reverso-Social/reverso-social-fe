import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer/Footer';

describe("Footer Component", () => {
  it("renderiza el footer y su contenido principal", () => {
    render(<Footer />);

    // Logo y título
    const logo = screen.getByAltText("Reverso Social");
    expect(logo).not.toBeNull();

    screen.getByText("Reverso Social");
    screen.getByText(
      "Consultoría Social de Género comprometida con la transformación feminista de la sociedad."
    );

    // Navegación
    screen.getByText("Navegación");
    screen.getByText("Sobre nosotres");
    screen.getByText("Servicios");
    screen.getByText("Incidencia");
    screen.getByText("Recursos");

    // Contacto
    screen.getByText("Contacto");
    screen.getByText("reversocial@reversocial.org");
    screen.getByText("+34 000 000 000");
    screen.getByText(/C\/Blas de Otero, 69, 11ºD/i);

    // Redes sociales
    screen.getByLabelText("LinkedIn");
    screen.getByLabelText("Instagram");
    screen.getByLabelText("Twitter/X");

    // Footer bottom
    screen.getByText(/© 2025 Reverso Social/i);
    screen.getByText("Política de Privacidad");
    screen.getByText("Cookies");
    screen.getByText("Aviso Legal");
  });
});