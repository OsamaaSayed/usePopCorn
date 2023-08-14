import Star from "../Star";
import { useState } from "react";

type StarRatingProps = {
  className?: string;
  defaultRating?: number;
  maxRating?: number;
  color?: string;
  size?: number;
  messages?: string[];
  onSetRating?: (rate: number) => void;
};

const containerStyle = {
  display: "flex",
  alignItems: "center",
  gap: "16px",
};

const starContainerStyle = {
  display: "flex",
};

const StarRating = ({
  className = "",
  defaultRating = 0,
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  messages = [],
  onSetRating = () => {},
}: StarRatingProps) => {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(0);

  const handleRating = (rate: number) => {
    setRating((prevRating) => (prevRating === rate ? 0 : rate));
    onSetRating(rating === rate ? 0 : rate);
  };

  const textStyle = {
    lineHeight: "1",
    margin: "0",
    color,
    fontSize: `${size / 1.5}px`,
  };

  return (
    <div style={containerStyle} className={className}>
      <div style={starContainerStyle}>
        {Array.from(Array(maxRating), (_, index) => (
          <Star
            key={index}
            isFull={(tempRating || rating) >= index + 1}
            color={color}
            size={size}
            onRate={() => handleRating(index + 1)}
            onHoverIn={() => setTempRating(index + 1)}
            onHoverOut={() => setTempRating(0)}
          />
        ))}
      </div>
      <p style={textStyle}>
        {messages.length === maxRating
          ? messages[(tempRating || rating) - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
};

export default StarRating;
