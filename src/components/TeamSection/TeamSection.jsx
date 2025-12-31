import { useTranslation } from "react-i18next";
import TeamCard from "./TeamCard";
import "./TeamSection.scss";
import pilarImg from "../../assets/img/team/Pilar2.png";
import lolaImg from "../../assets/img/team/lola2.png";
import susanaImg from "../../assets/img/team/susana2.png";

export default function TeamSection() {
  const { t } = useTranslation('team');
  const team = [
    {
      name: "Lola Mtnez Cueto",
      skills: t('skills.lola', { returnObjects: true }),
      linkedin: "https://www.linkedin.com/in/lola-mart%C3%ADnez-cueto/?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      photo: lolaImg,
      alt: "Fotografia de Lola Mtnez Cueto",
    },
    {
      name: "Pilar Limón",
      lastName: "Fdez-Caballero",
      skills: t('skills.pilar', { returnObjects: true }),
      linkedin: "https://www.linkedin.com/in/pilar-lim%C3%B3n-f-c-442752372/?utm_source=share_via&utm_content=profile&utm_medium=member_android",
      photo: pilarImg,
      alt: "Fotografia de Pilar Limón Fdez-Caballero",
    },
    {
      name: "Susana Ruiz Novillo",
      skills: t('skills.susana', { returnObjects: true }),
      linkedin: "https://linkedin.com/...",
      photo: susanaImg,
      alt: "Fotografia de Susana Ruiz Novillo",
    },
  ];

  return (
    <section className="team-section" id="team">
      <h2 className="team-section__title">{t('title')} <span className="about__title--highlight">{t('titleHighlight')}</span></h2>
      <p className="about__description">
        {t('description')}
      </p>

      <div className="team-section__grid">
        {team.map((member, index) => (
          <TeamCard key={index} {...member} />
        ))}
      </div>
    </section>
  );
}