import React from "react";
import { Button } from "../ui/button";
import { StarIcon } from "lucide-react";
import PropTypes from 'prop-types';

const StarRating = ({ rating, handleRatingChange }) => { 
  const stars = [1, 2, 3, 4, 5];

  return (
    <div className="flex space-x-2">
      {stars.map((star) => (
        <Button
          variant="outline"
          size="icon"
          onClick={handleRatingChange ? () => handleRatingChange(star) : null}
          className={`group p-3 rounded-full transition-transform transform ${
            star <= rating
              ? "text-yellow-500 bg-yellow-100 hover:bg-yellow-200"
              : "text-gray-400 bg-gray-100 hover:bg-primary hover:text-white"
          }`}
          key={star}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <StarIcon
            className={`w-6 h-6 transition-colors ${
              star <= rating ? "fill-yellow-500" : "fill-none"
            } group-hover:scale-110`}
          />
        </Button>
      ))}
    </div>
  );
};


StarRating.propTypes = {
  rating: PropTypes.number,
  handleRatingChange: PropTypes.func,
};

export default StarRating;
