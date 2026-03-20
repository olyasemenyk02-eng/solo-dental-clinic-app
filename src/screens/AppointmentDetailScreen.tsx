import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  TouchableOpacity,
  Alert,
  ActionSheetIOS,
  Share,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { lightColors, spacing, borderRadius, textStyles } from '../theme';
import { PlatformHeader, PlatformButton, PlatformCard } from '../components';
import {
  cancelAppointment,
  formatAppointmentDate,
  Appointment,
} from '../data/appointments';
import { RootStackParamList } from '../navigation/types';
import { formatPrice, formatDuration } from '../utils/platform';

type DetailNavProp = NativeStackNavigationProp<RootStackParamList, 'AppointmentDetail'>;
type DetailRouteProp = RouteProp<RootStackParamList, 'AppointmentDetail'>;

const AppointmentDetailScreen: React.FC = () => {
  const navigation = useNavigation<DetailNavProp>();
  const route = useRoute<DetailRouteProp>();
  const insets = useSafeAreaInsets();

  const { appointment } = route.params;
  const isUpcoming = appointment.status === 'upcoming';
  const isCancelled = appointment.status === 'cancelled';

  const handleShare = useCallback(async () => {
    try {
      await Share.share({
        title: 'My Dental Appointment',
        message: `I have a ${appointment.service.name} appointment at SmileCare Dental on ${formatAppointmentDate(appointment.date)} at ${appointment.time}.\n\nConfirmation: ${appointment.confirmationCode}`,
      });
    } catch {
      // User dismissed share sheet – no action needed
    }
  }, [appointment]);

  const handleCancelIOS = useCallback(() => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Cancel Appointment',
        message: 'This action cannot be undone.',
        options: ['Cancel Appointment', 'Keep Appointment'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          cancelAppointment(appointment.id);
          navigation.goBack();
        }
      },
    );
  }, [appointment.id, navigation]);

  const handleCancelAndroid = useCallback(() => {
    Alert.alert(
      'Cancel Appointment',
      'Are you sure? This action cannot be undone.',
      [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Cancel Appointment',
          style: 'destructive',
          onPress: () => {
            cancelAppointment(appointment.id);
            navigation.goBack();
          },
        },
      ],
    );
  }, [appointment.id, navigation]);

  const handleCancel = Platform.OS === 'ios' ? handleCancelIOS : handleCancelAndroid;

  const statusColors: Record<Appointment['status'], string> = {
    upcoming: lightColors.primary,
    completed: lightColors.success,
    cancelled: lightColors.error,
  };

  const statusBg: Record<Appointment['status'], string> = {
    upcoming: lightColors.infoBg,
    completed: lightColors.successBg,
    cancelled: lightColors.errorBg,
  };

  const statusIcons: Record<Appointment['status'], string> = {
    upcoming: 'calendar',
    completed: 'checkmark-circle',
    cancelled: 'close-circle',
  };

  return (
    <View style={styles.container}>
      <PlatformHeader
        title="Appointment"
        showBackButton
        onBack={() => navigation.goBack()}
        rightComponent={
          <TouchableOpacity onPress={handleShare} activeOpacity={0.7} testID="share-btn">
            <Ionicons name="share-outline" size={22} color={lightColors.primary} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
        showsVerticalScrollIndicator={false}
      >
        {/* Service hero */}
        <View style={[styles.hero, { backgroundColor: appointment.service.color + '15' }]}>
          <View style={[styles.heroIcon, { backgroundColor: appointment.service.color + '25' }]}>
            <Ionicons name={appointment.service.icon as any} size={40} color={appointment.service.color} />
          </View>
          <Text style={styles.heroService}>{appointment.service.name}</Text>
          <Text style={styles.heroPrice}>{formatPrice(appointment.service.price)}</Text>

          {/* Status badge */}
          <View style={[styles.statusBadge, { backgroundColor: statusBg[appointment.status] }]}>
            <Ionicons
              name={statusIcons[appointment.status] as any}
              size={14}
              color={statusColors[appointment.status]}
            />
            <Text style={[styles.statusText, { color: statusColors[appointment.status] }]}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </Text>
          </View>
        </View>

        {/* Confirmation code */}
        <View style={styles.codeRow}>
          <Text style={styles.codeLabel}>Confirmation</Text>
          <Text style={styles.codeValue}>{appointment.confirmationCode}</Text>
        </View>

        {/* Appointment details */}
        <PlatformCard style={styles.card}>
          <Text style={styles.cardHeading}>Appointment Details</Text>

          <InfoRow
            icon="calendar-outline"
            label="Date"
            value={formatAppointmentDate(appointment.date)}
          />
          <InfoRow icon="time-outline" label="Time" value={appointment.time} />
          <InfoRow
            icon="hourglass-outline"
            label="Duration"
            value={formatDuration(appointment.service.duration)}
          />
          <InfoRow icon="location-outline" label="Clinic" value="SmileCare Dental, 123 Smile Street" />
        </PlatformCard>

        {/* Patient info */}
        <PlatformCard style={styles.card}>
          <Text style={styles.cardHeading}>Patient Information</Text>
          <InfoRow icon="person-outline" label="Name" value={appointment.patientName} />
          <InfoRow icon="call-outline" label="Phone" value={appointment.patientPhone} />
          {appointment.patientEmail ? (
            <InfoRow icon="mail-outline" label="Email" value={appointment.patientEmail} />
          ) : null}
          {appointment.notes ? (
            <InfoRow icon="document-text-outline" label="Notes" value={appointment.notes} />
          ) : null}
        </PlatformCard>

        {/* Service description */}
        <PlatformCard style={styles.card}>
          <Text style={styles.cardHeading}>About This Service</Text>
          <Text style={styles.serviceDesc}>{appointment.service.description}</Text>
          <View style={styles.serviceMeta}>
            <View style={styles.serviceMetaItem}>
              <Ionicons name="time-outline" size={16} color={lightColors.textSecondary} />
              <Text style={styles.serviceMetaText}>{formatDuration(appointment.service.duration)}</Text>
            </View>
            <View style={styles.serviceMetaItem}>
              <Ionicons name="pricetag-outline" size={16} color={lightColors.textSecondary} />
              <Text style={styles.serviceMetaText}>{formatPrice(appointment.service.price)}</Text>
            </View>
          </View>
        </PlatformCard>
      </ScrollView>

      {/* Bottom actions */}
      {isUpcoming && (
        <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.sm }]}>
          <PlatformButton
            title="Cancel Appointment"
            onPress={handleCancel}
            variant="danger"
            size="md"
            fullWidth
            icon={<Ionicons name="close-circle-outline" size={18} color={lightColors.white} />}
            testID="detail-cancel-btn"
          />
        </View>
      )}
    </View>
  );
};

const InfoRow: React.FC<{ icon: string; label: string; value: string }> = ({
  icon,
  label,
  value,
}) => (
  <View style={infoRowStyles.row}>
    <Ionicons name={icon as any} size={18} color={lightColors.textSecondary} style={infoRowStyles.icon} />
    <View style={infoRowStyles.content}>
      <Text style={infoRowStyles.label}>{label}</Text>
      <Text style={infoRowStyles.value}>{value}</Text>
    </View>
  </View>
);

const infoRowStyles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.sm,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: lightColors.border,
  },
  icon: { marginRight: spacing.md, marginTop: 1 },
  content: { flex: 1 },
  label: {
    ...textStyles.caption,
    color: lightColors.textTertiary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  value: { ...textStyles.bodyMedium, color: lightColors.textPrimary },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: lightColors.background },
  scrollContent: { flexGrow: 1 },

  // Hero
  hero: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  heroIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  heroService: {
    ...textStyles.headlineSmall,
    color: lightColors.textPrimary,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  heroPrice: {
    ...textStyles.titleLarge,
    color: lightColors.textSecondary,
    marginBottom: spacing.md,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.full,
    gap: 6,
  },
  statusText: {
    ...textStyles.labelMedium,
    fontWeight: '700',
  },

  // Confirmation code
  codeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: lightColors.infoBg,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: lightColors.border,
    marginBottom: spacing.md,
  },
  codeLabel: {
    ...textStyles.caption,
    color: lightColors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  codeValue: {
    ...textStyles.titleSmall,
    color: lightColors.primary,
    fontWeight: '800',
    letterSpacing: 2,
  },

  // Cards
  card: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    padding: spacing.md,
  },
  cardHeading: {
    ...textStyles.titleSmall,
    color: lightColors.textPrimary,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },

  // Service description
  serviceDesc: {
    ...textStyles.bodyMedium,
    color: lightColors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.md,
  },
  serviceMeta: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  serviceMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  serviceMetaText: {
    ...textStyles.bodySmall,
    color: lightColors.textSecondary,
    fontWeight: '500',
  },

  // Bottom bar
  bottomBar: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
    backgroundColor: lightColors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: lightColors.border,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: -2 },
      },
      android: { elevation: 8 },
      default: {},
    }),
  },
});

export default AppointmentDetailScreen;
