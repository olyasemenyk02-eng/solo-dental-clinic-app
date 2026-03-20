import React, { useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
  StatusBar,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

import { lightColors, spacing, borderRadius, textStyles } from '../theme';
import { PlatformCard, PlatformButton, ServiceCard } from '../components';
import { services } from '../data/services';
import { getAppointments, formatShortDate } from '../data/appointments';
import { RootStackParamList } from '../navigation/types';
import { getGreeting } from '../utils/platform';

type HomeNavProp = NativeStackNavigationProp<RootStackParamList>;

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FEATURED_SERVICES = services.slice(0, 4);

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeNavProp>();
  const insets = useSafeAreaInsets();
  const appointments = getAppointments();
  const upcomingAppointments = appointments.filter(a => a.status === 'upcoming').slice(0, 2);

  const handleBookNow = useCallback(() => {
    navigation.navigate('Booking', {});
  }, [navigation]);

  const handleServicePress = useCallback(
    (service: (typeof services)[0]) => {
      navigation.navigate('Booking', { service });
    },
    [navigation],
  );

  const handleAppointmentPress = useCallback(
    (appt: ReturnType<typeof getAppointments>[0]) => {
      navigation.navigate('AppointmentDetail', { appointment: appt });
    },
    [navigation],
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'light-content'}
        backgroundColor={lightColors.primaryDark}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + spacing.xl }]}
      >
        {/* Hero / Header gradient */}
        <LinearGradient
          colors={['#1A56A4', '#2B6CB0', '#3182CE']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[styles.hero, { paddingTop: insets.top + spacing.lg }]}
        >
          <View style={styles.heroContent}>
            <View style={styles.heroTop}>
              <View>
                <Text style={styles.greeting}>{getGreeting()} 👋</Text>
                <Text style={styles.heroTitle}>SmileCare Dental</Text>
                <Text style={styles.heroSubtitle}>Your smile is our priority</Text>
              </View>
              <View style={styles.logoCircle}>
                <Ionicons name="medical" size={32} color={lightColors.white} />
              </View>
            </View>

            {/* Quick book CTA */}
            <View style={styles.ctaContainer}>
              <Text style={styles.ctaLabel}>Book your next appointment</Text>
              <PlatformButton
                title="Book Now"
                onPress={handleBookNow}
                variant="secondary"
                size="md"
                icon={<Ionicons name="calendar-outline" size={18} color={lightColors.textOnPrimary} />}
                style={styles.ctaButton}
                testID="home-book-now-btn"
              />
            </View>
          </View>
        </LinearGradient>

        {/* Quick Info Cards */}
        <View style={styles.quickInfoRow}>
          {quickInfoItems.map((item) => (
            <PlatformCard key={item.label} style={styles.quickInfoCard} variant="elevated">
              <View style={[styles.quickInfoIcon, { backgroundColor: item.color + '20' }]}>
                <Ionicons name={item.icon as any} size={22} color={item.color} />
              </View>
              <Text style={styles.quickInfoValue}>{item.value}</Text>
              <Text style={styles.quickInfoLabel}>{item.label}</Text>
            </PlatformCard>
          ))}
        </View>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => navigation.navigate('MainTabs', undefined)}
              >
                <Text style={styles.seeAll}>See all</Text>
              </TouchableOpacity>
            </View>

            {upcomingAppointments.map((appt) => (
              <TouchableOpacity
                key={appt.id}
                onPress={() => handleAppointmentPress(appt)}
                activeOpacity={0.75}
                testID={`upcoming-appt-${appt.id}`}
              >
                <PlatformCard style={styles.upcomingCard}>
                  <View style={styles.upcomingCardInner}>
                    {/* Date badge */}
                    <View style={[styles.dateBadge, { backgroundColor: appt.service.color }]}>
                      <Text style={styles.dateDay}>
                        {new Date(appt.date + 'T00:00:00').getDate()}
                      </Text>
                      <Text style={styles.dateMonth}>
                        {new Date(appt.date + 'T00:00:00').toLocaleString('en-US', { month: 'short' })}
                      </Text>
                    </View>
                    <View style={styles.upcomingInfo}>
                      <Text style={styles.upcomingService}>{appt.service.name}</Text>
                      <View style={styles.upcomingMeta}>
                        <Ionicons name="time-outline" size={13} color={lightColors.textSecondary} />
                        <Text style={styles.upcomingMetaText}>{appt.time}</Text>
                        <View style={styles.dot} />
                        <Text style={styles.upcomingMetaText}>{formatShortDate(appt.date)}</Text>
                      </View>
                    </View>
                    <View style={[styles.statusDot, styles.statusDotUpcoming]} />
                  </View>
                </PlatformCard>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* Our Services */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Our Services</Text>
            <TouchableOpacity activeOpacity={0.7}>
              <Text style={styles.seeAll}>View all</Text>
            </TouchableOpacity>
          </View>

          {FEATURED_SERVICES.map((svc) => (
            <ServiceCard
              key={svc.id}
              service={svc}
              onPress={handleServicePress}
              testID={`home-service-${svc.id}`}
            />
          ))}
        </View>

        {/* Clinic Info */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clinic Info</Text>
          <PlatformCard style={styles.clinicInfoCard}>
            <View style={styles.clinicInfoRow}>
              <View style={styles.clinicInfoIcon}>
                <Ionicons name="location" size={20} color={lightColors.primary} />
              </View>
              <View style={styles.clinicInfoContent}>
                <Text style={styles.clinicInfoLabel}>Address</Text>
                <Text style={styles.clinicInfoValue}>
                  123 Smile Street, Health District, NY 10001
                </Text>
              </View>
            </View>

            <View style={[styles.clinicInfoRow, styles.clinicInfoBorder]}>
              <View style={styles.clinicInfoIcon}>
                <Ionicons name="time" size={20} color={lightColors.secondary} />
              </View>
              <View style={styles.clinicInfoContent}>
                <Text style={styles.clinicInfoLabel}>Working Hours</Text>
                <Text style={styles.clinicInfoValue}>Mon–Fri: 9:00 – 18:00</Text>
                <Text style={styles.clinicInfoValue}>Sat: 9:00 – 14:00</Text>
              </View>
            </View>

            <View style={[styles.clinicInfoRow, styles.clinicInfoBorder]}>
              <View style={styles.clinicInfoIcon}>
                <Ionicons name="call" size={20} color={lightColors.accent} />
              </View>
              <View style={styles.clinicInfoContent}>
                <Text style={styles.clinicInfoLabel}>Phone</Text>
                <Text style={[styles.clinicInfoValue, styles.phoneLink]}>
                  +1 (555) 123-4567
                </Text>
              </View>
            </View>
          </PlatformCard>
        </View>
      </ScrollView>
    </View>
  );
};

const quickInfoItems = [
  { label: 'Years', value: '15+', icon: 'trophy', color: '#F6AD55' },
  { label: 'Patients', value: '5k+', icon: 'people', color: '#38B2AC' },
  { label: 'Services', value: '20+', icon: 'medical', color: '#9F7AEA' },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: lightColors.background,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Hero
  hero: {
    paddingBottom: spacing.xxl,
  },
  heroContent: {
    paddingHorizontal: spacing.lg,
  },
  heroTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.xl,
  },
  greeting: {
    ...textStyles.bodyMedium,
    color: 'rgba(255,255,255,0.75)',
    marginBottom: 2,
  },
  heroTitle: {
    ...textStyles.headlineMedium,
    color: lightColors.white,
    fontWeight: '800',
  },
  heroSubtitle: {
    ...textStyles.bodyMedium,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 2,
  },
  logoCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: borderRadius.xl as number,
    padding: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaLabel: {
    ...textStyles.bodyMedium,
    color: lightColors.white,
    flex: 1,
    fontWeight: '500',
  },
  ctaButton: {
    minWidth: 110,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },

  // Quick Info
  quickInfoRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginTop: -spacing.xl,
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  quickInfoCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
  },
  quickInfoIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md as number,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.xs,
  },
  quickInfoValue: {
    ...textStyles.titleMedium,
    color: lightColors.textPrimary,
    fontWeight: '700',
  },
  quickInfoLabel: {
    ...textStyles.caption,
    color: lightColors.textSecondary,
    textAlign: 'center',
  },

  // Sections
  section: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...textStyles.titleLarge,
    color: lightColors.textPrimary,
    fontWeight: '700',
  },
  seeAll: {
    ...textStyles.bodyMedium,
    color: lightColors.primary,
    fontWeight: '500',
  },

  // Upcoming appointment mini card
  upcomingCard: {
    marginBottom: spacing.sm,
    padding: spacing.sm + 4,
  },
  upcomingCardInner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dateBadge: {
    width: 48,
    height: 52,
    borderRadius: borderRadius.md as number,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  dateDay: {
    ...textStyles.titleMedium,
    color: lightColors.white,
    fontWeight: '800',
  },
  dateMonth: {
    ...textStyles.labelSmall,
    color: 'rgba(255,255,255,0.85)',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingService: {
    ...textStyles.titleSmall,
    color: lightColors.textPrimary,
    fontWeight: '600',
    marginBottom: 3,
  },
  upcomingMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  upcomingMetaText: {
    ...textStyles.caption,
    color: lightColors.textSecondary,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: lightColors.textTertiary,
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  statusDotUpcoming: {
    backgroundColor: lightColors.success,
  },

  // Clinic info
  clinicInfoCard: {
    padding: 0,
    overflow: 'hidden',
  },
  clinicInfoRow: {
    flexDirection: 'row',
    padding: spacing.md,
    alignItems: 'flex-start',
  },
  clinicInfoBorder: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: lightColors.border,
  },
  clinicInfoIcon: {
    width: 36,
    height: 36,
    borderRadius: borderRadius.sm as number,
    backgroundColor: lightColors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
  },
  clinicInfoContent: {
    flex: 1,
  },
  clinicInfoLabel: {
    ...textStyles.caption,
    color: lightColors.textSecondary,
    marginBottom: 2,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  clinicInfoValue: {
    ...textStyles.bodyMedium,
    color: lightColors.textPrimary,
  },
  phoneLink: {
    color: lightColors.primary,
    fontWeight: '500',
  },
});

export default HomeScreen;
