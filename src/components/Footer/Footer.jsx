import "./Footer.scss";
import logoRS from "../../assets/logo/logo.2.svg";
import { FaLinkedin, FaInstagram, FaXTwitter } from "react-icons/fa6";

//revisar semantica no tantos divs. 
//alts mas descriptivos.

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__brand">
          <div className="footer__brand-header">
            <img src={logoRS} alt="Reverso Social" className="footer__logo" />
            <h3 className="footer__title">Reverso Social</h3>
          </div>
          <p className="footer__description">
            Consultoría Social de Género comprometida con la transformación
            feminista de la sociedad.
          </p>
        </div>

        <div className="footer__nav">
          <h4 className="footer__heading">Navegación</h4>
          <ul className="footer__links">
            <li>
              <a href="#sobre-nosotros">Sobre nosotres</a>
            </li>
            <li>
              <a href="#servicios">Servicios</a>
            </li>
            <li>
              <a href="#incidencia">Incidencia</a>
            </li>
            <li>
              <a href="/recursos">Recursos</a>
            </li>
          </ul>
        </div>

        <div className="footer__contact">
          <h4 className="footer__heading">Contacto</h4>
          <ul className="footer__contact-list">
            <li>
              <a href="mailto:reversocial@reversocial.org">
                reversocial@reversocial.org
              </a>
            </li>
            <li>
              <a href="tel:+34000000000">+34 000 000 000</a>
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

        <div className="footer__social">
          <h4 className="footer__heading">Síguenos</h4>
          <div className="footer__social-icons">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter/X"
            >
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">
          © 2025 Reverso Social - CIF G22598882. Todos los derechos reservados.
        </p>
        <div className="footer__legal">
          <a href="#privacidad">Política de Privacidad</a>
          <span className="footer__separator">|</span>
          <a href="#cookies">Cookies</a>
          <span className="footer__separator">|</span>
          <a href="#aviso-legal">Aviso Legal</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;