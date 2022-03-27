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
    ],
  },
  {
    era: "HAJ TEK ARHITEKTURA",
    architects: [{ name: "Ričard Rodžers ( Richard Rogers)", urls: [] }],
  },
  {
    era: "POSMODERNIZAM",
    architects: [],
  },
  {
    era: "DEKONSTRUVIZAM",
    architects: [],
  },
  {
    era: "MINIMALIZAM",
    architects: [],
  },
  {
    era: "EKOLOŠKA ODRŽIVA ARHITEKTURA",
    architects: [],
  },
  {
    era: "SKULPTURALNA ARHITEKTURA",
    architects: [],
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
                              color: "rgb(111, 165, 181)",
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
