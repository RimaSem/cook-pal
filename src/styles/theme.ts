import { ThemeProps } from "./themeProps";

export const theme: ThemeProps = {
  colors: {
    white: "#FFFFFF",
    inputLight: "#f3f3f3",
    accentGreen: "#509E2F",
    accentOrange: "#DC582A",
    darker: "#253D4E",
    lighter: "#e2e2e2",
    grey: "#A1A1A1",
    red: "red",
    green: "green",
    navBtn1: "#f6784c",
    navBtn2: "#C4D600",
    navBtn3: "#EAAA00",
    navBtn4: "#ED8B00",
    navBtn5: "#84BD00",
    footerLink: "rgba(0, 0, 0, 0.6)",
    googleBtn: "#3d78d1",
  },

  fontFamilies: {
    primary: "'Poppins', sans-serif",
    secondary: "'Inter', sans-serif",
  },

  fontSizes: {
    large: "2.2rem",
  },

  shadows: {
    card:
      "0px 0px 1px rgba(12, 26, 75, 0.24)" +
      ", " +
      "0px 3px 8px -1px rgba(50, 50, 71, 0.05)",
  },

  sizes: {
    widthMax: "79em",
  },
};

export const devices = {
  mobileL: "(max-width: 425px)",
  mobileXL: "(max-width: 500px)",
  mobileXXL: "(max-width: 520px)",
  tabletXXS: "(max-width: 580px)",
  tabletXS: "(max-width: 650px)",
  tabletS: "(max-width: 675px)",
  tabletM: "(max-width: 865px)",
};
