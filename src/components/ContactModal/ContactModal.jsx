import React, { useState } from "react";
import "./ContactModal.scss";
import { X, User, Mail, Building2, Heart } from "lucide-react";
import { contactMock } from "../../services/contactMock";

export default function ContactModal({ open, onClose }) {
  if (!open) return null;

  const initialForm = {
    nombre: "",
    email: "",
    entidad: "",
    intereses: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });

  const validate = () => {
    let newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.email.trim()) newErrors.email = "El email es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Formato de email invalido";

    if (!formData.intereses.trim())
      newErrors.intereses = "Cuentanos tus intereses";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const savedEntry = contactMock.add(formData);
      setStatus({
        type: "success",
        message: "Datos guardados temporalmente en este navegador.",
      });
      setErrors({});
      setFormData(initialForm);

      console.log("Contacto guardado:", savedEntry);
      console.log("Contactos en localStorage:", contactMock.getAll());
    } catch (error) {
      console.error("No se pudo guardar el contacto temporal:", error);
      setStatus({
        type: "error",
        message: "No pudimos guardar temporalmente. Intenta de nuevo.",
      });
    }

    // Aqui hariamos el POST al backend
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

        <h2 className="contact-modal__title">Contactanos</h2>
        <p className="contact-modal__subtitle">Estamos aqui para escucharte.</p>

        <form className="contact-modal__form" onSubmit={handleSubmit}>
          <div className="contact-modal__field">
            <label>Nombre</label>
            <div
              className={`contact-modal__input-wrapper ${
                errors.nombre ? "error" : ""
              }`}
            >
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
            <div
              className={`contact-modal__input-wrapper ${
                errors.email ? "error" : ""
              }`}
            >
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
            <div className="contact-modal__input-wrapper">
              <Building2 className="icon" size={20} />
              <input
                type="text"
                placeholder="Organizacion o colectivo"
                value={formData.entidad}
                onChange={(e) =>
                  setFormData({ ...formData, entidad: e.target.value })
                }
              />
            </div>
          </div>

          <div className="contact-modal__field">
            <label>Intereses</label>
            <div
              className={`contact-modal__textarea-wrapper ${
                errors.intereses ? "error" : ""
              }`}
            >
              <Heart className="icon icon--textarea" size={20} />
              <textarea
                rows="3"
                placeholder="Que te interesa o en que podemos colaborar?"
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

          {status.message && (
            <p
              className={`contact-modal__status contact-modal__status--${status.type}`}
              role={status.type === "error" ? "alert" : "status"}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
