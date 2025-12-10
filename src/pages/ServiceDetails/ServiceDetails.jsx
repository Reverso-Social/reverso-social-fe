import { useParams, useNavigate } from "react-router-dom";
import { servicesDetailedData } from "../../data/servicesDetailedData";
import { FaBalanceScale, FaArrowLeft, FaCheckCircle } from "react-icons/fa";
import { PiMoneyFill } from "react-icons/pi";
import { GiGraduateCap } from "react-icons/gi";
import { BsHouses } from "react-icons/bs";
import "./ServiceDetails.scss";

// Mapa de iconos
const iconMap = {
  FaBalanceScale: <FaBalanceScale />,
  PiMoneyFill: <PiMoneyFill />,
  GiGraduateCap: <GiGraduateCap />,
  BsHouses: <BsHouses />,
};

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const service = servicesDetailedData[id];

  if (!service) {
    return (
      <div className="service-details">
        <div className="service-details__container">
          <h1>Servicio no encontrado</h1>
          <button 
            onClick={() => navigate('/')}
            className="service-details__back-button"
          >
            <FaArrowLeft /> Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="service-details">
      {/* Hero Section */}
      <section className="service-details__hero">
        <div className="service-details__hero-content">
          <button 
            onClick={() => navigate('/')}
            className="service-details__back-link"
            aria-label="Volver al inicio"
          >
            <FaArrowLeft /> Volver
          </button>
          
          <div className="service-details__hero-icon">
            {iconMap[service.iconName]}
          </div>
          
          <span className="service-details__category">{service.category}</span>
          <h1 className="service-details__title">{service.title}</h1>
          <p className="service-details__description">{service.fullDescription}</p>
          
          {service.legalNote && (
            <div className="service-details__legal-note">
              {service.legalNote}
            </div>
          )}
        </div>
      </section>

      {/* Content Section */}
      <section className="service-details__content">
        <div className="service-details__container">
          
          {/* Features */}
          {service.features && (
            <div className="service-details__section">
              <h2 className="service-details__section-title">¿Qué incluye?</h2>
              <div className="service-details__features">
                {service.features.map((feature, index) => (
                  <div key={index} className="service-details__feature-card">
                    <div className="service-details__feature-icon">
                      <FaCheckCircle />
                    </div>
                    <div className="service-details__feature-content">
                      <h3 className="service-details__feature-title">{feature.title}</h3>
                      <p className="service-details__feature-description">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Topics (for training services) */}
          {service.topics && (
            <div className="service-details__section">
              <h2 className="service-details__section-title">Temáticas de Formación</h2>
              <div className="service-details__features">
                {service.topics.map((topic, index) => (
                  <div key={index} className="service-details__feature-card">
                    <div className="service-details__feature-icon">
                      <FaCheckCircle />
                    </div>
                    <div className="service-details__feature-content">
                      <h3 className="service-details__feature-title">{topic.title}</h3>
                      <p className="service-details__feature-description">{topic.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Characteristics */}
          {service.characteristics && (
            <div className="service-details__section">
              <h2 className="service-details__section-title">Características</h2>
              <div className="service-details__grid">
                {service.characteristics.map((char, index) => (
                  <div key={index} className="service-details__grid-card">
                    <h3 className="service-details__grid-title">{char.title}</h3>
                    <p className="service-details__grid-description">{char.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Project Areas */}
          {service.projectAreas && (
            <div className="service-details__section">
              <h2 className="service-details__section-title">Áreas de Intervención</h2>
              <div className="service-details__features">
                {service.projectAreas.map((area, index) => (
                  <div key={index} className="service-details__feature-card">
                    <div className="service-details__feature-icon">
                      <FaCheckCircle />
                    </div>
                    <div className="service-details__feature-content">
                      <h3 className="service-details__feature-title">{area.title}</h3>
                      <p className="service-details__feature-description">{area.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services (for Pacto Estado) */}
          {service.services && (
            <div className="service-details__section">
              <h2 className="service-details__section-title">Servicios que Ofrecemos</h2>
              <div className="service-details__features">
                {service.services.map((srv, index) => (
                  <div key={index} className="service-details__feature-card">
                    <div className="service-details__feature-icon">
                      <FaCheckCircle />
                    </div>
                    <div className="service-details__feature-content">
                      <h3 className="service-details__feature-title">{srv.title}</h3>
                      <p className="service-details__feature-description">{srv.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Services */}
          {service.additionalServices && (
            <div className="service-details__section">
              <h2 className="service-details__section-title">Servicios Adicionales</h2>
              <div className="service-details__grid">
                {service.additionalServices.map((addService, index) => (
                  <div key={index} className="service-details__grid-card">
                    <h3 className="service-details__grid-title">{addService.title}</h3>
                    <p className="service-details__grid-description">{addService.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA Section */}
          <div className="service-details__cta">
            <h2>¿Interesada en este servicio?</h2>
            <p>Contáctanos para más información y te asesoraremos personalizadamente</p>
            <button 
              onClick={() => navigate('/contacto')}
              className="service-details__cta-button"
            >
              Contactar ahora
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetails;