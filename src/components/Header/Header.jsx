import { useState, useEffect } from "react";
import "./Header.scss";
import ContactModal from "../ContactModal/ContactModal";
import NavBar from "../NavBar/NavBar";
import logo from "../../assets/logo/logo.2.svg";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  return (
    <>
      <header className={`header ${scrolled ? "header--scrolled" : ""}`}>
        <div className="header-container">
          <a href="/" className="header-logo">
            <img src={logo} alt="Reverso Social logo" />
            <span className="header-logo__text">Reverso Social</span>
          </a>

          <div className="header-right nav-desktop">
            <NavBar />
            <button
              className="header-contact-btn"
              onClick={() => setOpenModal(true)}
            >
              Contáctanos
            </button>
          </div>

          <button
            className={`menu-toggle ${menuOpen ? "open" : ""}`}
            aria-label="Abrir o cerrar menú de navegación"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(prev => !prev)}
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
          <NavBar onItemClick={() => setMenuOpen(false)} />

          <button
            className="mobile-contact-btn"
            onClick={() => {
              setOpenModal(true);
              setMenuOpen(false);
            }}
          >
            Contáctanos
          </button>
        </div>
      </header>

      <ContactModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}