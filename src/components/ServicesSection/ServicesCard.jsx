import { useNavigate } from "react-router-dom";
import "./ServicesCard.scss";

const ServicesCard = ({ id, icon, title, description, button }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (id) {
      navigate(`/servicios/${id}`);
    }
  };

  return (
    <article className="service-card">
      <div className="service-card_icon">{icon}</div>
      <h3 className="service-card_title">{title}</h3>
      <p className="service-card_body">{description}</p>
      <button 
        className="service-card_button" 
        onClick={handleClick}
        aria-label={`Ver más información sobre ${title}`}
      >
        {button}
      </button>
    </article>
  );
};

export default ServicesCard;