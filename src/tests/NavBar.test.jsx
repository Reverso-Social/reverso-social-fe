import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

describe("NavBar Component", () => {
  let scrollIntoViewMock;

  beforeEach(() => {
    scrollIntoViewMock = vi.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
  });

  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = "";
  });

  it("llama onItemClick y scrollIntoView al hacer click en un botón", () => {
    const onItemClick = vi.fn();

    render(
      <MemoryRouter>
        <NavBar onItemClick={onItemClick} />
      </MemoryRouter>
    );

    const section = document.createElement("div");
    section.id = "sobre-nosotros";
    document.body.appendChild(section);

    const sobreBtn = screen.getByText("Sobre Nosotras");
    fireEvent.click(sobreBtn);

    expect(scrollIntoViewMock).toHaveBeenCalled();

    expect(onItemClick).toHaveBeenCalled();

    document.body.removeChild(section);
  });
});