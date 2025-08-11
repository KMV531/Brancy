import { Star } from "lucide-react";
import { useState } from "react";

interface RatingProps {
  value: number;
  onChange: (value: number) => void;
}

export function Rating({ value, onChange }: RatingProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHoverValue(star)}
          onMouseLeave={() => setHoverValue(null)}
          className="p-1"
        >
          <Star
            className={`w-5 h-5 ${
              star <= (hoverValue || value)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}