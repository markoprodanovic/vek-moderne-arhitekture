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
    primary: {
      main: "#458FF6",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#",
    },
    text: {
      primary: "#233348",
      secondary: "#6FA5B5",
      disabled: "#CCC",
      hint: "#7D7987",
    },
  },
  shape: {
    borderRadius: 20,
  },
})

export default theme
