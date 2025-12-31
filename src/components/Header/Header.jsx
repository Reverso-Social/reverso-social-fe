import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Header.scss";
import ContactModal from "../ContactModal/ContactModal";
import GlobalModal from "../GlobalModal/GlobalModal";
import NavBar from "../NavBar/NavBar";
import UserMenu from "../UserMenu/UserMenu";
import LanguageSwitcher from "../LanguageSwitcher/LanguageSwitcher";
import logo from "../../assets/logo/logo.2.svg";
import authService from "../../api/authService";

export default function Header() {
  const { t } = useTranslation('translation');
  const [openModal, setOpenModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  useEffect(() => {
    setOpenModal(false);
    setMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    authService.logout();
    setUser(null);
    setLogoutModalOpen(true);
    navigate("/");
  };

  return (
    <>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="header-container">
          <Link to="/" className="header-logo">
            <img src={logo} alt="Reverso Social logo" />
            <span className="header-logo__text">Reverso Social</span>
          </Link>

          <div className="header-right nav-desktop">
            <LanguageSwitcher />
            <NavBar />
            {user ? (
              <UserMenu user={user} onLogout={handleLogout} />
            ) : (
              <button
                className="header-contact-btn"
                onClick={() => setOpenModal(true)}
              >
                {t('footer.contact')}
              </button>
            )}
          </div>

          <button
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            aria-label={t('header.toggleMenu')}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div
          id="mobile-menu"
          className={`mobile-menu ${menuOpen ? "mobile-menu--open" : ""}`}
        >
          <div className="mobile-menu__inner">
            <LanguageSwitcher />
            <NavBar onItemClick={() => setMenuOpen(false)} />

            {user ? (
              <UserMenu
                user={user}
                onLogout={handleLogout}
                isMobile={true}
                onClose={() => setMenuOpen(false)}
              />
            ) : (
              <button
                className="mobile-contact-btn"
                onClick={() => {
                  setOpenModal(true);
                  setMenuOpen(false);
                }}
              >
                {t('footer.contact')}
              </button>
            )}
          </div>
        </div>
      </header>

      <ContactModal open={openModal} onClose={() => setOpenModal(false)} />

      <GlobalModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        title={t('header.logoutTitle')}
        variant="default"
        primaryAction={{
          label: t('common.close'),
          onClick: () => setLogoutModalOpen(false)
        }}
        closeOnOverlayClick={true}
      >
        <p>{t('header.logoutMessage')}</p>
      </GlobalModal>
    </>
  );
}