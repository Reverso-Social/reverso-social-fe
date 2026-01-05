import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./DownloadModal.scss";
import { X } from "lucide-react";

export default function DownloadFormModal({ open, onClose, resource, onSubmit }) {
  const { t } = useTranslation('forms');
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [hasAcceptedPolicy, setHasAcceptedPolicy] = useState(false);
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const validateField = (fieldName, value) => {
    let error = "";
    if (fieldName === "name") {
      if (!value.trim()) error = t('validation.nameRequired');
    }
    if (fieldName === "email") {
      if (!value.trim()) {
        error = t('validation.emailRequired');
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        error = t('validation.emailInvalid');
      }
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name: fieldName, value } = e.target;
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

    if (!hasAcceptedPolicy) {
      setErrors({ policy: t('validation.policyRequired') });
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
          {t('download.title')}
        </h2>

        <p className="download-modal__text">
          {t('download.description')}
        </p>

        <form className="download-modal__form" onSubmit={handleSubmit} noValidate>
          <label>
            {t('download.name')}
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
            {t('download.email')}
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

          <label className="download-modal__checkbox">
            <input
              type="checkbox"
              checked={hasAcceptedPolicy}
              onChange={(e) => {
                setHasAcceptedPolicy(e.target.checked);
                if (errors.policy) setErrors({ ...errors, policy: "" });
              }}
            />
            <span>
              {t('download.acceptPolicy')}{" "}
              <Link to="/politica-privacidad" target="_blank">
                {t('download.privacyPolicy')}
              </Link>
            </span>
            {errors.policy && <span className="error-text" style={{ display: 'block', width: '100%' }}>{errors.policy}</span>}
          </label>

          <button type="submit" className="download-modal__btn">
            {t('download.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
