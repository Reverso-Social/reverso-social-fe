import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import HomePage from "./pages/HomePage/HomePage";
import ResourcesPage from "./pages/ResourcesPage/ResourcesPage";
import BlogPage from "./pages/BlogPage/BlogPage";
import BlogDetail from "./pages/BlogDetail/BlogDetail";
import ServiceDetail from "./pages/ServicePage/ServicePage";
import AdminDashboard from "./pages/AdminDashboard/AdminDashboard";
import "./styles/main.scss";

function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Header />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/recursos" element={<ResourcesPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/servicios/:id" element={<ServiceDetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;