import { X, User, Mail, Building2, MessageSquare, Calendar, Tag } from "lucide-react";
import "./ContactDetailModal.scss";

export default function ContactDetailModal({ contact, open, onClose }) {
  if (!open || !contact) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("contact-detail-modal__overlay")) {
      onClose();
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      PENDING: "Pendiente",
      IN_PROGRESS: "En Proceso",
      RESOLVED: "Resuelto"
    };
    return labels[status] || status;
  };

  const getStatusClass = (status) => {
    const classes = {
      PENDING: "status--pending",
      IN_PROGRESS: "status--progress",
      RESOLVED: "status--resolved"
    };
    return classes[status] || "";
  };

  return (
    <div className="contact-detail-modal__overlay" onClick={handleOverlayClick}>
      <div className="contact-detail-modal__container">
        <button className="contact-detail-modal__close" onClick={onClose} aria-label="Cerrar">
          <X size={22} />
        </button>

        <header className="contact-detail-modal__header">
          <h2 className="contact-detail-modal__title">Detalle del Contacto</h2>
          <span className={`contact-detail-modal__status ${getStatusClass(contact.status)}`}>
            {getStatusLabel(contact.status)}
          </span>
        </header>

        <div className="contact-detail-modal__content">
          <div className="contact-detail-field">
            <div className="contact-detail-field__icon">
              <User size={20} />
            </div>
            <div className="contact-detail-field__content">
              <label>Nombre completo</label>
              <p>{contact.fullName}</p>
            </div>
          </div>

          <div className="contact-detail-field">
            <div className="contact-detail-field__icon">
              <Mail size={20} />
            </div>
            <div className="contact-detail-field__content">
              <label>Email</label>
              <p>
                <a href={`mailto:${contact.email}`}>{contact.email}</a>
              </p>
            </div>
          </div>

          {contact.userName && (
            <div className="contact-detail-field">
              <div className="contact-detail-field__icon">
                <User size={20} />
              </div>
              <div className="contact-detail-field__content">
                <label>Gestionado por</label>
                <p>{contact.userName}</p>
              </div>
            </div>
          )}

          <div className="contact-detail-field contact-detail-field--full">
            <div className="contact-detail-field__icon">
              <MessageSquare size={20} />
            </div>
            <div className="contact-detail-field__content">
              <label>Mensaje</label>
              <p className="contact-detail-message">{contact.message}</p>
            </div>
          </div>

          <div className="contact-detail-field">
            <div className="contact-detail-field__icon">
              <Calendar size={20} />
            </div>
            <div className="contact-detail-field__content">
              <label>Fecha de contacto</label>
              <p>{new Date(contact.createdAt).toLocaleString('es-ES', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
          </div>

          {contact.updatedAt && contact.updatedAt !== contact.createdAt && (
            <div className="contact-detail-field">
              <div className="contact-detail-field__icon">
                <Calendar size={20} />
              </div>
              <div className="contact-detail-field__content">
                <label>Última actualización</label>
                <p>{new Date(contact.updatedAt).toLocaleString('es-ES', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}</p>
              </div>
            </div>
          )}

          <div className="contact-detail-field">
            <div className="contact-detail-field__icon">
              <Tag size={20} />
            </div>
            <div className="contact-detail-field__content">
              <label>Acepta política de privacidad</label>
              <p>{contact.acceptsPrivacy ? "Sí" : "No"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}