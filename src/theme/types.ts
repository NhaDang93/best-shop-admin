declare module '@mui/material/styles' {
  interface Palette {
    customColors: {
      main: string;
      tableHeaderBg: string;
      primaryGradient: string;
      summaryBg: string;
      summaryTitleColor: string;
      colorCyan: string;
      tableBorder: string;
      tableText: string;
      boxShadow: string;
      dark: string;
      darkBg: string;
      lightBg: string;
      light: string;
    };
  }
  interface PaletteOptions {
    customColors?: {
      main?: string;
      tableHeaderBg?: string;
      primaryGradient?: string;
      colorCyan?: string;
      tableBorder?: string;
    };
  }
}

export {};
