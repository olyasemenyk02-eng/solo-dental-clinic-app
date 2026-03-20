import Link from "next/link";
import { sampleAppointments, doctors } from "@/lib/data";

export default function AdminPage() {
  const todayAppointments = sampleAppointments.filter(
    (a) => a.status === "confirmed"
  ).length;
  const pendingAppointments = sampleAppointments.filter(
    (a) => a.status === "pending"
  ).length;

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Staff Portal</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage appointments, doctors, and schedules.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            {
              label: "Total Appointments",
              value: sampleAppointments.length,
              color: "bg-teal-50 text-teal-700",
            },
            {
              label: "Confirmed",
              value: todayAppointments,
              color: "bg-green-50 text-green-700",
            },
            {
              label: "Pending",
              value: pendingAppointments,
              color: "bg-amber-50 text-amber-700",
            },
            {
              label: "Doctors",
              value: doctors.length,
              color: "bg-blue-50 text-blue-700",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className={`${stat.color} rounded-xl p-4 text-center`}
            >
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs font-medium mt-1">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/admin/appointments"
            className="bg-white rounded-xl border border-gray-100 p-6 hover:border-teal-200 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center text-xl">
                📋
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                  Appointments
                </h3>
                <p className="text-sm text-gray-500">
                  View and manage all bookings
                </p>
              </div>
            </div>
          </Link>
          <Link
            href="/admin/doctors"
            className="bg-white rounded-xl border border-gray-100 p-6 hover:border-teal-200 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-xl">
                👨‍⚕️
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-teal-600 transition-colors">
                  Doctors
                </h3>
                <p className="text-sm text-gray-500">
                  Manage doctors and schedules
                </p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
