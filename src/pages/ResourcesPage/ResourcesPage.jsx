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
import GlobalModal from "../../components/GlobalModal/GlobalModal";
import downloadLeadService from "../../data/downloadLeadService";
import ContactModal from "../../components/ContactModal/ContactModal";

const resourceIcons = {
  GUIDE: <IoNewspaperSharp />,
  REPORT: <FaChartBar />,
  VIDEO: <FaPhotoVideo />,
  ARTICLE: <FaClipboard />,
  OTHER: <GoChecklist />,
};

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
  const [downloadSuccessModal, setDownloadSuccessModal] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedResource, setSelectedResource] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);

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

  useEffect(() => {
    fetchResources();
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isContactOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isContactOpen]);

  const handleLeadSubmit = async (formData) => {
    try {
      await downloadLeadService.createLead({
        name: formData.name,
        email: formData.email,
        resourceId: formData.resourceId
      });

      // Prepare URL
      let url = "";
      if (selectedResource?.fileUrl) {
        url = selectedResource.fileUrl;
        if (!url.startsWith('http')) {
          const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';
          const BASE_URL = API_BASE.replace('/api', '');
          url = `${BASE_URL}${url}`;
        }
      }

      setDownloadUrl(url);
      setShowModal(false);
      setDownloadSuccessModal(true);

      setDownloadSuccessModal(true);

      await fetchResources();

      setTimeout(() => {
        if (url) {
          window.open(url, "_blank");
        } else {
          alert("Recurso guardado, pero el archivo no está disponible temporalmente.");
        }
        setDownloadSuccessModal(false);
      }, 3000);

    } catch (error) {
      console.error("Error al guardar lead:", error.response?.data || error);
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
      <ContactModal
        open={isContactOpen}
        onClose={() => setIsContactOpen(false)}
        defaultIntereses={"Hola, me interesa hablar sobre recursos personalizados para mi organización."}
      />

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
            <button
              className="cta-btn"
              onClick={() => setIsContactOpen(true)}
              type="button"
            >
              Contáctanos
            </button>
          </div>
        </div>
      </section>

      <DownloadFormModal
        open={showModal}
        onClose={() => setShowModal(false)}
        resource={selectedResource}
        onSubmit={handleLeadSubmit}
      />

      <GlobalModal
        open={downloadSuccessModal}
        title="¡Descarga iniciada!"
        variant="small"
        showCloseButton={false}
        onClose={() => setDownloadSuccessModal(false)}
      >
        <p style={{ textAlign: "center", margin: "1rem 0", fontSize: "1.1rem" }}>
          Tu descarga estará lista en un instante
        </p>
      </GlobalModal>

    </div>
  );
}
