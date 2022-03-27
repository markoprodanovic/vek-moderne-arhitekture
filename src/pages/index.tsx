import React from "react"

import Layout from "../components/layout"
import ThemeProvider from "@material-ui/styles/ThemeProvider"
import theme from "../theme"
import { makeStyles } from "@material-ui/core"

const useStyles = makeStyles(theme => ({
  map: {
    width: "100%",
    height: 620,
    marginTop: "40px",
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

const App = () => (
  <React.Fragment>
    <ThemeProvider theme={theme}>
      <Layout>
        <React.Fragment>
          <Map />
        </React.Fragment>
      </Layout>
    </ThemeProvider>
  </React.Fragment>
)

const IndexPage = () => <App />

export default IndexPage
