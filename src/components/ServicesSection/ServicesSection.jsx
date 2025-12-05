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
            description="Realizamos Planes de igualdad cumpliendo con el marco normativo establecido por el Real Decreto 901/2020 y 902/2020."
            button={
              <>
                Más información <FaArrowRight />
              </>
            }
          />

          <ServicesCard
            icon={<PiMoneyFill />}
            title="Igualdad Retributiva"
            description="Realizamos informes de Auditoría Retributiva cumpliendo con el marco normativo establecido por el Real Decreto 902/2020."
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
            title="Acoso Sexual y por Razón de Sexo"
            description="Realizamos Protocolos contra el Acoso Sexual y por razón de sexo cumpliendo con la normativa actualmente vigente."
            button={
              <>
                Más información <FaArrowRight />
              </>
            }
          />

          <ServicesCard
            icon={<GiGraduateCap />}
            title="Formación"
            description="Realizamos todo tipo de formación relacionada con la materia que nos ocupa ajustándonos al 100 x 100 a las necesidades de su entidad."
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
            icon= "🏳️‍🌈"
            title="Protocolos LGTBI+"
            description="Realizamos Protocolos y Planes LGTBI+ de acuerdo con la Ley 4/2023 y en línea con los principios de inclusión y no discriminación."
            button={
              <>
                Más información <FaArrowRight />
              </>
            }
          />

          <ServicesCard
            icon={<BsFillPersonLinesFill />}
            title="Gestión proyectos sociales"
            description="Desarrollamos, gestionamos y evaluamos proyectos sociales y comunitarios dirigidos a administración pública y colaboraciones institucionales con perspectiva de género inclusiva."
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
            title="Pacto estado Violencia de Género:"
            description="Ayudamos a su entidad a gestionar y desarrollar proyectos dentro de los Fondos del Pacto de Estado contra la Violencia de Género de nuestro país."
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
