import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DentalService } from '../data/services';
import { lightColors, spacing, borderRadius, textStyles } from '../theme';
import { formatPrice, formatDuration } from '../utils/platform';
import PlatformCard from './PlatformCard';

interface ServiceCardProps {
  service: DentalService;
  onPress: (service: DentalService) => void;
  compact?: boolean;
  selected?: boolean;
  testID?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onPress,
  compact = false,
  selected = false,
  testID,
}) => {
  const cardContent = compact ? (
    // Compact version for horizontal lists
    <View style={styles.compactContainer}>
      <View style={[styles.iconContainer, { backgroundColor: service.color + '20' }]}>
        <Ionicons name={service.icon as any} size={24} color={service.color} />
      </View>
      <Text style={styles.compactName} numberOfLines={2}>
        {service.name}
      </Text>
      <Text style={styles.compactPrice}>{formatPrice(service.price)}</Text>
    </View>
  ) : (
    // Full version for list view
    <View style={styles.fullContainer}>
      <View style={[styles.iconContainerLarge, { backgroundColor: service.color + '15' }]}>
        <Ionicons name={service.icon as any} size={28} color={service.color} />
      </View>
      <View style={styles.fullContent}>
        <Text style={styles.serviceName}>{service.name}</Text>
        <Text style={styles.serviceDesc} numberOfLines={2}>
          {service.description}
        </Text>
        <View style={styles.metaRow}>
          <View style={styles.metaBadge}>
            <Ionicons name="time-outline" size={12} color={lightColors.textSecondary} />
            <Text style={styles.metaText}>{formatDuration(service.duration)}</Text>
          </View>
          <Text style={styles.priceText}>{formatPrice(service.price)}</Text>
        </View>
      </View>
      <Ionicons
        name="chevron-forward"
        size={16}
        color={lightColors.textTertiary}
        style={styles.chevron}
      />
    </View>
  );

  return (
    <TouchableOpacity
      activeOpacity={Platform.OS === 'ios' ? 0.7 : 1}
      onPress={() => onPress(service)}
      testID={testID}
    >
      <PlatformCard
        variant={selected ? 'elevated' : 'elevated'}
        padding={!compact}
        style={[
          compact ? styles.compactCard : styles.fullCard,
          selected && styles.selectedCard,
        ]}
      >
        {cardContent}
      </PlatformCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  // Compact card
  compactCard: {
    width: 120,
    marginRight: spacing.sm,
    padding: spacing.md,
  },
  compactContainer: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md as number,
    alignItems: 'center',
    justifyContent: 'center',
  },
  compactName: {
    ...textStyles.bodySmall,
    color: lightColors.textPrimary,
    textAlign: 'center',
    fontWeight: '500',
  },
  compactPrice: {
    ...textStyles.labelSmall,
    color: lightColors.textSecondary,
    textAlign: 'center',
  },

  // Full card
  fullCard: {
    marginBottom: spacing.sm,
  },
  fullContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainerLarge: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg as number,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  fullContent: {
    flex: 1,
  },
  serviceName: {
    ...textStyles.titleSmall,
    color: lightColors.textPrimary,
    fontWeight: '600',
    marginBottom: 2,
  },
  serviceDesc: {
    ...textStyles.bodySmall,
    color: lightColors.textSecondary,
    marginBottom: spacing.xs,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
  metaText: {
    ...textStyles.caption,
    color: lightColors.textSecondary,
  },
  priceText: {
    ...textStyles.titleSmall,
    color: lightColors.primary,
    fontWeight: '700',
  },
  chevron: {
    marginLeft: spacing.sm,
  },

  // Selected state
  selectedCard: {
    borderWidth: 2,
    borderColor: lightColors.primary,
  },
});

export default ServiceCard;
