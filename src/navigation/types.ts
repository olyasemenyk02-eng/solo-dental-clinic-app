import { DentalService } from '../data/services';
import { Appointment } from '../data/appointments';

export type RootStackParamList = {
  MainTabs: undefined;
  Booking: { service?: DentalService };
  Confirmation: { appointment: Appointment };
  AppointmentDetail: { appointment: Appointment };
};

export type TabParamList = {
  Home: undefined;
  Appointments: undefined;
  Services: undefined;
  Contact: undefined;
};
