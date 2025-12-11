import { useState } from "react";
import "./DownloadModal.scss";
import { X } from "lucide-react";

export default function DownloadFormModal({ open, onClose, resource, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, resourceId: resource.id });
    setName("");
    setEmail("");
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
          Déjanos tu nombre y correo para enviarte recursos de interés 💌
        </p>

        <form className="download-modal__form" onSubmit={handleSubmit}>
          <label>
            Nombre
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <button type="submit" className="download-modal__btn">
            Continuar y descargar →
          </button>
        </form>
      </div>
    </div>
  );
}
