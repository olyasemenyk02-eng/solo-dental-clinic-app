import React from 'react';
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Platform,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { lightColors, borderRadius, spacing, textStyles } from '../theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface PlatformButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

/**
 * Cross-platform adaptive button.
 *
 * iOS   → TouchableOpacity with rounded corners (HIG style)
 * Android → TouchableNativeFeedback with Material ripple effect
 */
const PlatformButton: React.FC<PlatformButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  fullWidth = false,
  style,
  textStyle,
  testID,
}) => {
  const isDisabled = disabled || loading;

  const containerStyle = [
    styles.base,
    styles[`size_${size}`],
    styles[`variant_${variant}`],
    isDisabled && styles.disabled,
    fullWidth && styles.fullWidth,
    style,
  ];

  const labelStyle = [
    styles.label,
    styles[`label_${size}`],
    styles[`label_${variant}`],
    isDisabled && styles.labelDisabled,
    textStyle,
  ];

  const content = (
    <>
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? lightColors.textOnPrimary : lightColors.primary}
        />
      ) : (
        <>
          {icon && iconPosition === 'left' && <View style={styles.iconLeft}>{icon}</View>}
          <Text style={labelStyle}>{title}</Text>
          {icon && iconPosition === 'right' && <View style={styles.iconRight}>{icon}</View>}
        </>
      )}
    </>
  );

  if (Platform.OS === 'android' && variant !== 'ghost') {
    const rippleColor =
      variant === 'primary' ? 'rgba(255,255,255,0.3)' : 'rgba(43,108,176,0.2)';
    return (
      <View
        style={[
          containerStyle,
          { overflow: 'hidden' },
          variant === 'primary' && styles.androidPrimary,
        ]}
        testID={testID}
      >
        <TouchableNativeFeedback
          onPress={onPress}
          disabled={isDisabled}
          background={TouchableNativeFeedback.Ripple(rippleColor, false)}
          useForeground
        >
          <View style={styles.androidInner}>{content}</View>
        </TouchableNativeFeedback>
      </View>
    );
  }

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      testID={testID}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borderRadius.md as number,
  },
  fullWidth: {
    width: '100%',
  },
  androidInner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 0,
    paddingHorizontal: 0,
    flex: 1,
  },
  androidPrimary: {
    elevation: 3,
  },

  // Sizes
  size_sm: { paddingVertical: spacing.xs, paddingHorizontal: spacing.md, minHeight: 36 },
  size_md: { paddingVertical: spacing.sm + 4, paddingHorizontal: spacing.lg, minHeight: 48 },
  size_lg: { paddingVertical: spacing.md, paddingHorizontal: spacing.xl, minHeight: 56 },

  // Variants
  variant_primary: {
    backgroundColor: lightColors.primary,
  },
  variant_secondary: {
    backgroundColor: lightColors.secondary,
  },
  variant_outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: lightColors.primary,
  },
  variant_ghost: {
    backgroundColor: 'transparent',
  },
  variant_danger: {
    backgroundColor: lightColors.error,
  },

  // Labels
  label: {
    ...textStyles.labelLarge,
    textAlign: 'center',
  },
  label_sm: { fontSize: 14 },
  label_md: {},
  label_lg: { fontSize: Platform.select({ ios: 18, android: 16, default: 18 }) },
  label_primary: { color: lightColors.textOnPrimary, fontWeight: '600' },
  label_secondary: { color: lightColors.textOnPrimary, fontWeight: '600' },
  label_outline: { color: lightColors.primary, fontWeight: '600' },
  label_ghost: { color: lightColors.primary, fontWeight: '500' },
  label_danger: { color: lightColors.textOnPrimary, fontWeight: '600' },

  // States
  disabled: { opacity: 0.45 },
  labelDisabled: {},

  iconLeft: { marginRight: spacing.sm },
  iconRight: { marginLeft: spacing.sm },
});

export default PlatformButton;
