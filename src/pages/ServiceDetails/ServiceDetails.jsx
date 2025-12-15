import { useParams, useNavigate } from "react-router-dom";
import { servicesData } from "../../data/serviceData";
import { servicesDetailedData } from "../../data/servicesDetailedData";
import { FaBalanceScale, FaShieldAlt, FaHandsHelping, FaEnvelope, FaArrowLeft, FaCheck } from "react-icons/fa";
import { PiMoneyFill } from "react-icons/pi";
import { GiGraduateCap } from "react-icons/gi";
import { BsHouses } from "react-icons/bs";
import "./ServiceDetails.scss";

const iconMap = {
  FaBalanceScale: <FaBalanceScale />,
  PiMoneyFill: <PiMoneyFill />,
  GiGraduateCap: <GiGraduateCap />,
  BsHouses: <BsHouses />,
  FaShieldAlt: <FaShieldAlt />,
  FaHandsHelping: <FaHandsHelping />,
  FaEnvelope: <FaEnvelope />,
  RainbowFlagEmoji: <span style={{ fontSize: '4rem' }}>🏳️‍🌈</span>,
};

const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  let selectedService = null;
  let categoryName = "";
  
  for (const category of servicesData) {
    const service = category.services.find(s => s.id === parseInt(id));
    if (service) {
      selectedService = service;
      categoryName = category.category;
      break;
    }
  }

  const serviceDetails = servicesDetailedData[parseInt(id)];

  if (!selectedService || !serviceDetails) {
    return <div>Servicio no encontrado</div>;
  }

  return (
    <div className="service-details">
      <div className="service-details__hero">
        <div className="service-details__hero-content">
          <button 
            className="service-details__back-link"
            onClick={() => navigate('/#servicios')}
          >
            <FaArrowLeft /> Volver a Servicios
          </button>

          <div className="service-details__hero-icon">
            {iconMap[selectedService.iconName]}
          </div>
          
          <span className="service-details__category">{categoryName}</span>
          <h1 className="service-details__title">{serviceDetails.title}</h1>
          <p className="service-details__description">
            {serviceDetails.fullDescription}
          </p>

          {serviceDetails.legalNote && (
            <div className="service-details__legal-note">
              {serviceDetails.legalNote}
            </div>
          )}
        </div>
      </div>

      <div className="service-details__content">
        <div className="service-details__container">
          
          {serviceDetails.features && (
            <section className="service-details__section">
              <h2 className="service-details__section-title">
                Nuestro Servicio Incluye
              </h2>
              <div className="service-details__features">
                {serviceDetails.features.map((feature, index) => (
                  <div key={index} className="service-details__feature-card">
                    <div className="service-details__feature-icon">
                      <FaCheck />
                    </div>
                    <div className="service-details__feature-content">
                      <h3 className="service-details__feature-title">
                        {feature.title}
                      </h3>
                      {feature.description && (
                        <p className="service-details__feature-description">
                          {feature.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {serviceDetails.additionalServices && (
            <section className="service-details__section">
              <h2 className="service-details__section-title">
                Servicios Adicionales
              </h2>
              <div className="service-details__grid">
                {serviceDetails.additionalServices.map((service, index) => (
                  <div key={index} className="service-details__grid-card">
                    <h3 className="service-details__grid-title">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="service-details__grid-description">
                        {service.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {serviceDetails.topics && (
            <section className="service-details__section">
              <h2 className="service-details__section-title">
                Temáticas de Formación
              </h2>
              <div className="service-details__features">
                {serviceDetails.topics.map((topic, index) => (
                  <div key={index} className="service-details__feature-card">
                    <div className="service-details__feature-icon">
                      <FaCheck />
                    </div>
                    <div className="service-details__feature-content">
                      <h3 className="service-details__feature-title">
                        {topic.title}
                      </h3>
                      {topic.description && (
                        <p className="service-details__feature-description">
                          {topic.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {serviceDetails.characteristics && (
            <section className="service-details__section">
              <h2 className="service-details__section-title">
                Características de la Formación
              </h2>
              <div className="service-details__grid">
                {serviceDetails.characteristics.map((char, index) => (
                  <div key={index} className="service-details__grid-card">
                    <h3 className="service-details__grid-title">
                      {char.title}
                    </h3>
                    <p className="service-details__grid-description">
                      {char.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {serviceDetails.projectAreas && (
            <section className="service-details__section">
              <h2 className="service-details__section-title">
                Áreas de Intervención
              </h2>
              <div className="service-details__features">
                {serviceDetails.projectAreas.map((area, index) => (
                  <div key={index} className="service-details__feature-card">
                    <div className="service-details__feature-icon">
                      <FaCheck />
                    </div>
                    <div className="service-details__feature-content">
                      <h3 className="service-details__feature-title">
                        {area.title}
                      </h3>
                      {area.description && (
                        <p className="service-details__feature-description">
                          {area.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {serviceDetails.services && (
            <section className="service-details__section">
              <h2 className="service-details__section-title">
                Servicios que Ofrecemos
              </h2>
              <div className="service-details__grid">
                {serviceDetails.services.map((service, index) => (
                  <div key={index} className="service-details__grid-card">
                    <h3 className="service-details__grid-title">
                      {service.title}
                    </h3>
                    <p className="service-details__grid-description">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <section className="service-details__cta">
            <h2>¿Interesado en este servicio?</h2>
            <p>
              Contáctanos para más información y descubre cómo podemos ayudar a tu organización.
            </p>
            <button 
              className="service-details__cta-button"
              onClick={() => navigate('/contacto')}
            >
              Solicitar Información
            </button>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;