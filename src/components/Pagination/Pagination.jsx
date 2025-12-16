import "./Pagination.scss";

export default function Pagination({
  currentPage,
  totalItems,
  pageSize,
  onPageChange,
  ariaLabel = "Paginación",
}) {
  const totalPages = Math.ceil(totalItems / pageSize) || 0;

  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav className="pagination" aria-label={ariaLabel}>
      <button
        type="button"
        className="pagination__btn pagination__btn--secondary"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        Anterior
      </button>

      <span className="pagination__info">
        Página {currentPage} de {totalPages}
      </span>

      <button
        type="button"
        className="pagination__btn pagination__btn--primary"
        onClick={handleNext}
        disabled={currentPage === totalPages}
      >
        Siguiente
      </button>
    </nav>
  );
}
