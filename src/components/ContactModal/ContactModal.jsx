import { useEffect, useState } from "react";
import "./ContactModal.scss";
import { X, User, Mail, Building2, Heart } from "lucide-react";
import contactService from "../../data/contactService";

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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setStatus({ type: "", message: "" });
      setErrors({});
    }
  }, [open]);

  const validate = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.email.trim()) newErrors.email = "El email es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Formato de email inválido";

    if (!formData.intereses.trim())
      newErrors.intereses = "Cuéntanos tus intereses";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await contactService.create(formData);
      setStatus({
        type: "success",
        message: "¡Mensaje enviado! Nos pondremos en contacto contigo pronto.",
      });
      setErrors({});
      setFormData(initialForm);

      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error("Error al enviar contacto:", error);
      setStatus({
        type: "error",
        message: "No pudimos enviar tu mensaje. Por favor, intenta de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("contact-modal__overlay")) {
      onClose();
    }
  };

  return (
    <div className="contact-modal__overlay" onClick={handleOverlayClick}>
      <div className="contact-modal__container">
        <button className="contact-modal__close" onClick={onClose} aria-label="Cerrar">
          <X size={22} />
        </button>

        <h2 className="contact-modal__title">Contáctanos</h2>
        <p className="contact-modal__subtitle">Estamos aquí para escucharte.</p>

        <form className="contact-modal__form" onSubmit={handleSubmit}>
          <div className="contact-modal__field">
            <label htmlFor="contact-nombre">Nombre</label>
            <div
              className={`contact-modal__input-wrapper ${
                errors.nombre ? "error" : ""
              }`}
            >
              <User className="icon" size={20} />
              <input
                id="contact-nombre"
                type="text"
                placeholder="Tu nombre completo"
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({ ...formData, nombre: e.target.value })
                }
                disabled={loading}
              />
            </div>
            {errors.nombre && <span className="error-text">{errors.nombre}</span>}
          </div>

          <div className="contact-modal__field">
            <label htmlFor="contact-email">Email</label>
            <div
              className={`contact-modal__input-wrapper ${
                errors.email ? "error" : ""
              }`}
            >
              <Mail className="icon" size={20} />
              <input
                id="contact-email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={loading}
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="contact-modal__field">
            <label htmlFor="contact-entidad">Entidad (opcional)</label>
            <div className="contact-modal__input-wrapper">
              <Building2 className="icon" size={20} />
              <input
                id="contact-entidad"
                type="text"
                placeholder="Organizacion o colectivo"
                value={formData.entidad}
                onChange={(e) =>
                  setFormData({ ...formData, entidad: e.target.value })
                }
                disabled={loading}
              />
            </div>
          </div>

          <div className="contact-modal__field">
            <label htmlFor="contact-intereses">Intereses</label>
            <div
              className={`contact-modal__textarea-wrapper ${
                errors.intereses ? "error" : ""
              }`}
            >
              <Heart className="icon icon--textarea" size={20} />
              <textarea
                id="contact-intereses"
                rows="3"
                placeholder="¿Qué te interesa o en qué podemos colaborar?"
                value={formData.intereses}
                onChange={(e) =>
                  setFormData({ ...formData, intereses: e.target.value })
                }
                disabled={loading}
              />
            </div>
            {errors.intereses && (
              <span className="error-text">{errors.intereses}</span>
            )}
          </div>

          <button type="submit" className="contact-modal__submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
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