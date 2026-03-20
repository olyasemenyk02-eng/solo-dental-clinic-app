import { Service } from "@/lib/types";

interface ServiceCardProps {
  service: Service;
  selected: boolean;
  onSelect: (id: string) => void;
}

export default function ServiceCard({
  service,
  selected,
  onSelect,
}: ServiceCardProps) {
  return (
    <button
      onClick={() => onSelect(service.id)}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        selected
          ? "border-teal-500 bg-teal-50 shadow-sm"
          : "border-gray-200 bg-white hover:border-teal-300 hover:shadow-sm"
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl" role="img" aria-label={service.name}>
          {service.icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h3 className="font-semibold text-gray-900 text-sm">
              {service.name}
            </h3>
            <span className="text-teal-700 font-bold text-sm whitespace-nowrap">
              ${service.price}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">{service.description}</p>
          <p className="text-xs text-gray-400 mt-1">{service.duration} min</p>
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
