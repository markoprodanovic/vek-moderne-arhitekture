export default function Footer() {
  return (
    <footer className="w-full bg-[#1E1E1E] text-[#FBF9F7]">
      <div className="flex items-center justify-center">
        <div className="flex w-full max-w-[90vw] flex-col py-8 px-4 md:px-8 min-[1090px]:px-12 xl:px-16">
          <div className="w-full h-px bg-[#FBF9F7] mb-8"></div>

          <div className="text-right text-sm space-y-2">
            <div className="flex justify-end items-center gap-3">
              <p>Knigu su Podržali: </p>
              <a
                href="/ministarstvo-kulture.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors underline"
              >
                Ministarstvo Kulture
              </a>
              <div className="w-px h-4 bg-[#FBF9F7]"></div>
              <a
                href="/recenzije.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-300 transition-colors underline"
              >
                Recenzije
              </a>
            </div>
            <p>© 2026 Vek Moderne Arhitekture</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
