import clsx from "clsx";

const sentiments = [
  { label: "All", value: "all", colorClass: "" },
  { label: "Positive", value: "2", colorClass: "positive" },
  { label: "Neutral", value: "1", colorClass: "neutral" },
  { label: "Negative", value: "0", colorClass: "negative" },
];

export const SentimentButtons = ({ selected, onChange }) => (
  <div className="legend flex gap-2">
    {sentiments.map(({ label, value, colorClass }) => (
      <div key={value} className="legend-item flex items-center gap-1">
        <span className={clsx("legend-color", colorClass)} />
        <button
          onClick={() => onChange(value)}
          className={clsx(
            "px-4 py-2 rounded border transition",
            selected === value
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-600 hover:border-gray-400"
          )}
        >
          {label}
        </button>
      </div>
    ))}
  </div>
);