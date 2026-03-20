import { Service, Doctor, Appointment } from "./types";

export const services: Service[] = [
  {
    id: "cleaning",
    name: "Dental Cleaning",
    description: "Professional teeth cleaning and polishing",
    duration: 45,
    price: 120,
    icon: "🦷",
  },
  {
    id: "checkup",
    name: "General Checkup",
    description: "Comprehensive dental examination",
    duration: 30,
    price: 80,
    icon: "🔍",
  },
  {
    id: "whitening",
    name: "Teeth Whitening",
    description: "Professional whitening treatment",
    duration: 60,
    price: 250,
    icon: "✨",
  },
  {
    id: "filling",
    name: "Dental Filling",
    description: "Tooth restoration with composite filling",
    duration: 45,
    price: 180,
    icon: "🔧",
  },
  {
    id: "extraction",
    name: "Tooth Extraction",
    description: "Safe and gentle tooth removal",
    duration: 30,
    price: 200,
    icon: "🏥",
  },
  {
    id: "consultation",
    name: "Consultation",
    description: "Initial consultation and treatment plan",
    duration: 20,
    price: 50,
    icon: "💬",
  },
];

export const doctors: Doctor[] = [
  {
    id: "dr-smith",
    name: "Dr. Sarah Smith",
    specialty: "General Dentistry",
    photo: "",
    bio: "15 years of experience in general and cosmetic dentistry.",
    availableDays: [1, 2, 3, 4, 5],
  },
  {
    id: "dr-johnson",
    name: "Dr. Michael Johnson",
    specialty: "Orthodontics",
    photo: "",
    bio: "Specialist in braces and teeth alignment.",
    availableDays: [1, 3, 5],
  },
  {
    id: "dr-williams",
    name: "Dr. Emily Williams",
    specialty: "Cosmetic Dentistry",
    photo: "",
    bio: "Expert in teeth whitening and veneers.",
    availableDays: [2, 4, 5],
  },
];

export const sampleAppointments: Appointment[] = [
  {
    id: "apt-001",
    patientName: "John Doe",
    patientEmail: "john@example.com",
    patientPhone: "(555) 123-4567",
    serviceId: "cleaning",
    doctorId: "dr-smith",
    date: "2026-03-23",
    time: "09:00",
    status: "confirmed",
    createdAt: "2026-03-18T10:30:00Z",
  },
  {
    id: "apt-002",
    patientName: "Jane Smith",
    patientEmail: "jane@example.com",
    patientPhone: "(555) 987-6543",
    serviceId: "whitening",
    doctorId: "dr-williams",
    date: "2026-03-24",
    time: "14:00",
    status: "confirmed",
    createdAt: "2026-03-19T08:15:00Z",
  },
  {
    id: "apt-003",
    patientName: "Robert Brown",
    patientEmail: "robert@example.com",
    patientPhone: "(555) 456-7890",
    serviceId: "checkup",
    doctorId: "dr-johnson",
    date: "2026-03-25",
    time: "11:00",
    status: "pending",
    createdAt: "2026-03-20T14:00:00Z",
  },
];

export function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let hour = 9; hour < 17; hour++) {
    slots.push(`${hour.toString().padStart(2, "0")}:00`);
    if (hour < 16) {
      slots.push(`${hour.toString().padStart(2, "0")}:30`);
    }
  }
  return slots;
}

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getDoctorById(id: string): Doctor | undefined {
  return doctors.find((d) => d.id === id);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(time: string): string {
  const [hourStr, minute] = time.split(":");
  const hour = parseInt(hourStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minute} ${ampm}`;
}
