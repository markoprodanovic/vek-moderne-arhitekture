"use client";

import { useEffect, useState } from "react";
import SectionContainer from "@/components/ui/SectionContainer";
import EraItem from "@/components/ui/EraItem";
import { Era } from "@/types/links";

const DEFAULT_ERROR_MESSAGE = "Failed to fetch links";

export default function LinksSection() {
  const [eras, setEras] = useState<Era[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch("/api/links");
        if (!response.ok) {
          throw new Error(DEFAULT_ERROR_MESSAGE);
        }
        const data = await response.json();
        setEras(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : DEFAULT_ERROR_MESSAGE);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-[#FBF9F7] text-[#1E1E1E]">
        <SectionContainer>
          <div className="w-full">
            <h2 className="text-2xl md:text-5xl font-medium mb-16">LINKOVI</h2>
            <div className="w-full">
              <div className="flex justify-center py-12">
                <div className="text-lg">Loading...</div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full bg-[#FBF9F7] text-[#1E1E1E]">
        <SectionContainer>
          <div className="w-full">
            <h2 className="text-2xl md:text-5xl font-medium mb-16">LINKOVI</h2>
            <div className="w-full">
              <div className="flex justify-center py-12">
                <div className="text-lg text-[#D54C4C]">{error}</div>
              </div>
            </div>
          </div>
        </SectionContainer>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#FBF9F7] text-[#1E1E1E]">
      <SectionContainer>
        <div className="w-full">
          <h2 className="text-2xl md:text-5xl font-medium mb-16">LINKOVI</h2>
          <div className="w-full">
            {eras.map((era, index) => (
              <EraItem key={index} era={era} index={index} />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
}
