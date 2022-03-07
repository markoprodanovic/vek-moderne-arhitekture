import React from "react"

import Layout from "../components/layout"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import { Typography } from "@material-ui/core"
import theme from "../theme"
import { makeStyles } from "@material-ui/core"

interface Props {
  title: any
  description?: any
  id?: any
  children?: any
}

const useStyles = makeStyles(theme => ({
  map: {
    width: "100%",
    height: 620,
  },
}))

const Map = () => {
  const classes = useStyles()
  return (
    <iframe
      className={classes.map}
      src="https://www.google.com/maps/d/embed?mid=1ohAPRF2coYSCHiRck6wBxou9WzGQIFSE"
    ></iframe>
  )
}

const Links = () => {
  const classes = useStyles()
  return <Typography>MARKO STILL NEEDS TO DO THIS SECTION</Typography>
}

const ItemWrapper = ({ title, description, id, children }: Props) => (
  <React.Fragment>
    <Typography
      id={id}
      variant="h6"
      style={{ fontWeight: 800, marginTop: "2rem" }}
    >
      {title}
    </Typography>
    <Typography>{description}</Typography>
    {children}
  </React.Fragment>
)

const IndexPage = () => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Layout>
        <ItemWrapper
          title="MAPA"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut"
        >
          <Map />
        </ItemWrapper>
        <ItemWrapper
          title="O KNJIZI"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          id="oknjizi"
        />
        <ItemWrapper title="LINKOVI" id="linkovi">
          <Links />
        </ItemWrapper>
      </Layout>
    </ThemeProvider>
  </React.Fragment>
)

export default IndexPage
