import React, { useState } from 'react';
import './About.scss';

const About = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardInteraction = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const cardsData = [
    {
      id: 'vision',
      title: 'Visión',
      icon: '🚀',
      color: 'turquesa',
      fullTitle: 'Nuestra Visión',
      content: 'Ser un referente reconocido en innovación social y feminista, impulsando organizaciones más justas, inclusivas y sostenibles en toda España.'
    },
    {
      id: 'mision',
      title: 'Misión',
      icon: '🔍',
      color: 'lila',
      fullTitle: 'Nuestra Misión',
      content: 'Acompañar a entidades públicas y privadas en su transformación hacia la igualdad efectiva mediante metodologías innovadoras y evidencia contrastada.'
    },
    {
      id: 'valores',
      title: 'Valores',
      icon: '💎',
      color: 'azul',
      fullTitle: 'Valores Fundamentales',
      content: 'Feminismo activo, coherencia inquebrantable, transparencia radical, compromiso social profundo y transformación real como horizonte permanente.'
    }
  ];

  return (
    <section className="about" id="sobre-nosotros" aria-labelledby="about-heading">
      <header className="about__intro">
        <h2 id="about-heading" className="about__title">
          Sobre <span className="about__title--highlight">Reverso Social</span>
        </h2>
        <p className="about__subtitle">Expertise Feminista para el Cambio</p>
        <p className="about__description">
          Somos un equipo de mujeres con amplia experiencia en políticas públicas, consultoría especializada 
          y formación transformadora en igualdad. Una entidad de nueva generación comprometida con la justicia social.
        </p>
      </header>

      <ul className="about__cards">
        {cardsData.map((card) => (
          <li key={card.id} className="about__cards-item">
            <article
              className={`about-card about-card--${card.color} ${
                expandedCard === card.id ? 'about-card--expanded' : ''
              }`}
              onClick={() => handleCardInteraction(card.id)}
              onMouseEnter={() => handleCardInteraction(card.id)}
              onMouseLeave={() => setExpandedCard(null)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardInteraction(card.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-expanded={expandedCard === card.id}
              aria-label={`${card.title}: ${expandedCard === card.id ? 'expandido' : 'colapsado'}. Presiona para ${expandedCard === card.id ? 'colapsar' : 'expandir'}`}
            >
              <header className="about-card__front">
                <span className="about-card__icon" aria-hidden="true" role="img">
                  {card.icon}
                </span>
                <h3 className="about-card__title">{card.title}</h3>
              </header>
              
              <section 
                className="about-card__back"
                aria-hidden={expandedCard !== card.id}
              >
                <div className={`about-card__content about-card__content--${card.color}`}>
                  <h4 className="about-card__content-title">{card.fullTitle}</h4>
                  <p className="about-card__text">{card.content}</p>
                </div>
              </section>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default About;