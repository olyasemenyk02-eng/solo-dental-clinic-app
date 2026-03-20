import { Platform } from 'react-native';

/**
 * 8-point spacing grid.
 * Consistent across both platforms; slight tweaks for platform conventions.
 */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
} as const;

export const borderRadius = {
  xs: Platform.select({ ios: 6, android: 4, default: 6 }),
  sm: Platform.select({ ios: 8, android: 6, default: 8 }),
  md: Platform.select({ ios: 12, android: 8, default: 12 }),
  lg: Platform.select({ ios: 16, android: 12, default: 16 }),
  xl: Platform.select({ ios: 20, android: 16, default: 20 }),
  xxl: Platform.select({ ios: 24, android: 20, default: 24 }),
  full: 9999,
} as const;

export const elevation = {
  none: 0,
  xs: Platform.select({ ios: 1, android: 1, default: 1 }),
  sm: Platform.select({ ios: 2, android: 2, default: 2 }),
  md: Platform.select({ ios: 4, android: 4, default: 4 }),
  lg: Platform.select({ ios: 8, android: 8, default: 8 }),
  xl: Platform.select({ ios: 16, android: 16, default: 16 }),
} as const;

export const iconSize = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 28,
  xl: 32,
  xxl: 40,
} as const;

export const hitSlop = {
  small: { top: 8, bottom: 8, left: 8, right: 8 },
  medium: { top: 12, bottom: 12, left: 12, right: 12 },
  large: { top: 16, bottom: 16, left: 16, right: 16 },
} as const;

export default spacing;
