"use client";

import CustomLayout from "@/app/_components/layout";
import Select from "@/app/_components/_partials/select";
import Button from "@/app/_components/_partials/button";
import Label from "@/app/_components/_partials/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TabList from "@/app/_components/_partials/tablist";


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

  // Handle perubahan input dan tablist
  // Handle tab paket
  const handleTabClick = (value: string | number) => {
    const updatedFormData = { ...formData, pilihankamar : value };
    setFormData(updatedFormData);
    sessionStorage.setItem("formData", JSON.stringify(updatedFormData));
  };
  const handleTipeTabClick = (value: string | number) => {
    const updatedFormData = { ...formData, tipekamar : value };
    setFormData(updatedFormData);
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
    { value: "pare", label: "Pare" },
    { value: "serang", label: "Serang" },
    { value: "banten", label: "Banten" },
    { value: "jogja", label: "Jogja" },
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

  const pilihanKamar = [
    { value: "camp", label: "Camp" },
    { value: "noncamp", label: "Non Camp" },
  ];

  const tipeKamar = [
    { value: "AC", label: "AC" },
    { value: "nonAC", label: "NON AC" },
  ];

  return (
    <CustomLayout
      mainline="Wah, dikit lagi nih! Langkah demi langkah menuju kesuksesan dimulai! 🚀"
      line="Ayo, kita taklukkan bahasa Inggris bareng-bareng! 💪 #KampungInggrisLC #DrivesYourSuccess"
    >
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col space-y-4">
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
        <div className="flex flex-row space-x-4">

          <div className="w-1/2 flex flex-col space-y-2">
            <Label htmlFor="kendaraan" required>Pilih Tipe Kendaraan :</Label>
            <Select
              name="kendaraan"
              options={kendaraanOptions}
              value={formData.kendaraan || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-1/2 flex flex-col space-y-2">
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

  

          <div className="w-full flex flex-col space-y-2">
            <Label htmlFor="paket" required>Pilih Kamar :</Label>

            <ul className="flex flex-row space-x-4">

              {pilihanKamar.map((item) => (
                <TabList
                  key={item.value}
                  label={item.label}
                  value={item.value}
                  onClick={handleTabClick}
                  isActive={formData.pilihankamar === item.value}
                />
              ))}
            </ul>
          </div>

          <div className="flex flex-col space-y-2">
            <Label htmlFor="tipekamar" required>Pilih Tipe Kamar :</Label>
            <ul className="flex flex-row space-x-4">

{tipeKamar.map((item) => (
  <TabList
    key={item.value}
    label={item.label}
    value={item.value}
    onClick={handleTipeTabClick}
    isActive={formData.tipekamar === item.value}
  />
))}
</ul>
          </div>

          {/* Submit Button */}
               <div className="flex flex-col justify-center items-center">
                 <p className="text-gray-300 text-sm mt-16 mb-2">
                 Biaya penjemputan & kamar akan di tambahkan dengan biaya program sebelumnya!
                 </p>
                 <Button type="submit" className="w-full">Yuk Lanjut!</Button>
               </div>
      </form>
    </CustomLayout>
  );
}
