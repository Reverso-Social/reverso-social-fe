import { useState } from "react";
import "./Header.scss";
import ContactModal from "../ContactModal/ContactModal";

export default function Header() {

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <header className="header" role="banner">
        <nav className="header-nav" aria-label="Menú principal">
          <ul className="nav-list">
            <li><a href="#sobre-nosotras">Sobre nosotras</a></li>
            <li><a href="#nuestro-trabajo">Nuestro trabajo</a></li>
            <li><a href="#blog">Blog</a></li>
            <li>
              <button 
                className="header-contact-btn"
                onClick={() => setOpenModal(true)}
              >
                Contacto
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <ContactModal 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
      />
    </>
  );
}
