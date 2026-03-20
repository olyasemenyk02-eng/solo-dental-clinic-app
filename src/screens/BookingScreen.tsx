import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  ActionSheetIOS,
  Alert,
  KeyboardAvoidingView,
  TouchableOpacity,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { lightColors, spacing, borderRadius, textStyles } from '../theme';
import {
  PlatformHeader,
  PlatformButton,
  PlatformTextInput,
  PlatformCard,
  ServiceCard,
  TimeSlotPicker,
} from '../components';
import { services, DentalService } from '../data/services';
import { timeSlots, addAppointment } from '../data/appointments';
import { isValidEmail, isValidPhone } from '../utils/platform';
import { RootStackParamList } from '../navigation/types';

type BookingNavProp = NativeStackNavigationProp<RootStackParamList, 'Booking'>;
type BookingRouteProp = RouteProp<RootStackParamList, 'Booking'>;

type Step = 'service' | 'datetime' | 'details' | 'review';

const STEPS: { id: Step; label: string; icon: string }[] = [
  { id: 'service', label: 'Service', icon: 'medical' },
  { id: 'datetime', label: 'Date & Time', icon: 'calendar' },
  { id: 'details', label: 'Details', icon: 'person' },
  { id: 'review', label: 'Review', icon: 'checkmark-circle' },
];

const BookingScreen: React.FC = () => {
  const navigation = useNavigation<BookingNavProp>();
  const route = useRoute<BookingRouteProp>();
  const insets = useSafeAreaInsets();

  const [currentStep, setCurrentStep] = useState<Step>(
    route.params?.service ? 'datetime' : 'service',
  );
  const [selectedService, setSelectedService] = useState<DentalService | null>(
    route.params?.service ?? null,
  );
  const [selectedDate, setSelectedDate] = useState<Date>(
    (() => {
      const d = new Date();
      d.setDate(d.getDate() + 1);
      return d;
    })(),
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Patient details
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [notes, setNotes] = useState('');

  // Validation errors
  const [nameError, setNameError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [emailError, setEmailError] = useState('');

  const [submitting, setSubmitting] = useState(false);

  const currentStepIndex = STEPS.findIndex(s => s.id === currentStep);

  // ─── Validation helpers ──────────────────────────────────────
  const validateDetails = (): boolean => {
    let valid = true;
    if (!name.trim()) { setNameError('Full name is required'); valid = false; } else setNameError('');
    if (!phone.trim()) { setPhoneError('Phone number is required'); valid = false; }
    else if (!isValidPhone(phone)) { setPhoneError('Enter a valid phone number'); valid = false; }
    else setPhoneError('');
    if (email && !isValidEmail(email)) { setEmailError('Enter a valid email address'); valid = false; }
    else setEmailError('');
    return valid;
  };

  // ─── Step navigation ─────────────────────────────────────────
  const handleNext = useCallback(() => {
    if (currentStep === 'service') {
      if (!selectedService) {
        Alert.alert('Select a Service', 'Please choose a dental service to continue.');
        return;
      }
      setCurrentStep('datetime');
    } else if (currentStep === 'datetime') {
      if (!selectedTime) {
        Alert.alert('Select a Time', 'Please choose an available time slot.');
        return;
      }
      setCurrentStep('details');
    } else if (currentStep === 'details') {
      if (!validateDetails()) return;
      setCurrentStep('review');
    } else if (currentStep === 'review') {
      handleConfirmBooking();
    }
  }, [currentStep, selectedService, selectedTime, name, phone, email]);

  const handleBack = useCallback(() => {
    if (currentStep === 'service') {
      navigation.goBack();
    } else {
      const prevIdx = currentStepIndex - 1;
      setCurrentStep(STEPS[prevIdx].id);
    }
  }, [currentStep, currentStepIndex, navigation]);

  // ─── Date picker handling ─────────────────────────────────────
  const handleDateChange = (_event: any, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }
    if (date) {
      setSelectedDate(date);
      setSelectedTime(null); // reset time when date changes
    }
  };

  // ─── Submit booking ───────────────────────────────────────────
  const handleConfirmBooking = useCallback(() => {
    if (!selectedService || !selectedTime) return;
    setSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      const newAppt = addAppointment({
        service: selectedService,
        date: selectedDate.toISOString().split('T')[0],
        time: selectedTime,
        patientName: name,
        patientPhone: phone,
        patientEmail: email,
        notes: notes || undefined,
        status: 'upcoming',
      });
      setSubmitting(false);
      navigation.replace('Confirmation', { appointment: newAppt });
    }, 800);
  }, [selectedService, selectedDate, selectedTime, name, phone, email, notes, navigation]);

  // ─── Android cancel booking (Material bottom sheet simulation) ─
  const handleCancelAndroid = () => {
    Alert.alert(
      'Cancel Booking',
      'Are you sure you want to cancel this booking?',
      [
        { text: 'Stay', style: 'cancel' },
        { text: 'Cancel Booking', style: 'destructive', onPress: () => navigation.goBack() },
      ],
    );
  };

  const handleCancelIOS = () => {
    ActionSheetIOS.showActionSheetWithOptions(
      {
        title: 'Cancel Booking',
        message: 'Are you sure you want to cancel?',
        options: ['Cancel Booking', 'Keep Editing'],
        destructiveButtonIndex: 0,
        cancelButtonIndex: 1,
      },
      (buttonIndex) => {
        if (buttonIndex === 0) navigation.goBack();
      },
    );
  };

  const handleCancel = Platform.OS === 'ios' ? handleCancelIOS : handleCancelAndroid;

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' });

  const isLastStep = currentStep === 'review';

  // ─── Step Indicators ─────────────────────────────────────────
  const StepIndicator = () => (
    <View style={styles.stepRow}>
      {STEPS.map((step, idx) => {
        const isDone = idx < currentStepIndex;
        const isActive = idx === currentStepIndex;
        return (
          <React.Fragment key={step.id}>
            <View style={styles.stepItem}>
              <View
                style={[
                  styles.stepCircle,
                  isActive && styles.stepCircleActive,
                  isDone && styles.stepCircleDone,
                ]}
              >
                {isDone ? (
                  <Ionicons name="checkmark" size={14} color={lightColors.white} />
                ) : (
                  <Text style={[styles.stepNum, (isActive || isDone) && styles.stepNumActive]}>
                    {idx + 1}
                  </Text>
                )}
              </View>
              <Text
                style={[styles.stepLabel, isActive && styles.stepLabelActive]}
                numberOfLines={1}
              >
                {step.label}
              </Text>
            </View>
            {idx < STEPS.length - 1 && (
              <View style={[styles.stepLine, isDone && styles.stepLineDone]} />
            )}
          </React.Fragment>
        );
      })}
    </View>
  );

  return (
    <View style={styles.container}>
      <PlatformHeader
        title="Book Appointment"
        showBackButton
        onBack={handleBack}
        rightComponent={
          <TouchableOpacity onPress={handleCancel} activeOpacity={0.7}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        }
      />

      <StepIndicator />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.flex}
      >
        <ScrollView
          contentContainerStyle={[styles.scrollContent, { paddingBottom: insets.bottom + 100 }]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {/* ── Step: Service ──────────────────────────────────── */}
          {currentStep === 'service' && (
            <View>
              <Text style={styles.stepHeading}>Choose a Service</Text>
              <Text style={styles.stepSubheading}>
                Select the dental service you'd like to book
              </Text>
              {services.map((svc) => (
                <ServiceCard
                  key={svc.id}
                  service={svc}
                  onPress={setSelectedService}
                  selected={selectedService?.id === svc.id}
                  testID={`booking-service-${svc.id}`}
                />
              ))}
            </View>
          )}

          {/* ── Step: Date & Time ──────────────────────────────── */}
          {currentStep === 'datetime' && (
            <View>
              <Text style={styles.stepHeading}>Pick a Date & Time</Text>
              <Text style={styles.stepSubheading}>
                Choose when you'd like to come in for your{' '}
                <Text style={styles.boldText}>{selectedService?.name}</Text>
              </Text>

              {/* Date Picker */}
              <PlatformCard style={styles.dateCard}>
                <Text style={styles.fieldLabel}>Appointment Date</Text>
                {Platform.OS === 'ios' ? (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="inline"
                    minimumDate={new Date()}
                    onChange={handleDateChange}
                    accentColor={lightColors.primary}
                    style={styles.iosDatePicker}
                  />
                ) : (
                  <>
                    <TouchableOpacity
                      style={styles.androidDateRow}
                      onPress={() => setShowDatePicker(true)}
                      activeOpacity={0.75}
                    >
                      <Ionicons name="calendar-outline" size={20} color={lightColors.primary} />
                      <Text style={styles.androidDateText}>{formatDate(selectedDate)}</Text>
                      <Ionicons name="chevron-down" size={18} color={lightColors.icon} />
                    </TouchableOpacity>
                    {showDatePicker && (
                      <DateTimePicker
                        value={selectedDate}
                        mode="date"
                        display="default"
                        minimumDate={new Date()}
                        onChange={handleDateChange}
                      />
                    )}
                  </>
                )}
              </PlatformCard>

              {/* Time Slots */}
              <PlatformCard style={styles.timeCard}>
                <Text style={styles.fieldLabel}>Available Times</Text>
                <Text style={styles.fieldSub}>{formatDate(selectedDate)}</Text>
                <TimeSlotPicker
                  slots={timeSlots}
                  selectedTime={selectedTime}
                  onSelect={setSelectedTime}
                />
              </PlatformCard>
            </View>
          )}

          {/* ── Step: Patient Details ─────────────────────────── */}
          {currentStep === 'details' && (
            <View>
              <Text style={styles.stepHeading}>Your Details</Text>
              <Text style={styles.stepSubheading}>
                We'll use this information to confirm your appointment
              </Text>

              <PlatformCard style={styles.formCard}>
                <PlatformTextInput
                  label="Full Name"
                  value={name}
                  onChangeText={setName}
                  placeholder="e.g. Sarah Johnson"
                  autoCapitalize="words"
                  autoComplete="name"
                  textContentType="name"
                  leftIcon={<Ionicons name="person-outline" size={20} color={lightColors.icon} />}
                  errorMessage={nameError}
                  required
                  testID="booking-name-input"
                />
                <PlatformTextInput
                  label="Phone Number"
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="+1 (555) 000-0000"
                  keyboardType="phone-pad"
                  autoComplete="tel"
                  textContentType="telephoneNumber"
                  leftIcon={<Ionicons name="call-outline" size={20} color={lightColors.icon} />}
                  errorMessage={phoneError}
                  required
                  testID="booking-phone-input"
                />
                <PlatformTextInput
                  label="Email Address"
                  value={email}
                  onChangeText={setEmail}
                  placeholder="you@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  leftIcon={<Ionicons name="mail-outline" size={20} color={lightColors.icon} />}
                  errorMessage={emailError}
                  helperText="Optional – for appointment reminders"
                  testID="booking-email-input"
                />
                <PlatformTextInput
                  label="Additional Notes"
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Any allergies, special requests, or concerns..."
                  multiline
                  numberOfLines={3}
                  leftIcon={<Ionicons name="document-text-outline" size={20} color={lightColors.icon} />}
                  containerStyle={{ marginBottom: 0 }}
                  testID="booking-notes-input"
                />
              </PlatformCard>
            </View>
          )}

          {/* ── Step: Review ──────────────────────────────────── */}
          {currentStep === 'review' && selectedService && (
            <View>
              <Text style={styles.stepHeading}>Review & Confirm</Text>
              <Text style={styles.stepSubheading}>
                Please review your appointment details before confirming
              </Text>

              {/* Summary Card */}
              <PlatformCard style={styles.summaryCard}>
                {/* Service */}
                <View style={styles.summarySection}>
                  <Text style={styles.summaryLabel}>Service</Text>
                  <View style={styles.summaryServiceRow}>
                    <View style={[styles.summaryIcon, { backgroundColor: selectedService.color + '20' }]}>
                      <Ionicons name={selectedService.icon as any} size={22} color={selectedService.color} />
                    </View>
                    <View>
                      <Text style={styles.summaryValue}>{selectedService.name}</Text>
                      <Text style={styles.summarySubValue}>
                        {selectedService.duration} min · ${selectedService.price}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.summarySeparator} />

                {/* Date & Time */}
                <View style={styles.summaryRow}>
                  <View style={styles.summaryItem}>
                    <Ionicons name="calendar-outline" size={16} color={lightColors.textSecondary} />
                    <View>
                      <Text style={styles.summaryLabel}>Date</Text>
                      <Text style={styles.summaryValue}>{formatDate(selectedDate)}</Text>
                    </View>
                  </View>
                </View>
                <View style={styles.summaryRow}>
                  <View style={styles.summaryItem}>
                    <Ionicons name="time-outline" size={16} color={lightColors.textSecondary} />
                    <View>
                      <Text style={styles.summaryLabel}>Time</Text>
                      <Text style={styles.summaryValue}>{selectedTime}</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.summarySeparator} />

                {/* Patient Info */}
                <View style={styles.summaryRow}>
                  <View style={styles.summaryItem}>
                    <Ionicons name="person-outline" size={16} color={lightColors.textSecondary} />
                    <View>
                      <Text style={styles.summaryLabel}>Patient</Text>
                      <Text style={styles.summaryValue}>{name}</Text>
                      <Text style={styles.summarySubValue}>{phone}</Text>
                      {email ? <Text style={styles.summarySubValue}>{email}</Text> : null}
                    </View>
                  </View>
                </View>

                {notes ? (
                  <>
                    <View style={styles.summarySeparator} />
                    <View style={styles.summaryRow}>
                      <View style={styles.summaryItem}>
                        <Ionicons name="document-text-outline" size={16} color={lightColors.textSecondary} />
                        <View style={styles.flex}>
                          <Text style={styles.summaryLabel}>Notes</Text>
                          <Text style={styles.summarySubValue}>{notes}</Text>
                        </View>
                      </View>
                    </View>
                  </>
                ) : null}
              </PlatformCard>

              {/* Total */}
              <PlatformCard style={styles.totalCard} variant="filled">
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Estimated Total</Text>
                  <Text style={styles.totalPrice}>${selectedService.price}</Text>
                </View>
                <Text style={styles.totalNote}>
                  Payment is collected at the clinic. Cancellation is free up to 24h before.
                </Text>
              </PlatformCard>
            </View>
          )}
        </ScrollView>

        {/* Bottom action bar */}
        <View style={[styles.bottomBar, { paddingBottom: insets.bottom + spacing.sm }]}>
          <PlatformButton
            title={isLastStep ? 'Confirm Booking' : 'Continue'}
            onPress={handleNext}
            variant="primary"
            size="lg"
            fullWidth
            loading={submitting}
            icon={
              isLastStep ? (
                <Ionicons name="checkmark-circle" size={20} color={lightColors.white} />
              ) : (
                <Ionicons name="arrow-forward" size={20} color={lightColors.white} />
              )
            }
            iconPosition="right"
            testID="booking-continue-btn"
          />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: lightColors.background },
  flex: { flex: 1 },
  scrollContent: { padding: spacing.lg },
  cancelText: {
    ...textStyles.bodyMedium,
    color: lightColors.error,
    fontWeight: '500',
  },

  // Step indicator
  stepRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: lightColors.surface,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: lightColors.border,
  },
  stepItem: { alignItems: 'center', gap: 4 },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: lightColors.surfaceVariant,
    borderWidth: 1.5,
    borderColor: lightColors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: lightColors.primary,
    borderColor: lightColors.primary,
  },
  stepCircleDone: {
    backgroundColor: lightColors.success,
    borderColor: lightColors.success,
  },
  stepNum: { ...textStyles.labelSmall, color: lightColors.textTertiary, fontWeight: '700' },
  stepNumActive: { color: lightColors.white },
  stepLabel: { ...textStyles.labelSmall, color: lightColors.textTertiary, fontSize: 10 },
  stepLabelActive: { color: lightColors.primary, fontWeight: '600' },
  stepLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: lightColors.border,
    marginBottom: spacing.lg,
    marginHorizontal: 2,
  },
  stepLineDone: { backgroundColor: lightColors.success },

  // Step content
  stepHeading: { ...textStyles.headlineSmall, color: lightColors.textPrimary, marginBottom: spacing.xs },
  stepSubheading: { ...textStyles.bodyMedium, color: lightColors.textSecondary, marginBottom: spacing.lg },
  boldText: { fontWeight: '700', color: lightColors.textPrimary },
  fieldLabel: { ...textStyles.titleSmall, color: lightColors.textPrimary, fontWeight: '600', marginBottom: spacing.xs },
  fieldSub: { ...textStyles.caption, color: lightColors.textSecondary, marginBottom: spacing.md },

  // Date / time
  dateCard: { marginBottom: spacing.md, padding: spacing.md },
  iosDatePicker: { marginTop: spacing.xs },
  androidDateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md as number,
    borderWidth: 1.5,
    borderColor: lightColors.border,
    backgroundColor: lightColors.background,
  },
  androidDateText: { flex: 1, ...textStyles.bodyLarge, color: lightColors.textPrimary },
  timeCard: { padding: spacing.md },

  // Form
  formCard: { padding: spacing.md },

  // Review / Summary
  summaryCard: { padding: spacing.md, marginBottom: spacing.md },
  summarySection: { marginBottom: spacing.md },
  summaryServiceRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.md, marginTop: spacing.xs },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: borderRadius.md as number,
    alignItems: 'center',
    justifyContent: 'center',
  },
  summaryLabel: { ...textStyles.caption, color: lightColors.textSecondary, fontWeight: '600',
    textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 },
  summaryValue: { ...textStyles.bodyMedium, color: lightColors.textPrimary, fontWeight: '600' },
  summarySubValue: { ...textStyles.caption, color: lightColors.textSecondary },
  summarySeparator: { height: StyleSheet.hairlineWidth, backgroundColor: lightColors.border, marginVertical: spacing.md },
  summaryRow: { marginBottom: spacing.sm },
  summaryItem: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing.sm },

  // Total
  totalCard: { marginBottom: spacing.lg },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: spacing.xs },
  totalLabel: { ...textStyles.titleMedium, color: lightColors.textPrimary, fontWeight: '600' },
  totalPrice: { ...textStyles.titleLarge, color: lightColors.primary, fontWeight: '800' },
  totalNote: { ...textStyles.caption, color: lightColors.textSecondary },

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

export default BookingScreen;
