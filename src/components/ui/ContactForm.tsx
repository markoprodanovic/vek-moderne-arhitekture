"use client";

import { useState, useEffect } from "react";

export default function ContactForm() {
  const [result, setResult] = useState("");
  const [isVisible, setIsVisible] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

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

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("message", formData.message);
    form.append(
      "access_key",
      process.env.NEXT_PUBLIC_CONTACT_FORM_ACCESS_KEY || "",
    );

    const response = await fetch(
      process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT || "",
      {
        method: "POST",
        body: form,
      },
    );

    const data = await response.json();
    if (data.success) {
      // Clear the form on successful submission
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    }
    setResult(data.success ? "Uspešno" : "Greška");
    setIsVisible(true);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="name" className="block text-[#FBF9F7] font-medium">
          Ime
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Ime"
          value={formData.name}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-[#2A2A2A] text-[#FBF9F7] placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-[#FBF9F7] transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="block text-[#FBF9F7] font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 bg-[#2A2A2A] text-[#FBF9F7] placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-[#FBF9F7] transition-colors"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="message" className="block text-[#FBF9F7] font-medium">
          Poruka
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Poruka"
          value={formData.message}
          onChange={handleInputChange}
          required
          rows={6}
          className="w-full px-4 py-3 bg-[#2A2A2A] text-[#FBF9F7] placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-[#FBF9F7] transition-colors resize-vertical"
        ></textarea>
      </div>

      <div className="flex justify-end">
        <div className="relative">
          <button
            type="submit"
            className="px-8 py-3 border border-[#FBF9F7] text-[#FBF9F7] hover:bg-[#FBF9F7] hover:text-[#1E1E1E] transition-colors font-medium"
          >
            Pošalji
          </button>
          {result && (
            <p
              className={`absolute top-full right-0 mt-2 font-medium transition-opacity duration-500 ${
                isVisible ? "opacity-100" : "opacity-0"
              } ${result === "Uspešno" ? "text-[#ACE599]" : "text-[#E58686]"}`}
            >
              {result}
            </p>
          )}
        </div>
      </div>
    </form>
  );
}
