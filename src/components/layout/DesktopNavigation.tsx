import type { RefObject } from "react";
import NavigationItem from "./NavigationItem";
import MapNavigationItem from "./MapNavigationItem";
import { navigationItems } from "./navigationItems";

interface DesktopNavigationProps {
  isSticky: boolean;
  activeSection: string;
  navRef: RefObject<HTMLElement | null>;
}

export default function DesktopNavigation({
  isSticky,
  activeSection,
  navRef,
}: DesktopNavigationProps) {
  return (
    <nav
      ref={navRef}
      className={`sticky top-0 z-50 w-full hidden lg:flex justify-center transition-all duration-300 ease-in-out ${
        isSticky
          ? "bg-[#FBF9F7] border-b border-[#E5E5E5] translate-y-0"
          : "bg-[#FBF9F7] backdrop-blur-sm -translate-y-10"
      }`}
    >
      <div
        className={`w-full max-w-[85vw] px-4 md:px-8 min-[1090px]:px-12 xl:px-16 transition-all duration-300 ease-in-out ${
          isSticky ? "py-4" : "py-14"
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
  );
}
