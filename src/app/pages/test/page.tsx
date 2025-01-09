"use client";

import React, { useState } from "react";
import BottomSheet from "@/app/_components/_partials/sheet"; // Ganti dengan path file BottomSheet

const ExamplePage = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {/* Button untuk membuka bottom sheet */}
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-700"
      >
        Open Bottom Sheet
      </button>

      {/* Bottom Sheet */}
      <BottomSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="My Awesome Sheet"
        initialHeight="60%" // Custom height
      >
        <p className="text-gray-600">This is the content inside the bottom sheet.</p>

      </BottomSheet>
    </div>
  );
};

export default ExamplePage;
