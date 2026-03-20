import React from 'react';
import { View, StyleSheet, Platform, ViewStyle } from 'react-native';
import { lightColors, borderRadius, spacing } from '../theme';
import { shadowStyle } from '../utils/platform';

interface PlatformCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  variant?: 'elevated' | 'outlined' | 'filled';
  padding?: boolean;
  testID?: string;
}

/**
 * Cross-platform adaptive card.
 *
 * iOS   → White card with subtle shadow (HIG card pattern)
 * Android → Material Design card with elevation
 */
const PlatformCard: React.FC<PlatformCardProps> = ({
  children,
  style,
  variant = 'elevated',
  padding = true,
  testID,
}) => {
  const cardStyle = [
    styles.base,
    variant === 'elevated' && styles.elevated,
    variant === 'outlined' && styles.outlined,
    variant === 'filled' && styles.filled,
    padding && styles.padding,
    style,
  ];

  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    borderRadius: borderRadius.lg as number,
    backgroundColor: lightColors.cardBackground,
  },
  padding: {
    padding: spacing.md,
  },
  elevated: Platform.select({
    ios: {
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
    },
    android: {
      elevation: 3,
    },
    default: {
      shadowColor: '#000',
      shadowOpacity: 0.08,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
    },
  })!,
  outlined: {
    borderWidth: 1,
    borderColor: lightColors.border,
    ...Platform.select({
      ios: {},
      android: { elevation: 0 },
      default: {},
    }),
  },
  filled: {
    backgroundColor: lightColors.surfaceVariant,
    ...Platform.select({
      ios: {},
      android: { elevation: 0 },
      default: {},
    }),
  },
});

export default PlatformCard;
