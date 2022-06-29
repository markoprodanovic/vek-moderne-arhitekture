import React from "react"
import Header from "../components/header"
import {
  Typography,
  List,
  ListItem,
  Link,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@material-ui/core"
import OpenNewIcon from "@material-ui/icons/OpenInNew"

const links = [
  {
    era: "PREDSTAVNICI MODERNE ARHITEKTURE PRVE POLOVINE XX VEKA",
    architects: [
      {
        name: "Valter Gropius (Walter Gropius)",
        urls: [
          {
            title: "Walter Gropius - The Dessau Bauhaus",
            url: "https://www.youtube.com/watch?v=jM8mLQhC688",
          },
          {
            title: "Bauhaus-The Face of the 20th Century",
            url: "https://www.youtube.com/watch?v=OdqSmnGTwHc",
          },
          {
            title: "Reflections on the BSA: Walter Gropius",
            url: "https://www.youtube.com/watch?v=gQsOtO9Wy4c",
          },
          {
            title:
              "Architecture, art and design - 100 years of the Bauhaus (1/3)",
            url: "https://www.youtube.com/watch?v=rg3X1vZN5TA",
          },
          {
            title:
              "Architecture, art and design - 100 years of the Bauhaus (2/3)",
            url: "https://www.youtube.com/watch?v=LW1415Ddf8c",
          },
          {
            title:
              "Architecture, art and design - 100 years of the Bauhaus (3/3)",
            url: "https://www.youtube.com/watch?v=2uVWAS6Q6AY",
          },
        ],
      },
      {
        name: "Mis van der Roe (Mies van der Rohe)",
        urls: [
          {
            title: "Mies Van Der Rohe-Architecture as language",
            url: "https://www.youtube.com/watch?v=Z8VdhVJQm9U",
          },
          {
            title: "Mies van der Rohe's Farnsworth House (1/3)",
            url: "https://www.youtube.com/watch?v=8M3p9iKITaA",
          },
          {
            title: "Mies van der Rohe's Farnsworth House (2/3)",
            url: "https://www.youtube.com/watch?v=Z-JHaP9bdBY",
          },
          {
            title: "Mies van der Rohe's Farnsworth House (3/3)",
            url: "https://youtu.be/vYcg_h0bOkQ",
          },
          {
            title: "Ludwig Mies van der Rohe panel interview",
            url: "https://www.youtube.com/watch?v=S9DsUHAuva8",
          },
        ],
      },
      {
        name: "Frenk Lojd Rajt (Frank Lloyd Wright)",
        urls: [
          {
            title: "Frank Lloyd Wright: The Man Who Built America",
            url: "https://www.youtube.com/watch?v=rn6yMKhzx6I",
          },
          {
            title: "That Far Corner-Frank Lioyd Wright in Los Angeles",
            url: "https://www.youtube.com/watch?v=3juSckHif90",
          },
        ],
      },
      {
        name: "Ričard Nojtra (Richard Neutra)",
        urls: [
          {
            title: "Lovell House / Richard Neutra",
            url: "https://www.youtube.com/watch?v=UPS5DKweDRg",
          },
          {
            title:
              "Iconic Homes: Iconic Perspectives The Neutra VDL Studio and Residences by Richard Neutra",
            url: "https://www.youtube.com/watch?v=4jvwuAOQH08",
          },
          {
            title: "Hollywood Homes by Richard Neutra",
            url: "https://www.youtube.com/watch?v=xwePRnaU5RQ",
          },
        ],
      },
      {
        name: "Le Korbizije ( Le Corbusier)",
        urls: [
          {
            title: "Le Corbusier Paris reportage",
            url: "https://www.youtube.com/watch?v=UP6HHS4abik&t=6s",
          },
          {
            title: "Le Corbusier Documentary ",
            url: "https://www.youtube.com/watch?v=RRsbG1clo0c",
          },
          {
            title:
              "Le Corbusier 50: stories of encounters that have revolutionised design ",
            url: "https://www.youtube.com/watch?v=jLhCG95N7Kg",
          },
          {
            title: "Le Corbusier 2.0",
            url:
              "https://vimeo.com/71120518?embedded=true&source=vimeo_logo&owner=6847335",
          },
          {
            title: "A305/13: Le Corbusier: Villa Savoye",
            url: "https://www.youtube.com/watch?v=40I7y-3Wvcg",
          },
          {
            title: "PAVILLON I LE CORBUSIER I A WALK THROUGH IN 4K",
            url: "https://www.youtube.com/watch?v=D-4-8IcoZBk",
          },
          {
            title: "The Villa Savoye: A Manifesto for Modernity",
            url: "https://www.youtube.com/watch?v=xG5W3lkSVYk&t=8s",
          },
          {
            title: "Le Corbusier Through His Works",
            url: "https://www.youtube.com/watch?v=ykDMQDmbasA",
          },
        ],
      },
      {
        name: "Pjer Luidji Nervi (Pier Luigi Nervi)",
        urls: [
          {
            title:
              "The James Sutherland History Lecture 2019: Pier Luigi Nervi",
            url: "https://www.youtube.com/watch?v=L9LTz8LXFSA",
          },
        ],
      },
      {
        name: "Alvar Alto ( Alvar Aalto)",
        urls: [
          {
            title: "Revisiting Alvar Alto’s Paimio sanatorium",
            url: "https://www.youtube.com/watch?v=TNlvqwXjBX4",
          },
          {
            title: "Alvar Aalto:Technology and nature/ Ywe Jalander",
            url: "https://vimeo.com/169778985",
          },
          {
            title: "Alvar Aalto documentary",
            url: "www.youtube.com/watch?v=a8KCFXfWe94",
          },
          {
            title:
              "Alvar Aalto and the Future of the Modern Project / Kenneth Frampton",
            url: "https://www.youtube.com/watch?v=Mjd58mE76tU",
          },
          {
            title:
              "Lecture explores the legacy of Finnish architect and designer Alvar Aalto",
            url: "https://www.youtube.com/watch?v=i5Z2YXmmvv0",
          },
          {
            title: "Making of: Stool 60 by Alvar Aalto - cairo.de",
            url: "https://www.youtube.com/watch?v=98C6kw_oMbs",
          },
        ],
      },
    ],
  },
  {
    era: "PREDSTAVNICI DRUGE POLOVINE XX VEKA",
    architects: [
      {
        name: "Oskar Nimajer (Oscar Niemeyer)",
        urls: [
          {
            title: "Oscar Niemeyer: Life is a Breath of Air",
            url: "https://vimeo.com/162443903",
          },
        ],
      },
      {
        name: "Ero Sarinen (Eero Saarinen)",
        urls: [
          {
            title: "Detroit Designs the World Eero Saarinen",
            url: "https://www.youtube.com/watch?v=CIFTC4i8idg",
          },
          {
            title: "Eero Saarinen: Shaping the Future",
            url: "https://www.youtube.com/watch?v=o-Cg6qfytlA&t=37s",
          },
          {
            title: "Eero Saarinen’s Design of the MIT Chapel",
            url: "https://www.youtube.com/watch?v=d9CTUk8-bPo",
          },
        ],
      },
      {
        name: "Jorn Udzon ( Jorn Utzon)",
        urls: [
          {
            title: "The Opera House Project: Story of an Australian Icon",
            url: "https://www.youtube.com/watch?v=Cm7MtmjsVls",
          },
          {
            title: "The 5th Facade: The Making of the Sydney Opera House",
            url: "https://vimeo.com/45835867",
          },
        ],
      },
      {
        name: "Luij Kan ( Louis Kahn)",
        urls: [
          { title: "My Architect", url: "https://vimeo.com/67173077" },
          {
            title: "Louis kahn architect",
            url: "https://www.youtube.com/watch?v=ZbE3rmh62x4",
          },
          {
            title: "Louis Kahn: The Power of Architecture Part 1",
            url: "https://www.youtube.com/watch?v=5S9VXfuH14o",
          },
          {
            title: "Louis Kahn: The Power of Architecture Part 2",
            url: "https://www.youtube.com/watch?v=X-NpzAAWv2o",
          },
        ],
      },
      {
        name: "Kenzo Tange (Kenzo Tange)",
        urls: [
          {
            title: "Kenzo Tange architect in Japan Japanology",
            url: "https://www.youtube.com/watch?v=dOA2Lx17KwM",
          },
          {
            title:
              "The Rule of the Game - Christian Kerez, 2012 Kenzo Tange Lecture",
            url: "https://www.youtube.com/watch?v=srONiu7ExHo",
          },
          {
            title: "Yoyogi National Gymnasium / Kenzo Tange",
            url: "https://www.youtube.com/watch?v=3LK3sYHshvo",
          },
        ],
      },
      {
        name: "Ričard Majer ( Richard Meier)",
        urls: [
          {
            title: "Richard Meier — TIME SPACE EXISTENCE",
            url: "https://www.youtube.com/watch?v=RT53kRtEPu8",
          },
          {
            title:
              "Architect Richard Meier reflects on his firm’s 50 year history",
            url: "https://www.youtube.com/watch?v=hG0VW3BOP5Y",
          },
          {
            title: "Current Work: Richard Meier",
            url: "https://www.youtube.com/watch?v=k4BjjwruRcE",
          },
        ],
      },
      {
        name: "Balkrišna Doši (Balkrishna Doshi)",
        urls: [
          {
            title: "Architecture is an extension of life",
            url: "https://www.youtube.com/watch?v=7Kh3OxghZ8I",
          },
          {
            title: "Doshi-Beginings",
            url: "https://www.youtube.com/watch?v=ieFEVTuYdsU",
          },
          {
            title: "Balkrishna Doshi-TIME SPACE EXISTENCE",
            url: "https://www.youtube.com/watch?v=RwbgTGhYyWw",
          },
          {
            title: "Decoding Doshi- The life& design of B.V.Doshi",
            url: "https://www.youtube.com/watch?v=cwTCqZu5E60",
          },
          {
            title: "“Path Uncharted” with Balkrisna Doshi",
            url: "https://www.youtube.com/watch?v=DlQoB90D3lg",
          },
        ],
      },
    ],
  },
  {
    era: "HAJ TEK ARHITEKTURA",
    architects: [
      {
        name: "Ričard Rodžers ( Richard Rogers)",
        urls: [
          {
            title: "Richard Rogers",
            url: "https://www.youtube.com/watch?v=JInb-YwFZ9I",
          },
          {
            title: "The Cut - episode four: Lord Richard Rogers ",
            url: "https://www.youtube.com/watch?v=hfYkAhcclJU",
          },
          {
            title: "Today is much more an age of greed - Richard Rogers",
            url: "https://www.youtube.com/watch?v=S-KhGPfHtEo",
          },
          {
            title: "Richard Rodgers Interview",
            url: "https://www.youtube.com/watch?v=SYa3Fsx-4cU",
          },
          {
            title: "Richard Rodgers Autobiography of an Architect",
            url: "https://www.youtube.com/watch?v=R-HmAJRy8sM",
          },
        ],
      },
      {
        name: "Norman Foster (Norman Foster)",
        urls: [
          {
            title: "How Much Does Your Building Weigh, Mr Foster?",
            url: "https://www.youtube.com/watch?v=1ZC9Mf5ptd4",
          },
          {
            title: "My green agenda for Architecture ",
            url: "https://www.youtube.com/watch?v=jNgkEGs1l4A",
          },
          {
            title: "Norman Foster Interview: Striving for Simplicity",
            url: "https://www.youtube.com/watch?v=hJNxgv9Rak0",
          },
          {
            title: "O’Hare Global Terminal Design",
            url: "https://www.youtube.com/watch?v=Pf79qrl2gDA",
          },
        ],
      },
      {
        name: "Renco Piano (Renzo Piano)",
        urls: [
          {
            title:
              "The genius behind some of the world’s most famous buildings",
            url: "https://www.youtube.com/watch?v=GRfudKFLAmI",
          },
          {
            title: "Renzo Piano Lecture on Architecture and Environment",
            url: "https://www.youtube.com/watch?v=17CbIjFi7k0",
          },
          {
            title: "Renzo Piano Interview",
            url: "https://www.youtube.com/watch?v=7RgMot4BoXs",
          },
        ],
      },
    ],
  },
  {
    era: "POSMODERNIZAM",
    architects: [
      {
        name: "Robert Venturi (Robert Venturi)",
        urls: [
          {
            title:
              "Robert Venturi & Denise Scott Brown - Architecture as flexibility; form follows functions ",
            url: "https://www.youtube.com/watch?v=yDLcVSz8-d0",
          },
          {
            title:
              "American Architecture Now: Robert Venturi, Denise Scott Brown, 1984",
            url: "https://www.youtube.com/watch?v=u4RJcNHWu7Y",
          },
          {
            title: "Robert Venturi: Architecture's Improper Hero Part 1",
            url: "https://www.youtube.com/watch?v=BPuM7_5QPAg",
          },
        ],
      },
      {
        name: "Filip Džonson (Philip Johnson)",
        urls: [
          {
            title: "Philip Johnson Diary of an Eccentric Architect",
            url: "https://www.youtube.com/watch?v=XpOS_wE0xkQ",
          },
          {
            title: "Philip Johnson his life and work",
            url: "https://www.youtube.com/watch?v=KQwkEGnutrQ",
          },
          {
            title: "American Architecture Now: Philip Johnson",
            url: "https://www.youtube.com/watch?v=bHb0DB6pnk4",
          },
        ],
      },
      {
        name: "Majkl Grejvs (Michael Graves)",
        urls: [
          {
            title: "Design for All",
            url: "https://www.youtube.com/watch?v=YB4qC-BXuUk",
          },
          {
            title: "Past as Prologue",
            url: "https://www.youtube.com/watch?v=qW_MQ3vIZdA",
          },
        ],
      },
      {
        name: "Džejms Sterling (James Stirling)",
        urls: [
          {
            title: "James Stirling",
            url: "https://www.youtube.com/watch?v=eqyZn8gwMHw",
          },
          {
            title: "Stirling in Stuttgart",
            url: "https://www.youtube.com/watch?v=-zJp64EKrBg",
          },
        ],
      },
      {
        name: "Mario Bota (Mario Botta)",
        urls: [
          {
            title: "Mario Botta san Giovanni Battista",
            url: "https://www.youtube.com/watch?v=4QE310Ngqw4",
          },
          {
            title: "A CONVERSATION WITH MARIO BOTTA",
            url: "https://www.youtube.com/watch?v=KTSa109jHSc",
          },
          {
            title: "Ask a designer - Mario Botta on architectural style ",
            url: "https://www.youtube.com/watch?v=_hFV29SorBw",
          },
        ],
      },
    ],
  },
  {
    era: "DEKONSTRUVIZAM",
    architects: [
      {
        name: "Bernard Cumi (Bernard Tschumi)",
        urls: [
          {
            title: "Bernard Tschumi Conceptualizing Content",
            url: "https://www.youtube.com/watch?v=SkeKmMxO63E",
          },
          {
            title: "Lecture by Bernard Tschumi",
            url: "https://www.youtube.com/watch?v=RKfAIYhA3Os",
          },
          {
            title: "Bernard Tschumi Interview",
            url: "https://www.youtube.com/watch?v=Dac_llP5Dc0",
          },
        ],
      },
      {
        name: "Piter Ajzenmn (Peter Eisenman)",
        urls: [
          {
            title: "Peter Eisenman Time Space Existence",
            url: "https://www.youtube.com/watch?v=ZNgv2hD4FWI",
          },
          {
            title: "AD Interviews Peter Eisenman",
            url: "https://www.youtube.com/watch?v=HP8ifcS8wMw",
          },
          {
            title: "Peter Eisennman 13 Ways of thinking about heteronomy",
            url: "https://www.youtube.com/watch?v=T2JOIQkdqMM",
          },
        ],
      },
      {
        name: "Zaha Hadid (Zaha Hadid)",
        urls: [
          {
            title: "Zaha Hadid who dares wins",
            url: "https://www.youtube.com/watch?v=SOd5tiAKBs0",
          },
          {
            title: "Zaha: An Architectural Legacy",
            url: "https://www.youtube.com/watch?v=Oy2QIiSQT2U",
          },
          {
            title: "Port House Antwerp",
            url: "https://www.youtube.com/watch?v=_djWKB7C2_o",
          },
          {
            title: "Galaxy SOHO",
            url: "https://www.youtube.com/watch?v=mtGJnT9Nghg",
          },
        ],
      },
      {
        name: "Frenk O Geri (Frank Gehry)",
        urls: [
          {
            title: "Frank Gehry Interview Jump into the unknown",
            url: "https://www.youtube.com/watch?v=iwmKKXSbI3U",
          },
          {
            title: "Frank Gehry in Conversation ",
            url: "https://www.youtube.com/watch?v=nt2ViEm4G2w",
          },
          {
            title: "The playful architecture of Frank Gehry",
            url:
              "https://www.cbsnews.com/video/the-playful-architecture-of-frank-gehry/#x",
          },
        ],
      },
      {
        name: "Daniel Libeskind (Daniel Libeskind)",
        urls: [
          {
            title: "Interview Advice to the Young ",
            url: "https://www.youtube.com/watch?v=QVoQp3sqcak",
          },
          {
            title: "Daniel Libeskind Emotion in Architecture",
            url: "https://www.youtube.com/watch?v=j64YQdrE5CU",
          },
          {
            title: "Daniel Libeskind’s Jewish Museum Berlin",
            url: "https://www.youtube.com/watch?v=pHlatz0bCUU",
          },
          {
            title: "Daniel Libeskind Edge of Order",
            url: "https://www.youtube.com/watch?v=ZDjhN5sZI1c",
          },
          {
            title: "17 words of architectural inspiration",
            url: "https://www.youtube.com/watch?v=G8w4UQL6aI0",
          },
        ],
      },
    ],
  },
  {
    era: "MINIMALIZAM",
    architects: [
      {
        name: "Tadao Ando",
        urls: [
          {
            title: "Tadao Ando",
            url: "https://www.youtube.com/watch?v=zMxfEcs8Owo",
          },
          {
            title: "Tadao Ando - Against the Odds",
            url: "https://www.youtube.com/watch?v=PxosR_VjYGY",
          },
          {
            title: "Samurai Architect: Tadao Ando",
            url: "https://www.youtube.com/watch?v=BchnDHpSODI",
          },
          {
            title: "Architecture Tadao Ando 21_21 Design sight",
            url: "https://www.youtube.com/watch?v=-Rm-f5WewFc",
          },
          {
            title: "Koshino House",
            url: "https://www.youtube.com/watch?v=78g9c75aYLo",
          },
        ],
      },
      {
        name: "Piter Cumtor (Peter Zumthor)",
        urls: [
          {
            title: "Real and Imagined Buildings",
            url: "https://www.youtube.com/watch?v=JY4Djp6nBcs",
          },
          {
            title: "Architect Peter Zumthor",
            url: "https://www.youtube.com/watch?v=lufVOqRWpLQ",
          },
        ],
      },
      {
        name: "KAZUJO SEĐIMA I RJUE NIŠIZAVA",
        urls: [
          {
            title: "Kazuyo Sejima Interview The architecture project",
            url: "https://www.youtube.com/watch?v=JE088Lz5qEE",
          },
          {
            title:
              "Kazuyo Sejima and Rjue Nishizawa Architecture is Environment",
            url: "https://www.youtube.com/watch?v=dtTo9qNrQB8",
          },
          {
            title: "Rolex Learning Center Interview",
            url: "https://www.youtube.com/watch?v=TDTRrMegKyQ",
          },
        ],
      },
    ],
  },
  {
    era: "EKOLOŠKA ODRŽIVA ARHITEKTURA",
    architects: [
      {
        name: "Stefano Boeri (Stefano Boeri)",
        urls: [
          { title: "Website", url: "https://www.stefanoboeriarchitetti.net/" },
          {
            title: "Milan Vertical Forest",
            url: "https://www.youtube.com/watch?v=XXRu_qMhRbs",
          },
          {
            title: "9 ideas for the future of cities",
            url: "https://www.youtube.com/watch?v=eUHUqrAAxds",
          },
          {
            title: "Stefano Boeri Green obsession",
            url: "https://www.stefanoboeriarchitetti.net/",
          },
        ],
      },
      {
        name: "Vansan Kalbo (Vincent Callebaut)",
        urls: [
          { title: "Website", url: "https://vincent.callebaut.org/" },
          {
            title: "Pollinator Park by Vincent Callebaut Architectures",
            url: "https://www.youtube.com/watch?v=D9AEeNph-ks",
          },
          {
            title: "Wooden Orchids by Vincent Callebaut Architects",
            url: "https://www.youtube.com/watch?v=AFd3VVCxc90",
          },
          {
            title: "Keynote by Vincent Callebaut, visionary green architect",
            url: "https://www.youtube.com/watch?v=E2nNtYGuXtg",
          },
        ],
      },
    ],
  },
  {
    era: "SKULPTURALNA ARHITEKTURA",
    architects: [
      {
        name: "Zan Nuvel (Jean Nouvel)",
        urls: [
          { title: "Website", url: "http://www.jeannouvel.com/en/" },
          {
            title: "Jean Nouvel Interview: Architecture is Listening",
            url: "https://www.youtube.com/watch?v=7Z6KOMSSb8s",
          },
          {
            title: "Jean Nouvel: Reflections",
            url: "https://www.youtube.com/watch?v=Tv3MgJLE420",
          },
        ],
      },
      {
        name: "Santiago Kalatrava (Santiago Calatrava)",
        urls: [
          { title: "Website", url: "https://calatrava.com/" },
          {
            title: "Santiago Calatrava - models in motion",
            url: "https://www.youtube.com/watch?v=F07SpcTMcZg",
          },
          {
            title: "Architect Santiago Calatrava",
            url: "https://www.youtube.com/watch?v=h9qSRbUDWEI",
          },
          {
            title: "Architect Santiago Calatrava Interview",
            url: "https://www.youtube.com/watch?v=Ole34CttaA4",
          },
          {
            title: "Santiago Calatrava, Materials and Construction Process",
            url: "https://www.youtube.com/watch?v=88I7C93DODg",
          },
          {
            title:
              "Word Trade Center Oculus Explained by architect Saintiago Calatrava",
            url: "https://www.youtube.com/watch?v=wdgWyT-qrXQ",
          },
        ],
      },
    ],
  },
]

const architectList = () => {
  return (
    <Accordion>
      {links.map(member => (
        <React.Fragment>
          <AccordionSummary aria-controls="panel1a" id="panel1a">
            <Typography variant="h6">{member.era}</Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", flexDirection: "column" }}
          >
            {member.architects.map(architect => {
              console.log(architect)
              return (
                <React.Fragment>
                  <Typography>{architect.name}</Typography>
                  <List>
                    {architect.urls.map(link => (
                      <ListItem>
                        <Link href={link.url} rel="noopener" target="_blank">
                          {link.title}
                          <OpenNewIcon />
                        </Link>
                      </ListItem>
                    ))}
                  </List>
                </React.Fragment>
              )
            })}
          </AccordionDetails>
        </React.Fragment>
      ))}
    </Accordion>
  )
}

const Linkovi = () => {
  return (
    <React.Fragment>
      <Header />
      <div
        style={{ margin: "50px auto", maxWidth: "960px", padding: "0 20px" }}
      >
        {links.map(member => (
          <Accordion>
            <AccordionSummary aria-controls="panel1a" id="panel1a">
              <Typography style={{ fontWeight: "bold" }} variant="h6">
                {member.era}
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ display: "flex", flexDirection: "column" }}
            >
              {member.architects.map(architect => {
                console.log(architect)
                return (
                  <div>
                    <Typography style={{ textDecoration: "underline" }}>
                      {architect.name}
                    </Typography>
                    <List>
                      {architect.urls.map(link => (
                        <ListItem>
                          <Link
                            style={{
                              color: "#00A6CA",
                              fontFamily: "Helvetica",
                              fontWeight: 600,
                              display: "flex",
                              alignItems: "center",
                            }}
                            href={link.url}
                            rel="noopener"
                            target="_blank"
                          >
                            {link.title}
                            <OpenNewIcon
                              style={{ fontSize: "18px", paddingLeft: "4px" }}
                            />
                          </Link>
                        </ListItem>
                      ))}
                    </List>
                  </div>
                )
              })}
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </React.Fragment>
  )
}
export default Linkovi
