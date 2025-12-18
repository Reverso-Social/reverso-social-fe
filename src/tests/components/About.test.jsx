import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import About from '../../components/About/About.jsx';

describe('About Component', () => {
  it('renderiza los 3 títulos de las tarjetas', () => {
    render(<About />);

    screen.getByText('Visión');
    screen.getByText('Misión');
    screen.getByText('Valores');

    expect(true).to.equal(true);
  });

  it('expande y colapsa una tarjeta al hacer click', () => {
    render(<About />);

    const visionCard = screen.getByRole('button', { name: /visión/i });

    expect(visionCard.getAttribute('aria-expanded')).to.equal('false');

    fireEvent.click(visionCard);
    expect(visionCard.getAttribute('aria-expanded')).to.equal('true');

    screen.getByText(/nuestra visión/i);

    fireEvent.click(visionCard);
    expect(visionCard.getAttribute('aria-expanded')).to.equal('false');
  });
});