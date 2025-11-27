import { useState } from "react";
import Background from "./components/Background/Background";
import Hero from "./components/Hero/Hero";
import Header from "./components/Header/Header";
import ContactModal from "./components/ContactModal/ContactModal";
import TeamSection from "./components/TeamSection/TeamSection";
import "./styles/main.scss";

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Header onOpenModal={() => setOpenModal(true)} />

      <Background>
        <Hero />
      </Background>

      
      <TeamSection />
      

      <ContactModal open={openModal} onClose={() => setOpenModal(false)} />
    </>
  );
}

export default App;
