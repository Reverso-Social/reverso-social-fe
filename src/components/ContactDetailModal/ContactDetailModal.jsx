import { X, User, Mail, MessageSquare, Calendar, Tag } from "lucide-react";
import "./ContactDetailModal.scss";

const ContactField = ({ icon: Icon, label, children, fullWidth = false }) => (
  <div className={`contact-detail-field ${fullWidth ? 'contact-detail-field--full' : ''}`}>
    <div className="contact-detail-field__icon">
      <Icon size={20} />
    </div>
    <div className="contact-detail-field__content">
      <label>{label}</label>
      {children}
    </div>
  </div>
);

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

  const formatDate = (date) => new Date(date).toLocaleString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

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
          <ContactField icon={User} label="Nombre completo">
            <p>{contact.fullName}</p>
          </ContactField>

          <ContactField icon={Mail} label="Email">
            <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          </ContactField>

          {contact.userName && (
            <ContactField icon={User} label="Gestionado por">
              <p>{contact.userName}</p>
            </ContactField>
          )}

          <ContactField icon={MessageSquare} label="Mensaje" fullWidth>
            <p className="contact-detail-message">{contact.message}</p>
          </ContactField>

          <ContactField icon={Calendar} label="Fecha de contacto">
            <p>{formatDate(contact.createdAt)}</p>
          </ContactField>

          {contact.updatedAt && contact.updatedAt !== contact.createdAt && (
            <ContactField icon={Calendar} label="Última actualización">
              <p>{formatDate(contact.updatedAt)}</p>
            </ContactField>
          )}

          <ContactField icon={Tag} label="Acepta política de privacidad">
            <p>{contact.acceptsPrivacy ? "Sí" : "No"}</p>
          </ContactField>
        </div>
      </div>
    </div>
  );
}