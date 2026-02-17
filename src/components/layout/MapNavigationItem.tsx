interface MapNavigationItemProps {
  label: string;
  targetSection: string;
  isActive?: boolean;
  isSticky?: boolean;
}

export default function MapNavigationItem({
  label,
  targetSection,
  isActive = false,
  isSticky = false,
}: MapNavigationItemProps) {
  const scrollToSection = () => {
    const element = document.getElementById(targetSection);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <button
      onClick={scrollToSection}
      className={`hover:opacity-70 transition-all duration-500 ease-out font-medium relative ${
        isSticky
          ? "text-sm md:text-base lg:text-lg"
          : "text-base md:text-lg lg:text-3xl"
      }`}
    >
      <div className="relative flex flex-col items-center overflow-visible">
        {/* Circular background with pulse animation — always in DOM, fades via opacity */}
        <div
          className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-500 ease-out ${
            isSticky ? "opacity-0" : "opacity-100"
          }`}
        >
          <div
            className="bg-[#1E1E1E] rounded-full animate-pulse-gentle"
            style={{
              width: "8rem",
              height: "8rem",
            }}
          />
        </div>

        {/* MAPA text with conditional styling */}
        <span
          className={`transition-all duration-500 ease-out relative z-10 ${
            isSticky ? "text-[#1E1E1E]" : "text-white"
          }`}
        >
          {label}
        </span>

        {/* Active indicator pill — always in DOM, fades via opacity */}
        <div
          className="absolute top-full mt-1 h-0.5 w-6 bg-[#1E1E1E] rounded-full transition-opacity duration-500 ease-out"
          style={{ opacity: isSticky && isActive ? 1 : 0 }}
        />
      </div>

      {/* Add custom pulse animation styles */}
      <style jsx>{`
        @keyframes pulse-gentle {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.85;
          }
          50% {
            transform: scale(1.08);
            opacity: 1;
          }
        }
        .animate-pulse-gentle {
          animation: pulse-gentle 2s ease-in-out infinite;
        }
      `}</style>
    </button>
  );
}
