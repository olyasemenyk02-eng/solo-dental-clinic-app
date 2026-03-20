/**
 * Unit tests for the dental clinic app utilities and data layer.
 * These tests do not require a running React Native environment.
 */

import {
  formatPrice,
  formatDuration,
  isValidEmail,
  isValidPhone,
  getGreeting,
  generateConfirmationCode,
} from '../src/utils/platform';

import {
  getAppointments,
  addAppointment,
  cancelAppointment,
  formatAppointmentDate,
  formatShortDate,
} from '../src/data/appointments';

import { services } from '../src/data/services';

// ─── Utility tests ────────────────────────────────────────────────────────────

describe('formatPrice', () => {
  it('formats whole number prices', () => {
    expect(formatPrice(120)).toBe('$120.00');
  });

  it('formats decimal prices', () => {
    expect(formatPrice(99.9)).toBe('$99.90');
  });

  it('formats zero', () => {
    expect(formatPrice(0)).toBe('$0.00');
  });
});

describe('formatDuration', () => {
  it('formats sub-hour durations in minutes', () => {
    expect(formatDuration(30)).toBe('30 min');
    expect(formatDuration(45)).toBe('45 min');
  });

  it('formats exact hour durations', () => {
    expect(formatDuration(60)).toBe('1h');
    expect(formatDuration(120)).toBe('2h');
  });

  it('formats mixed hour/minute durations', () => {
    expect(formatDuration(90)).toBe('1h 30min');
    expect(formatDuration(75)).toBe('1h 15min');
  });
});

describe('isValidEmail', () => {
  it('accepts valid email addresses', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
    expect(isValidEmail('hello+tag@domain.co.uk')).toBe(true);
  });

  it('rejects invalid email addresses', () => {
    expect(isValidEmail('notanemail')).toBe(false);
    expect(isValidEmail('@nodomain')).toBe(false);
    expect(isValidEmail('missing@')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});

describe('isValidPhone', () => {
  it('accepts common phone formats', () => {
    expect(isValidPhone('+15551234567')).toBe(true);
    expect(isValidPhone('555-123-4567')).toBe(true);
    expect(isValidPhone('(555) 123-4567')).toBe(true);
    expect(isValidPhone('5551234567')).toBe(true);
  });

  it('rejects too-short phone numbers', () => {
    expect(isValidPhone('123')).toBe(false);
    expect(isValidPhone('')).toBe(false);
  });
});

describe('getGreeting', () => {
  it('returns a non-empty string', () => {
    const greeting = getGreeting();
    expect(typeof greeting).toBe('string');
    expect(greeting.length).toBeGreaterThan(0);
  });

  it('returns one of the expected greetings', () => {
    const expected = ['Good morning', 'Good afternoon', 'Good evening'];
    expect(expected).toContain(getGreeting());
  });
});

describe('generateConfirmationCode', () => {
  it('returns an 8-character string', () => {
    expect(generateConfirmationCode()).toHaveLength(8);
  });

  it('generates unique codes', () => {
    const codes = Array.from({ length: 10 }, generateConfirmationCode);
    const unique = new Set(codes);
    // With 32^8 possibilities, duplicates in 10 are astronomically unlikely
    expect(unique.size).toBeGreaterThan(1);
  });
});

// ─── Data layer tests ─────────────────────────────────────────────────────────

describe('services data', () => {
  it('contains at least 6 services', () => {
    expect(services.length).toBeGreaterThanOrEqual(6);
  });

  it('every service has required fields', () => {
    services.forEach((svc) => {
      expect(svc.id).toBeTruthy();
      expect(svc.name).toBeTruthy();
      expect(svc.description).toBeTruthy();
      expect(svc.price).toBeGreaterThan(0);
      expect(svc.duration).toBeGreaterThan(0);
      expect(svc.icon).toBeTruthy();
      expect(['general', 'cosmetic', 'orthodontic', 'surgical']).toContain(svc.category);
    });
  });
});

describe('appointments data layer', () => {
  it('returns an array of appointments', () => {
    const appts = getAppointments();
    expect(Array.isArray(appts)).toBe(true);
    expect(appts.length).toBeGreaterThan(0);
  });

  it('adds a new appointment', () => {
    const before = getAppointments().length;
    const newAppt = addAppointment({
      service: services[0],
      date: '2025-12-01',
      time: '10:00',
      patientName: 'Test User',
      patientPhone: '+15550001234',
      patientEmail: 'test@example.com',
      status: 'upcoming',
    });
    expect(newAppt.id).toBeTruthy();
    expect(newAppt.confirmationCode).toBeTruthy();
    expect(getAppointments().length).toBe(before + 1);
  });

  it('cancels an existing appointment', () => {
    const appts = getAppointments();
    const upcoming = appts.find((a) => a.status === 'upcoming');
    expect(upcoming).toBeDefined();
    if (upcoming) {
      const result = cancelAppointment(upcoming.id);
      expect(result).toBe(true);
      const updated = getAppointments().find((a) => a.id === upcoming.id);
      expect(updated?.status).toBe('cancelled');
    }
  });

  it('returns false when cancelling a non-existent appointment', () => {
    expect(cancelAppointment('does-not-exist')).toBe(false);
  });
});

describe('date formatting', () => {
  it('formatAppointmentDate returns a human-readable string', () => {
    const result = formatAppointmentDate('2024-06-15');
    expect(result).toContain('2024');
    expect(result.length).toBeGreaterThan(10);
  });

  it('formatShortDate returns a short date string', () => {
    const result = formatShortDate('2024-06-15');
    expect(result).toContain('2024');
    expect(result.length).toBeGreaterThan(0);
  });
});
