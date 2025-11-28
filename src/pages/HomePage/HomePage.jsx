import Background from "../../components/Background/Background";
import Hero from "../../components/Hero/Hero";
import About from "../../components/about/About";
import TeamSection from "../../components/TeamSection/TeamSection";
import ServiceSection from "../../components/ServicesSection/ServicesSection";
import "./HomePage.scss"; 

export default function HomePage() {
  return (
    <div className="homepage">
      <div className="homepage-main-content">
        <Background>
          <Hero />
        </Background>
        <About />
      <ServiceSection />
        <TeamSection />
      </div>
    </div>
  );
}