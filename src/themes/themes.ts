export interface ThemeColors {
  primary: string;
  primaryHover: string;
  secondary: string;
  success: string;
  danger: string;
  dangerHover: string;
  warning: string;
  info: string;
  background: string;
  backgroundSecondary: string;
  surface: string;
  surfaceHover: string;
  text: string;
  textSecondary: string;
  textMuted: string;
  border: string;
  borderLight: string;
  shadow: string;
  shadowHover: string;
  sidebarBg: string;
  sidebarText: string;
  sidebarHover: string;
  headerBg: string;
  headerText: string;
  footerBg: string;
  footerText: string;
  inputBg: string;
  inputBorder: string;
  inputFocus: string;
  error: string;
  errorBg: string;
}

export interface Theme {
  name: string;
  colors: ThemeColors;
}

export const lightTheme: Theme = {
  name: "light",
  colors: {
    primary: "#007bff",
    primaryHover: "#0056b3",
    secondary: "#6c757d",
    success: "#28a745",
    danger: "#dc3545",
    dangerHover: "#c82333",
    warning: "#ffc107",
    info: "#17a2b8",
    background: "#f5f5f5",
    backgroundSecondary: "#ecf0f1",
    surface: "#ffffff",
    surfaceHover: "#f8f9fa",
    text: "#333333",
    textSecondary: "#666666",
    textMuted: "#888888",
    border: "#dddddd",
    borderLight: "#eeeeee",
    shadow: "rgba(0, 0, 0, 0.1)",
    shadowHover: "rgba(0, 0, 0, 0.15)",
    sidebarBg: "#1a1a2e",
    sidebarText: "#ffffff",
    sidebarHover: "rgba(255, 255, 255, 0.1)",
    headerBg: "#ffffff",
    headerText: "#333333",
    footerBg: "#2c3e50",
    footerText: "#ffffff",
    inputBg: "#ffffff",
    inputBorder: "#dddddd",
    inputFocus: "#007bff",
    error: "#d00000",
    errorBg: "#ffe6e6",
  },
};

export const darkTheme: Theme = {
  name: "dark",
  colors: {
    primary: "#4dabf7",
    primaryHover: "#339af0",
    secondary: "#adb5bd",
    success: "#51cf66",
    danger: "#ff6b6b",
    dangerHover: "#fa5252",
    warning: "#ffd43b",
    info: "#22b8cf",
    background: "#121212",
    backgroundSecondary: "#1e1e1e",
    surface: "#2d2d2d",
    surfaceHover: "#3d3d3d",
    text: "#e0e0e0",
    textSecondary: "#b0b0b0",
    textMuted: "#808080",
    border: "#404040",
    borderLight: "#333333",
    shadow: "rgba(0, 0, 0, 0.3)",
    shadowHover: "rgba(0, 0, 0, 0.4)",
    sidebarBg: "#0d0d1a",
    sidebarText: "#ffffff",
    sidebarHover: "rgba(255, 255, 255, 0.15)",
    headerBg: "#1e1e1e",
    headerText: "#e0e0e0",
    footerBg: "#1a1a1a",
    footerText: "#b0b0b0",
    inputBg: "#2d2d2d",
    inputBorder: "#404040",
    inputFocus: "#4dabf7",
    error: "#ff6b6b",
    errorBg: "#3d2020",
  },
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export type ThemeMode = keyof typeof themes;
