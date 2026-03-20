import { formatTime, generateTimeSlots } from "@/lib/data";

interface TimeSlotPickerProps {
  date: string;
  selectedTime: string | null;
  onDateChange: (date: string) => void;
  onTimeSelect: (time: string) => void;
  availableDays: number[];
}

function getNextAvailableDates(
  availableDays: number[],
  count: number
): string[] {
  const dates: string[] = [];
  const today = new Date();
  today.setDate(today.getDate() + 1); // Start from tomorrow

  while (dates.length < count) {
    if (availableDays.includes(today.getDay())) {
      const year = today.getFullYear();
      const month = (today.getMonth() + 1).toString().padStart(2, "0");
      const day = today.getDate().toString().padStart(2, "0");
      dates.push(`${year}-${month}-${day}`);
    }
    today.setDate(today.getDate() + 1);
  }
  return dates;
}

function formatDateShort(dateStr: string): { day: string; date: string; month: string } {
  const d = new Date(dateStr + "T00:00:00");
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  return {
    day: dayNames[d.getDay()],
    date: d.getDate().toString(),
    month: monthNames[d.getMonth()],
  };
}

export default function TimeSlotPicker({
  date,
  selectedTime,
  onDateChange,
  onTimeSelect,
  availableDays,
}: TimeSlotPickerProps) {
  const availableDates = getNextAvailableDates(availableDays, 14);
  const timeSlots = generateTimeSlots();

  return (
    <div className="space-y-6">
      {/* Date selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Select Date
        </label>
        <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
          {availableDates.map((d) => {
            const formatted = formatDateShort(d);
            const isSelected = d === date;
            return (
              <button
                key={d}
                onClick={() => onDateChange(d)}
                className={`flex flex-col items-center px-3 py-2 rounded-xl border-2 min-w-[4.5rem] transition-all ${
                  isSelected
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-teal-300"
                }`}
              >
                <span className="text-[10px] font-medium uppercase">
                  {formatted.day}
                </span>
                <span className="text-lg font-bold">{formatted.date}</span>
                <span className="text-[10px]">{formatted.month}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {date && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Time
          </label>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.map((time) => (
              <button
                key={time}
                onClick={() => onTimeSelect(time)}
                className={`py-2.5 px-3 rounded-lg text-sm font-medium border-2 transition-all ${
                  selectedTime === time
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-teal-300"
                }`}
              >
                {formatTime(time)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
