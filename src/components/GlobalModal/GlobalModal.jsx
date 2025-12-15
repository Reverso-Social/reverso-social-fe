import { useEffect, useRef } from "react";
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
  showCloseButton = true,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (closeOnEsc && event.key === "Escape") {
        onClose?.();
        return;
      }

      if (event.key === "Tab") {
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    };

    const lastActiveElement = document.activeElement;

    const timer = setTimeout(() => {
      if (modalRef.current) {
        const autoFocusElement = modalRef.current.querySelector('[data-autofocus="true"]') ||
          modalRef.current.querySelector('.global-modal__btn--primary') ||
          modalRef.current.querySelector('.global-modal__close-btn');
        if (autoFocusElement) {
          autoFocusElement.focus();
        } else {
          modalRef.current.focus();
        }
      }
    }, 50);

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
      if (lastActiveElement) {
        lastActiveElement.focus();
      }
    };
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
        ref={modalRef}
        className={`global-modal global-modal--${variant}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        aria-describedby={modalBodyId}
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}
      >
        <header className="global-modal__header">
          {title && (
            <h2 id={modalTitleId} className="global-modal__title">
              {title}
            </h2>
          )}
          {onClose && showCloseButton && (
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
                className={`global-modal__btn global-modal__btn--primary ${variant === "danger"
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
