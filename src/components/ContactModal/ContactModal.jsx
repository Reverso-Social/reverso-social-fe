import React, { useState } from "react";
import "./ContactModal.scss";
import { X, User, Mail, Building2, Heart } from "lucide-react";

export default function ContactModal({ open, onClose }) {
  if (!open) return null;


  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    entidad: "",
    intereses: ""
  });

  const [errors, setErrors] = useState({});

  
  const validate = () => {
    let newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.email.trim()) newErrors.email = "El email es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Formato de email inválido";

    if (!formData.entidad.trim()) newErrors.entidad = "La entidad es obligatoria";
    if (!formData.intereses.trim())
      newErrors.intereses = "Cuéntanos tus intereses";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    console.log("✔ Datos enviados:", formData);

    // Aquí hariamos el POST al backend
    // fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) })

    onClose();
  };


  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("contact-modal__overlay")) {
      onClose();
    }
  };

  return (
    <div className="contact-modal__overlay" onClick={handleOverlayClick}>
      <div className="contact-modal__container">

        <button className="contact-modal__close" onClick={onClose}>
          <X size={22} />
        </button>

        <h2 className="contact-modal__title">Contáctanos</h2>
        <p className="contact-modal__subtitle">Estamos aquí para escucharte.</p>

        <form className="contact-modal__form" onSubmit={handleSubmit}>

          <div className="contact-modal__field">
            <label>Nombre</label>
            <div className={`contact-modal__input-wrapper ${errors.nombre ? "error" : ""}`}>
              <User className="icon" size={20} />
              <input
                type="text"
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
              />
            </div>
            {errors.nombre && <span className="error-text">{errors.nombre}</span>}
          </div>

          <div className="contact-modal__field">
            <label>Email</label>
            <div className={`contact-modal__input-wrapper ${errors.email ? "error" : ""}`}>
              <Mail className="icon" size={20} />
              <input
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

     
          <div className="contact-modal__field">
            <label>Entidad</label>
            <div
              className={`contact-modal__input-wrapper ${errors.entidad ? "error" : ""}`}
            >
              <Building2 className="icon" size={20} />
              <input
                type="text"
                placeholder="Organización o colectivo"
                value={formData.entidad}
                onChange={(e) =>
                  setFormData({ ...formData, entidad: e.target.value })
                }
              />
            </div>
            {errors.entidad && <span className="error-text">{errors.entidad}</span>}
          </div>

       
          <div className="contact-modal__field">
            <label>Intereses</label>
            <div
              className={`contact-modal__textarea-wrapper ${errors.intereses ? "error" : ""}`}
            >
              <Heart className="icon icon--textarea" size={20} />
              <textarea
                rows="3"
                placeholder="¿Qué te interesa o en qué podemos colaborar?"
                value={formData.intereses}
                onChange={(e) =>
                  setFormData({ ...formData, intereses: e.target.value })
                }
              />
            </div>
            {errors.intereses && (
              <span className="error-text">{errors.intereses}</span>
            )}
          </div>

          <button type="submit" className="contact-modal__submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
}
