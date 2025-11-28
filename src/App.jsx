import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import ContactModal from "./components/ContactModal/ContactModal";
import HomePage from "./pages/HomePage/HomePage";
import ResourcesPage from "./pages/ResourcesPage/ResourcesPage";
import "./styles/main.scss";

function App() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <Router>
      <Header onOpenModal={() => setOpenModal(true)} />
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recursos" element={<ResourcesPage />} />
      </Routes>

      <ContactModal open={openModal} onClose={() => setOpenModal(false)} />
    </Router>
  );
}

export default App;