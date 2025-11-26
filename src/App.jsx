import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./componentes/Header/Header";
import Footer from "./componentes/Footer/Footer";
import Home from "./pages/Home/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="app-root">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>

      <Footer />
    </BrowserRouter>
  );
}
