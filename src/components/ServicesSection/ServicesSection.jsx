import React from "react";
import ServicesCard from "./ServicesCard";
import { FaBalanceScale, FaArrowRight } from "react-icons/fa";
import "./ServicesSection.scss";

const ServiceSection = () => {
  return (
    <div className="service-section">

      <header className="about__intro">
        <h2 id="about-heading" className="about__title">
          Servicios Integrales con <span className="about__title--highlight">Impacto Real</span>
        </h2>
      </header>

     
      <div className="background-frame">
        <div className="services-row">
          <ServicesCard
            icon={<FaBalanceScale />}
            title="Service 1"
            description="Descripción"
            button={<>Más información <FaArrowRight /></>}
          />

          <ServicesCard
            icon={<FaBalanceScale />}
            title="Service 2"
            description="Descripción"
            button={<>Más información <FaArrowRight /></>}
          />
        </div>
      </div>

     
      <div className="background-frame">
        <div className="services-row">
          <ServicesCard
            icon={<FaBalanceScale />}
            title="Service 3"
            description="Descripción"
            button={<>Más información <FaArrowRight /></>}
          />

          <ServicesCard
            icon={<FaBalanceScale />}
            title="Service 4"
            description="Descripción"
            button={<>Más información <FaArrowRight /></>}
          />
        </div>
      </div>

      
      <div className="background-frame">
        <div className="services-row">
          <ServicesCard
            icon={<FaBalanceScale />}
            title="Service 5"
            description="Descripción"
            button={<>Más información <FaArrowRight /></>}
          />

          <ServicesCard
            icon={<FaBalanceScale />}
            title="Service 6"
            description="Descripción"
            button={<>Más información <FaArrowRight /></>}
          />
        </div>
      </div>

    </div>
  );
};

export default ServiceSection;
