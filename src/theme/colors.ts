/**
 * SmileCare Dental – Design System Colors
 *
 * Shared palette with platform-adaptive variants:
 *  - iOS: slightly softer tones, white backgrounds
 *  - Android: Material Design surface / elevation colours
 */

export const palette = {
  // Brand
  blue50: '#EBF4FF',
  blue100: '#BEE3F8',
  blue200: '#90CDF4',
  blue300: '#63B3ED',
  blue400: '#4299E1',
  blue500: '#3182CE',
  blue600: '#2B6CB0',  // Primary
  blue700: '#2C5282',
  blue800: '#2A4365',
  blue900: '#1A365D',

  // Teal / Accent
  teal50: '#E6FFFA',
  teal100: '#B2F5EA',
  teal400: '#38B2AC',  // Secondary accent
  teal500: '#319795',
  teal600: '#2C7A7B',

  // Warm
  orange100: '#FEEBC8',
  orange400: '#F6AD55',
  orange500: '#ED8936',

  // Semantic
  green400: '#48BB78',
  green500: '#38A169',
  red400: '#FC8181',
  red500: '#E53E3E',
  yellow400: '#F6E05E',

  // Neutrals
  white: '#FFFFFF',
  gray50: '#F7FAFC',
  gray100: '#EDF2F7',
  gray200: '#E2E8F0',
  gray300: '#CBD5E0',
  gray400: '#A0AEC0',
  gray500: '#718096',
  gray600: '#4A5568',
  gray700: '#2D3748',
  gray800: '#1A202C',
  gray900: '#171923',
  black: '#000000',
};

export const lightColors = {
  // Backgrounds
  background: palette.gray50,
  surface: palette.white,
  surfaceVariant: palette.gray100,
  cardBackground: palette.white,

  // Brand
  primary: palette.blue600,
  primaryLight: palette.blue400,
  primaryDark: palette.blue800,
  secondary: palette.teal400,
  accent: palette.orange400,

  // Text
  textPrimary: palette.gray800,
  textSecondary: palette.gray600,
  textTertiary: palette.gray400,
  textOnPrimary: palette.white,
  textOnDark: palette.white,

  // UI elements
  border: palette.gray200,
  divider: palette.gray100,
  placeholder: palette.gray400,
  icon: palette.gray600,
  iconActive: palette.blue600,

  // Status
  success: palette.green500,
  warning: palette.orange500,
  error: palette.red500,
  info: palette.blue500,

  // Status backgrounds
  successBg: '#F0FFF4',
  warningBg: '#FFFAF0',
  errorBg: '#FFF5F5',
  infoBg: palette.blue50,

  // Tab / Nav
  tabBar: palette.white,
  tabBarActive: palette.blue600,
  tabBarInactive: palette.gray400,
  navBar: palette.white,

  // Shadow (used as overlay tint)
  shadow: 'rgba(0, 0, 0, 0.08)',
  shadowMedium: 'rgba(0, 0, 0, 0.16)',
};

export const darkColors: typeof lightColors = {
  background: palette.gray900,
  surface: palette.gray800,
  surfaceVariant: palette.gray700,
  cardBackground: palette.gray800,

  primary: palette.blue400,
  primaryLight: palette.blue300,
  primaryDark: palette.blue600,
  secondary: palette.teal400,
  accent: palette.orange400,

  textPrimary: '#F7FAFC',
  textSecondary: palette.gray300,
  textTertiary: palette.gray500,
  textOnPrimary: palette.white,
  textOnDark: palette.white,

  border: palette.gray700,
  divider: palette.gray700,
  placeholder: palette.gray500,
  icon: palette.gray400,
  iconActive: palette.blue300,

  success: palette.green400,
  warning: palette.orange400,
  error: palette.red400,
  info: palette.blue300,

  successBg: 'rgba(72,187,120,0.15)',
  warningBg: 'rgba(246,173,85,0.15)',
  errorBg: 'rgba(252,129,129,0.15)',
  infoBg: 'rgba(99,179,237,0.15)',

  tabBar: palette.gray800,
  tabBarActive: palette.blue400,
  tabBarInactive: palette.gray500,
  navBar: palette.gray800,

  shadow: 'rgba(0, 0, 0, 0.3)',
  shadowMedium: 'rgba(0, 0, 0, 0.5)',
};

export type Colors = typeof lightColors;
export default lightColors;
