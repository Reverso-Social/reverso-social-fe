import "./Header.scss";

export default function Header() {
  return (
    <header className="header" role="banner">
      <nav className="header-nav" aria-label="Menú principal">
        <ul className="nav-list">
          <li><a href="#sobre-nosotras">Sobre nosotras</a></li>
          <li><a href="#nuestro-trabajo">Nuestro trabajo</a></li>
          <li><a href="#blog">Blog</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
}
