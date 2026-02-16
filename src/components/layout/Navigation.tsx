"use client";

import { useState, useLayoutEffect } from "react";
import NavigationItem from "./NavigationItem";

const navigationItems = [
  { id: "mapa", label: "MAPA", targetSection: "map" },
  { id: "o-knizi", label: "O KNIZI", targetSection: "about" },
  { id: "o-autorima", label: "O AUTORIMA", targetSection: "authors" },
  { id: "linkovi", label: "LINKOVI", targetSection: "links" },
  { id: "kontakt", label: "KONTAKT", targetSection: "contact" },
];

export default function Navigation() {
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useLayoutEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      // Find the entry with the highest intersection ratio
      let mostVisible: IntersectionObserverEntry | null = null;
      let highestRatio = 0;

      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > highestRatio) {
          mostVisible = entry;
          highestRatio = entry.intersectionRatio;
        }
      });

      if (mostVisible && mostVisible.target instanceof Element) {
        if (mostVisible.target.id === "hero") {
          // If Hero is the most visible, clear any active navigation item
          setActiveSection("");
        } else {
          // Set the active section for navigation items
          setActiveSection(mostVisible.target.id);
        }
      }
    };

    const handleStickyChange = () => {
      // Check if the navigation is stuck to the top
      const navElement = document.querySelector('[data-nav="main"]');
      if (navElement) {
        const rect = navElement.getBoundingClientRect();
        setIsSticky(rect.top <= 0);
      }
    };

    // Setup intersection observer for active sections
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin: "-25% 0px -45% 0px",
      threshold: 0.1,
    });

    // Observe all sections
    navigationItems.forEach((item) => {
      const element = document.getElementById(item.targetSection);
      if (element) {
        observer.observe(element);
      }
    });

    // Also observe the Hero section
    const heroElement = document.getElementById("hero");
    if (heroElement) {
      observer.observe(heroElement);
    }

    // Setup scroll listener for sticky detection
    window.addEventListener("scroll", handleStickyChange);
    handleStickyChange(); // Initial check

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleStickyChange);
    };
  }, []);

  return (
    <nav
      data-nav="main"
      className={`sticky top-0 z-50 w-full hidden lg:flex justify-center transition-all duration-300 ease-in-out ${
        isSticky ? "bg-white/95 shadow-sm" : "bg-white/90 backdrop-blur-sm"
      }`}
    >
      <div
        className={`w-full max-w-[85vw] transition-all duration-300 ease-in-out ${
          isSticky
            ? "py-4 px-4 md:px-8 min-[1090px]:px-12 xl:px-16"
            : "py-12 px-4 md:px-8 min-[1090px]:px-12 xl:px-16"
        }`}
      >
        <ul className="flex items-center justify-between">
          {navigationItems.map((item) => (
            <li key={item.id}>
              <NavigationItem
                id={item.id}
                label={item.label}
                targetSection={item.targetSection}
                isActive={activeSection === item.targetSection}
                isSticky={isSticky}
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
