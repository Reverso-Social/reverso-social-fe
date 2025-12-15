import React, { useState } from 'react';
import './About.scss';
import MisionIcon from '../../assets/Icons/Vision.svg';
import VisionIcon from '../../assets/Icons/Visionnn.svg';
import ValoresIcon from '../../assets/Icons/Diamond.svg';

const About = () => {
  const [expandedCard, setExpandedCard] = useState(null);

  const handleCardClick = (cardId) => {
    setExpandedCard(expandedCard === cardId ? null : cardId);
  };

  const handleMouseEnter = (cardId) => {
    if (window.innerWidth > 768) {
      setExpandedCard(cardId);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth > 768) {
      setExpandedCard(null);
    }
  };

  const cardsData = [
    {
      id: 'vision',
      title: 'Visión',
      icon: VisionIcon,
      color: 'turquesa',
      fullTitle: 'Nuestra Visión',
      content: (
        <>
          Desde Reverso Social buscamos construir una visión que vaya más allá del cumplimiento normativo o la implantación interna de medidas de igualdad. Nuestro propósito es transformar estructuras sociales, influir en políticas públicas y generar cambios estructurales culturales duraderos que ayuden a construir sociedades más justas y equitativas, donde la igualdad real prime.
          <br />
          <strong>ES UNA VISIÓN POSIBLE</strong>
        </>
      )
    },
    {
      id: 'mision',
      title: 'Misión',
      icon: MisionIcon,
      color: 'lila',
      fullTitle: 'Nuestra Misión',
      content:
        'Ser un agente catalizador de transformaciones sociales que garanticen la igualdad real y la justicia social, impulsando políticas, prácticas institucionales y cambios culturales que reduzcan desigualdades estructurales y fomenten sociedades más inclusivas, diversas y democráticas.'
    },
    {
      id: 'valores',
      title: 'Valores',
      icon: ValoresIcon,
      color: 'azul',
      fullTitle: 'Valores Fundamentales',
      content: (
        <ul>
          <li>Transformación estructural</li>
          <li>Incidencia sociopolítica</li>
          <li>Enfoque en derechos humanos y justicia social</li>
          <li>Construcción de alianzas</li>
          <li>Impacto medible y sostenible</li>
          <li>Diversidad como motor de innovación y cohesión</li>
        </ul>
      )
    }
  ];

  return (
    <section className="about" id="sobre-nosotros" aria-labelledby="about-heading">
      <header className="about__intro">
        <h2 id="about-heading" className="about__title">
          Sobre <span className="about__title--highlight">Reverso Social</span>
        </h2>
        <p className="about__subtitle">Pericia Feminista para el Cambio</p>
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
              onClick={() => handleCardClick(card.id)}
              onMouseEnter={() => handleMouseEnter(card.id)}
              onMouseLeave={handleMouseLeave}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(card.id);
                }
              }}
              tabIndex={0}
              role="button"
              aria-expanded={expandedCard === card.id}
              aria-label={`${card.title}: ${expandedCard === card.id ? 'expandido' : 'colapsado'}. Presiona para ${expandedCard === card.id ? 'colapsar' : 'expandir'}`}
            >
              <div className="about-card__inner">
                <header className="about-card__front">
                  <img 
                    src={card.icon} 
                    alt="" 
                    className="about-card__icon"
                    aria-hidden="true"
                  />
                  <h3 className="about-card__title">{card.title}</h3>
                </header>
                
                <section 
                  className="about-card__back"
                  aria-hidden={expandedCard !== card.id}
                >
                  <div className={`about-card__content about-card__content--${card.color}`}>
                    <h4 className="about-card__content-title">{card.fullTitle}</h4>

                    <div className="about-card__text">
                      {card.content}
                    </div>

                  </div>
                </section>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default About;
