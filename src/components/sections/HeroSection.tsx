export default function HeroSection() {
  return (
    <section className="flex min-h-screen items-center justify-center">
      <div className="flex min-h-screen w-full max-w-[90vw] flex-col items-center py-16 px-4 md:py-16 md:px-8 min-[1090px]:py-32 min-[1090px]:px-12 xl:py-32 xl:px-16">
        <div className="w-full flex flex-col min-[1090px]:flex-row gap-8 min-[1090px]:gap-0 min-[1090px]:items-end">
          <div className="text-[44px] sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-medium leading-[0.8] flex flex-col gap-4 sm:gap-8">
            <div>VEK</div>
            <div>MODERNE</div>
            <div>ARHITEKTURE</div>
          </div>
          <div className="font-medium w-full flex min-[1090px]:justify-end items-end">
            <div className="flex flex-row gap-4 text-xs md:text-base">
              <h4>Gordana Dulić</h4>
              <h4>Jelena Nestorović Prodanović</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
