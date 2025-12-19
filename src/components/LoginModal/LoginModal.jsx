import { useState } from "react";
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import authService from "../../api/authService";
import GlobalModal from "../GlobalModal/GlobalModal";
import "./LoginModal.scss";

export default function LoginModal({ open, onClose }) {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);

  if (!open) return null;

  const validateField = (name, value) => {
    let error = "";
    if (name === "email") {
      if (!value.trim()) {
        error = "El email es obligatorio";
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = "Formato de email inválido";
      }
    }
    if (name === "password") {
      if (!value.trim()) {
        error = "La contraseña es obligatoria";
      }
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};
    const emailError = validateField("email", formData.email);
    if (emailError) newErrors.email = emailError;

    const passwordError = validateField("password", formData.password);
    if (passwordError) newErrors.password = passwordError;

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
    <>
      <div className="login-modal__overlay" onClick={handleOverlayClick}>
        <div className="login-modal__container">
          <button className="login-modal__close" onClick={() => onClose(false)} aria-label="Cerrar">
            <X size={22} />
          </button>

          <h2 className="login-modal__title">Acceso Intranet</h2>
          <p className="login-modal__subtitle">Equipo Reverso Social</p>

          <form className="login-modal__form" onSubmit={handleSubmit} noValidate>
            <div className="login-modal__field">
              <label htmlFor="login-email">Email</label>
              <div className={`login-modal__input-wrapper ${errors.email ? "error" : ""}`}>
                <Mail className="icon" size={20} />
                <input
                  id="login-email"
                  name="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
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
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={loading}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle-btn"
                  aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <span className="error-text">{errors.password}</span>}
            </div>

            <button type="submit" className="login-modal__submit" disabled={loading}>
              {loading ? "Ingresando..." : "Ingresar"}
            </button>

            {status.type === 'success' && status.message && (
              <p className={`login-modal__status login-modal__status--${status.type}`}>
                {status.message}
              </p>
            )}
          </form>
        </div>
      </div>

      <GlobalModal
        open={errorModalOpen}
        onClose={() => setErrorModalOpen(false)}
        title="Error de inicio de sesión"
        variant="default"
        primaryAction={{
          label: "Entendido",
          onClick: () => setErrorModalOpen(false)
        }}
      >
        <p>Comprueba tu contraseña y vuelve a intentarlo.</p>
      </GlobalModal>
    </>
  );
}