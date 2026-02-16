import { ReactNode } from "react";

interface SectionContainerProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

export default function SectionContainer({
  children,
  className = "",
  id,
}: SectionContainerProps) {
  return (
    <section id={id} className="flex items-center justify-center">
      <div
        className={`flex w-full max-w-[85vw] flex-col items-center py-16 px-4 md:py-16 md:px-8 min-[1090px]:py-32 min-[1090px]:px-12 xl:py-32 xl:px-16 ${className}`}
      >
        {children}
      </div>
    </section>
  );
}
