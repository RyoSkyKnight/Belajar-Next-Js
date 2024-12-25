"use client";
import { useState } from 'react';
import { FaStar } from "react-icons/fa";
import Button from './button';

interface FeedbackPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackPopup: React.FC<FeedbackPopupProps> = ({ isOpen, onClose }) => {
  const [rating, setRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string>("");

  const handleRating = (rate: number) => {
    setRating(rate);
  };

  const handleSkip = () => {
    onClose(); // Close popup
    console.log("Skipped Feedback");
  };

  const handleSubmit = () => {
    console.log("Feedback Submitted:", { rating, feedback });
    onClose(); // Close popup after submission
  };

    const handleFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFeedback(event.target.value);
    };

  return (
    <>

      {/* Popup Content */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="relative bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-md">
            {/* Skip Button */}
            <div className="flex flex-row justify-between w-full px-1">


            {/* Title */}
            <h3 className="text-xl text-gray-800">Customer Feedback</h3>


            <button
              className=" text-main-color hover:text-gray-800 transition"
              onClick={handleSkip}
            >
              Skip
            </button>

            </div>
          
            {/* Star Rating */}
            <div className="flex justify-center mb-5 my-5">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <label key={index} className="cursor-pointer">
                    <input
                      type="radio"
                      name="rating"
                      value={ratingValue}
                      className="hidden"
                      onClick={() => handleRating(ratingValue)}
                    />
                    <FaStar
                      className="transition-colors duration-200 "
                      size={40}
                      color={
                        ratingValue <= (hover || rating || 0) ? "#FACC14" : "#e4e5e9"
                      }
                      onMouseEnter={() => setHover(ratingValue)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </div>

            {/* Feedback Textarea */}
            <textarea
              className="w-full h-24 p-3 border rounded-lg border-gray-300 focus:ring-2 focus:ring-main-color focus:outline-none resize-none mb-5"
              placeholder="Masukan anda sangat berharga bagi kami , tulis masukan anda disini"
              value={feedback}
              onChange={handleFeedbackChange}
            ></textarea>

            {/* Submit Button */}
            <Button
              className="w-full"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackPopup;


