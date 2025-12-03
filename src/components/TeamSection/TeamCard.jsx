import { FaLinkedin } from "react-icons/fa";
import "./TeamCard.scss";

export default function TeamCard({ name, lastName, skills, linkedin, photo, alt }) {
  return (
    <div className="team-card">
      <img
        src={photo || "/placeholder-gradient.png"}
        alt={alt || name}
        className="team-card__photo"
      />

      <h3 className="team-card__name">{name} <br/> {lastName}</h3>

      <div className="team-card__tags">
        {skills.map((skill, index) => (
          <span key={index} className="team-card__tag">{skill}</span>
        ))}
      </div>

      <a
        href={linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="team-card__linkedin"
      >
        <FaLinkedin />
      </a>
    </div>
  );
}