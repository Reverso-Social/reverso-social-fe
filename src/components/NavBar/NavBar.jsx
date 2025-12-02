import "./NavBar.scss";
import { useLocation, useNavigate } from "react-router-dom";

export default function NavBar({ onItemClick = () => {} }) {
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
      navigate("/");
      setTimeout(() => {
        scrollToSection(sectionId);
        onItemClick();
      }, 50);
    } else {

      scrollToSection(sectionId);
      onItemClick();
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
            Sobre Nosotras
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
          <button 
            className="nav-link"
            onClick={() => {
              navigate("/recursos");
              onItemClick();
            }}
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

        <li>
          <button 
            className="nav-link"
            onClick={() => {
              navigate("/blog"); 
              onItemClick();     
            }}
          >
            Blog
          </button>
        </li>

      </ul>
    </nav>
  );
}
