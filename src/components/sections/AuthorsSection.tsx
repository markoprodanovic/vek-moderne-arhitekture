import Image from "next/image";
import SectionContainer from "@/components/ui/SectionContainer";

export default function AuthorsSection() {
  return (
    <section className="w-full bg-[#FBF9F7] text-[#1E1E1E]">
      <SectionContainer>
        <div className="w-full">
          <h2 className="text-2xl md:text-5xl font-medium mb-16">O AUTORIMA</h2>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 lg:gap-32">
              <div className="flex flex-col space-y-6">
                <div className="relative w-full aspect-square">
                  <Image
                    src="/gordana.png"
                    alt="Gordana Dulić"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-sm md:text-base leading-relaxed">
                  <p>
                    <span className="text-xl md:text-2xl lg:text-3xl">
                      Gordana Dulić
                    </span>
                    , dipl. ing. arh., završila je Arhitektonski fakultet
                    Univerziteta u Beogradu 1977. godine. Na početku karijere
                    radila je na gradilištima na izvođenju enterijera.
                    Poslednjih pet godina svog radnog veka, je bila član
                    menadžmenta u Građevinskoj direkciji Srbije. Najveći deo
                    svoje profesionalne karijere provela je u obrazovanju, kao
                    profesor u Arhitektonskoj tehničkoj školi. Bila je posvećena
                    unaprerđenju obrazovanja i uvođenju inovacija u cilju
                    približavanja inženjerskih i arhitektonskih tema novim
                    generacijama budućih tehničara i arhitekata. Talentovani
                    mladi ljudi sa kojima je radila 30 godina inspirisali su je
                    da neprestano ulaže veliki trud da im olakša proces učenja.
                    Napisala je desetak knjiga, uglavnom udžbeničke literature
                    od kojih su neke doživele više od 10 izdanja. Kao jedan od
                    autora Školskog sveznjanja, u izdanju “Zavoda za udžbenike i
                    nastavna sredstva” svoj doprinos je dala kroz autorske
                    tekstove u kojima je obradila vise od 200 pojmova iz
                    arhitekture. Knjiga Istorija arhitekture (koautor Naila
                    Voljevica) nagrađena je prilikom prvog izdanja 2005. godine
                    i usled izuzetnog interesovanja čitalaca 2020. godine
                    doživela je još jedno izdanje, iako se usled promene
                    programa više ne koristi kao užbenik.
                    Kontinualni,višedeceniski rad na praćenju i prikupljanju
                    podataka o savremenoj arhitekturi pretočen je u novu knjigu
                    Vek moderne arhitekture, u nadi da će bogato ilustrovan
                    tekst dodatno doprineti obrazovanju novih generacija
                    tehničara i arhitekata, i zainteresovati širok krug
                    ljubitelja arhitekture. Na različitim destinacijama:
                    Francuska, Holandija, Čile, Kanada, Beograd, svoju neizmernu
                    ljubav ka obrazovanju i knjigama, aktivno deli sa unucima
                    Elenom, Tarom i Riverom.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-6">
                <div className="relative w-full aspect-square">
                  <Image
                    src="/jelena.png"
                    alt="Jelena Nestorović Prodanović"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-sm md:text-base leading-relaxed">
                  <p>
                    <span className="text-xl md:text-2xl lg:text-3xl">
                      Jelena Nestorović Prodanović
                    </span>
                    , dipl. ing. arh., završila je Arhitektonski fakultet
                    Univerziteta u Beogradu 1991. godine, sa idejnim projektom
                    multimedijskog centra na arheološkom lokalitetu stare
                    Narodne biblioteke Kosančićevog venca, u klasi profesora
                    Aleksandra Kekovića. Od 1995. godine živi i radi u Kanadi.
                    Pre odlaska u Kanadu radila je u građevinskom preduzeću
                    KOMGRAP, na gradilištu Kopitareva Gradina i studirala na
                    postdiplomskom programu “Morfologija urbanog vremena i
                    prostora” u klasi profesora Miloša Bobića. Rano
                    interesovanje za istoriju i arheologiju, kroz akcije Mladih
                    istraživača Srbije, dopunjeno arhitektonskim studijama i
                    praksom, kreirali su ljubav prema putovanjima i
                    dokumentovanju arhitektonskih dela. Intenzivna putovanja po
                    Evropskom, Američkom i Azijskom kontinentu, i obilasci niza
                    značajnih arhitektonskih lokacija, uz uporedno praćenje
                    razvoja tehnologija i medija, doprineli su njenom
                    sveobuhvatnom sagledavanju procesa učenja i rada,
                    interesovanju za različite kulture i pravce, kao i
                    zastupanju multimedijske konverzacije u arhitektonskoj
                    praksi. Uz aktivni rad na nizu različitih urbanističkih i
                    arhitektonskih projekata u Kanadi, Jelena željno planira
                    sledeće putovanje u Australiju i zauvek ostaje zaljubljena u
                    knjige, Bauhaus, Beogradska pozorišta, Kosančićev venac i
                    Karaburmu, gde je odrasla i Petrogradsku ulicu i Vračar, gde
                    je živela pre odlaska u Kanadu.
                  </p>
                </div>
              </div>
            </div>
            <div className="hidden md:block absolute left-1/2 top-0 w-px h-full bg-[#1E1E1E] transform -translate-x-1/2"></div>
          </div>
          <div className="w-full h-px bg-[#1E1E1E] mt-16 mb-8"></div>
        </div>
      </SectionContainer>
    </section>
  );
}
