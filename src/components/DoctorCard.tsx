import { Doctor } from "@/lib/types";

interface DoctorCardProps {
  doctor: Doctor;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function DoctorCard({
  doctor,
  selected,
  onSelect,
}: DoctorCardProps) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const availableDayNames = doctor.availableDays.map((d) => dayNames[d]);

  return (
    <button
      onClick={() => onSelect(doctor.id)}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        selected
          ? "border-teal-500 bg-teal-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-teal-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold text-lg shrink-0">
          {doctor.name
            .split(" ")
            .map((n) => n[0])
            .join("")
            .slice(0, 2)}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm">
            {doctor.name}
          </h3>
          <p className="text-xs text-teal-600 font-medium">
            {doctor.specialty}
          </p>
          <p className="text-xs text-gray-500 mt-1">{doctor.bio}</p>
          <div className="flex gap-1 mt-2 flex-wrap">
            {availableDayNames.map((day) => (
              <span
                key={day}
                className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded"
              >
                {day}
              </span>
            ))}
          </div>
        </div>
      </div>
      {selected && (
        <div className="mt-2 flex justify-end">
          <span className="text-teal-600 text-xs font-medium flex items-center gap-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            Selected
          </span>
        </div>
      )}
    </button>
  );
}
