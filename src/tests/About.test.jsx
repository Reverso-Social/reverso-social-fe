import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import About from '../components/About/About.jsx';

describe('About Component', () => {
  it('renderiza los 3 títulos de las tarjetas', () => {
    render(<About />);

    // Usamos getByText porque es seguro
    screen.getByText('Visión');
    screen.getByText('Misión');
    screen.getByText('Valores');

    // Si llegan aquí sin lanzar error → OK
    expect(true).to.equal(true);
  });

  it('expande y colapsa una tarjeta al hacer click', () => {
    render(<About />);

    // Localizamos la tarjeta por rol (button) y texto
    const visionCard = screen.getByRole('button', { name: /visión/i });

    // Comprobamos estado inicial (colapsado)
    expect(visionCard.getAttribute('aria-expanded')).to.equal('false');

    // Expandir
    fireEvent.click(visionCard);
    expect(visionCard.getAttribute('aria-expanded')).to.equal('true');

    // El contenido expandido debe existir ahora
    screen.getByText(/nuestra visión/i);

    // Colapsar
    fireEvent.click(visionCard);
    expect(visionCard.getAttribute('aria-expanded')).to.equal('false');
  });
});