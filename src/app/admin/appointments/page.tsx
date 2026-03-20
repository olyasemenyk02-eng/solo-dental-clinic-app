import Link from "next/link";
import {
  sampleAppointments,
  getServiceById,
  getDoctorById,
  formatDate,
  formatTime,
} from "@/lib/data";

export default function AppointmentsPage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Link
                href="/admin"
                className="text-sm text-gray-400 hover:text-teal-600 transition-colors"
              >
                Staff Portal
              </Link>
              <span className="text-gray-300">/</span>
              <span className="text-sm text-gray-600">Appointments</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Appointments</h1>
          </div>
        </div>

        {/* Appointments table / list */}
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
          {/* Desktop table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Patient
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Service
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Doctor
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Date & Time
                  </th>
                  <th className="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sampleAppointments.map((apt) => {
                  const service = getServiceById(apt.serviceId);
                  const doctor = getDoctorById(apt.doctorId);
                  return (
                    <tr key={apt.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-gray-900">
                          {apt.patientName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {apt.patientEmail}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">
                          {service?.name ?? apt.serviceId}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">
                          {doctor?.name ?? apt.doctorId}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">
                          {formatDate(apt.date)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {formatTime(apt.time)}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            apt.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : apt.status === "pending"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-red-100 text-red-700"
                          }`}
                        >
                          {apt.status.charAt(0).toUpperCase() +
                            apt.status.slice(1)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="sm:hidden divide-y divide-gray-100">
            {sampleAppointments.map((apt) => {
              const service = getServiceById(apt.serviceId);
              const doctor = getDoctorById(apt.doctorId);
              return (
                <div key={apt.id} className="p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-gray-900 text-sm">
                      {apt.patientName}
                    </p>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        apt.status === "confirmed"
                          ? "bg-green-100 text-green-700"
                          : apt.status === "pending"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {apt.status.charAt(0).toUpperCase() +
                        apt.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    {service?.name} with {doctor?.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(apt.date)} at {formatTime(apt.time)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
