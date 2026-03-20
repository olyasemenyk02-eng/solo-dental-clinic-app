import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { TimeSlot } from '../data/appointments';
import { lightColors, spacing, borderRadius, textStyles } from '../theme';

interface TimeSlotPickerProps {
  slots: TimeSlot[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

const TimeSlotPicker: React.FC<TimeSlotPickerProps> = ({ slots, selectedTime, onSelect }) => {
  return (
    <View>
      <View style={styles.grid}>
        {slots.map((slot) => {
          const isSelected = selectedTime === slot.time;
          const isUnavailable = !slot.available;

          return (
            <TouchableOpacity
              key={slot.time}
              style={[
                styles.slot,
                isSelected && styles.slotSelected,
                isUnavailable && styles.slotUnavailable,
              ]}
              onPress={() => {
                if (!isUnavailable) onSelect(slot.time);
              }}
              disabled={isUnavailable}
              activeOpacity={Platform.OS === 'ios' ? 0.7 : 0.8}
            >
              <Text
                style={[
                  styles.slotText,
                  isSelected && styles.slotTextSelected,
                  isUnavailable && styles.slotTextUnavailable,
                ]}
              >
                {slot.time}
              </Text>
              {isUnavailable && <View style={styles.strikethrough} />}
            </TouchableOpacity>
          );
        })}
      </View>
      <View style={styles.legend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: lightColors.primary }]} />
          <Text style={styles.legendText}>Available</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendDot, { backgroundColor: lightColors.border }]} />
          <Text style={styles.legendText}>Booked</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  slot: {
    width: '22%',
    paddingVertical: spacing.sm + 2,
    borderRadius: borderRadius.sm as number,
    borderWidth: 1.5,
    borderColor: lightColors.border,
    backgroundColor: lightColors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  slotSelected: {
    backgroundColor: lightColors.primary,
    borderColor: lightColors.primary,
    ...Platform.select({
      ios: {
        shadowColor: lightColors.primary,
        shadowOpacity: 0.3,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 2 },
      },
      android: { elevation: 4 },
      default: {},
    }),
  },
  slotUnavailable: {
    backgroundColor: lightColors.surfaceVariant,
    borderColor: lightColors.border,
    opacity: 0.5,
  },
  slotText: {
    ...textStyles.bodySmall,
    color: lightColors.textPrimary,
    fontWeight: '500',
  },
  slotTextSelected: {
    color: lightColors.textOnPrimary,
    fontWeight: '700',
  },
  slotTextUnavailable: {
    color: lightColors.textTertiary,
  },
  strikethrough: {
    position: 'absolute',
    height: 1.5,
    left: 4,
    right: 4,
    backgroundColor: lightColors.textTertiary,
    top: '50%',
  },
  legend: {
    flexDirection: 'row',
    gap: spacing.lg,
    marginTop: spacing.md,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    ...textStyles.caption,
    color: lightColors.textSecondary,
  },
});

export default TimeSlotPicker;
