import { useState } from "react";
import "./DownloadModal.scss";
import { X } from "lucide-react";

export default function DownloadFormModal({ open, onClose, resource, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const validateField = (fieldName, value) => {
    let error = "";
    if (fieldName === "name") {
      if (!value.trim()) error = "El nombre es obligatorio";
    }
    if (fieldName === "email") {
      if (!value.trim()) {
        error = "El email es obligatorio";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Formato de email inválido";
      }
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name: fieldName, value } = e.target;
    // Map input names to state if needed, or just use separate handlers.
    // Easier to use generic handler if inputs have name attribute.
    const error = validateField(fieldName, value);
    setErrors((prev) => ({ ...prev, [fieldName]: error }));
  };

  const handleChange = (e, setter) => {
    const { name: fieldName, value } = e.target;
    setter(value);
    if (errors[fieldName]) {
      setErrors((prev) => ({ ...prev, [fieldName]: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nameError = validateField("name", name);
    const emailError = validateField("email", email);

    if (nameError || emailError) {
      setErrors({ name: nameError, email: emailError });
      return;
    }

    onSubmit({ name, email, resourceId: resource.id });
    setName("");
    setEmail("");
    setErrors({});
  };

  return (
    <div className="download-modal__overlay">
      <div className="download-modal">
        <button className="download-modal__close" onClick={onClose}>
          <X size={22} />
        </button>

        <h2 className="download-modal__title">
          Antes de descargar…
        </h2>

        <p className="download-modal__text">
          Déjanos tu nombre y correo electrónico para acceder a tu descarga 💌
        </p>

        <form className="download-modal__form" onSubmit={handleSubmit} noValidate>
          <label>
            Nombre
            <input
              type="text"
              name="name"
              required
              value={name}
              onChange={(e) => handleChange(e, setName)}
              onBlur={handleBlur}
              className={errors.name ? "error" : ""}
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={(e) => handleChange(e, setEmail)}
              onBlur={handleBlur}
              className={errors.email ? "error" : ""}
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </label>

          <button type="submit" className="download-modal__btn">
            Continuar y descargar →
          </button>
        </form>
      </div>
    </div>
  );
}
