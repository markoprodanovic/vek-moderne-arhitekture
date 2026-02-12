import Hero from "@/components/sections/Hero";
import Map from "@/components/sections/Map";
import About from "@/components/sections/About";
import Authors from "@/components/sections/Authors";
import Links from "@/components/sections/Links";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <div className="font-sans">
      <Hero />
      <Map />
      <About />
      <Authors />
      <Links />
      <Contact />
      <Footer />
    </div>
  );
}
