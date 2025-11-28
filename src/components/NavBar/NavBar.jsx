// src/components/NavBar/NavBar.jsx

import "./NavBar.scss";

export default function NavBar() {

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="nav" aria-label="Menú principal">
      <ul className="nav-list">
        
        <li>
          <button 
            className="nav-link"
            onClick={() => scrollToSection("about")}
          >
            Sobre Nosotres
          </button>
        </li>

        <li>
          <button 
            className="nav-link"
            onClick={() => scrollToSection("services")}
          >
            Qué Hacemos
          </button>
        </li>

        <li>
          <button 
            className="nav-link"
            onClick={() => scrollToSection("resources")}
          >
            Recursos
          </button>
        </li>

        <li>
          <button 
            className="nav-link"
            onClick={() => scrollToSection("incidencia")}
          >
            Incidencia
          </button>
        </li>

      </ul>
    </nav>
  );
}
