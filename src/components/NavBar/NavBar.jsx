import React from "react"; // Buena práctica importarlo
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./NavBar.scss";

export default function NavBar({ onItemClick = () => {} }) {
  const location = useLocation();
  const navigate = useNavigate();

const navLinks = [
  { label: "Sobre Nosotras", path: "/", hash: "sobre-nosotros" },
  { label: "Qué Hacemos", path: "/", hash: "servicios" }, 
  { label: "Recursos", path: "/recursos", hash: null },
  { label: "Incidencia", path: "/", hash: "incidencia" },
  { label: "Blog", path: "/blog", hash: null },
];

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleNavClick = (e, link) => {
    if (link.hash) {
      e.preventDefault(); 
      if (location.pathname === "/") {
        handleScrollToSection(link.hash);
      } 
      else {
        navigate("/");
                setTimeout(() => {
          handleScrollToSection(link.hash);
        }, 100);       }
    }
    onItemClick();
  };

  return (
    <nav className="nav" aria-label="Menú principal">
      <ul className="nav-list">
        {navLinks.map((link) => (
          <li key={link.label}>
            <Link
              to={link.hash ? `/#${link.hash}` : link.path}
              className="nav-link"
              onClick={(e) => handleNavClick(e, link)}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}