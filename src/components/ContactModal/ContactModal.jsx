import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./ContactModal.scss";
import { X, User, Mail, Building2, Heart } from "lucide-react";
import contactService from "../../api/contactService";
import GlobalModal from "../GlobalModal/GlobalModal";

export default function ContactModal({ open, onClose }) {
  const initialForm = {
    nombre: "",
    email: "",
    entidad: "",
    intereses: "",
  };

  const [formData, setFormData] = useState(initialForm);
  const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [modalState, setModalState] = useState({
    open: false,
    type: "success",
    title: "",
    message: ""
  });

  const lastActiveElement = useRef(null);

  useEffect(() => {
    if (open) {
      lastActiveElement.current = document.activeElement;
      setErrors({});
    } else if (lastActiveElement.current) {
      lastActiveElement.current.focus();
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

    if (!hasAcceptedPolicy) {
      newErrors.policy = "Debes aceptar la política de privacidad";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      await contactService.create(formData);

      onClose();

      setFormData(initialForm);
      setErrors({});

      setModalState({
        open: true,
        type: "success",
        title: "Mensaje enviado",
        message: "¡Gracias por escribirnos! Nos pondremos en contacto contigo pronto."
      });

    } catch (error) {
      console.error("Error al enviar contacto:", error);
      setModalState({
        open: true,
        type: "error",
        title: "Error de envío",
        message: "No pudimos enviar tu mensaje. Por favor, verifica tu conexión e intenta de nuevo."
      });
    } finally {
      setLoading(false);
    }
  };

  const closeGlobalModal = () => {
    setModalState(prev => ({ ...prev, open: false }));
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("contact-modal__overlay")) {
      onClose();
    }
  };

  return (
    <>
      {open && (
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
                  className={`contact-modal__input-wrapper ${errors.nombre ? "error" : ""}`}
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
                  className={`contact-modal__input-wrapper ${errors.email ? "error" : ""}`}
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
                  className={`contact-modal__textarea-wrapper ${errors.intereses ? "error" : ""}`}
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

              <div className="contact-modal__field contact-modal__checkbox">
                <input
                  type="checkbox"
                  id="contact-policy"
                  checked={hasAcceptedPolicy}
                  onChange={(e) => {
                    setHasAcceptedPolicy(e.target.checked);
                    if (errors.policy) setErrors({ ...errors, policy: "" });
                  }}
                />
                <label htmlFor="contact-policy">
                  Acepto la{" "}
                  <Link to="/politica-privacidad" target="_blank" rel="noopener noreferrer">
                    Política de Protección de Datos y Privacidad
                  </Link>
                </label>
              </div>
              {errors.policy && <span className="error-text" style={{ display: 'block', marginTop: '-1rem', marginBottom: '1rem' }}>{errors.policy}</span>}

              <button type="submit" className="contact-modal__submit" disabled={loading}>
                {loading ? "Enviando..." : "Enviar"}
              </button>
            </form>
          </div>
        </div>
      )}

      {modalState.open && (
        <GlobalModal
          open={modalState.open}
          title={modalState.title}
          onClose={closeGlobalModal}
          variant={modalState.type === "error" ? "danger" : "default"}
          primaryAction={{
            label: "Cerrar",
            onClick: closeGlobalModal
          }}
        >
          <p>{modalState.message}</p>
        </GlobalModal>
      )}
    </>
  );
}