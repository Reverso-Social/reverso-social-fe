import React from "react";
import "./ContactModal.scss";
import { X, User, Mail, Building2, Heart } from "lucide-react";

export default function ContactModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="contact-modal__overlay">
      <div className="contact-modal__container">

        <button className="contact-modal__close" onClick={onClose}>
          <X size={22} />
        </button>

        <h2 className="contact-modal__title">Contáctanos</h2>
        <p className="contact-modal__subtitle">
          Estamos aquí para escucharte.
        </p>

        <form className="contact-modal__form">

    
          <div className="contact-modal__field">
            <label>Nombre</label>
            <div className="contact-modal__input-wrapper">
              <User className="icon" size={20} />
              <input type="text" placeholder="Tu nombre completo" />
            </div>
          </div>

    
          <div className="contact-modal__field">
            <label>Email</label>
            <div className="contact-modal__input-wrapper">
              <Mail className="icon" size={20} />
              <input type="email" placeholder="tu@email.com" />
            </div>
          </div>

 
          <div className="contact-modal__field">
            <label>Entidad</label>
            <div className="contact-modal__input-wrapper">
              <Building2 className="icon" size={20} />
              <input type="text" placeholder="Organización o colectivo" />
            </div>
          </div>

          <div className="contact-modal__field">
            <label>Intereses</label>
            <div className="contact-modal__textarea-wrapper">
              <Heart className="icon icon--textarea" size={20} />
              <textarea
                rows="3"
                placeholder="¿Qué te interesa o en qué podemos colaborar?"
              />
            </div>
          </div>

          <button type="submit" className="contact-modal__submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
