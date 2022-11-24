import { createTheme } from '@mui/material/styles';

const fontWeight = {
  regular: 400,
}

const theme = createTheme({
  typography: {
    fontFamily: ["Maven Pro", "sans-serif"].join(","),
    body1: {
      fontSize: 14,
      fontWeight: fontWeight.regular,
      lineHeight: 1.5,
      letterSpacing: 0,
    },
  },
  palette: {
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    primary: {
      main: "rgb(244, 123, 50)",
      dark: "rgb(65, 65, 65)",
    },
    secondary: {
      main: "#ffffff",
    },
    text: {
      primary: "#000000",
    },
    background: {
      default: "#F5F6F7",
    },
    error: {
      main: "#d32f2f",
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
})

export default theme


