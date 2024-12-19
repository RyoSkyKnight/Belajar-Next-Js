"use client";

import CustomLayout from "@/app/_components/layout";
import { useEffect, useState } from "react";

interface FormData {
  [key: string]: string | number; // Struktur formData fleksibel
}

export default function KonfirmasiPage() {
  const [formData, setFormData] = useState<FormData>({}); // Default kosong

  // Ambil data dari sessionStorage jika ada
  useEffect(() => {
    const savedData = sessionStorage.getItem("formData");
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  return (
    <CustomLayout mainline="Tinggal selangkah lagi menuju kesuksesan! 🚀" line="Konfirmasi data kamu biar gak ada kekeliruan nanti <3 ! 😍#KampungInggrisLC #BelajarAsikDenganHasilMaksimal"
>
        <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Konfirmasi Page</h1>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-lg font-semibold mb-2">Session Data:</h2>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(formData, null, 2)}
        </pre>
      </div>
    </div>
    </CustomLayout>
  );
}
