import { Link } from "react-router-dom";
import "./ResourcesPage.scss";

export default function ResourcesPage() {
  const resources = [
    {
      id: 1,
      title: "Guía de Igualdad",
      description: "Manual práctico para empresas que buscan implementar políticas de igualdad efectivas en sus organizaciones.",
      type: "GUÍA",
      icon: "📚",
      color: "turquesa",
      fileUrl: "/resources/equality-guide.pdf",
      isPublic: true
    },
    {
      id: 2,
      title: "Informe Brecha Salarial 2024",
      description: "Estudio detallado de investigación sobre la brecha salarial de género en España.",
      type: "INFORME",
      icon: "📊",
      color: "lila",
      fileUrl: "/resources/paygap2024.pdf",
      isPublic: true
    },
    {
      id: 3,
      title: "Taller de Coeducación",
      description: "Sesión de formación grabada sobre coeducación y educación en igualdad.",
      type: "VÍDEO",
      icon: "🎥",
      color: "turquesa",
      fileUrl: "/videos/coeducation.mp4",
      isPublic: false
    },
    {
      id: 4,
      title: "Protocolo contra el Acoso",
      description: "Documento modelo para implementar un protocolo de prevención y actuación frente al acoso laboral.",
      type: "GUÍA",
      icon: "📋",
      color: "lila",
      fileUrl: "/resources/harassment-protocol.pdf",
      isPublic: true
    },
    {
      id: 5,
      title: "Webinar: Liderazgo Feminista",
      description: "Grabación completa de nuestro webinar sobre liderazgo feminista en organizaciones.",
      type: "VÍDEO",
      icon: "🎬",
      color: "turquesa",
      fileUrl: "/videos/feminist-leadership.mp4",
      isPublic: true
    },
    {
      id: 6,
      title: "Checklist de Igualdad",
      description: "Herramienta práctica para evaluar el nivel de igualdad en tu organización.",
      type: "HERRAMIENTA",
      icon: "✅",
      color: "lila",
      fileUrl: "/resources/equality-checklist.pdf",
      isPublic: true
    }
  ];

  const handleDownload = (resource) => {
    if (!resource.isPublic) {
      alert("Este recurso requiere registro. Por favor, contáctanos para acceder.");
      return;
    }
    // Aquí iría la lógica de descarga real
    console.log("Descargando:", resource.title);
  };

  return (
    <div className="resources-page">
      {/* Header/Hero Section */}
      <section className="resources-hero">
        <div className="resources-hero-content">
          <Link to="/" className="back-link">
            ← Volver al inicio
          </Link>
          <h1 className="resources-hero-title">
            <span className="title-gradient">Recursos</span> para el cambio
          </h1>
          <p className="resources-hero-subtitle">
            Herramientas, guías y materiales para impulsar la igualdad en tu organización
          </p>
        </div>
      </section>

      {/* Resources Grid Section */}
      <section className="resources-content">
        <div className="resources-container">
          <div className="resources-filter">
            <p className="resources-count">{resources.length} recursos disponibles</p>
          </div>

          <div className="resources-grid">
            {resources.map((resource) => (
              <article key={resource.id} className={`resource-card ${resource.color}`}>
                <div className="resource-header">
                  <div className="resource-icon">{resource.icon}</div>
                  <span className="resource-type">{resource.type}</span>
                  {!resource.isPublic && (
                    <span className="resource-badge">🔒 Privado</span>
                  )}
                </div>

                <h3 className="resource-title">{resource.title}</h3>
                <p className="resource-description">{resource.description}</p>

                <button 
                  className="resource-btn"
                  onClick={() => handleDownload(resource)}
                >
                  {resource.isPublic ? "Descargar" : "Solicitar acceso"}
                  <span className="btn-arrow">→</span>
                </button>
              </article>
            ))}
          </div>

          {/* CTA Section */}
          <div className="resources-cta">
            <h2>¿No encuentras lo que buscas?</h2>
            <p>Podemos crear recursos personalizados para tu organización</p>
            <Link to="/" className="cta-btn">
              Contáctanos
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}