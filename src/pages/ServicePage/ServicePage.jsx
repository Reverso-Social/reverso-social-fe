import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./ServicePage.scss";
import serviceService from "../../data/serviceService";
import { ArrowLeft, CheckCircle } from "lucide-react";

export default function ServiceDetail() {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const [serviceData, featuresData] = await Promise.all([
          serviceService.getServiceById(id),
          serviceService.getServiceFeatures(id)
        ]);
        setService(serviceData);
        setFeatures(featuresData);
      } catch (err) {
        console.error("Error al cargar servicio:", err);
        setError("No se pudo cargar el servicio");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [id]);

  if (loading) {
    return (
      <div className="service-detail-page">
        <div className="service-detail-loading">
          <div className="spinner"></div>
          <p>Cargando servicio...</p>
        </div>
      </div>
    );
  }

  if (error || !service) {
    return (
      <div className="service-detail-page">
        <div className="service-detail-error">
          <h2>Servicio no encontrado</h2>
          <p>{error || "El servicio que buscas no existe"}</p>
          <Link to="/" className="back-link-btn">
            <ArrowLeft size={20} />
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="service-detail-page">
      <section className="service-detail-hero">
        <div className="service-detail-hero__content">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Volver
          </Link>

          <div className="service-detail-hero__header">
            <span className="category-badge">{service.categoryName}</span>
            <h1 className="service-detail-title">{service.name}</h1>
            {service.shortDescription && (
              <p className="service-detail-subtitle">{service.shortDescription}</p>
            )}
          </div>
        </div>
      </section>

      <section className="service-detail-content">
        <div className="service-detail-container">
          <div className="service-detail-main">
            <div className="service-description">
              <h2>Descripción del servicio</h2>
              <p>{service.fullDescription || service.shortDescription}</p>
            </div>

            {features.length > 0 && (
              <div className="service-features">
                <h2>Características principales</h2>
                <ul className="features-list">
                  {features.map((feature) => (
                    <li key={feature.id} className="feature-item">
                      <div className="feature-icon">
                        <CheckCircle size={24} />
                      </div>
                      <div className="feature-content">
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="service-detail-sidebar">
            <div className="sidebar-card">
              <h3>¿Interesada en este servicio?</h3>
              <p>
                Contáctanos para obtener más información y un presupuesto
                personalizado.
              </p>
              <Link to="/#contacto" className="contact-btn">
                Solicitar información
              </Link>
            </div>

            {service.categoryName && (
              <div className="sidebar-card sidebar-info">
                <h4>Categoría</h4>
                <p>{service.categoryName}</p>
              </div>
            )}
          </aside>
        </div>
      </section>
    </div>
  );
}