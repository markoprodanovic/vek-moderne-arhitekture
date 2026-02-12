import HeroSection from "@/components/sections/HeroSection";
import MapSection from "@/components/sections/MapSection";
import AboutSection from "@/components/sections/AboutSection";
import AuthorsSection from "@/components/sections/AuthorsSection";
import LinksSection from "@/components/sections/LinksSection";
import ContactSection from "@/components/sections/ContactSection";

export default function Home() {
  return (
    <div className="font-sans">
      <HeroSection />
      <MapSection />
      <AboutSection />
      <AuthorsSection />
      <LinksSection />
      <ContactSection />
    </div>
  );
}
