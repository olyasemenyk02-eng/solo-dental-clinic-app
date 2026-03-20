"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense, useId } from "react";
import { getServiceById, getDoctorById, formatDate, formatTime } from "@/lib/data";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const reactId = useId();
  const confirmationId = `BS-${reactId.replace(/:/g, "").toUpperCase()}`;

  const serviceId = searchParams.get("service");
  const doctorId = searchParams.get("doctor");
  const date = searchParams.get("date");
  const time = searchParams.get("time");
  const name = searchParams.get("name");
  const email = searchParams.get("email");
  const phone = searchParams.get("phone");

  const service = serviceId ? getServiceById(serviceId) : null;
  const doctor = doctorId ? getDoctorById(doctorId) : null;

  if (!service || !doctor || !date || !time || !name) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center">
        <div className="text-center px-4">
          <p className="text-gray-500 mb-4">No booking information found.</p>
          <Link
            href="/book"
            className="text-teal-600 font-medium hover:text-teal-700"
          >
            Book an appointment →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-lg mx-auto px-4 py-10">
        {/* Success Icon */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-10 h-10 text-teal-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">
            Booking Confirmed!
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            Your appointment has been successfully scheduled.
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Confirmation #{confirmationId}
          </p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="bg-teal-600 px-6 py-4">
            <h2 className="text-white font-semibold">Appointment Details</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Service
                </p>
                <p className="font-medium text-gray-900 mt-0.5">
                  {service.icon} {service.name}
                </p>
              </div>
              <span className="text-teal-700 font-bold">${service.price}</span>
            </div>
            <hr className="border-gray-100" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Doctor
              </p>
              <p className="font-medium text-gray-900 mt-0.5">{doctor.name}</p>
              <p className="text-xs text-gray-500">{doctor.specialty}</p>
            </div>
            <hr className="border-gray-100" />
            <div className="flex gap-8">
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Date
                </p>
                <p className="font-medium text-gray-900 mt-0.5">
                  {formatDate(date)}
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wide">
                  Time
                </p>
                <p className="font-medium text-gray-900 mt-0.5">
                  {formatTime(time)}
                </p>
              </div>
            </div>
            <hr className="border-gray-100" />
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wide">
                Patient
              </p>
              <p className="font-medium text-gray-900 mt-0.5">{name}</p>
              <p className="text-xs text-gray-500">{email}</p>
              <p className="text-xs text-gray-500">{phone}</p>
            </div>
          </div>
        </div>

        {/* Info note */}
        <div className="mt-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
          <p className="text-sm text-blue-800">
            <strong>📧 Confirmation sent!</strong> A confirmation email has been
            sent to {email}. Please arrive 10 minutes early for your
            appointment.
          </p>
        </div>

        {/* Actions */}
        <div className="mt-8 flex flex-col gap-3">
          <Link
            href="/book"
            className="w-full py-3 rounded-xl bg-teal-600 text-white font-semibold text-sm text-center hover:bg-teal-700 transition-colors shadow-lg shadow-teal-200"
          >
            Book Another Appointment
          </Link>
          <Link
            href="/"
            className="w-full py-3 rounded-xl border-2 border-gray-200 text-gray-700 font-semibold text-sm text-center hover:border-gray-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-4rem)] bg-gray-50 flex items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
