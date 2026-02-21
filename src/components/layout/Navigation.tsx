"use client";

import { useRef, useState, useEffect } from "react";
import DesktopNavigation from "./DesktopNavigation";
import MobileNavigation from "./MobileNavigation";
import { navigationItems } from "./navigationItems";

const observedSections = [
  "hero",
  ...navigationItems.map((item) => item.section),
];

export default function Navigation() {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const isStickyRef = useRef(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

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

  useEffect(() => {
    const updateDesktopNavHeight = () => {
      const navHeight = desktopNavRef.current?.offsetHeight ?? 0;
      document.documentElement.style.setProperty(
        "--desktop-nav-height",
        `${navHeight}px`,
      );
    };

    updateDesktopNavHeight();
    window.addEventListener("resize", updateDesktopNavHeight);

    return () => {
      window.removeEventListener("resize", updateDesktopNavHeight);
    };
  }, []);

  return (
    <>
      <div ref={sentinelRef} className="h-px" />
      <MobileNavigation onNavigate={scrollToSection} />
      <DesktopNavigation
        isSticky={isSticky}
        activeSection={activeSection}
        navRef={desktopNavRef}
      />
    </>
  );
}
