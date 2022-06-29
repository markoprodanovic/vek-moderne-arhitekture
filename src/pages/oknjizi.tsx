import React, { useState } from "react"
import Button from "@material-ui/core/Button"
import Header from "../components/header"
import { Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core"
import { useMediaQuery } from "@material-ui/core"
import { RS, GB } from "country-flag-icons/react/3x2"

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
    paddingTop: 10,
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
    textAlign: "left",
  },
  paragraph: {
    marginBottom: "16px",
  },
  langBtnContainer: {
    // width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
    paddingRight: 24,
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center",
      paddingRight: 0,
    },
  },
}))

const Oknjizi = () => {
  const classes = useStyles()
  const matches = useMediaQuery("(max-width:1200px)")
  const [isSerbian, setIsSerbian] = useState(true)

  const serbianText = (
    <div className={classes.text}>
      <Typography className={classes.paragraph}>
        Knjiga “Vek moderne arhitekture”, provešće vas kroz različite promene u
        arhitektonskom stvaralaštvu, u periodu od jednog veka, prikazivanjem
        značajnih arhitektonskih dela izabranih proslavljenih graditelja. Od
        nastanka modernizma u prvim decenijama prošlog veka, inovativni pristupi
        u arhitekturi se neprestano menjaju i unapređuju. Sve razvijenija
        ekološka svest doprinosi široj primeni energetski efikasnijih metoda u
        svim disciplinama, posebno u arhitekturi i građevinarstvu koji poseduju
        značajan potencijal za oblikovanje održivog životnog okruženja. Novi i
        unapređeni materijali i tehnike gradjevinske realizacije, omogućuju
        nastanak moćnijih konstrukcija koje premošćuju sve veće raspone i
        omogućuju gradnju sve viših zgrada. U procesu projektovanja koriste se
        savremeni kompjuterski programi koji doprinose kreiranju maštovitijih i
        složenijih formi. Sve to doprinosi neobičnom bogatstvu i raznovrsnosti
        moderne arhitekture, nastale u periodu od dvadestetih godina XX veka do
        dvadesetih godina XXI veka, u celom svetu.{" "}
      </Typography>
      <Typography className={classes.paragraph}>
        2019 godine je obeleženo 100 godina, vek od osnivanja škole Bauhaus,
        škole koja je postavila osnovne principe modernog dizajna i arhitekture,
        kombinovano sa inovacijama u obrazovanju i novim sistemom vrednosti
        prvenstveno vezanim za upotrebu novih materijala i industrijalizaciju.
        Pravci koji su usledili, bilo kao nastavak principa i estetskih
        kriterijuma koje je utemeljila i propagirala škola, ili kao reakcija na
        novonametnutu jednostavnost i odsustvo ornamentalnog, i dalje se
        baziraju na novim medijskim i tehnološkim dometima. Ideja da se dostigne
        sjedinjenje umetničkih disciplina u cilju oplemenjivanja funkcionisanja
        svakodnevnog života još uvek je aktuelna kao i ideja da obrazovanje
        treba da obuhvati različite izvore u cilju potpunijeg prenosa
        informacije i podsticanja slobode umetničkog izražavanja.
      </Typography>
      <Typography className={classes.paragraph}>
        Pored pisanih knjiga, medijski izvori: internet publikacije, blogovi,
        intervjui sa autorima, filmovi, dragoceni su izvori da se nadogradi
        informacija, upotpuni razumevanje i stekne nova inspiracija za
        potencionalna putovanja i fizičko sagledavanje različitih arhitektonskih
        objekata, kao i za samo individualno arhitektonsko izražavanje i praksu.
      </Typography>
      <Typography className={classes.paragraph}>
        U nastojanju da ova knjiga uključi raznovrsnije informacije i dobije
        savremeno obeležje, u skladu sa vremenom u kojem živimo, u kome
        multimediji imaju značajno učešće u svim sferama naših života, uz knjigu
        je priložen i website knige sa interaktivnom Google mapom na kojoj su
        locirani svi objekti i priloženi linkovi aktivnih arhitektonskih studia
        i specificnih projekata. U cilju dubljeg sagledanja života i
        stvaralaštva arhitekata čiji je rad predstavljen u knjizi, uključeni su
        i linkovi intervjua i filmova koji govore o njihovim stavovima i
        razmišljanjima u procesu rada, kao i različitim okolnostima koje su
        uticale na njihovo profesionalno stvaralaštvo.
      </Typography>
    </div>
  )

  const englishText = (
    <div className={classes.text}>
      <Typography className={classes.paragraph}>
        The book "The Century of Modern Architecture" will take you through
        various developments in architecture over the past 100 years by showing
        you some of the most significant works by selected architects.
      </Typography>
      <Typography className={classes.paragraph}>
        Since the emergence of modernism in the early decades of the last
        century, approaches to architecture have been in constant flux. We have
        seen a greater focus on environmental awareness, which has contributed
        to the wider application of more energy efficient technologies in
        architecture and construction. New materials and techniques for
        construction have enabled us to build more powerful structures.
        Computerization have made the design process faster and more efficient,
        which has allowed us to build in more imaginative and complex ways. All
        of this has contributed to the extraordinary richness and diversity in
        modern architecture across the globe.
      </Typography>
      <Typography className={classes.paragraph}>
        In 2019, the world celebrated the 100th anniversary of the Bauhaus
        School of Art and Design, a school that set the basic principles for
        modernity by developing a fusion of fine art, craftmenship and
        technology applied across media. What followed was either a continuation
        of the principles and aesthetic criteria established and propagated by
        the school, or an opposite reaction to the newly imposed simplicity and
        absence of the ornamental. In both cases, going forward was fully
        influenced by the new aproach, along with new media and technological
        achievements. The idea of ​​achieving the unification of artistic
        disciplines in order to improve the functionality of everyday life is
        still relevant, as well as the idea that education should be
        interdisciplinary in order to more effectively transmit information and
        encourage freedom of artistic expression.
      </Typography>
      <Typography className={classes.paragraph}>
        In addition to written books, media sources such as internet
        publications, blogs, interviews, and films, are valuable sources of
        information that allow us to get a better understanding of architectural
        expression. It is an open call to inspire and fulfil personal
        professional involment by traveling and visiting diferent sites.
      </Typography>
      <Typography className={classes.paragraph}>
        This book is also accompanied by a website with an interactive Google
        map with building locations, as well as links to the active
        architectural studios. You’ll also find links to interviews with
        architects that present their ways of working and thinking, as well as
        the various circumstances that influenced their professional work.
      </Typography>
    </div>
  )

  return (
    <React.Fragment>
      <Header />
      <div className={classes.langBtnContainer}>
        <Button
          style={{ backgroundColor: "#eee", color: "#000" }}
          onClick={() => setIsSerbian(!isSerbian)}
          variant="contained"
          color="primary"
          startIcon={
            isSerbian ? (
              <GB
                style={{
                  width: 15,
                }}
              />
            ) : (
              <RS
                style={{
                  width: 15,
                }}
              />
            )
          }
        >
          {isSerbian ? " Translate to English" : "Prevedi na Srpski"}
        </Button>
      </div>
      <div className={matches ? classes.containerMobile : classes.container}>
        <img
          className={matches ? classes.imageMobile : classes.image}
          src="/cover.png"
        />
        {isSerbian ? serbianText : englishText}
      </div>
    </React.Fragment>
  )
}
export default Oknjizi
