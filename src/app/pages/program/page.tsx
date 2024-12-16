"use client";

import CustomLayout from "@/app/_components/layout";
import { useEffect, useState } from "react";

interface FormData {
  [key: string]: string | number;
}

export default function ProgramPage() {

  const [formData, setFormData] = useState<FormData | null>(null);
  const [error] = useState<string | null>(null);

  useEffect(() => {
    const savedData = sessionStorage.getItem("formData");

    if (savedData) {
      // Ambil dari sessionStorage jika ada
      setFormData(JSON.parse(savedData)); }
  }, []);

  return (
    <CustomLayout mainline="Pilih paket program yang relevan biar makin jago! 🚀." line=" Drives your success from here!✨ #KampungInggrisLC #BestEnvironmentForTheBestResult">
    
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Data Formulir Anda</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : formData ? (
        <ul>
          {Object.entries(formData).map(([key, value]) => (
            <li key={key}>
              <strong>{key}:</strong> {value as string}
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading...</p>
      )}
    </div>
    </CustomLayout>
  );
}
