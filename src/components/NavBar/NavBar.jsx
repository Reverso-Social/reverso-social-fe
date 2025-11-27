import "./NavBar.scss";

export default function NavBar() {
  return (
    <nav className="nav" aria-label="Menú principal">
      <ul className="nav-list">
        <li><a href="#sobre-nosotros">Sobre Nosotres</a></li>
        <li><a href="#que-hacemos">Qué Hacemos</a></li>
        <li><a href="#recursos">Recursos</a></li>
        <li><a href="#incidencia">Incidencia</a></li>
      </ul>
    </nav>
  );
}
