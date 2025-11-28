import { Link, useLocation } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Function to handle smooth scroll on home page or navigation
  const handleNavClick = (e, sectionId) => {
    if (isHomePage) {
      e.preventDefault();
      const element = document.querySelector(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <nav className="nav" aria-label="Menú principal">
      <ul className="nav-list">
        <li>
          <Link 
            to="/#sobre-nosotros"
            onClick={(e) => handleNavClick(e, "#sobre-nosotros")}
          >
            Sobre Nosotres
          </Link>
        </li>
        <li>
          <Link 
            to="/#que-hacemos"
            onClick={(e) => handleNavClick(e, "#que-hacemos")}
          >
            Qué Hacemos
          </Link>
        </li>
        <li>
          <Link to="/recursos">Recursos</Link>
        </li>
        <li>
          <Link 
            to="/#incidencia"
            onClick={(e) => handleNavClick(e, "#incidencia")}
          >
            Incidencia
          </Link>
        </li>
      </ul>
    </nav>
  );
}