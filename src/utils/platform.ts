import { Platform, StyleSheet } from 'react-native';

/** Returns true when running on iOS */
export const isIOS = Platform.OS === 'ios';
/** Returns true when running on Android */
export const isAndroid = Platform.OS === 'android';

/**
 * Returns the appropriate value based on the current platform.
 * Falls back to `defaultValue` if the platform is neither iOS nor Android.
 */
export function platformSelect<T>(options: { ios: T; android: T; default?: T }): T {
  if (isIOS) return options.ios;
  if (isAndroid) return options.android;
  return options.default !== undefined ? options.default : options.android;
}

/**
 * Generates a shadow style that works on both iOS (shadowXxx props)
 * and Android (elevation). Both styles are included; RN handles the rest.
 */
export function shadowStyle(options: {
  elevation?: number;
  shadowColor?: string;
  shadowOpacity?: number;
  shadowRadius?: number;
  shadowOffsetY?: number;
}) {
  const {
    elevation = 4,
    shadowColor = '#000000',
    shadowOpacity = 0.12,
    shadowRadius = 8,
    shadowOffsetY = 2,
  } = options;

  return StyleSheet.create({
    shadow: {
      // Android
      elevation,
      // iOS
      shadowColor,
      shadowOpacity,
      shadowRadius,
      shadowOffset: { width: 0, height: shadowOffsetY },
    },
  }).shadow;
}

/** Formats a price in USD */
export const formatPrice = (price: number): string =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);

/** Formats a duration in minutes to human-readable string */
export const formatDuration = (minutes: number): string => {
  if (minutes < 60) return `${minutes} min`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m > 0 ? `${h}h ${m}min` : `${h}h`;
};

/** Generates a random confirmation code */
export const generateConfirmationCode = (): string => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

/** Returns a greeting based on current time of day */
export const getGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 17) return 'Good afternoon';
  return 'Good evening';
};

/** Validates an email address */
export const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

/** Validates a phone number (basic) */
export const isValidPhone = (phone: string): boolean =>
  /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(phone.replace(/\s/g, ''));
