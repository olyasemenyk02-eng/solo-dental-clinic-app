import { DentalService } from './services';

export type AppointmentStatus = 'upcoming' | 'completed' | 'cancelled';

export interface Appointment {
  id: string;
  service: DentalService;
  date: string; // ISO date string
  time: string; // "HH:MM"
  patientName: string;
  patientPhone: string;
  patientEmail: string;
  notes?: string;
  status: AppointmentStatus;
  confirmationCode: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export const timeSlots: TimeSlot[] = [
  { time: '09:00', available: true },
  { time: '09:30', available: false },
  { time: '10:00', available: true },
  { time: '10:30', available: true },
  { time: '11:00', available: false },
  { time: '11:30', available: true },
  { time: '12:00', available: true },
  { time: '13:30', available: true },
  { time: '14:00', available: true },
  { time: '14:30', available: false },
  { time: '15:00', available: true },
  { time: '15:30', available: true },
  { time: '16:00', available: false },
  { time: '16:30', available: true },
  { time: '17:00', available: true },
];

// Mock in-memory store for appointments
let mockAppointments: Appointment[] = [
  {
    id: 'appt-001',
    service: {
      id: 'cleaning',
      name: 'Teeth Cleaning',
      description: 'Professional dental cleaning',
      duration: 60,
      price: 120,
      icon: 'sparkles',
      category: 'general',
      color: '#3182CE',
    },
    date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '10:00',
    patientName: 'Alex Johnson',
    patientPhone: '+1 (555) 234-5678',
    patientEmail: 'alex@example.com',
    status: 'upcoming',
    confirmationCode: 'SC-2024-001',
  },
  {
    id: 'appt-002',
    service: {
      id: 'whitening',
      name: 'Teeth Whitening',
      description: 'Professional in-office whitening',
      duration: 90,
      price: 350,
      icon: 'sunny',
      category: 'cosmetic',
      color: '#F6AD55',
    },
    date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '14:30',
    patientName: 'Alex Johnson',
    patientPhone: '+1 (555) 234-5678',
    patientEmail: 'alex@example.com',
    status: 'upcoming',
    confirmationCode: 'SC-2024-002',
  },
  {
    id: 'appt-003',
    service: {
      id: 'checkup',
      name: 'Dental Check-Up',
      description: 'Comprehensive oral examination',
      duration: 45,
      price: 90,
      icon: 'search',
      category: 'general',
      color: '#38B2AC',
    },
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    time: '09:30',
    patientName: 'Alex Johnson',
    patientPhone: '+1 (555) 234-5678',
    patientEmail: 'alex@example.com',
    status: 'completed',
    confirmationCode: 'SC-2024-000',
  },
];

export const getAppointments = (): Appointment[] => [...mockAppointments];

export const addAppointment = (appointment: Omit<Appointment, 'id' | 'confirmationCode'>): Appointment => {
  const id = `appt-${Date.now()}`;
  const confirmationCode = `SC-${new Date().getFullYear()}-${String(mockAppointments.length + 1).padStart(3, '0')}`;
  const newAppt: Appointment = { ...appointment, id, confirmationCode };
  mockAppointments = [newAppt, ...mockAppointments];
  return newAppt;
};

export const cancelAppointment = (id: string): boolean => {
  const idx = mockAppointments.findIndex(a => a.id === id);
  if (idx === -1) return false;
  mockAppointments[idx] = { ...mockAppointments[idx], status: 'cancelled' };
  return true;
};

export const formatAppointmentDate = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatShortDate = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};
