import { Platform } from 'react-native';

/**
 * Platform-adaptive typography.
 *
 * iOS   → San Francisco / -apple-system
 * Android → Roboto (system default on all modern Android versions)
 */

export const fontFamily = {
  regular: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  medium: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  semiBold: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
  bold: Platform.select({
    ios: 'System',
    android: 'Roboto',
    default: 'System',
  }),
} as const;

export const fontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semiBold: '600' as const,
  bold: '700' as const,
};

/** Type scale following iOS HIG / Material Design 3 */
export const textStyles = {
  // Display
  displayLarge: {
    fontSize: 57,
    lineHeight: 64,
    fontWeight: fontWeight.regular,
    letterSpacing: -0.25,
  },

  // Headlines
  headlineLarge: {
    fontSize: Platform.select({ ios: 34, android: 32, default: 34 }),
    lineHeight: Platform.select({ ios: 41, android: 40, default: 41 }),
    fontWeight: fontWeight.bold,
    letterSpacing: Platform.select({ ios: 0.37, android: 0, default: 0.37 }),
  },
  headlineMedium: {
    fontSize: Platform.select({ ios: 28, android: 28, default: 28 }),
    lineHeight: 36,
    fontWeight: fontWeight.bold,
    letterSpacing: 0,
  },
  headlineSmall: {
    fontSize: Platform.select({ ios: 22, android: 24, default: 22 }),
    lineHeight: 32,
    fontWeight: fontWeight.bold,
    letterSpacing: 0,
  },

  // Titles
  titleLarge: {
    fontSize: Platform.select({ ios: 20, android: 22, default: 20 }),
    lineHeight: 28,
    fontWeight: fontWeight.semiBold,
    letterSpacing: 0,
  },
  titleMedium: {
    fontSize: Platform.select({ ios: 17, android: 16, default: 17 }),
    lineHeight: 24,
    fontWeight: fontWeight.semiBold,
    letterSpacing: Platform.select({ ios: -0.41, android: 0.15, default: 0 }),
  },
  titleSmall: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: fontWeight.medium,
    letterSpacing: Platform.select({ ios: -0.08, android: 0.1, default: 0 }),
  },

  // Body
  bodyLarge: {
    fontSize: Platform.select({ ios: 17, android: 16, default: 17 }),
    lineHeight: Platform.select({ ios: 22, android: 24, default: 22 }),
    fontWeight: fontWeight.regular,
    letterSpacing: Platform.select({ ios: -0.41, android: 0.5, default: 0 }),
  },
  bodyMedium: {
    fontSize: Platform.select({ ios: 15, android: 14, default: 15 }),
    lineHeight: Platform.select({ ios: 20, android: 20, default: 20 }),
    fontWeight: fontWeight.regular,
    letterSpacing: Platform.select({ ios: -0.24, android: 0.25, default: 0 }),
  },
  bodySmall: {
    fontSize: Platform.select({ ios: 13, android: 12, default: 13 }),
    lineHeight: Platform.select({ ios: 18, android: 16, default: 18 }),
    fontWeight: fontWeight.regular,
    letterSpacing: Platform.select({ ios: -0.08, android: 0.4, default: 0 }),
  },

  // Labels
  labelLarge: {
    fontSize: Platform.select({ ios: 17, android: 14, default: 17 }),
    lineHeight: Platform.select({ ios: 22, android: 20, default: 22 }),
    fontWeight: fontWeight.semiBold,
    letterSpacing: Platform.select({ ios: -0.41, android: 0.1, default: 0 }),
  },
  labelMedium: {
    fontSize: Platform.select({ ios: 12, android: 12, default: 12 }),
    lineHeight: Platform.select({ ios: 16, android: 16, default: 16 }),
    fontWeight: fontWeight.medium,
    letterSpacing: Platform.select({ ios: 0, android: 0.5, default: 0 }),
  },
  labelSmall: {
    fontSize: 10,
    lineHeight: 16,
    fontWeight: fontWeight.medium,
    letterSpacing: Platform.select({ ios: 0, android: 0.5, default: 0 }),
  },

  // Caption / auxiliary
  caption: {
    fontSize: Platform.select({ ios: 12, android: 12, default: 12 }),
    lineHeight: 16,
    fontWeight: fontWeight.regular,
    letterSpacing: Platform.select({ ios: 0, android: 0.4, default: 0 }),
  },
};

export type TextStyle = keyof typeof textStyles;
export default textStyles;
