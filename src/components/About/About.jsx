import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import './About.scss';
import MisionIcon from '../../assets/Icons/Vision.svg';
import VisionIcon from '../../assets/Icons/Visionnn.svg';
import ValoresIcon from '../../assets/Icons/Diamond.svg';

const About = () => {
  const { t } = useTranslation('about');
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
      title: t('vision.title'),
      icon: VisionIcon,
      color: 'turquesa',
      fullTitle: t('vision.fullTitle'),
      content: (
        <>
          {t('vision.content')}
          <br />
          <strong>{t('vision.emphasis')}</strong>
        </>
      )
    },
    {
      id: 'mision',
      title: t('mision.title'),
      icon: MisionIcon,
      color: 'lila',
      fullTitle: t('mision.fullTitle'),
      content: t('mision.content')
    },
    {
      id: 'valores',
      title: t('valores.title'),
      icon: ValoresIcon,
      color: 'azul',
      fullTitle: t('valores.fullTitle'),
      content: (
        <ul>
          {t('valores.items', { returnObjects: true }).map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      )
    }
  ];

  return (
    <section className="about" id="sobre-nosotros" aria-labelledby="about-heading">
      <header className="about__intro">
        <h2 id="about-heading" className="about__title">
          {t('heading')} <span className="about__title--highlight">{t('brandHighlight')}</span>
        </h2>
        <p className="about__subtitle">{t('subtitle')}</p>
        <p className="about__description">
          {t('description')}
        </p>
      </header>

      <ul className="about__cards">
        {cardsData.map((card) => (
          <li key={card.id} className="about__cards-item">
            <article
              className={`about-card about-card--${card.color} ${expandedCard === card.id ? 'about-card--expanded' : ''
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
              aria-label={`${card.title}: ${expandedCard === card.id ? t('ariaExpanded') : t('ariaCollapsed')}. ${expandedCard === card.id ? t('ariaPressToCollapse') : t('ariaPressToExpand')}`}
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
