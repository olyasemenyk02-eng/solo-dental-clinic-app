import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { lightColors, spacing, borderRadius, textStyles } from '../theme';
import { PlatformButton, PlatformCard } from '../components';
import { formatAppointmentDate } from '../data/appointments';
import { RootStackParamList } from '../navigation/types';
import { formatPrice, formatDuration } from '../utils/platform';

type ConfirmNavProp = NativeStackNavigationProp<RootStackParamList, 'Confirmation'>;
type ConfirmRouteProp = RouteProp<RootStackParamList, 'Confirmation'>;

const ConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<ConfirmNavProp>();
  const route = useRoute<ConfirmRouteProp>();
  const insets = useSafeAreaInsets();
  const { appointment } = route.params;

  const scaleAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 80,
        friction: 6,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleGoHome = () => {
    navigation.navigate('MainTabs', undefined);
  };

  const handleViewAppointments = () => {
    navigation.navigate('MainTabs', undefined);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + spacing.xl, paddingBottom: insets.bottom + spacing.xl },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {/* Success icon */}
        <Animated.View style={[styles.successIconWrapper, { transform: [{ scale: scaleAnim }] }]}>
          <View style={styles.successOuterRing}>
            <View style={styles.successInnerCircle}>
              <Ionicons name="checkmark" size={48} color={lightColors.white} />
            </View>
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.title}>Booking Confirmed!</Text>
          <Text style={styles.subtitle}>
            Your appointment has been successfully scheduled. See you soon!
          </Text>

          {/* Confirmation code */}
          <PlatformCard variant="filled" style={styles.codeCard}>
            <Text style={styles.codeLabel}>Confirmation Code</Text>
            <Text style={styles.codeValue}>{appointment.confirmationCode}</Text>
            <Text style={styles.codeHint}>Save this code for your records</Text>
          </PlatformCard>

          {/* Appointment details */}
          <PlatformCard style={styles.detailCard}>
            <Text style={styles.detailHeading}>Appointment Details</Text>

            <DetailRow
              icon="medical-outline"
              label="Service"
              value={appointment.service.name}
              sub={`${formatDuration(appointment.service.duration)} · ${formatPrice(appointment.service.price)}`}
              iconColor={appointment.service.color}
            />
            <View style={styles.separator} />
            <DetailRow
              icon="calendar-outline"
              label="Date"
              value={formatAppointmentDate(appointment.date)}
              iconColor={lightColors.primary}
            />
            <View style={styles.separator} />
            <DetailRow
              icon="time-outline"
              label="Time"
              value={appointment.time}
              iconColor={lightColors.secondary}
            />
            <View style={styles.separator} />
            <DetailRow
              icon="person-outline"
              label="Patient"
              value={appointment.patientName}
              sub={appointment.patientPhone}
              iconColor={lightColors.accent}
            />
            <View style={styles.separator} />
            <DetailRow
              icon="location-outline"
              label="Location"
              value="SmileCare Dental Clinic"
              sub="123 Smile Street, Health District, NY 10001"
              iconColor={lightColors.success}
            />
          </PlatformCard>

          {/* Reminder note */}
          <PlatformCard variant="filled" style={styles.reminderCard}>
            <View style={styles.reminderRow}>
              <Ionicons name="information-circle" size={20} color={lightColors.info} />
              <Text style={styles.reminderText}>
                Please arrive 10 minutes early. Cancellations are free up to 24 hours before your appointment.
              </Text>
            </View>
          </PlatformCard>
        </Animated.View>
      </ScrollView>

      {/* Bottom actions */}
      <Animated.View
        style={[
          styles.bottomActions,
          { paddingBottom: insets.bottom + spacing.md },
          { opacity: fadeAnim },
        ]}
      >
        <PlatformButton
          title="View My Appointments"
          onPress={handleViewAppointments}
          variant="primary"
          size="lg"
          fullWidth
          icon={<Ionicons name="calendar" size={20} color={lightColors.white} />}
          style={styles.primaryButton}
          testID="confirmation-view-appts-btn"
        />
        <PlatformButton
          title="Back to Home"
          onPress={handleGoHome}
          variant="ghost"
          size="md"
          fullWidth
          testID="confirmation-home-btn"
        />
      </Animated.View>
    </View>
  );
};

// Helper sub-component for detail rows
const DetailRow: React.FC<{
  icon: string;
  label: string;
  value: string;
  sub?: string;
  iconColor: string;
}> = ({ icon, label, value, sub, iconColor }) => (
  <View style={detailRowStyles.row}>
    <View style={[detailRowStyles.iconBg, { backgroundColor: iconColor + '18' }]}>
      <Ionicons name={icon as any} size={18} color={iconColor} />
    </View>
    <View style={detailRowStyles.content}>
      <Text style={detailRowStyles.label}>{label}</Text>
      <Text style={detailRowStyles.value}>{value}</Text>
      {sub ? <Text style={detailRowStyles.sub}>{sub}</Text> : null}
    </View>
  </View>
);

const detailRowStyles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'flex-start', paddingVertical: spacing.sm },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm as number,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 2,
  },
  content: { flex: 1 },
  label: {
    ...textStyles.caption,
    color: lightColors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  value: { ...textStyles.bodyMedium, color: lightColors.textPrimary, fontWeight: '600' },
  sub: { ...textStyles.caption, color: lightColors.textSecondary, marginTop: 1 },
});

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: lightColors.background },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
  },

  // Success icon
  successIconWrapper: { alignItems: 'center', marginBottom: spacing.xl },
  successOuterRing: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: lightColors.successBg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successInnerCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: lightColors.success,
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: lightColors.success,
        shadowOpacity: 0.4,
        shadowRadius: 16,
        shadowOffset: { width: 0, height: 4 },
      },
      android: { elevation: 8 },
      default: {},
    }),
  },

  title: {
    ...textStyles.headlineMedium,
    color: lightColors.textPrimary,
    textAlign: 'center',
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...textStyles.bodyLarge,
    color: lightColors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },

  // Confirmation code
  codeCard: {
    alignItems: 'center',
    marginBottom: spacing.lg,
    padding: spacing.lg,
    width: '100%',
    borderRadius: borderRadius.lg as number,
    borderWidth: 2,
    borderColor: lightColors.primary + '30',
    borderStyle: 'dashed',
    backgroundColor: lightColors.infoBg,
  },
  codeLabel: {
    ...textStyles.caption,
    color: lightColors.textSecondary,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  codeValue: {
    fontSize: 28,
    fontWeight: '800',
    color: lightColors.primary,
    letterSpacing: 4,
    marginBottom: spacing.xs,
  },
  codeHint: { ...textStyles.caption, color: lightColors.textTertiary },

  // Details card
  detailCard: { width: '100%', marginBottom: spacing.md, padding: spacing.md },
  detailHeading: {
    ...textStyles.titleMedium,
    color: lightColors.textPrimary,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: lightColors.border,
    marginVertical: spacing.xs,
  },

  // Reminder
  reminderCard: { width: '100%', marginBottom: spacing.lg, padding: spacing.md },
  reminderRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },
  reminderText: {
    flex: 1,
    ...textStyles.bodySmall,
    color: lightColors.textSecondary,
    lineHeight: 20,
  },

  // Buttons
  bottomActions: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
    backgroundColor: lightColors.surface,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: lightColors.border,
    gap: spacing.xs,
  },
  primaryButton: { marginBottom: spacing.xs },
});

export default ConfirmationScreen;
