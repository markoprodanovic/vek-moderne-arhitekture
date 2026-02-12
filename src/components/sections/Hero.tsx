import SectionContainer from "@/components/ui/SectionContainer";

export default function Hero() {
  return (
    <SectionContainer>
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
    </SectionContainer>
  );
}
