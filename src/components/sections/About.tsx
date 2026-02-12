"use client";

import { useState } from "react";
import { translations, type Language } from "@/data/translations";

export default function About() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("srpski");

  const currentContent = translations[selectedLanguage];

  return (
    <section className="w-full bg-[#1E1E1E] text-white">
      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-[90vw] flex-col items-center py-16 px-4 md:py-16 md:px-8 min-[1090px]:py-32 min-[1090px]:px-12 xl:py-32 xl:px-16">
          <div className="w-full">
            <h2 className="text-2xl md:text-5xl font-medium mb-8">O KNIZI</h2>
            <div className="flex gap-6 mb-8 justify-center">
              <button
                onClick={() => setSelectedLanguage("srpski")}
                className={`text-sm md:text-base font-medium border-b-2 pb-1 ${
                  selectedLanguage === "srpski"
                    ? "border-white"
                    : "border-transparent text-white/70 hover:text-white"
                }`}
              >
                SRPSKI
              </button>
              <button
                onClick={() => setSelectedLanguage("english")}
                className={`text-sm md:text-base font-medium border-b-2 pb-1 ${
                  selectedLanguage === "english"
                    ? "border-white"
                    : "border-transparent text-white/70 hover:text-white"
                }`}
              >
                ENGLISH
              </button>
            </div>
            <div className="space-y-6 text-sm md:text-base leading-relaxed">
              {currentContent.paragraphs.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
            <div className="w-full h-px bg-white mt-16 mb-8"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
