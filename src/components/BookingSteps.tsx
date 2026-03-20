interface BookingStepsProps {
  currentStep: number;
  totalSteps: number;
  stepLabels: string[];
}

export default function BookingSteps({
  currentStep,
  totalSteps,
  stepLabels,
}: BookingStepsProps) {
  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="flex items-center gap-1 mb-3">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div key={i} className="flex-1 flex items-center">
            <div
              className={`h-1.5 w-full rounded-full transition-colors ${
                i < currentStep
                  ? "bg-teal-500"
                  : i === currentStep
                    ? "bg-teal-300"
                    : "bg-gray-200"
              }`}
            />
          </div>
        ))}
      </div>
      {/* Step label */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-500">
          Step {currentStep + 1} of {totalSteps}
        </p>
        <p className="text-xs font-medium text-teal-700">
          {stepLabels[currentStep]}
        </p>
      </div>
    </div>
  );
}
