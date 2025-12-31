import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { User, LayoutDashboard, LogOut, ChevronDown } from "lucide-react";
import "./UserMenu.scss";

export default function UserMenu({ user, onLogout, isMobile = false, onClose = () => { } }) {
  const { t } = useTranslation('translation');
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleDashboardClick = () => {
    navigate("/admin");
    setIsOpen(false);
    if (isMobile) onClose();
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsOpen(false);
    if (isMobile) onClose();
  };

  if (isMobile) {
    return (
      <div className="user-menu-mobile">
        <button
          className="user-menu-mobile__btn"
          onClick={handleDashboardClick}
        >
          <LayoutDashboard size={18} />
          {t('userMenu.dashboard')}
        </button>
        <button
          className="user-menu-mobile__btn user-menu-mobile__btn--logout"
          onClick={handleLogoutClick}
        >
          <LogOut size={18} />
          {t('userMenu.logout')}
        </button>
      </div>
    );
  }

  return (
    <div className="user-menu" ref={menuRef}>
      <button
        className="user-menu__trigger"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <User size={20} />
        <span>{t('userMenu.user')}</span>
        <ChevronDown size={16} className={`user-menu__chevron ${isOpen ? "user-menu__chevron--open" : ""}`} />
      </button>

      {isOpen && (
        <div className="user-menu__dropdown">
          <div className="user-menu__header">
            <p className="user-menu__name">{user.fullName}</p>
            <p className="user-menu__email">{user.email}</p>
          </div>

          <div className="user-menu__divider" />

          <button
            className="user-menu__item"
            onClick={handleDashboardClick}
          >
            <LayoutDashboard size={18} />
            {t('userMenu.dashboard')}
          </button>

          <div className="user-menu__divider" />

          <button
            className="user-menu__item user-menu__item--logout"
            onClick={handleLogoutClick}
          >
            <LogOut size={18} />
            {t('userMenu.logout')}
          </button>
        </div>
      )}
    </div>
  );
}