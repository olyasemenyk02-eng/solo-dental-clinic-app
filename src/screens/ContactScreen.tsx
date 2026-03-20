import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import { lightColors, spacing, borderRadius, textStyles } from '../theme';
import { PlatformCard } from '../components';

const ContactScreen: React.FC = () => {
  const insets = useSafeAreaInsets();

  const handleCall = () => Linking.openURL('tel:+15551234567');
  const handleEmail = () => Linking.openURL('mailto:hello@smilecare.dental');
  const handleMap = () =>
    Linking.openURL(
      Platform.OS === 'ios'
        ? 'maps://?q=SmileCare+Dental+123+Smile+Street+NY'
        : 'geo:0,0?q=SmileCare+Dental+123+Smile+Street+NY',
    );

  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingTop: insets.top + spacing.lg, paddingBottom: insets.bottom + spacing.xl },
        ]}
      >
        {/* Clinic logo / brand */}
        <LinearGradient
          colors={['#1A56A4', '#3182CE']}
          style={styles.brandBanner}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.brandIcon}>
            <Ionicons name="medical" size={36} color={lightColors.white} />
          </View>
          <Text style={styles.brandName}>SmileCare Dental</Text>
          <Text style={styles.brandTagline}>Your smile is our priority</Text>
        </LinearGradient>

        {/* Contact Actions */}
        <View style={styles.actionGrid}>
          <ContactAction
            icon="call"
            label="Call Us"
            value="+1 (555) 123-4567"
            color="#38B2AC"
            onPress={handleCall}
            testID="contact-call"
          />
          <ContactAction
            icon="mail"
            label="Email"
            value="hello@smilecare.dental"
            color="#3182CE"
            onPress={handleEmail}
            testID="contact-email"
          />
          <ContactAction
            icon="location"
            label="Directions"
            value="Get directions"
            color="#ED64A6"
            onPress={handleMap}
            testID="contact-map"
          />
        </View>

        {/* Opening Hours */}
        <PlatformCard style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="time-outline" size={20} color={lightColors.primary} />
            <Text style={styles.cardTitle}>Opening Hours</Text>
          </View>

          {openingHours.map((item, idx) => (
            <View
              key={item.day}
              style={[styles.hoursRow, idx < openingHours.length - 1 && styles.hoursRowBorder]}
            >
              <Text
                style={[
                  styles.hoursDay,
                  item.closed && styles.hoursDayClosed,
                  item.today && styles.hoursDayToday,
                ]}
              >
                {item.today && '→ '}
                {item.day}
              </Text>
              <Text style={[styles.hoursTime, item.closed && styles.hoursClosed]}>
                {item.closed ? 'Closed' : item.time}
              </Text>
            </View>
          ))}
        </PlatformCard>

        {/* Location */}
        <PlatformCard style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="location-outline" size={20} color={lightColors.primary} />
            <Text style={styles.cardTitle}>Location</Text>
          </View>

          {/* Map placeholder */}
          <TouchableOpacity
            style={styles.mapPlaceholder}
            onPress={handleMap}
            activeOpacity={0.85}
            testID="map-btn"
          >
            <LinearGradient
              colors={[lightColors.infoBg, '#BEE3F8']}
              style={styles.mapGradient}
            >
              <Ionicons name="map-outline" size={40} color={lightColors.primary} />
              <Text style={styles.mapText}>Tap to open in Maps</Text>
              <Text style={styles.mapAddress}>123 Smile Street, Health District, NY 10001</Text>
            </LinearGradient>
          </TouchableOpacity>
        </PlatformCard>

        {/* About */}
        <PlatformCard style={styles.card}>
          <View style={styles.cardTitleRow}>
            <Ionicons name="information-circle-outline" size={20} color={lightColors.primary} />
            <Text style={styles.cardTitle}>About Us</Text>
          </View>
          <Text style={styles.aboutText}>
            SmileCare Dental is a modern, patient-focused solo dental practice dedicated to
            providing personalized, compassionate care. With over 15 years of experience, Dr.
            Smith and the team are committed to making every visit comfortable and stress-free.
          </Text>
          <View style={styles.statsRow}>
            {aboutStats.map((stat) => (
              <View key={stat.label} style={styles.statItem}>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </PlatformCard>
      </ScrollView>
    </View>
  );
};

const ContactAction: React.FC<{
  icon: string;
  label: string;
  value: string;
  color: string;
  onPress: () => void;
  testID?: string;
}> = ({ icon, label, value, color, onPress, testID }) => (
  <TouchableOpacity style={styles.actionCard} onPress={onPress} activeOpacity={0.75} testID={testID}>
    <View style={[styles.actionIcon, { backgroundColor: color + '20' }]}>
      <Ionicons name={icon as any} size={24} color={color} />
    </View>
    <Text style={styles.actionLabel}>{label}</Text>
    <Text style={styles.actionValue} numberOfLines={1}>{value}</Text>
  </TouchableOpacity>
);

const today = new Date().getDay(); // 0 = Sun, 1 = Mon, …

const openingHours = [
  { day: 'Monday', time: '9:00 – 18:00', closed: false, today: today === 1 },
  { day: 'Tuesday', time: '9:00 – 18:00', closed: false, today: today === 2 },
  { day: 'Wednesday', time: '9:00 – 18:00', closed: false, today: today === 3 },
  { day: 'Thursday', time: '9:00 – 18:00', closed: false, today: today === 4 },
  { day: 'Friday', time: '9:00 – 18:00', closed: false, today: today === 5 },
  { day: 'Saturday', time: '9:00 – 14:00', closed: false, today: today === 6 },
  { day: 'Sunday', time: '', closed: true, today: today === 0 },
];

const aboutStats = [
  { value: '15+', label: 'Years Exp.' },
  { value: '5k+', label: 'Patients' },
  { value: '4.9★', label: 'Rating' },
];

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: lightColors.background },
  scrollContent: { paddingHorizontal: spacing.lg },

  // Brand banner
  brandBanner: {
    borderRadius: borderRadius.xl as number,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  brandIcon: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  brandName: {
    ...textStyles.headlineSmall,
    color: lightColors.white,
    fontWeight: '800',
    marginBottom: spacing.xs,
  },
  brandTagline: {
    ...textStyles.bodyMedium,
    color: 'rgba(255,255,255,0.8)',
  },

  // Action grid
  actionGrid: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  actionCard: {
    flex: 1,
    backgroundColor: lightColors.surface,
    borderRadius: borderRadius.lg as number,
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.xs,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: { ...textStyles.labelMedium, color: lightColors.textSecondary, fontWeight: '600' },
  actionValue: { ...textStyles.caption, color: lightColors.textPrimary, textAlign: 'center' },

  // Cards
  card: { marginBottom: spacing.lg, padding: spacing.md },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  cardTitle: { ...textStyles.titleMedium, color: lightColors.textPrimary, fontWeight: '700' },

  // Hours
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
  },
  hoursRowBorder: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: lightColors.border,
  },
  hoursDay: { ...textStyles.bodyMedium, color: lightColors.textPrimary },
  hoursDayClosed: { color: lightColors.textTertiary },
  hoursDayToday: { color: lightColors.primary, fontWeight: '700' },
  hoursTime: { ...textStyles.bodyMedium, color: lightColors.textSecondary, fontWeight: '500' },
  hoursClosed: { color: lightColors.error },

  // Map placeholder
  mapPlaceholder: { borderRadius: borderRadius.md as number, overflow: 'hidden' },
  mapGradient: {
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.md,
  },
  mapText: { ...textStyles.titleSmall, color: lightColors.primary, fontWeight: '600' },
  mapAddress: { ...textStyles.caption, color: lightColors.textSecondary, textAlign: 'center' },

  // About
  aboutText: {
    ...textStyles.bodyMedium,
    color: lightColors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: spacing.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: lightColors.border,
  },
  statItem: { alignItems: 'center', gap: 4 },
  statValue: { ...textStyles.titleLarge, color: lightColors.primary, fontWeight: '800' },
  statLabel: { ...textStyles.caption, color: lightColors.textSecondary },
});

export default ContactScreen;
