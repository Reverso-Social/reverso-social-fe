import { useState } from "react";
import { X, Mail, Lock } from "lucide-react";
import authService from "../../api/authService";
import "./LoginModal.scss";

export default function LoginModal({ open, onClose }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const validate = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Formato de email inválido";
    }
    if (!formData.password.trim()) {
      newErrors.password = "La contraseña es obligatoria";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setStatus({ type: "", message: "" });

    try {
      await authService.login(formData.email, formData.password);
      
      setStatus({ type: "success", message: "¡Bienvenida!" });
      
      setTimeout(() => {
        onClose(true);
      }, 800);
    } catch (error) {
      const message = error.response?.data?.error || 
                     error.response?.data?.message ||
                     "Error al iniciar sesión. Verifica tus credenciales.";
      
      setStatus({ type: "error", message });
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("login-modal__overlay")) {
      onClose(false);
    }
  };

  return (
    <div className="login-modal__overlay" onClick={handleOverlayClick}>
      <div className="login-modal__container">
        <button className="login-modal__close" onClick={() => onClose(false)} aria-label="Cerrar">
          <X size={22} />
        </button>

        <h2 className="login-modal__title">Acceso Intranet</h2>
        <p className="login-modal__subtitle">Equipo Reverso Social</p>

        <form className="login-modal__form" onSubmit={handleSubmit}>
          <div className="login-modal__field">
            <label htmlFor="login-email">Email</label>
            <div className={`login-modal__input-wrapper ${errors.email ? "error" : ""}`}>
              <Mail className="icon" size={20} />
              <input
                id="login-email"
                type="email"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                disabled={loading}
                autoComplete="email"
              />
            </div>
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="login-modal__field">
            <label htmlFor="login-password">Contraseña</label>
            <div className={`login-modal__input-wrapper ${errors.password ? "error" : ""}`}>
              <Lock className="icon" size={20} />
              <input
                id="login-password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                disabled={loading}
                autoComplete="current-password"
              />
            </div>
            {errors.password && <span className="error-text">{errors.password}</span>}
          </div>

          <button type="submit" className="login-modal__submit" disabled={loading}>
            {loading ? "Ingresando..." : "Ingresar"}
          </button>

          {status.message && (
            <p className={`login-modal__status login-modal__status--${status.type}`}>
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}