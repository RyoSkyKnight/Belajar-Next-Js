"use client";

import CustomLayout from "@/app/_components/layout";
import { useEffect, useState } from "react";
import Button from "@/app/_components/_partials/button";
import Link from "next/link";

interface FormData {
  [key: string]: string | number;
}

export default function KonfirmasiPage() {
  const [formData, setFormData] = useState<FormData>({});
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const savedData = sessionStorage.getItem("formData");
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  function capitalizeFirstLetter(val: string | number) {
    if (val === null || val === undefined) return val; // Return the value as is if it's null or undefined
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  
  return (
    <CustomLayout
      mainline="Tinggal selangkah lagi menuju kesuksesan! 🚀"
      line="Konfirmasi dulu biar gak ada kekeliruan nanti {'<3'} ! 😍 #InggrisItuSeru #BelajarSeruLC"
    >
      {/* Main Content */}
      <div className="w-full mx-auto rounded-3xl lg:border lg:border-gray-400 bg-white p-2 lg:py-3 lg:px-6 h-auto">
        <h2 className="mb-4 text-center text-black text-xl font-bold">Ringkasan Pembayaran</h2>

        {/* Data Diri */}
        <div className="mb-4">
          <h3 className="mb-3 text-[16px] font-semibold text-gray-700">Data Diri</h3>
          <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-8">
            <div className="space-y-2">
              <div className="flex items-center text-[14px]">
                <span className="w-24 text-gray-500">Nama</span>
                <span className="text-gray-700">: { capitalizeFirstLetter(formData.nama) || "Belum diisi"}</span>
              </div>
              <div className="flex items-center text-[14px]">
                <span className="w-24 text-gray-500">WhatsApp</span>
                <span className="text-gray-700">: {formData.nomor || "Belum diisi"}</span>
              </div>
              <div className="flex items-center text-[14px]">
                <span className="w-24 text-gray-500">Email</span>
                <span className="text-gray-700">: {formData.email || "Belum diisi"}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center text-[14px]">
                <span className="w-24 text-gray-500">Gender</span>
                <span className="text-gray-700">: { capitalizeFirstLetter(formData.gender) || "Belum diisi"}</span>
              </div>
              <div className="flex items-center text-[14px]">
                <span className="w-24 text-gray-500">Kesibukan</span>
                <span className="text-gray-700">: { capitalizeFirstLetter(formData.kesibukan) || "Belum diisi"}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Detail Pembayaran */}
        <div>
          <h3 className="mb-3 text-[16px] font-semibold text-gray-700">Detail Pembayaran</h3>
          <div className="space-y-3 text-[14px]">
            <div className="flex justify-between text-gray-600">
              <span>
                Paket {formData.paket} {formData.paketDetail}
              </span>
              <span>Rp. 9.000.000</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Biaya Tambahan</span>
              <span>Rp. 900.000</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Biaya Admin</span>
              <span>Rp. 60.000</span>
            </div>
            <div className="my-2 border-b border-gray-300"></div>
            <div className="flex justify-between text-black text-[15px] font-bold">
              <span>Total Pembayaran</span>
              <span>Rp. 9.960.000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Privacy Policy */}
      <div className="mt-6 flex items-center justify-center space-x-2 pb-4">
        <input
          type="checkbox"
          id="privacy"
          checked={accepted}
          onChange={(e) => setAccepted(e.target.checked)}
        />
        <label htmlFor="privacy" className="text-sm text-gray-500">
          Dengan melanjutkan, saya menyetujui{" "}
          <Link href="#" className="text-blue-600 hover:underline">
            Kebijakan Privasi dan Syarat & Ketentuan
          </Link>{" "}
          yang berlaku
        </label>
      </div>

      {/* Submit Button */}
      <Button
  disabled={!accepted}
  type="submit"
  className={`w-full py-2 rounded-md text-white transition-all duration-200 ${
    accepted
      ? "cursor-pointer"
      : "bg-gray-300 cursor-not-allowed hover:bg-gray-300"
  }`}
>
  Konfirmasi
</Button>


    </CustomLayout>
  );
}

