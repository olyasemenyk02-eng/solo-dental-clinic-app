export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number;
  icon: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  photo: string;
  bio: string;
  availableDays: number[]; // 0=Sunday, 1=Monday, etc.
}

export interface TimeSlot {
  time: string; // "09:00"
  available: boolean;
}

export interface Appointment {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  serviceId: string;
  doctorId: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled";
  createdAt: string;
}

export interface BookingState {
  step: number;
  serviceId: string | null;
  doctorId: string | null;
  date: string | null;
  time: string | null;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
}
