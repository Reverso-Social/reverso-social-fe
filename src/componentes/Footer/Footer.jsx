import "./Footer.scss";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-inner">
        <p>© 2025 Reverso Social. All rights reserved.</p>

        <nav aria-label="Enlaces del pie de página">
          <ul className="footer-links">
            <li><a href="#privacidad">Política de privacidad</a></li>
            <li><a href="#terminos">Términos y condiciones</a></li>
            <li><a href="#accesibilidad">Accesibilidad</a></li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
