import "./NavBar.scss";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavBar() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (e, sectionId) => {
    e.preventDefault();

    if (location.pathname !== "/") {
      // Estamos en otra página → Navegar primero al home
      navigate("/");

      // Esperar a que cargue el home
      setTimeout(() => scrollToSection(sectionId), 50);
    } else {
      // Estamos en el Home → Scroll directo
      scrollToSection(sectionId);
    }
  };

  return (
    <nav className="nav" aria-label="Menú principal">
      <ul className="nav-list">

        <li>
          <button 
            className="nav-link"
            onClick={(e) => handleNavClick(e, "sobre-nosotros")}
          >
            Sobre Nosotres
          </button>
        </li>

        <li>
          <button 
            className="nav-link"
            onClick={(e) => handleNavClick(e, "que-hacemos")}
          >
            Qué Hacemos
          </button>
        </li>

        <li>
          {/* Esta sí es ruta real */}
          <button 
            className="nav-link"
            onClick={() => navigate("/recursos")}
          >
            Recursos
          </button>
        </li>

        <li>
          <button 
            className="nav-link"
            onClick={(e) => handleNavClick(e, "incidencia")}
          >
            Incidencia
          </button>
        </li>

      </ul>
    </nav>
  );
}
