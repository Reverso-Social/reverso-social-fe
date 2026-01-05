import { useTranslation } from "react-i18next";
import ServicesCard from "./ServicesCard";
import "./ServicesSection.scss";
import { servicesData } from "../../data/serviceData";
import { FaBalanceScale, FaArrowRight, FaShieldAlt, FaFlag, FaHandsHelping, FaEnvelope } from "react-icons/fa";
import { PiMoneyFill } from "react-icons/pi";
import { GiGraduateCap } from "react-icons/gi";
import { BsHouses } from "react-icons/bs";


const iconMap = {
  FaBalanceScale: <FaBalanceScale />,
  PiMoneyFill: <PiMoneyFill />,
  GiGraduateCap: <GiGraduateCap />,
  BsHouses: <BsHouses />,
  FaShieldAlt: <FaShieldAlt />,
  FaFlag: <FaFlag />,
  FaHandsHelping: <FaHandsHelping />,
  FaEnvelope: <FaEnvelope />,
  RainbowFlagEmoji: <span style={{ fontSize: '2.7rem' }}>🏳️‍🌈</span>,
};

const ServiceSection = () => {
  const { t } = useTranslation('services');
  return (
    <div className="service-section" id="servicios">
      <header className="about__intro">
        <h2 id="about-heading" className="about__title">
          {t('heading')}{" "}
          <span className="about__title--highlight">{t('headingHighlight')}</span>
        </h2>
      </header>

      {servicesData.map((category) => (
        <div key={category.id} className="background-frame">
          <div className="services-row">
            {category.services.map((service) => (
              <ServicesCard
                key={service.id}
                id={service.id}
                icon={iconMap[service.iconName]}
                title={t(`services.service${service.id}.title`)}
                description={t(`services.service${service.id}.description`)}
                button={
                  <>
                    {t('btnMore')} <FaArrowRight />
                  </>
                }
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServiceSection;