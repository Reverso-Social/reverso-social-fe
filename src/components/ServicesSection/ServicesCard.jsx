import React from 'react';
import './ServicesCard.scss';

const ServicesCard = ({ icon, title, description, button }) => {
  return (
    <div className="service-card">
      <div className="service-card_icon">
        {icon}
      </div>

      <h3 className="service-card_title">{title}</h3>
      <p className="service-card_body">{description}</p>
      <button className="service-card_button">{button}</button>
    </div>
  );
};

export default ServicesCard;





