// components/Rating.tsx
import React from 'react';
import { BsStarFill } from "react-icons/bs";
import { AiOutlineStar } from "react-icons/ai";

type RatingProps = {
  rating: number;
};

const Rating: React.FC<RatingProps> = ({ rating }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} className="text-2xl text-yellow-400">
          {star <= rating ? <BsStarFill /> : <AiOutlineStar />}
        </span>
      ))}
    </div>
  );
};

export default Rating;