import HeroSection from "@/components/sections/HeroSection";
import MapSection from "@/components/sections/MapSection";
import AboutSection from "@/components/sections/AboutSection";

export default function Home() {
  return (
    <div className="font-sans">
      <HeroSection />
      <MapSection />
      <AboutSection />
    </div>
  );
}
