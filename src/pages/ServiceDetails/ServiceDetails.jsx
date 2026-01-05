import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaBalanceScale, FaShieldAlt, FaHandsHelping, FaEnvelope, FaArrowLeft, FaCheck } from "react-icons/fa";
import { PiMoneyFill } from "react-icons/pi";
import { GiGraduateCap } from "react-icons/gi";
import { BsHouses } from "react-icons/bs";
import ContactModal from "../../components/ContactModal/ContactModal";
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
  const { t } = useTranslation('services');
  const { id } = useParams();
  const navigate = useNavigate();

  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    if (!isContactOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isContactOpen]);

  const serviceDetails = t(`serviceDetails.service${id}`, { returnObjects: true });
  const iconName = serviceDetails?.iconName || 'FaBalanceScale';

  if (!serviceDetails || !serviceDetails.title) {
    return <div>{t('serviceNotFound')}</div>;
  }

  const handleBackToServices = () => {
    navigate('/');
    setTimeout(() => {
      const servicesSection = document.getElementById('servicios');
      if (servicesSection) {
        servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  return (
    <div className="service-details">
      <ContactModal
        open={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      <div className="service-details__hero">
        <div className="service-details__hero-content">
          <button
            className="service-details__back-link"
            onClick={handleBackToServices}
          >
            <FaArrowLeft /> {t('backToServices')}
          </button>

          <div className="service-details__hero-icon">
            {iconMap[iconName]}
          </div>

          <span className="service-details__category">{t(`services.service${id}.category`)}</span>
          <h1 className="service-details__title">{t(`serviceDetails.service${id}.title`)}</h1>
          <p className="service-details__description">
            {t(`serviceDetails.service${id}.fullDescription`)}
          </p>

          {serviceDetails.legalNote && (
            <div className="service-details__legal-note">
              {t(`serviceDetails.service${id}.legalNote`)}
            </div>
          )}
        </div>
      </div>

      <div className="service-details__content">
        <div className="service-details__container">

          {serviceDetails.features && (
            <section className="service-details__section">
              <h2 className="service-details__section-title">
                {t('sections.serviceIncludes')}
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
                {t('sections.additionalServices')}
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
                {t('sections.trainingTopics')}
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
                {t('sections.trainingFeatures')}
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
                {t('sections.interventionAreas')}
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
                {t('sections.servicesOffered')}
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
            <h2>{t('cta.title')}</h2>
            <p>
              {t('cta.description')}
            </p>
            <button
              className="service-details__cta-button"
              onClick={() => setIsContactOpen(true)}
            >
              {t('cta.button')}
            </button>
          </section>

        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;