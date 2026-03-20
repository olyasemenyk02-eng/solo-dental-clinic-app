import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Appointment, formatShortDate } from '../data/appointments';
import { lightColors, spacing, borderRadius, textStyles } from '../theme';
import PlatformCard from './PlatformCard';

interface AppointmentCardProps {
  appointment: Appointment;
  onPress: (appointment: Appointment) => void;
  onCancel?: (appointment: Appointment) => void;
  testID?: string;
}

const statusConfig: Record<
  Appointment['status'],
  { label: string; color: string; bg: string; icon: string }
> = {
  upcoming: {
    label: 'Upcoming',
    color: lightColors.primary,
    bg: lightColors.infoBg,
    icon: 'calendar',
  },
  completed: {
    label: 'Completed',
    color: lightColors.success,
    bg: lightColors.successBg,
    icon: 'checkmark-circle',
  },
  cancelled: {
    label: 'Cancelled',
    color: lightColors.error,
    bg: lightColors.errorBg,
    icon: 'close-circle',
  },
};

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  appointment,
  onPress,
  onCancel,
  testID,
}) => {
  const status = statusConfig[appointment.status];

  return (
    <TouchableOpacity
      activeOpacity={Platform.OS === 'ios' ? 0.7 : 1}
      onPress={() => onPress(appointment)}
      testID={testID}
    >
      <PlatformCard style={styles.card}>
        {/* Status bar stripe */}
        <View style={[styles.statusStripe, { backgroundColor: status.color }]} />

        <View style={styles.content}>
          {/* Header row */}
          <View style={styles.headerRow}>
            <View style={[styles.iconBadge, { backgroundColor: appointment.service.color + '20' }]}>
              <Ionicons
                name={appointment.service.icon as any}
                size={20}
                color={appointment.service.color}
              />
            </View>
            <View style={styles.titleArea}>
              <Text style={styles.serviceName}>{appointment.service.name}</Text>
              <Text style={styles.confirmCode}>{appointment.confirmationCode}</Text>
            </View>
            <View style={[styles.statusBadge, { backgroundColor: status.bg }]}>
              <Ionicons name={status.icon as any} size={12} color={status.color} />
              <Text style={[styles.statusLabel, { color: status.color }]}>{status.label}</Text>
            </View>
          </View>

          {/* Date / Time row */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={14} color={lightColors.textSecondary} />
              <Text style={styles.infoText}>{formatShortDate(appointment.date)}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time-outline" size={14} color={lightColors.textSecondary} />
              <Text style={styles.infoText}>{appointment.time}</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="pricetag-outline" size={14} color={lightColors.textSecondary} />
              <Text style={styles.infoText}>${appointment.service.price}</Text>
            </View>
          </View>

          {/* Cancel button for upcoming */}
          {appointment.status === 'upcoming' && onCancel ? (
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => onCancel(appointment)}
              activeOpacity={0.7}
            >
              <Text style={styles.cancelText}>Cancel Appointment</Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </PlatformCard>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.sm,
    overflow: 'hidden',
    flexDirection: 'row',
    padding: 0,
  },
  statusStripe: {
    width: 4,
    borderTopLeftRadius: borderRadius.lg as number,
    borderBottomLeftRadius: borderRadius.lg as number,
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: borderRadius.md as number,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  titleArea: {
    flex: 1,
  },
  serviceName: {
    ...textStyles.titleSmall,
    color: lightColors.textPrimary,
    fontWeight: '600',
  },
  confirmCode: {
    ...textStyles.caption,
    color: lightColors.textTertiary,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
    gap: 4,
  },
  statusLabel: {
    ...textStyles.labelSmall,
    fontWeight: '600',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  infoText: {
    ...textStyles.bodySmall,
    color: lightColors.textSecondary,
  },
  cancelButton: {
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: lightColors.border,
  },
  cancelText: {
    ...textStyles.bodySmall,
    color: lightColors.error,
    fontWeight: '500',
  },
});

export default AppointmentCard;
