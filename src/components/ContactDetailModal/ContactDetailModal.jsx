import { X, User, Mail, MessageSquare, Calendar, Tag } from "lucide-react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation('admin');
  if (!open || !contact) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("contact-detail-modal__overlay")) {
      onClose();
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      PENDING: t('contacts.statusPending'),
      IN_PROGRESS: t('contacts.statusInProgress'),
      RESOLVED: t('contacts.statusResolved')
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
        <button className="contact-detail-modal__close" onClick={onClose} aria-label={t('contacts.detail.closeAriaLabel')}>
          <X size={22} />
        </button>

        <header className="contact-detail-modal__header">
          <h2 className="contact-detail-modal__title">{t('contacts.detail.title')}</h2>
          <span className={`contact-detail-modal__status ${getStatusClass(contact.status)}`}>
            {getStatusLabel(contact.status)}
          </span>
        </header>

        <div className="contact-detail-modal__content">
          <ContactField icon={User} label={t('contacts.detail.name')}>
            <p>{contact.fullName}</p>
          </ContactField>

          <ContactField icon={Mail} label={t('contacts.detail.email')}>
            <p><a href={`mailto:${contact.email}`}>{contact.email}</a></p>
          </ContactField>

          {contact.userName && (
            <ContactField icon={User} label={t('contacts.detail.managedBy')}>
              <p>{contact.userName}</p>
            </ContactField>
          )}

          <ContactField icon={MessageSquare} label={t('contacts.detail.message')} fullWidth>
            <p className="contact-detail-message">{contact.message}</p>
          </ContactField>

          <ContactField icon={Calendar} label={t('contacts.detail.date')}>
            <p>{formatDate(contact.createdAt)}</p>
          </ContactField>

          {contact.updatedAt && contact.updatedAt !== contact.createdAt && (
            <ContactField icon={Calendar} label={t('contacts.detail.lastUpdate')}>
              <p>{formatDate(contact.updatedAt)}</p>
            </ContactField>
          )}

          <ContactField icon={Tag} label={t('contacts.detail.privacy')}>
            <p>{contact.acceptsPrivacy ? t('contacts.detail.yes') : t('contacts.detail.no')}</p>
          </ContactField>
        </div>
      </div>
    </div>
  );
}