import { extendTheme } from "@chakra-ui/react"

export const colors = {
  headbar: {
    100: "linear(to-b, white , lightgrey )",
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
const themes = {
  styles: {
    global: () => ({
      body: {
        bg: "#FFFFFF",
        minHeight: "100vh",
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
        100: "#B5E5FC",
        200: "#2796EF",
        300: "#1082DE",
        400: "#0E6FBE",
        500: "#0C5FA2",
        600: "#0A4F86",
        700: "#08426F",
        800: "#07375C",
        900: "#062E4C",
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
