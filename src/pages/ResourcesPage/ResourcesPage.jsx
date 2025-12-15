import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ResourcesPage.scss";
import { IoNewspaperSharp } from "react-icons/io5";
import { FaChartBar, FaClipboard, FaPhotoVideo } from "react-icons/fa";
import { GrWorkshop } from "react-icons/gr";
import { GoChecklist } from "react-icons/go";
import resourceService from "../../api/resourceService";
import authService from "../../api/authService";
import DownloadFormModal from "../../components/DownloadModal/DownloadModal";
import downloadLeadService from "../../data/downloadLeadService";

// Mapeo de iconos por tipo de recurso
const resourceIcons = {
  GUIDE: <IoNewspaperSharp />,
  REPORT: <FaChartBar />,
  VIDEO: <FaPhotoVideo />,
  ARTICLE: <FaClipboard />,
  OTHER: <GoChecklist />,
};

// Mapeo de colores por tipo
const resourceColors = {
  GUIDE: "turquesa",
  REPORT: "lila",
  VIDEO: "turquesa",
  ARTICLE: "lila",
  OTHER: "turquesa",
};

export default function ResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const isAuthenticated = authService.isAuthenticated();
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const data = isAuthenticated
          ? await resourceService.getAll()
          : await resourceService.getPublic();
        setResources(data);
      } catch (err) {
        console.error("Error al cargar recursos:", err);
        setError("No se pudieron cargar los recursos");
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, [isAuthenticated]);

  const handleLeadSubmit = async (formData) => {
    console.log('📤 Enviando lead:', formData);

    try {
      const response = await downloadLeadService.createLead({
        name: formData.name,
        email: formData.email,
        resourceId: formData.resourceId
      });

      console.log('✅ Lead guardado:', response);

      if (selectedResource?.fileUrl) {
        let downloadUrl = selectedResource.fileUrl;
      
      if (!downloadUrl.startsWith('http')) {
        const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
        const BASE_URL = API_BASE.replace('/api', ''); // Remover /api del final
        downloadUrl = `${BASE_URL}${downloadUrl}`;
      }
      
      console.log('📥 Descargando archivo:', downloadUrl);
      window.open(downloadUrl, "_blank");
      } else {
        console.warn('⚠️ El recurso no tiene fileUrl:', selectedResource);
        alert("Recurso guardado, pero el archivo no está disponible temporalmente.");
      }

      setShowModal(false);

    } catch (error) {
      console.error("❌ Error al guardar lead:", error.response?.data || error);
      alert("Hubo un error al guardar tus datos. Por favor, intenta de nuevo.");
    }
  };

  const handleDownload = (resource) => {
    if (!resource.isPublic && !isAuthenticated) {
      alert("Este recurso requiere registro. Por favor, inicia sesión para acceder.");
      return;
    }

    setSelectedResource(resource);
    setShowModal(true);
  };

  return (
    <div className="resources-page">
      <section className="resources-hero">
        <div className="resources-hero-content">
          <Link to="/" className="back-link">
            ← Volver al inicio
          </Link>
          <h1 className="resources-hero-title">
            <span className="title-gradient">Recursos</span> para el cambio
          </h1>
          <p className="resources-hero-subtitle">
            Herramientas, guías y materiales para impulsar la igualdad en tu
            organización
          </p>
        </div>
      </section>

      <section className="resources-content">
        <div className="resources-container">
          {loading && (
            <div className="resources-loading">
              <div className="spinner"></div>
              <p>Cargando recursos...</p>
            </div>
          )}

          {error && !loading && (
            <div className="resources-error">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && resources.length === 0 && (
            <div className="resources-empty">
              <p>No hay recursos disponibles en este momento.</p>
            </div>
          )}

          {!loading && !error && resources.length > 0 && (
            <>
              <div className="resources-filter">
                <p className="resources-count">
                  {resources.length} recurso{resources.length !== 1 ? "s" : ""} disponible
                  {resources.length !== 1 ? "s" : ""}
                </p>
              </div>

              <div className="resources-grid">
                {resources.map((resource) => (
                  <article
                    key={resource.id}
                    className={`resource-card ${resourceColors[resource.type] || "turquesa"}`}
                  >
                    <div className="resource-header">
                      <div className="resource-icon">
                        {resourceIcons[resource.type] || <IoNewspaperSharp />}
                      </div>
                      <span className="resource-type">{resource.type}</span>
                      {!resource.isPublic && (
                        <span className="resource-badge">🔒 Privado</span>
                      )}
                    </div>

                    <h3 className="resource-title">{resource.title}</h3>
                    <p className="resource-description">{resource.description}</p>

                    {resource.downloadCount > 0 && (
                      <p className="resource-downloads">
                        {resource.downloadCount} descarga{resource.downloadCount !== 1 ? "s" : ""}
                      </p>
                    )}

                    <button
                      className="resource-btn"


                      onClick={() => {
                        setSelectedResource(resource);
                        setShowModal(true);
                      }}
                    >
                      {resource.isPublic || isAuthenticated
                        ? "Descargar"
                        : "Solicitar acceso"}
                      <span className="btn-arrow">→</span>
                    </button>
                  </article>
                ))}
              </div>
            </>
          )}

          <div className="resources-cta">
            <h2>¿No encuentras lo que buscas?</h2>
            <p>Podemos crear recursos personalizados para tu organización</p>
            <Link to="/#contacto" className="cta-btn">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>

      <DownloadFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        resource={selectedResource}
        onSubmit={handleLeadSubmit}
      />

    </div>
  );
}