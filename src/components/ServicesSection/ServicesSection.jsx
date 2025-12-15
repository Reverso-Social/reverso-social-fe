import ServicesCard from "./ServicesCard";
import "./ServicesSection.scss";
import { servicesData } from "../../data/serviceData";
import { FaBalanceScale, FaArrowRight, FaShieldAlt, FaFlag, FaHandsHelping, FaEnvelope } from "react-icons/fa";
import { PiMoneyFill } from "react-icons/pi";
import { GiGraduateCap } from "react-icons/gi";
import { BsHouses } from "react-icons/bs";

// Mapa centralizado de iconos
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
  return (
    <div className="service-section" id="servicios">
      <header className="about__intro">
        <h2 id="about-heading" className="about__title">
          Servicios Integrales con{" "}
          <span className="about__title--highlight">Impacto Real</span>
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
                title={service.title}
                description={service.shortDescription}
                button={
                  <>
                    Más información <FaArrowRight />
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