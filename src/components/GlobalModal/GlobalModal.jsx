import { useEffect } from "react";
import "./GlobalModal.scss";

export default function GlobalModal({
  open,
  title,
  children,
  onClose,
  primaryAction,
  secondaryAction,
  variant = "default",
  closeOnOverlayClick = true,
  closeOnEsc = true,
}) {
  useEffect(() => {
    if (!open || !closeOnEsc) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, closeOnEsc, onClose]);

  if (!open) return null;

  const handleOverlayClick = () => {
    if (closeOnOverlayClick) {
      onClose?.();
    }
  };

  const modalTitleId = "global-modal-title";
  const modalBodyId = "global-modal-body";

  return (
    <div
      className="global-modal-backdrop"
      onClick={handleOverlayClick}
      aria-hidden="true"
    >
      <div
        className={`global-modal global-modal--${variant}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        aria-describedby={modalBodyId}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="global-modal__header">
          {title && (
            <h2 id={modalTitleId} className="global-modal__title">
              {title}
            </h2>
          )}
          {onClose && (
            <button
              type="button"
              className="global-modal__close-btn"
              onClick={onClose}
              aria-label="Cerrar ventana"
            >
              ✕
            </button>
          )}
        </header>

        <section id={modalBodyId} className="global-modal__body">
          {children}
        </section>

        {(primaryAction || secondaryAction) && (
          <footer className="global-modal__footer">
            {secondaryAction && (
              <button
                type="button"
                className="global-modal__btn global-modal__btn--secondary"
                onClick={secondaryAction.onClick}
                disabled={secondaryAction.disabled}
              >
                {secondaryAction.label}
              </button>
            )}

            {primaryAction && (
              <button
                type="button"
                className={`global-modal__btn global-modal__btn--primary ${
                  variant === "danger"
                    ? "global-modal__btn--primary-danger"
                    : ""
                }`}
                onClick={primaryAction.onClick}
                disabled={primaryAction.disabled}
              >
                {primaryAction.label}
              </button>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}
