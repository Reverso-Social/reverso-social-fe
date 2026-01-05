import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation('resources');
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
      setError(t('error'));
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
          alert(t('modals.resourceUnavailable'));
        }
        setDownloadSuccessModal(false);
      }, 3000);

    } catch (error) {
      console.error("Error al guardar lead:", error.response?.data || error);
      alert(t('modals.errorSavingLead'));
    }
  };

  const handleDownload = (resource) => {
    if (!resource.isPublic && !isAuthenticated) {
      alert(t('modals.requiresAuth'));
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
            {t('hero.backLink')}
          </Link>
          <h1 className="resources-hero-title">
            <span className="title-gradient">{t('hero.title')}</span>{' '}{t('hero.titleSuffix')}
          </h1>
          <p className="resources-hero-subtitle">
            {t('hero.subtitle')}
          </p>
        </div>
      </section>

      <section className="resources-content">
        <div className="resources-container">
          {loading && (
            <div className="resources-loading">
              <div className="spinner"></div>
              <p>{t('loading')}</p>
            </div>
          )}

          {error && !loading && (
            <div className="resources-error">
              <p>{error}</p>
            </div>
          )}

          {!loading && !error && resources.length === 0 && (
            <div className="resources-empty">
              <p>{t('empty')}</p>
            </div>
          )}

          {!loading && !error && resources.length > 0 && (
            <>
              <div className="resources-filter">
                <p className="resources-count">
                  {t(resources.length === 1 ? 'count' : 'count_plural', { count: resources.length })}
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
                        <span className="resource-badge">{t('private')}</span>
                      )}
                    </div>

                    <h3 className="resource-title">{resource.title}</h3>
                    <p className="resource-description">{resource.description}</p>

                    {resource.downloadCount > 0 && (
                      <p className="resource-downloads">
                        {resource.downloadCount} {t(resource.downloadCount === 1 ? 'download' : 'download_plural')}
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
                        ? t('btnDownload')
                        : t('btnRequestAccess')}
                      <span className="btn-arrow">→</span>
                    </button>
                  </article>
                ))}
              </div>
            </>
          )}

          <div className="resources-cta">
            <h2>{t('cta.title')}</h2>
            <p>{t('cta.description')}</p>
            <button
              className="cta-btn"
              onClick={() => setIsContactOpen(true)}
              type="button"
            >
              {t('cta.button')}
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
        title={t('modals.downloadSuccess')}
        variant="small"
        showCloseButton={false}
        onClose={() => setDownloadSuccessModal(false)}
      >
        <p style={{ textAlign: "center", margin: "1rem 0", fontSize: "1.1rem" }}>
          {t('modals.downloadReady')}
        </p>
      </GlobalModal>

    </div>
  );
}
