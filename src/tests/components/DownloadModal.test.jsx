import { render, screen, fireEvent } from "@testing-library/react";
import DownloadModal from "../../components/DownloadModal/DownloadModal";
import { MemoryRouter } from "react-router-dom";

describe("DownloadModal component", () => {
    const mockOnClose = vi.fn();
    const mockOnSubmit = vi.fn();
    const mockResource = { id: "1", title: "Recurso Test" };

    beforeEach(() => {
        mockOnClose.mockClear();
        mockOnSubmit.mockClear();
    });

    const renderModal = (open = true) => {
        render(
            <MemoryRouter>
                <DownloadModal
                    open={open}
                    onClose={mockOnClose}
                    resource={mockResource}
                    onSubmit={mockOnSubmit}
                />
            </MemoryRouter>
        );
    };

    it("renders correctly when open", () => {
        renderModal();
        expect(screen.getByText(/Antes de descargar/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
        expect(screen.getByRole("checkbox")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /Continuar y descargar/i })).toBeInTheDocument();
    });

    it("calls onClose when clicking the close button", () => {
        renderModal();
        const closeBtn = document.querySelector(".download-modal__close");
        fireEvent.click(closeBtn);
        expect(mockOnClose).toHaveBeenCalledTimes(1);
    });

    it("calls onSubmit with correct data when form is valid", () => {
        renderModal();

        const nameInput = screen.getByLabelText(/Nombre/i);
        const emailInput = screen.getByLabelText(/Correo electrónico/i);
        const checkbox = screen.getByRole("checkbox");
        const submitBtn = screen.getByRole("button", { name: /Continuar y descargar/i });

        fireEvent.change(nameInput, { target: { value: "Test User" } });
        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.click(checkbox);
        fireEvent.click(submitBtn);

        expect(mockOnSubmit).toHaveBeenCalledWith({
            name: "Test User",
            email: "test@example.com",
            resourceId: mockResource.id,
        });
    });
});