import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { lightColors, spacing, textStyles } from '../theme';

interface PlatformHeaderProps {
  title: string;
  subtitle?: string;
  showBackButton?: boolean;
  onBack?: () => void;
  rightComponent?: React.ReactNode;
  transparent?: boolean;
  style?: ViewStyle;
  testID?: string;
}

/**
 * Platform-adaptive navigation header.
 *
 * iOS   → Centered title, "< Back" text button (Apple HIG)
 * Android → Left-aligned title, arrow icon back button (Material Design)
 */
const PlatformHeader: React.FC<PlatformHeaderProps> = ({
  title,
  subtitle,
  showBackButton = false,
  onBack,
  rightComponent,
  transparent = false,
  style,
  testID,
}) => {
  const insets = useSafeAreaInsets();
  const isIOS = Platform.OS === 'ios';

  const headerStyle = [
    styles.header,
    { paddingTop: insets.top + spacing.sm },
    transparent && styles.transparent,
    style,
  ];

  return (
    <View style={headerStyle} testID={testID}>
      {/* Left area */}
      <View style={styles.leftArea}>
        {showBackButton && onBack ? (
          <TouchableOpacity
            onPress={onBack}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            activeOpacity={0.6}
          >
            {isIOS ? (
              <>
                <Ionicons
                  name="chevron-back"
                  size={22}
                  color={lightColors.primary}
                  style={styles.backChevron}
                />
                <Text style={styles.backText}>Back</Text>
              </>
            ) : (
              <Ionicons name="arrow-back" size={24} color={lightColors.textPrimary} />
            )}
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>

      {/* Center area */}
      {isIOS ? (
        <View style={styles.centerArea}>
          <Text style={styles.titleCentered} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? <Text style={styles.subtitleCentered}>{subtitle}</Text> : null}
        </View>
      ) : (
        <View style={styles.androidTitleArea}>
          <Text style={styles.titleLeft} numberOfLines={1}>
            {title}
          </Text>
          {subtitle ? <Text style={styles.subtitleLeft}>{subtitle}</Text> : null}
        </View>
      )}

      {/* Right area */}
      <View style={styles.rightArea}>{rightComponent ?? <View style={styles.placeholder} />}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: lightColors.navBar,
    paddingBottom: spacing.sm,
    paddingHorizontal: spacing.md,
    borderBottomWidth: Platform.select({ ios: StyleSheet.hairlineWidth, android: 0, default: StyleSheet.hairlineWidth }),
    borderBottomColor: lightColors.border,
    ...Platform.select({
      ios: {},
      android: { elevation: 4 },
      default: {},
    }),
  },
  transparent: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    ...Platform.select({ android: { elevation: 0 } }),
  },
  leftArea: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerArea: {
    flex: 2,
    alignItems: 'center',
  },
  androidTitleArea: {
    flex: 3,
    paddingLeft: spacing.sm,
    justifyContent: 'center',
  },
  rightArea: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backChevron: {
    marginRight: -2,
  },
  backText: {
    ...textStyles.bodyLarge,
    color: lightColors.primary,
    fontWeight: '400',
  },
  placeholder: {
    width: 44,
  },
  titleCentered: {
    ...textStyles.titleMedium,
    color: lightColors.textPrimary,
    fontWeight: '600',
  },
  subtitleCentered: {
    ...textStyles.caption,
    color: lightColors.textSecondary,
  },
  titleLeft: {
    ...textStyles.titleLarge,
    color: lightColors.textPrimary,
    fontWeight: '700',
  },
  subtitleLeft: {
    ...textStyles.bodySmall,
    color: lightColors.textSecondary,
  },
});

export default PlatformHeader;
