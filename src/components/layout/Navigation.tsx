"use client";

import { useRef, useState, useEffect } from "react";
import NavigationItem from "./NavigationItem";
import MapNavigationItem from "./MapNavigationItem";

const navigationItems = [
  { label: "MAPA", section: "map" },
  { label: "O KNIZI", section: "about" },
  { label: "O AUTORIMA", section: "authors" },
  { label: "LINKOVI", section: "links" },
  { label: "KONTAKT", section: "contact" },
];

const observedSections = [
  "hero",
  ...navigationItems.map((item) => item.section),
];

export default function Navigation() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isStickyRef = useRef(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        let mostVisible: IntersectionObserverEntry | null = null;

        for (const entry of entries) {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > (mostVisible?.intersectionRatio ?? 0)
          ) {
            mostVisible = entry;
          }
        }

        if (mostVisible) {
          const id = mostVisible.target.id;
          setActiveSection(id === "hero" ? "" : id);
        }
      },
      { rootMargin: "-25% 0px -45% 0px", threshold: 0.1 },
    );

    for (const id of observedSections) {
      const el = document.getElementById(id);
      if (el) sectionObserver.observe(el);
    }

    const handleScroll = () => {
      if (!sentinelRef.current) return;
      const y = sentinelRef.current.getBoundingClientRect().bottom;

      // Hysteresis: different thresholds for entering vs leaving sticky
      // to prevent rapid toggling when scrolling slowly near the boundary
      const shouldStick = isStickyRef.current ? y < 10 : y < -10;
      if (shouldStick !== isStickyRef.current) {
        isStickyRef.current = shouldStick;
        setIsSticky(shouldStick);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      sectionObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="h-px" />
      <nav
        className={`sticky top-0 z-50 w-full hidden lg:flex justify-center transition-all duration-300 ease-in-out ${
          isSticky ? "bg-white/95 shadow-sm" : "bg-white/90 backdrop-blur-sm"
        }`}
      >
        <div
          className={`w-full max-w-[85vw] px-4 md:px-8 min-[1090px]:px-12 xl:px-16 transition-all duration-300 ease-in-out ${
            isSticky ? "py-4" : "py-12"
          }`}
        >
          <ul className="flex items-center justify-between">
            {navigationItems.map((item) => {
              const Component =
                item.section === "map" ? MapNavigationItem : NavigationItem;
              return (
                <li key={item.section}>
                  <Component
                    label={item.label}
                    targetSection={item.section}
                    isActive={activeSection === item.section}
                    isSticky={isSticky}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </nav>
    </>
  );
}
