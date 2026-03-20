"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { services, doctors, getServiceById, getDoctorById, formatDate, formatTime } from "@/lib/data";
import BookingSteps from "@/components/BookingSteps";
import ServiceCard from "@/components/ServiceCard";
import DoctorCard from "@/components/DoctorCard";
import TimeSlotPicker from "@/components/TimeSlotPicker";

const STEP_LABELS = ["Select Service", "Choose Doctor", "Pick Date & Time", "Your Details"];

export default function BookPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [doctorId, setDoctorId] = useState<string | null>(null);
  const [date, setDate] = useState<string>("");
  const [time, setTime] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const selectedDoctor = doctorId ? getDoctorById(doctorId) : null;

  function canProceed(): boolean {
    switch (step) {
      case 0:
        return serviceId !== null;
      case 1:
        return doctorId !== null;
      case 2:
        return date !== "" && time !== null;
      case 3:
        return name.trim() !== "" && email.trim() !== "" && phone.trim() !== "";
      default:
        return false;
    }
  }

  function validateStep3(): boolean {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!phone.trim()) {
      newErrors.phone = "Phone number is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (step === 3) {
      if (!validateStep3()) return;
      // Build query params for confirmation
      const params = new URLSearchParams({
        service: serviceId!,
        doctor: doctorId!,
        date: date,
        time: time!,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
      });
      router.push(`/confirmation?${params.toString()}`);
    } else {
      setStep(step + 1);
    }
  }

  function handleBack() {
    if (step > 0) setStep(step - 1);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-6 sm:py-10">
        {/* Steps indicator */}
        <BookingSteps
          currentStep={step}
          totalSteps={4}
          stepLabels={STEP_LABELS}
        />

        <div className="mt-6">
          {/* Step 0: Select Service */}
          {step === 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                What do you need?
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Choose the service you&apos;d like to book.
              </p>
              <div className="space-y-3">
                {services.map((service) => (
                  <ServiceCard
                    key={service.id}
                    service={service}
                    selected={serviceId === service.id}
                    onSelect={setServiceId}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 1: Choose Doctor */}
          {step === 1 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Choose your doctor
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Select a dentist for your appointment.
              </p>
              <div className="space-y-3">
                {doctors.map((doctor) => (
                  <DoctorCard
                    key={doctor.id}
                    doctor={doctor}
                    selected={doctorId === doctor.id}
                    onSelect={setDoctorId}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: Pick Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                When works for you?
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Pick a date and time that fits your schedule.
              </p>
              <TimeSlotPicker
                date={date}
                selectedTime={time}
                onDateChange={(d) => {
                  setDate(d);
                  setTime(null);
                }}
                onTimeSelect={setTime}
                availableDays={selectedDoctor?.availableDays ?? [1, 2, 3, 4, 5]}
              />
            </div>
          )}

          {/* Step 3: Patient Details */}
          {step === 3 && (
            <div>
              <h2 className="text-xl font-bold text-gray-900 mb-1">
                Almost there!
              </h2>
              <p className="text-sm text-gray-500 mb-4">
                Enter your details to confirm the booking.
              </p>

              {/* Summary */}
              <div className="bg-teal-50 rounded-xl p-4 mb-6 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Service</span>
                  <span className="font-medium text-gray-900">
                    {getServiceById(serviceId!)?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Doctor</span>
                  <span className="font-medium text-gray-900">
                    {getDoctorById(doctorId!)?.name}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium text-gray-900">
                    {formatDate(date)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Time</span>
                  <span className="font-medium text-gray-900">
                    {formatTime(time!)}
                  </span>
                </div>
              </div>

              {/* Form */}
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    placeholder="John Doe"
                    className={`w-full px-4 py-2.5 rounded-lg border-2 text-sm transition-colors ${
                      errors.name
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-teal-500"
                    } outline-none`}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="john@example.com"
                    className={`w-full px-4 py-2.5 rounded-lg border-2 text-sm transition-colors ${
                      errors.email
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-teal-500"
                    } outline-none`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors({ ...errors, phone: "" });
                    }}
                    placeholder="(555) 123-4567"
                    className={`w-full px-4 py-2.5 rounded-lg border-2 text-sm transition-colors ${
                      errors.phone
                        ? "border-red-300 focus:border-red-500"
                        : "border-gray-200 focus:border-teal-500"
                    } outline-none`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation buttons */}
        <div className="mt-8 flex gap-3">
          {step > 0 && (
            <button
              onClick={handleBack}
              className="flex-1 py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm hover:border-gray-300 transition-colors"
            >
              ← Back
            </button>
          )}
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className={`flex-1 py-3 rounded-xl font-semibold text-sm transition-colors ${
              canProceed()
                ? "bg-teal-600 text-white hover:bg-teal-700 shadow-lg shadow-teal-200"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            {step === 3 ? "Confirm Booking ✓" : "Continue →"}
          </button>
        </div>
      </div>
    </div>
  );
}
