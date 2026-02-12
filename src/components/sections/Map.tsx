import SectionContainer from "@/components/ui/SectionContainer";

export default function Map() {
  return (
    <SectionContainer>
      <div className="w-full">
        <h1 className="text-2xl md:text-5xl font-medium">MAPA</h1>
        <p className="pt-8">
          Lorem ipsum dolor sit amet consectetur adipiscing elit. Quisque
          faucibus ex sapien vitae pellentesque sem placerat. In id cursus mi
          pretium tellus duis convallis. Tempus leo eu aenean sed diam urna
          tempor. Pulvinar vivamus fringilla lacus nec metus bibendum egestas.
          Iaculis massa nisl malesuada lacinia integer nunc posuere. Ut
          hendrerit semper vel class aptent taciti sociosqu. Ad litora torquent
        </p>
        <div className="pt-8 w-full">
          <iframe
            src="https://www.google.com/maps/d/embed?mid=1ohAPRF2coYSCHiRck6wBxou9WzGQIFSE"
            width="100%"
            height="600"
            style={{ border: "2px solid #1E1E1E" }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Maps Embed"
          />
        </div>
      </div>
    </SectionContainer>
  );
}
