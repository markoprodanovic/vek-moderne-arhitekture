interface NavigationItemProps {
  label: string;
  targetSection: string;
  isActive?: boolean;
  isSticky?: boolean;
}

export default function NavigationItem({
  label,
  targetSection,
  isActive = false,
  isSticky = false,
}: NavigationItemProps) {
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
      className={`text-[#1E1E1E] hover:opacity-70 transition-all duration-500 ease-out font-medium ${
        isSticky
          ? "text-sm md:text-base lg:text-lg"
          : "text-base md:text-lg lg:text-3xl"
      }`}
    >
      <div className="relative flex flex-col items-center">
        <span>{label}</span>
        <div
          className="absolute top-full mt-1 h-0.5 w-6 bg-[#1E1E1E] rounded-full transition-opacity duration-500 ease-out"
          style={{ opacity: isActive ? 1 : 0 }}
        />
      </div>
    </button>
  );
}
