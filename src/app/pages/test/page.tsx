"use client";
import React, { useState } from "react";
import FeedbackPopup from "@/app/_components/_partials/feedback";

const App: React.FC = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const openPopup = () => setPopupVisible(true);
  const closePopup = () => setPopupVisible(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Button to open popup */}
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        onClick={openPopup}
      >
        Open Feedback Popup
      </button>

      {/* FeedbackPopup Component */}
      <FeedbackPopup isOpen={isPopupVisible} onClose={closePopup} />
    </div>
  );
};

export default App;
