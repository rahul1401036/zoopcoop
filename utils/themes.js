import { extendTheme } from "@chakra-ui/react"
import { forOwn, pad } from "lodash"

export const colors = {
  headbar: {
    100: "linear(to-b, white , white )",
  },
  logo: { color: "black" },
  footer: {
    100: "linear(to-b, #0B04A8 , #0B04A8 )",
  },

  primary: {
    100: "#B5FCF1",
    200: "#27EF96",
    300: "#10DE82",
    400: "#0EBE6F",
    500: "#0CA25F",
    600: "#0A864F",
    700: "#086F42",
    800: "#075C37",
    900: "#064C2E",
  },
}

export const cards = {
  learncard: {
    borderRadius: "20px",
    padding: "20px",
  },
}

export const fontsmooth = {
  smooth: {
    fontFamily: "comic sans ms",
    color: "#2920fa",
    margin: "auto",
  },
}
export const themes = {
  styles: {
    global: () => ({
      body: {
        bg: "#ffffff",
        minHeight: "100vh",

        backgroundImage: `url("images/cornered-stairs.svg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundPosition: "center center",
        zIndex: -100,
      },
    }),
  },
  theme1: {
    colors: {
      primary: {
        100: "#FCEBB5",
        200: "#EF9627",
        300: "#DE8210",
        400: "#BE6F0E",
        500: "#A25F0C",
        600: "#864F0A",
        700: "#6F4208",
        800: "#5C3707",
        900: "#4C2E06",
      },
    },
  },
  theme2: {
    colors: {
      primary: {
        100: "#aab8f2",
        200: "#7e82ed",
        300: "#555ae6",
        400: "#4038fc",
        500: "#2920fa",
        600: "#241ce6",
        700: "#160dd9",
        800: "#0c04bd",
        900: "#0B04A8",
      },
    },
  },
  theme3: {
    colors: {
      primary: {
        100: "#FCCCB5",
        200: "#EF7D27",
        300: "#DE5E10",
        400: "#BE4A0E",
        500: "#A23D0C",
        600: "#86310A",
        700: "#6F2708",
        800: "#5C1F07",
        900: "#4C1906",
      },
    },
  },
}

const breakpoints = {
  base: "0em", // 0px
  sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
  md: "48em", // ~768px
  lg: "62em", // ~992px
  xl: "80em", // ~1280px
  "2xl": "96em", // ~1536px
}

const customTheme = extendTheme({ ...themes, colors, breakpoints })

export default customTheme
