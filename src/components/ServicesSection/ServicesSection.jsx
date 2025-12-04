import React from "react";
import ServicesCard from "./ServicesCard";
import { FaBalanceScale, FaArrowRight } from "react-icons/fa";
import { PiMoneyFill } from "react-icons/pi";
import { RiMentalHealthLine } from "react-icons/ri";
import { GiGraduateCap } from "react-icons/gi";
import { BsHouses, BsFillPersonLinesFill } from "react-icons/bs";
import "./ServicesSection.scss";

const ServiceSection = () => {
  return (
    <div className="service-section">
      <header className="about__intro">
        <h2 id="about-heading" className="about__title">
          Servicios Integrales con{" "}
          <span className="about__title--highlight">Impacto Real</span>
        </h2>
      </header>

      <div className="background-frame">
        <div className="services-row">
          <ServicesCard
            icon={<FaBalanceScale />}
            title="Consultoría de Género: Planes de Igualdad"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            button={
              <>
                Más información <FaArrowRight />
              </>
            }
          />

          <ServicesCard
            icon={<PiMoneyFill />}
            title="Asesoramiento en Igualdad Retributiva"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            button={
              <>
                Más información <FaArrowRight />
              </>
            }
          />
        </div>
      </div>

      <div className="background-frame">
        <div className="services-row">
          <ServicesCard
            icon={<RiMentalHealthLine />}
            title=" Protocolos contra el Acoso Sexual y por Razón de Sexo"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            button={
              <>
                Más información <FaArrowRight />
              </>
            }
          />

          <ServicesCard
            icon={<GiGraduateCap />}
            title=" Formación Especializada"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            button={
              <>
                Más información <FaArrowRight />
              </>
            }
          />
        </div>
      </div>

      <div className="background-frame">
        <div className="services-row">
          <ServicesCard
            icon={<BsHouses />}
            title=" Diseño e Implantación de Protocolos y Planes LGTBI+"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            button={
              <>
                Más información <FaArrowRight />
              </>
            }
          />

          <ServicesCard
            icon={<BsFillPersonLinesFill />}
            title="Proyectos Sociocomunitarios con Perspectiva de género:"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            button={
              <>
                Más información <FaArrowRight />
              </>
            }
          />
        </div>
      </div>

      {/* NUEVAS DOS TARJETAS ABAJO */}
      <div className="background-frame">
        <div className="services-row">
          <ServicesCard
            icon={<FaBalanceScale />}
            title="Gestión de fondos del Pacto de Estado contra la Violencia de Género:"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
            button={
              <>
                Más información <FaArrowRight />
              </>
            }
          />

          <ServicesCard
            icon={<PiMoneyFill />}
            title="Conoce nuestros servicios a más profundidad"
            description=""
            button={
              <>
                Más información <FaArrowRight />
              </>
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
