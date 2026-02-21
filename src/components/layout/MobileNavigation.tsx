"use client";

import { useEffect, useState } from "react";
import { navigationItems } from "./navigationItems";

interface MobileNavigationProps {
  onNavigate: (sectionId: string) => void;
}

export default function MobileNavigation({
  onNavigate,
}: MobileNavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleNavigation = (sectionId: string) => {
    closeMenu();
    onNavigate(sectionId);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <div className="w-full lg:hidden">
      <nav className="fixed top-0 left-0 z-[65] w-full bg-[#FBF9F7]">
        <div className="w-full max-w-[85vw] mx-auto px-4 py-2 flex justify-end">
          <button
            onClick={() => setIsMenuOpen(true)}
            className={`flex flex-col justify-center gap-1.5 p-1.5 transition-opacity duration-300 ${
              isMenuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            aria-label="Otvori navigaciju"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation-menu"
          >
            <span className="block w-7 h-0.5 bg-[#6F6F6F]" />
            <span className="block w-7 h-0.5 bg-[#6F6F6F]" />
            <span className="block w-7 h-0.5 bg-[#6F6F6F]" />
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation-menu"
        aria-hidden={!isMenuOpen}
        className={`fixed inset-0 z-[70] lg:hidden bg-[#FBF9F7] text-[#1E1E1E] transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? "translate-y-0 opacity-100 visible"
            : "-translate-y-full opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="h-full flex flex-col justify-between py-10">
          <div />
          <ul className="flex flex-col items-start gap-10 w-full max-w-[85vw] mx-auto px-4">
            {navigationItems.map((item) => (
              <li key={item.section}>
                <button
                  onClick={() => handleNavigation(item.section)}
                  className="text-4xl sm:text-5xl font-medium tracking-wide hover:opacity-80 transition-opacity duration-300"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="flex justify-center">
            <button
              onClick={closeMenu}
              className="p-3 hover:opacity-80 transition-opacity duration-300"
              aria-label="Zatvori navigaciju"
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M6 14L12 8L18 14"
                  stroke="#1E1E1E"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
