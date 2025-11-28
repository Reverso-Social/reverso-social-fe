import TeamCard from "./TeamCard";
import "./TeamSection.scss";

export default function TeamSection() {
  const team = [
    {
      name: "Susana Ruiz Novillo",
      skills: ["Psicología", "Igualdad", "Normativa"],
      linkedin: "https://linkedin.com/...",
    },
    {
      name: "Lola Mtnez Cueto",
      skills: ["Antropología", "RR.HH", "Docencia"],
      linkedin: "https://linkedin.com/...",
    },
    {
      name: "Pilar Limón Fdez-Caballero",
      skills: ["Derechos LGTBI+", "Human Rights"],
      linkedin: "https://linkedin.com/...",
    },
  ];

  return (
    <section className="team-section" id="team">
      <h2 className="team-section__title">¡Hola! Somos</h2>

      <div className="team-section__grid">
        {team.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>
    </section>
  );
}