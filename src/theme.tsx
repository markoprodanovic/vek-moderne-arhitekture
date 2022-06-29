import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  typography: {
    subtitle1: {
      color: "#7D7987",
    },
    allVariants: {
      color: "#233348",
    },
  },
  palette: {
    type: "light",
    // primary: {
    //   main: "#458FF6",
    // },
    primary: {
      main: "#fff",
      contrastText: "#eee", //button text white instead of black
    },
    background: {
      default: "#394764",
    },
    error: {
      main: red.A400,
    },
    text: {
      primary: "#233348",
      secondary: "#00A6CA",
      disabled: "#CCC",
      hint: "#7D7987",
    },
  },
  shape: {
    borderRadius: 20,
  },
})

export default theme
