import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "./styles/main.scss";
import App from "./App.jsx";

// Importar configuración de i18n
import "./config/i18n";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HelmetProvider>
      <Suspense fallback={<div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#333'
      }}>
        Cargando...
      </div>}>
        <App />
      </Suspense>
    </HelmetProvider>
  </StrictMode>
);
