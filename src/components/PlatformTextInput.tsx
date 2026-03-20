import React, { forwardRef, useState } from 'react';
import {
  TextInput,
  TextInputProps,
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { lightColors, spacing, borderRadius, textStyles } from '../theme';

interface PlatformTextInputProps extends TextInputProps {
  label?: string;
  errorMessage?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  required?: boolean;
}

/**
 * Cross-platform adaptive text input.
 *
 * iOS   → Rounded rect, subtle border, iOS keyboard behaviours
 * Android → Outlined (Material Design), elevation on focus
 */
const PlatformTextInput = forwardRef<TextInput, PlatformTextInputProps>(
  (
    {
      label,
      errorMessage,
      helperText,
      leftIcon,
      rightIcon,
      onRightIconPress,
      containerStyle,
      required,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);
    const hasError = Boolean(errorMessage);

    const inputContainerStyle = [
      styles.inputContainer,
      isFocused && styles.inputContainerFocused,
      hasError && styles.inputContainerError,
      props.editable === false && styles.inputContainerDisabled,
    ];

    return (
      <View style={[styles.wrapper, containerStyle]}>
        {label ? (
          <Text style={styles.label}>
            {label}
            {required && <Text style={styles.required}> *</Text>}
          </Text>
        ) : null}

        <View style={inputContainerStyle}>
          {leftIcon ? <View style={styles.leftIconContainer}>{leftIcon}</View> : null}

          <TextInput
            ref={ref}
            style={[
              styles.input,
              leftIcon ? styles.inputWithLeft : null,
              rightIcon ? styles.inputWithRight : null,
            ]}
            placeholderTextColor={lightColors.placeholder}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            returnKeyType="done"
            {...props}
          />

          {rightIcon ? (
            <TouchableOpacity
              onPress={onRightIconPress}
              style={styles.rightIconContainer}
              activeOpacity={0.7}
            >
              {rightIcon}
            </TouchableOpacity>
          ) : null}
        </View>

        {hasError ? (
          <Text style={styles.errorText}>{errorMessage}</Text>
        ) : helperText ? (
          <Text style={styles.helperText}>{helperText}</Text>
        ) : null}
      </View>
    );
  },
);

PlatformTextInput.displayName = 'PlatformTextInput';

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },
  label: {
    ...textStyles.titleSmall,
    color: lightColors.textPrimary,
    marginBottom: spacing.xs,
    fontWeight: '500',
  },
  required: {
    color: lightColors.error,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightColors.surface,
    borderRadius: borderRadius.md as number,
    borderWidth: Platform.select({ ios: 1, android: 1.5, default: 1 }),
    borderColor: lightColors.border,
    minHeight: Platform.select({ ios: 48, android: 52, default: 48 }),
    ...Platform.select({
      ios: {},
      android: {
        backgroundColor: lightColors.surface,
      },
    }),
  },
  inputContainerFocused: {
    borderColor: lightColors.primary,
    borderWidth: Platform.select({ ios: 1.5, android: 2, default: 1.5 }),
    ...Platform.select({
      ios: {
        shadowColor: lightColors.primary,
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
      },
      android: {},
    }),
  },
  inputContainerError: {
    borderColor: lightColors.error,
  },
  inputContainerDisabled: {
    backgroundColor: lightColors.surfaceVariant,
    opacity: 0.6,
  },
  input: {
    flex: 1,
    ...textStyles.bodyLarge,
    color: lightColors.textPrimary,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.select({ ios: spacing.sm, android: spacing.sm + 2, default: spacing.sm }),
  },
  inputWithLeft: {
    paddingLeft: spacing.xs,
  },
  inputWithRight: {
    paddingRight: spacing.xs,
  },
  leftIconContainer: {
    paddingLeft: spacing.md,
  },
  rightIconContainer: {
    paddingRight: spacing.md,
  },
  errorText: {
    ...textStyles.caption,
    color: lightColors.error,
    marginTop: spacing.xs,
  },
  helperText: {
    ...textStyles.caption,
    color: lightColors.textSecondary,
    marginTop: spacing.xs,
  },
});

export default PlatformTextInput;
