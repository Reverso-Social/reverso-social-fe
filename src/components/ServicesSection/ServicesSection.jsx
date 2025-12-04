import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ServicesCard from "./ServicesCard";
import "./ServicesSection.scss";
import serviceService from "../../data/serviceService";
import { FaBalanceScale, FaArrowRight } from "react-icons/fa";
import { PiMoneyFill } from "react-icons/pi";
import { RiMentalHealthLine } from "react-icons/ri";
import { GiGraduateCap } from "react-icons/gi";
import { BsHouses, BsFillPersonLinesFill } from "react-icons/bs";

// Mapeo de iconos por categoría (puedes ajustar según tus necesidades)
const categoryIcons = {
  "Consultoría de Género": <FaBalanceScale />,
  "Protocolos de Actuación": <PiMoneyFill />,
  "Formación Especializada": <GiGraduateCap />,
  "Proyectos Sociocomunitarios": <BsHouses />,
};

// Función para obtener el icono por defecto según el índice
const getDefaultIcon = (index) => {
  const icons = [
    <FaBalanceScale />,
    <PiMoneyFill />,
    <RiMentalHealthLine />,
    <GiGraduateCap />,
    <BsHouses />,
    <BsFillPersonLinesFill />
  ];
  return icons[index % icons.length];
};

const ServiceSection = () => {
  const [categories, setCategories] = useState([]);
  const [servicesByCategory, setServicesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Obtener categorías activas
        const categoriesData = await serviceService.getActiveCategories();
        setCategories(categoriesData);

        // Obtener servicios para cada categoría
        const servicesPromises = categoriesData.map(category =>
          serviceService.getServicesByCategory(category.id)
            .then(services => ({ categoryId: category.id, services }))
        );

        const servicesResults = await Promise.all(servicesPromises);
        
        // Organizar servicios por categoría
        const servicesMap = {};
        servicesResults.forEach(result => {
          servicesMap[result.categoryId] = result.services;
        });
        
        setServicesByCategory(servicesMap);
      } catch (err) {
        console.error("Error al cargar servicios:", err);
        setError("No se pudieron cargar los servicios");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="service-section">
        <header className="about__intro">
          <h2 className="about__title">
            Servicios Integrales con{" "}
            <span className="about__title--highlight">Impacto Real</span>
          </h2>
        </header>
        <div className="service-section-loading">
          <p>Cargando servicios...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="service-section">
        <header className="about__intro">
          <h2 className="about__title">
            Servicios Integrales con{" "}
            <span className="about__title--highlight">Impacto Real</span>
          </h2>
        </header>
        <div className="service-section-error">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="service-section">
      <header className="about__intro">
        <h2 id="about-heading" className="about__title">
          Servicios Integrales con{" "}
          <span className="about__title--highlight">Impacto Real</span>
        </h2>
      </header>

      {categories.map((category, categoryIndex) => {
        const services = servicesByCategory[category.id] || [];
        
        // Mostrar máximo 2 servicios por categoría en el landing
        const displayServices = services.slice(0, 2);
        
        if (displayServices.length === 0) return null;

        return (
          <div key={category.id} className="background-frame">
            <div className="services-row">
              {displayServices.map((service, serviceIndex) => (
                <ServicesCard
                  key={service.id}
                  id={service.id}
                  icon={
                    categoryIcons[category.name] || 
                    getDefaultIcon(categoryIndex * 2 + serviceIndex)
                  }
                  title={service.name}
                  description={service.shortDescription || service.fullDescription}
                  button={
                    <>
                      Más información <FaArrowRight />
                    </>
                  }
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ServiceSection;