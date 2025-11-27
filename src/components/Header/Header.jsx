import { useState } from "react";
import "./Header.scss";
import ContactModal from "../ContactModal/ContactModal";
import NavBar from "../NavBar/NavBar";
import logo from "../../assets/logo/logo-rs.png";

export default function Header() {
  const [openModal, setOpenModal] = useState(false);
  return (
    <>
      <header className="header" role="banner">
        <div className="header-container">
          <a href="/" className="header-logo">
            <img src={logo} alt="Reverso Social logo" />
          </a>
          <NavBar />

          <button 
            className="header-contact-btn"
            onClick={() => setOpenModal(true)}
          >
            Contáctanos
          </button>

        </div>
      </header>
      <ContactModal 
        open={openModal} 
        onClose={() => setOpenModal(false)} 
      />
    </>
  );
}
