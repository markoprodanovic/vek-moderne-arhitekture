export default function Hero() {
  return (
    <section
      id="hero"
      className="flex items-center justify-center pt-16 md:pt-16 min-[1090px]:pt-32 xl:pt-32 pb-[25vh]"
    >
      <div className="flex w-full max-w-[85vw] flex-col items-center px-4 md:px-8 min-[1090px]:px-12 xl:px-16">
        <div className="w-full flex flex-col min-[1090px]:flex-row gap-8 min-[1090px]:gap-0 min-[1090px]:items-end">
          <div className="text-[42px] sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-medium leading-[0.8] flex flex-col gap-4 sm:gap-8">
            <div>VEK</div>
            <div>MODERNE</div>
            <div>ARHITEKTURE</div>
          </div>
          <div className="font-medium w-full flex justify-end items-end">
            <div className="flex flex-col min-[1090px]:flex-row min-[1090px]:gap-4 text-xs md:text-base text-right">
              <h4>Gordana Dulić</h4>
              <h4>Jelena Nestorović Prodanović</h4>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
