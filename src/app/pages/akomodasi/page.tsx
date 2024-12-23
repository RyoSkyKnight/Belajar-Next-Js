"use client";

import CustomLayout from "@/app/_components/layout";
import Select from "@/app/_components/_partials/select";
import Button from "@/app/_components/_partials/button";
import Label from "@/app/_components/_partials/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/app/_components/_partials/input";

interface FormData {
  [key: string]: string | number;
}

export default function ProgramPage() {
  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({}); // Default kosong

  // Ambil data dari sessionStorage jika ada
  useEffect(() => {
    const savedData = sessionStorage.getItem("formData");
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);

  // Handle perubahan input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Simpan data di sessionStorage
    sessionStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  // Handle submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simpan data di sessionStorage
    sessionStorage.setItem("formData", JSON.stringify(formData));

    // Redirect ke halaman program
    router.push("/pages/konfirmasi");
  };

  // Options untuk dropdown
  const lokasiJemputOptions = [
    { value: "bandara_dhoho_kediri", label: "Bandara Dhoho Kediri" },
    { value: "bandara_juanda_surabaya", label: "Bandara Juanda Surabaya" },
    { value: "stasiun_jombang", label: "Stasiun Jombang" },
  ];

  const kendaraanOptions = [
    { value: "mobil", label: "Mobil" },
    { value: "motor", label: "Motor" },
  ];

  const penumpangOptions = [
    { value: "1", label: "1 Penumpang" },
    { value: "2", label: "2 Penumpang" },
    { value: "3", label: "3 Penumpang" },
  ];

  return (
    <CustomLayout
      mainline="Wah, dikit lagi nih! Langkah demi langkah menuju kesuksesan dimulai! 🚀"
      line="Ayo, kita taklukkan bahasa Inggris bareng-bareng! 💪 #DrivesYourSuccess #BoostYourEnglishWithLC"
    >
       <form onSubmit={handleSubmit} className="mx-auto flex flex-col space-y-10 lg:space-y-20">
       <div className="flex flex-col space-y-4 min-h-[320px] h-full">

        <div className="flex flex-col space-y-2">
          <Label htmlFor="lokasijemput" required>Pilih Penjemputan :</Label>
          <Select
            name="lokasijemput"
            options={lokasiJemputOptions}
            value={formData.lokasijemput || ""}
            onChange={handleChange}
            required
          />
        </div>

        {/* Select Cabang dan Periode */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/2 flex flex-col space-y-2">
            <Label htmlFor="kendaraan" required>Pilih Tipe Kendaraan :</Label>
            <Select
              name="kendaraan"
              options={kendaraanOptions}
              value={formData.kendaraan || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col space-y-2">
            <Label htmlFor="penumpang" required>Banyak Penumpang :</Label>
            <Select
              name="penumpang"
              options={penumpangOptions}
              value={formData.penumpang || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between w-full space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-2 w-full md:w-1/3">
            <Label htmlFor="diskon">Kode Voucher :</Label>
            <Input
              type="text"
              name="diskon"
              placeholder="Ketikan disini (jika ada)"
              value={formData.diskon || ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col justify-center items-center w-full lg:pt-0 lg:w-1/4">
              <h2 className="text-center text-black font-semibold text-sm pb-2">Total Harga :</h2>
              <h2 className="bg-bill text-center text-white py-2 px-6 rounded-[10px]">Rp 900.000</h2>
            </div>
        </div>

  </div>
        {/* Submit Button */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-500 text-sm text-center pb-4">
            Biaya penjemputan & kamar akan di tambahkan dengan biaya program sebelumnya!
          </p>
          <Button type="submit" className="w-full">Yuk Lanjut!</Button>
        </div>
      </form>
    </CustomLayout>
  );
}
