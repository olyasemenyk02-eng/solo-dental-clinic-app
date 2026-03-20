import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  TouchableOpacity,
  Alert,
  ActionSheetIOS,
  RefreshControl,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { lightColors, spacing, borderRadius, textStyles } from '../theme';
import { AppointmentCard, PlatformButton } from '../components';
import {
  getAppointments,
  cancelAppointment,
  Appointment,
  AppointmentStatus,
} from '../data/appointments';
import { RootStackParamList } from '../navigation/types';

type ApptsNavProp = NativeStackNavigationProp<RootStackParamList>;

type FilterTab = AppointmentStatus | 'all';

const filterTabs: { id: FilterTab; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'upcoming', label: 'Upcoming' },
  { id: 'completed', label: 'Completed' },
  { id: 'cancelled', label: 'Cancelled' },
];

const AppointmentsScreen: React.FC = () => {
  const navigation = useNavigation<ApptsNavProp>();
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<FilterTab>('upcoming');
  const [appointments, setAppointments] = useState(getAppointments());
  const [refreshing, setRefreshing] = useState(false);

  const filteredAppointments = appointments.filter(
    a => filter === 'all' || a.status === filter,
  );

  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setAppointments(getAppointments());
      setRefreshing(false);
    }, 600);
  }, []);

  const handleCancelIOS = useCallback((appt: Appointment) => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Cancel Appointment',
        message: `Cancel your ${appt.service.name} on ${appt.date}?`,
        options: ['Cancel Appointment', 'Keep Appointment'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) {
          cancelAppointment(appt.id);
          setAppointments(getAppointments());
        }
      },
    );
  }, []);

  const handleCancelAndroid = useCallback((appt: Appointment) => {
    Alert.alert(
      'Cancel Appointment',
      `Are you sure you want to cancel your ${appt.service.name} appointment?`,
      [
        { text: 'Keep', style: 'cancel' },
        {
          text: 'Cancel Appointment',
          style: 'destructive',
          onPress: () => {
            cancelAppointment(appt.id);
            setAppointments(getAppointments());
          },
        },
      ],
    );
  }, []);

  const handleCancel = Platform.OS === 'ios' ? handleCancelIOS : handleCancelAndroid;

  const handlePress = useCallback(
    (appt: Appointment) => {
      navigation.navigate('AppointmentDetail', { appointment: appt });
    },
    [navigation],
  );

  const handleBookNew = useCallback(() => {
    navigation.navigate('Booking', {});
  }, [navigation]);

  const EmptyState = () => (
    <View style={styles.emptyContainer}>
      <View style={styles.emptyIcon}>
        <Ionicons name="calendar-outline" size={48} color={lightColors.textTertiary} />
      </View>
      <Text style={styles.emptyTitle}>No appointments</Text>
      <Text style={styles.emptySubtitle}>
        {filter === 'upcoming'
          ? "You have no upcoming appointments.\nBook one today!"
          : "No appointments in this category."}
      </Text>
      {filter === 'upcoming' && (
        <PlatformButton
          title="Book an Appointment"
          onPress={handleBookNew}
          variant="primary"
          size="md"
          style={styles.emptyButton}
          testID="empty-book-btn"
        />
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Platform-adaptive header section */}
      <View style={[styles.headerSection, { paddingTop: insets.top + spacing.md }]}>
        <View style={styles.headerTop}>
          <Text style={styles.screenTitle}>My Appointments</Text>
          {Platform.OS === 'android' && (
            <TouchableOpacity
              style={styles.fabMini}
              onPress={handleBookNew}
              activeOpacity={0.8}
              testID="appts-fab"
            >
              <Ionicons name="add" size={20} color={lightColors.white} />
            </TouchableOpacity>
          )}
        </View>

        {/* Filter tabs – segmented control style on iOS, pill tabs on Android */}
        <View style={styles.filterRow}>
          {filterTabs.map((tab) => {
            const isActive = filter === tab.id;
            return (
              <TouchableOpacity
                key={tab.id}
                style={[styles.filterTab, isActive && styles.filterTabActive]}
                onPress={() => setFilter(tab.id)}
                activeOpacity={0.75}
                testID={`filter-tab-${tab.id}`}
              >
                <Text
                  style={[styles.filterTabText, isActive && styles.filterTabTextActive]}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      <FlatList
        data={filteredAppointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <AppointmentCard
            appointment={item}
            onPress={handlePress}
            onCancel={handleCancel}
            testID={`appt-card-${item.id}`}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          { paddingBottom: insets.bottom + spacing.xl },
        ]}
        ListEmptyComponent={EmptyState}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            tintColor={lightColors.primary}
            colors={[lightColors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      />

      {/* iOS: floating book button (HIG: prominent CTA) */}
      {Platform.OS === 'ios' && (
        <View style={[styles.iosFab, { bottom: insets.bottom + spacing.lg }]}>
          <PlatformButton
            title="Book Appointment"
            onPress={handleBookNew}
            variant="primary"
            size="md"
            icon={<Ionicons name="add-circle-outline" size={20} color={lightColors.white} />}
            style={styles.iosFabButton}
            testID="ios-book-fab"
          />
        </View>
      )}

      {/* Android FAB */}
      {Platform.OS === 'android' && (
        <TouchableOpacity
          style={[styles.androidFab, { bottom: insets.bottom + spacing.lg }]}
          onPress={handleBookNew}
          activeOpacity={0.85}
          testID="android-fab"
        >
          <Ionicons name="add" size={28} color={lightColors.white} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: lightColors.background },

  // Header
  headerSection: {
    backgroundColor: lightColors.surface,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: lightColors.border,
    ...Platform.select({
      ios: {},
      android: { elevation: 4 },
      default: {},
    }),
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  screenTitle: {
    ...textStyles.headlineSmall,
    color: lightColors.textPrimary,
    fontWeight: '800',
  },
  fabMini: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: lightColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },

  // Filter tabs
  filterRow: {
    flexDirection: 'row',
    backgroundColor: lightColors.surfaceVariant,
    borderRadius: borderRadius.full,
    padding: 3,
  },
  filterTab: {
    flex: 1,
    paddingVertical: spacing.xs + 2,
    borderRadius: borderRadius.full,
    alignItems: 'center',
  },
  filterTabActive: {
    backgroundColor: lightColors.surface,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 1 },
      },
      android: { elevation: 2 },
      default: {},
    }),
  },
  filterTabText: {
    ...textStyles.bodySmall,
    color: lightColors.textSecondary,
    fontWeight: '500',
  },
  filterTabTextActive: {
    color: lightColors.textPrimary,
    fontWeight: '700',
  },

  // List
  listContent: {
    padding: spacing.lg,
    flexGrow: 1,
  },

  // Empty state
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: spacing.xxxl,
    paddingHorizontal: spacing.xl,
  },
  emptyIcon: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: lightColors.surfaceVariant,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyTitle: {
    ...textStyles.titleLarge,
    color: lightColors.textPrimary,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  emptySubtitle: {
    ...textStyles.bodyMedium,
    color: lightColors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xl,
  },
  emptyButton: { minWidth: 200 },

  // iOS Floating CTA
  iosFab: {
    position: 'absolute',
    left: spacing.lg,
    right: spacing.lg,
  },
  iosFabButton: {
    borderRadius: borderRadius.full,
    ...Platform.select({
      ios: {
        shadowColor: lightColors.primary,
        shadowOpacity: 0.4,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 4 },
      },
    }),
  },

  // Android FAB
  androidFab: {
    position: 'absolute',
    right: spacing.lg,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: lightColors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
  },
});

export default AppointmentsScreen;
