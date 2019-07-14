export default interface Theme {
  textColor: string;
  linkColor: string;
  linkUnderlineColor: string;
  linkHoverColor: string;
  linkHoverBgColor: string;
  bgColor: string;
  contentBgColor: string;
  heroColor: string;
  primaryColor: string;
  secondaryColor: string;
  backgroundColor: string;
  borderColor: string;
  disclaimerColor: string;
  headerColor: string;
  coaDividerColor: string;
  headerDividerColor: string;
  footerColor: string;
  footerTextColor: string;
  deltaSignPositiveColor: string;
  deltaSignNegativeColor: string;
  console: {
    promptColor: string;
    caretColor: string;
    labels: {
      binaryColor: string;
      cfAppColor: string;
      okColor: string;
      cfAppStartedColor: string;
    };
  };
  code: {
    language: {
      defaultColor: string;
      goColor: string;
      jsColor: string;
    };
  };
}

export const theme: Theme = {
  textColor: "#313131",
  linkColor: "inherit",
  linkUnderlineColor: "#00c3ef",
  linkHoverColor: "#313131",
  linkHoverBgColor: "#5bcbe3",
  bgColor: "#313131",
  contentBgColor: "#ffffff",
  heroColor: "#313131",
  primaryColor: "#1B7991",
  secondaryColor: "#313131",
  backgroundColor: "#f0f3f5",
  borderColor: "#dddddd",
  disclaimerColor: "#121212",
  headerColor: "#313131",
  coaDividerColor: "#a9a9a9",
  headerDividerColor: "#45c2f0",
  footerColor: "#313131",
  footerTextColor: "#bdbdbd",
  deltaSignPositiveColor: "#0cac78",
  deltaSignNegativeColor: "#ff635c",
  console: {
    promptColor: "#cccccc",
    caretColor: "#f69900",
    labels: {
      binaryColor: "#ff635c",
      cfAppColor: "#00c3ef",
      okColor: "#0cac78",
      cfAppStartedColor: "#ffffff"
    }
  },
  code: {
    language: {
      defaultColor: "#5bcbe3",
      goColor: "#5bcbe3",
      jsColor: "#5bcbe3"
    }
  }
};
