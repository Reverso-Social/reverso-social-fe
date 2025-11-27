import { useState } from "react";
import Background from "./components/Background/Background";
import Hero from "./components/Hero/Hero";
import About from "./components/about/About";
import Header from "./components/Header/Header";
import ContactModal from "./components/ContactModal/ContactModal";
import "./styles/main.scss";

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Header onOpenModal={() => setOpenModal(true)} />

      <Background>
        <Hero />
      </Background>
      <About />

      <ContactModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default App;