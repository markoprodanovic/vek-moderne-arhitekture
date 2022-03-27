import React from "react"
import Header from "../components/header"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import { useMediaQuery } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  container: {
    width: "80%",
    maxWidth: 1380,
    display: "flex",
    justifyContent: "center",
    margin: "0 auto",
    paddingTop: "25px",
  },
  containerMobile: {
    width: "80%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "0 auto",
    paddingTop: "25px",
  },
  image: {
    height: 650,
    marginRight: 24,
    marginBottom: 0,
  },
  imageMobile: {
    height: 420,
    marginBottom: 24,
    marginRight: 0,
  },
  text: {
    textAlign: "justify",
  },
  paragraph: {
    marginBottom: "16px",
  },
}))

const Oknjizi = () => {
  const classes = useStyles()
  const matches = useMediaQuery("(max-width:1200px)")
  return (
    <React.Fragment>
      <Header />
      <div className={matches ? classes.containerMobile : classes.container}>
        <img
          className={matches ? classes.imageMobile : classes.image}
          src="cover.png"
        />
        <div className={classes.text}>
          <Typography className={classes.paragraph}>
            Knjiga “Vek moderne arhitekture”, provešće vas kroz različite
            promene u arhitektonskom stvaralaštvu, u periodu od jednog veka,
            prikazivanjem značajnih arhitektonskih dela izabranih proslavljenih
            graditelja. Od nastanka modernizma u prvim decenijama prošlog veka,
            inovativni pristupi u arhitekturi se neprestano menjaju i
            unapređuju. Sve razvijenija ekološka svest doprinosi široj primeni
            energetski efikasnijih metoda u svim disciplinama, posebno u
            arhitekturi i građevinarstvu koji poseduju značajan potencijal za
            oblikovanje održivog životnog okruženja. Novi i unapređeni
            materijali i tehnike gradjevinske realizacije, omogućuju nastanak
            moćnijih konstrukcija koje premošćuju sve veće raspone i omogućuju
            gradnju sve viših zgrada. U procesu projektovanja koriste se
            savremeni kompjuterski programi koji doprinose kreiranju
            maštovitijih i složenijih formi. Sve to doprinosi neobičnom
            bogatstvu i raznovrsnosti moderne arhitekture, nastale u periodu od
            dvadestetih godina XX veka do dvadesetih godina XXI veka, u celom
            svetu.{" "}
          </Typography>
          <Typography className={classes.paragraph}>
            2019 godine je obeleženo 100 godina, vek od osnivanja škole Bauhaus,
            škole koja je postavila osnovne principe modernog dizajna i
            arhitekture, kombinovano sa inovacijama u obrazovanju i novim
            sistemom vrednosti prvenstveno vezanim za upotrebu novih materijala
            i industrijalizaciju. Pravci koji su usledili, bilo kao nastavak
            principa i estetskih kriterijuma koje je utemeljila i propagirala
            škola, ili kao reakcija na novonametnutu jednostavnost i odsustvo
            ornamentalnog, i dalje se baziraju na novim medijskim i tehnološkim
            dometima. Ideja da se dostigne sjedinjenje umetničkih disciplina u
            cilju oplemenjivanja funkcionisanja svakodnevnog života još uvek je
            aktuelna kao i ideja da obrazovanje treba da obuhvati različite
            izvore u cilju potpunijeg prenosa informacije i podsticanja slobode
            umetničkog izražavanja.
          </Typography>
          <Typography className={classes.paragraph}>
            Pored pisanih knjiga, medijski izvori: internet publikacije,
            blogovi, intervjui sa autorima, filmovi, dragoceni su izvori da se
            nadogradi informacija, upotpuni razumevanje i stekne nova
            inspiracija za potencionalna putovanja i fizičko sagledavanje
            različitih arhitektonskih objekata, kao i za samo individualno
            arhitektonsko izražavanje i praksu.
          </Typography>
          <Typography className={classes.paragraph}>
            U nastojanju da ova knjiga uključi raznovrsnije informacije i dobije
            savremeno obeležje, u skladu sa vremenom u kojem živimo, u kome
            multimediji imaju značajno učešće u svim sferama naših života, uz
            knjigu je priložen i website knige sa interaktivnom Google mapom na
            kojoj su locirani svi objekti i priloženi linkovi aktivnih
            arhitektonskih studia i specificnih projekata. U cilju dubljeg
            sagledanja života i stvaralaštva arhitekata čiji je rad predstavljen
            u knjizi, uključeni su i linkovi intervjua i filmova koji govore o
            njihovim stavovima i razmišljanjima u procesu rada, kao i različitim
            okolnostima koje su uticale na njihovo profesionalno stvaralaštvo.
          </Typography>
        </div>
      </div>
    </React.Fragment>
  )
}
export default Oknjizi
