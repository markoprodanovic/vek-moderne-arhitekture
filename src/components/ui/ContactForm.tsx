"use client";

import { useState, useEffect } from "react";

export default function ContactForm() {
  const [result, setResult] = useState("");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (result) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        // Clear result after fade completes
        setTimeout(() => setResult(""), 500);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [result]);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.append(
      "access_key",
      process.env.NEXT_PUBLIC_CONTACT_FORM_ACCESS_KEY || "",
    );

    const response = await fetch(
      process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || "",
      {
        method: "POST",
        body: formData,
      },
    );

    const data = await response.json();
    setResult(data.success ? "Success" : "Error");
    setIsVisible(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-white font-medium">
          Ime
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Ime"
          required
          className="w-full px-4 py-3 bg-[#2A2A2A] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-white transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-white font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-3 bg-[#2A2A2A] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-white transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-white font-medium">
          Poruka
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Poruka"
          required
          rows={6}
          className="w-full px-4 py-3 bg-[#2A2A2A] text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-white transition-colors resize-vertical"
        ></textarea>
      </div>

      <div className="flex justify-end">
        <div className="relative">
          <button
            type="submit"
            className="px-8 py-3 border border-white text-white hover:bg-white hover:text-[#1E1E1E] transition-colors font-medium"
          >
            Podneti
          </button>
          {result && (
            <p
              className={`absolute top-full right-0 mt-2 font-medium transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              } ${result === "Success" ? "text-[#ACE599]" : "text-[#E58686]"}`}
            >
              {result}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
