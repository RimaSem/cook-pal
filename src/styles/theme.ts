interface ThemeProps {
  colors: {
    white: string;
    inputLight: string;
    accentGreen: string;
    accentOrange: string;
    darker: string;
    lighter: string;
    grey: string;
    navBtn1: string;
    navBtn2: string;
    navBtn3: string;
    navBtn4: string;
    navBtn5: string;
    footerLink: string;
  };

  mQueries: {
    primaryQ: string;
    secondaryQ: string;
    heroLargerQ: string;
    heroSmallerQ: string;
    menuQ: string;
    navQ: string;
    footerQ: string;
  };
}

export const theme: ThemeProps = {
  colors: {
    white: "#FFFFFF",
    inputLight: "#f3f3f3",
    accentGreen: "#509E2F",
    accentOrange: "#DC582A",
    darker: "#253D4E",
    lighter: "#e2e2e2",
    grey: "#A1A1A1",
    navBtn1: "#f6784c",
    navBtn2: "#C4D600",
    navBtn3: "#EAAA00",
    navBtn4: "#ED8B00",
    navBtn5: "#84BD00",
    footerLink: "rgba(0, 0, 0, 0.6)",
  },

  mQueries: {
    primaryQ: "(max-width: 54em)",
    secondaryQ: "(max-width: 40.625em)",
    heroLargerQ: "(max-width: 36.25em)",
    heroSmallerQ: "(max-width: 31.25em)",
    menuQ: "(max-width: 32.5em)",
    navQ: "(max-width: 42.18em)",
    footerQ: "(max-width: 26.56em)",
  },
};
