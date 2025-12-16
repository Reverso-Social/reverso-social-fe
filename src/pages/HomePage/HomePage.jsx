import Background from "../../components/Background/Background";
import Hero from "../../components/Hero/Hero";
import About from "../../components/About/About";
import TeamSection from "../../components/TeamSection/TeamSection";
import ServiceSection from "../../components/ServicesSection/ServicesSection";
import SEO from "../../components/SEO/SEO";
import SchemaMarkup from "../../components/SEO/SchemaMarkup";
import "./HomePage.scss";

export default function HomePage() {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "ConsultingBusiness",
    "name": "Reverso Social",
    "url": window.location.origin,
    "description": "Consultoría Social de Género comprometida con la transformación feminista de la sociedad.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "C/Blas de Otero, 69, 11ºD",
      "addressLocality": "Madrid",
      "postalCode": "28017",
      "addressCountry": "ES"
    },
    "email": "reversocial@reversocial.org",
    "telephone": "+34000000000"
  };

  return (
    <div className="homepage">
      <SEO
        title="Reverso Social - Consultoría Social de Género"
        description="Consultoría Social de Género comprometida con la transformación feminista de la sociedad."
        name="Reverso Social"
        type="website"
      />
      <SchemaMarkup data={schemaData} />
      <div className="homepage-main-content">
        <Background>
          <Hero />
        </Background>
        <About />
        <TeamSection />
        <ServiceSection />
      </div>
    </div>
  );
}