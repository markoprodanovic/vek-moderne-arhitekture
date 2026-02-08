"use client";

import { useState } from "react";
import { EraItemProps } from "@/types/links";

export default function EraItem({ era, index }: EraItemProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="border-b border-[#494949] last:border-b-0">
      <button
        onClick={toggleExpanded}
        className="w-full py-6 flex justify-between items-center text-left transition-colors group"
        aria-expanded={isExpanded}
        aria-controls={`era-content-${index}`}
      >
        <h3 className="text-lg md:text-xl font-medium text-[#1E1E1E] group-hover:text-[#4b4b4b]">
          {era.era}
        </h3>
        <div className="ml-4 shrink-0">
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              isExpanded ? "rotate-90" : "-rotate-90"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </div>
      </button>

      {isExpanded && (
        <div id={`era-content-${index}`} className="pb-6">
          <div className="space-y-6">
            {era.architects.map((architect, architectIndex) => (
              <div key={architectIndex} className="space-y-3">
                <h4 className="font-bold text-[#1E1E1E] text-base md:text-lg">
                  {architect.name}
                </h4>
                <div className="space-y-2 pl-4">
                  {architect.urls.map((link, linkIndex) => (
                    <div key={linkIndex}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#1E1E1E] underline hover:no-underline text-sm md:text-base transition-all duration-200 hover:text-gray-700"
                      >
                        {link.title}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
