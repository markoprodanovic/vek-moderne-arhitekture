import ContactForm from "@/components/ui/ContactForm";

export default function Contact() {
  return (
    <section className="w-full bg-[#1E1E1E] text-white">
      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-[90vw] flex-col items-center py-16 px-4 md:py-16 md:px-8 min-[1090px]:py-32 min-[1090px]:px-12 xl:py-32 xl:px-16">
          <div className="w-full">
            <div className="flex flex-col lg:flex-row lg:items-start">
              <h2 className="text-2xl md:text-5xl font-medium mb-8 lg:mb-0 lg:flex-1">
                KONTAKT
              </h2>
              <div className="w-full flex-1 lg:max-w-none">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
