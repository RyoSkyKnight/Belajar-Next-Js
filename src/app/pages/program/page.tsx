"use client";

import CustomLayout from "../../_components/layout";
import { useEffect, useState } from "react";

export default function ProgramPage() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/program", {
          method: "GET",
        });
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error(error);
        setError("Failed to fetch program data. Please try again later.");
      }
    };

    fetchData();
  }, []);

  const containerClassName = "p-10";

  return (
    <CustomLayout mainline="Program" line="Isi data program"> 
      <div className={containerClassName}>
        <h1 className="text-2xl font-bold mb-4">Data Anda:</h1>
        {error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <ul>
            {Object.entries(formData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {String(value)}
              </li>
            ))}
          </ul>
        )}
      </div>
    </CustomLayout>
  );
}
