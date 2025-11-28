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
            title="Planes de Igualdad"
            description="Diagnóstico exhaustivo, diseño personalizado, implantación efectiva
            y seguimiento continuo para garantizar resultados medibles y sostenibles en tu organización."
            button={<>Más información <FaArrowRight /></>}
          />

          <ServicesCard
            icon={<FaBalanceScale />}
            title="Empleo y Brecha Salarial"
            description="Evaluaciones rigurosas, planes de equidad retributiva, auditorías
salariales profesionales y acompañamiento individualizado para cerrar brechas de género."
            button={<>Más información <FaArrowRight /></>}
          />
        </div>
      </div>

     
      <div className="background-frame">
        <div className="services-row">
          <ServicesCard
            icon={<FaBalanceScale />}
            title="Salud Integral"
            description="Programas de salud y bienestar con perspectiva de género que
            consideran las necesidades específicas y abordan desigualdades en el ámbito sanitario."
            button={<>Más información <FaArrowRight /></>}
          />

          <ServicesCard
            icon={<FaBalanceScale />}
            title="Coeducación"
            description="Programas educativos y formativos innovadores en igualdad,
            diseñados para transformar espacios educativos en entornos verdaderamente igualitarios."
            button={<>Más información <FaArrowRight /></>}
          />
        </div>
      </div>

      
      <div className="background-frame">
        <div className="services-row">
          <ServicesCard
            icon={<FaBalanceScale />}
            title="Tercer Sector"
            description="Acompañamiento especializado a entidades sociales en su camino
            hacia la igualdad, fortaleciendo capacidades y maximizando su impacto social."
            button={<>Más información <FaArrowRight /></>}
          />

          <ServicesCard
            icon={<FaBalanceScale />}
            title="Microservicios "
            description="Intervenciones breves y efectivas, asesorías puntuales
            especializadas y formaciones temáticas adaptadas a necesidades concretas y urgentes."
            button={<>Más información <FaArrowRight /></>}
          />
        </div>
      </div>

    </div>
  );
};

export default ServiceSection;
6