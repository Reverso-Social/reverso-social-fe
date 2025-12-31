import { useTranslation } from "react-i18next";
import "./Hero.scss";
import heroImage from "../../assets/img/team/PhotoHeroClients.png";

const Hero = () => {
  const { t } = useTranslation('translation');

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="hero-container">
      <div className="hero-text">
        <h1>
          {t('hero.title')}
        </h1>

        <p>
          {t('hero.description')}
        </p>

        <button
          className="hero-button"
          onClick={() => scrollToSection("team")}
          aria-label="Ir a la sección del equipo" >
          {t('hero.cta')}
        </button>
      </div>

      <div className="hero-image-wrapper">
        <div className="circle circle--1"></div>
        <div className="circle circle--2"></div>
        <div className="circle circle--3"></div>

        <div className="hero-image-container">
          <img
            src={heroImage}
            alt="Equipo Reverso Social trabajando en consultoría de igualdad"
            className="hero-image" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
