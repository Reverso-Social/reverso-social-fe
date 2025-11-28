import Background from "../../components/Background/Background";
import Hero from "../../components/Hero/Hero";
import About from "../../components/about/About";
import TeamSection from "../../components/TeamSection/TeamSection";
import ServiceSection from "../../components/ServicesSection/ServicesSection";

export default function HomePage() {
  return (
    <>
      <Background>
        <Hero />
      </Background>
      <About />
      <ServiceSection />
      <TeamSection />
    </>
  );
}