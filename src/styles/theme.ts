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
    googleBtn: string;
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
    googleBtn: "#3d78d1",
  },

  mQueries: {
    primaryQ: "(max-width: 865px)",
    secondaryQ: "(max-width: 650px)",
    heroLargerQ: "(max-width: 580px)",
    heroSmallerQ: "(max-width: 500px)",
    menuQ: "(max-width: 520px)",
    navQ: "(max-width: 675px)",
    footerQ: "(max-width: 425px)",
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
