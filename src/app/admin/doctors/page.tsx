import Link from "next/link";
import { doctors } from "@/lib/data";

export default function DoctorsPage() {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

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
              <span className="text-sm text-gray-600">Doctors</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Doctors</h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-xl border border-gray-100 p-6"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-lg">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{doctor.name}</h3>
                  <p className="text-sm text-teal-600 font-medium">
                    {doctor.specialty}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mb-4">{doctor.bio}</p>
              <div>
                <p className="text-xs font-medium text-gray-700 mb-2">
                  Available Days
                </p>
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3, 4, 5, 6].map((day) => (
                    <span
                      key={day}
                      className={`text-xs px-2 py-1 rounded ${
                        doctor.availableDays.includes(day)
                          ? "bg-teal-100 text-teal-700 font-medium"
                          : "bg-gray-50 text-gray-300"
                      }`}
                    >
                      {dayNames[day]}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
