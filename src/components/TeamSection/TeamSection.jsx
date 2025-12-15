import TeamCard from "./TeamCard";
import "./TeamSection.scss";
import pilarImg from "../../assets/img/team/Pilar2.png";
import lolaImg from "../../assets/img/team/lola2.png";
import susanaImg from "../../assets/img/team/susana2.png";

export default function TeamSection() {
  const team = [
    {
      name: "Lola Mtnez Cueto",
      skills: [ "RR.HH", "Docencia", "Antropología",],
      linkedin: "https://www.linkedin.com/in/lola-mart%C3%ADnez-cueto/?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      photo: lolaImg,
      alt: "Fotografia de Lola Mtnez Cueto",
    },
    {
      name: "Pilar Limón",
      lastName: "Fdez-Caballero",
      skills: ["Psicología", "Igualdad", "Formación y Consultoria", ],
      linkedin: "https://www.linkedin.com/in/pilar-lim%C3%B3n-f-c-442752372/?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      photo: pilarImg,
      alt: "Fotografia de Pilar Limón Fdez-Caballero",
    },
    {
      name: "Susana Ruiz Novillo",
      skills: ["Psicología", "Salud Mental", "Intervención Social"],
      linkedin: "https://linkedin.com/...",
      photo: susanaImg,
      alt: "Fotografia de Susana Ruiz Novillo",
    },
  ];

  return (
    <section className="team-section" id="team">
      <h2 className="team-section__title">¡Hola! <span className="about__title--highlight">somos:</span></h2>
      <p className="about__description">
         Tres caminos paralelos que durante más de 20 años nos hemos dedicado a la igualdad, a la diversidad, a la inclusión social, a la coordinación y gestión de proyectos, a la formación y a la consultoría que han bifurcado en este proyecto que aborda todos los ámbitos laborales, empresariales, sociales y educativos relacionado con igualdad, género y diversidad.
        </p>

      <div className="team-section__grid">
        {team.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>
    </section>
  );
}