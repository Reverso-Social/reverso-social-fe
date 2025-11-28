import "./Hero.scss";
import heroImage from "../../assets/img/group4.png";

const Hero = () => {

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
          Somos una entidad feminista de incidencia sociopolítica
        </h1>

        <p>
          Hemos venido a resolver tus necesidades y a hacer que el cambio a
          mejor suceda.
        </p>

        <button
          className="hero-button"
          onClick={() => scrollToSection("team")}
          aria-label="Ir a la sección del equipo" >
          Conócenos
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
            className="hero-image"/>
        </div>
      </div>
    </section>
  );
};

export default Hero;
