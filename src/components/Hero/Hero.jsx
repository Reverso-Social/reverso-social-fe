import "./Hero.scss";
import heroImage from "../../assets/img/group3.jpg";

const Hero = () => {
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

        <button className="hero-button">Conócenos</button>
      </div>

      <div className="hero-image-wrapper">
        <img
          src={heroImage}
          alt="Equipo Reverso Social"
          className="hero-image"
        />
      </div>
    </section>
  );
};

export default Hero;
