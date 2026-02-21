import NavigationItem from "./NavigationItem";
import MapNavigationItem from "./MapNavigationItem";
import { navigationItems } from "./navigationItems";

interface DesktopNavigationProps {
  isSticky: boolean;
  activeSection: string;
}

export default function DesktopNavigation({
  isSticky,
  activeSection,
}: DesktopNavigationProps) {
  return (
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
  );
}
