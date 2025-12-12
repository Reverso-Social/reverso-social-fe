import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Footer.scss";
import logoRS from "../../assets/logo/logo.2.svg";
import { FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";
import LoginModal from "../LoginModal/LoginModal";
import authService from "../../api/authService";

const Footer = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const authenticated = authService.isAuthenticated();
      setIsAuthenticated(authenticated);
    };
    
    checkAuth();
  }, [location.pathname]);

  const handleModalClose = (loginSuccess = false) => {
    setOpenLoginModal(false);
    
    if (loginSuccess) {
      navigate("/admin");
    } else {
      setTimeout(() => {
        setIsAuthenticated(authService.isAuthenticated());
      }, 100);
    }
  };

  return (
    <>
      <footer className="footer" aria-label="Pie de página de Reverso Social">
        <div className="footer__container">
          <div className="footer__brand">
            <div className="footer__brand-header">
              <img src={logoRS} alt="Reverso Social" className="footer__logo" />
              <h3 className="footer__title">Reverso Social</h3>
            </div>
            <p className="footer__description">
              Consultoría Social de Género comprometida con la transformación feminista de la sociedad.
            </p>
          </div>

          <nav className="footer__nav" aria-labelledby="footer-nav-heading" role="navigation">
            <h4 id="footer-nav-heading" className="footer__heading">
              Navegación
            </h4>
            <ul className="footer__links">
              <li>
                <Link to="#sobre-nosotros">Sobre nosotras</Link>
              </li>
              <li>
                <Link to="#servicios">Servicios</Link>
              </li>
              <li>
                <Link to="#incidencia">Incidencia</Link>
              </li>
              <li>
                <Link to="/recursos">Recursos</Link>
              </li>
            </ul>
          </nav>

          <div className="footer__contact" aria-labelledby="footer-contact-heading">
            <h4 id="footer-contact-heading" className="footer__heading">
              Contacto
            </h4>
            <ul className="footer__contact-list">
              <li>
                <a href="mailto:reversocial@reversocial.org" aria-label="Enviar correo a reversocial@reversocial.org">
                  reversocial@reversocial.org
                </a>
              </li>
              <li>
                <a href="tel:+34000000000" aria-label="Llamar a Reverso Social al +34 000 000 000">
                  +34 000 000 000
                </a>
              </li>
              <li>
                <address>
                  C/Blas de Otero, 69, 11ºD
                  <br />
                  28017 Madrid
                </address>
              </li>
            </ul>
          </div>

          <nav className="footer__social" aria-labelledby="footer-social-heading" role="navigation">
            <h4 id="footer-social-heading" className="footer__heading">
              Síguenos
            </h4>
            <div className="footer__social-icons" aria-label="Redes sociales de Reverso Social">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedin />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <FaInstagram />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter/X">
                <FaXTwitter />
              </a>
            </div>
          </nav>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; 2025 Reverso Social - CIF G22598882. Todos los derechos reservados.
          </p>
          <nav className="footer__legal" aria-label="Enlaces legales y de políticas">
            <Link to="#privacidad">Política de Privacidad</Link>
            <span className="footer__separator">|</span>
            <Link to="#cookies">Cookies</Link>
            <span className="footer__separator">|</span>
            <Link to="#aviso-legal">Aviso Legal</Link>
            <span className="footer__separator">|</span>
            
            {!isAuthenticated && (
              <button onClick={() => setOpenLoginModal(true)} className="footer__intranet-btn">
                Intranet
              </button>
            )}
          </nav>
        </div>
      </footer>

      <LoginModal open={openLoginModal} onClose={handleModalClose} />
    </>
  );
};

export default Footer;