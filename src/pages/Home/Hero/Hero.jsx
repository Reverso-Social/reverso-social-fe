import "./Hero.scss";
import BlobImage from "../BlobImage/BlobImage";

// Import local images
import group1 from "../../../assets/img/group1.jpg";
import group2 from "../../../assets/img/group2.jpg";

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <img
          src="/assets/logo.svg"
          alt="Reverso Social logo"
          className="hero-logo"
        />

        <h1 className="hero-title">
          Somos una entidad feminista de incidencia sociopolítica
        </h1>

        <button className="hero-button">Contáctanos</button>
      </div>

      <div className="hero-right">
        <div className="hero-image hero-image--top">
          <BlobImage src={group1} alt="Mujeres colaborando en un proyecto" />
        </div>

        <div className="hero-image hero-image--bottom">
          <BlobImage src={group2} alt="Equipo diverso trabajando en mesa" />
        </div>
      </div>
    </section>
  );
}
