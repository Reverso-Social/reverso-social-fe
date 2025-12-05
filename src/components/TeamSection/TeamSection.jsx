import TeamCard from "./TeamCard";
import "./TeamSection.scss";
import pilarImg from "../../assets/img/team/Pilar copy.png";
import lolaImg from "../../assets/img/team/Lola copy.png";
import susanaImg from "../../assets/img/team/Susana copy.png";

export default function TeamSection() {
  const team = [
    {
      name: "Lola Mtnez Cueto",
      skills: [ "RR.HH", "Docencia", "Antropología",],
      linkedin: "https://linkedin.com/...",
      photo: lolaImg,
      alt: "Fotografia de Lola Mtnez Cueto",
    },
    {
      name: "Pilar Limón",
      lastName: "Fdez-Caballero",
      skills: ["Psicología", "Igualdad", "Formación y Consultoria", ],
      linkedin: "https://linkedin.com/...",
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

      <div className="team-section__grid">
        {team.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>
    </section>
  );
}