// Color Palette - Avoid inline color codes
export const COLORS = {
  // Primary Colors
  primary: {
    main: '#64f964',
    light: '#0091ff',
    dark: '#002e62',
    contrastText: '#ffffff',
  },

  // Secondary Colors
  secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#ffffff',
  },

  // Success Colors
  success: {
    main: '#2e7d32',
    light: '#4caf50',
    dark: '#1b5e20',
    contrastText: '#ffffff',
  },

  // Error Colors
  error: {
    main: '#d32f2f',
    light: '#ef5350',
    dark: '#c62828',
    contrastText: '#ffffff',
  },

  // Warning Colors
  warning: {
    main: '#ed6c02',
    light: '#ff9800',
    dark: '#e65100',
    contrastText: '#ffffff',
  },

  // Info Colors
  info: {
    main: '#0288d1',
    light: '#03a9f4',
    dark: '#01579b',
    contrastText: '#ffffff',
  },

  // Neutral Colors
  neutral: {
    white: '#ffffff',
    black: '#000000',
    gray: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#eeeeee',
      300: '#e0e0e0',
      400: '#bdbdbd',
      500: '#9e9e9e',
      600: '#757575',
      700: '#616161',
      800: '#424242',
      900: '#212121',
    },
  },

  // Background Colors
  background: {
    default: '#f5f5f5',
    paper: '#ffffff',
    dark: '#121212',
  },

  // Text Colors
  text: {
    primary: '#212121',
    secondary: '#757575',
    disabled: '#9e9e9e',
    hint: '#bdbdbd',
  },

  // Border Colors
  border: {
    light: '#e0e0e0',
    main: '#bdbdbd',
    dark: '#9e9e9e',
  },
} as const;

// Type for Colors
export type ColorsType = typeof COLORS;
