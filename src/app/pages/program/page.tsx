"use client";

import CustomLayout from "@/app/_components/layout";
import Select from "@/app/_components/_partials/select";
import Button from "@/app/_components/_partials/button";
import Label from "@/app/_components/_partials/label";
import Input from "@/app/_components/_partials/input";
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
    const updatedFormData = { ...formData, paket: value };
    setFormData(updatedFormData);
    sessionStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  // Handle tab durasi paket
  const handleTabDurasiClick = (value: string | number) => {
    const updatedFormData = { ...formData, paketDetail: value };
    setFormData(updatedFormData);
    sessionStorage.setItem("formData", JSON.stringify(updatedFormData));
  };


  // Handle submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    // Simpan data di sessionStorage
    sessionStorage.setItem("formData", JSON.stringify(formData));

    // Redirect ke halaman program
    router.push("/pages/akomodasi");
  };

  // Options untuk dropdown
  const cabangOptions = [
    { value: "pare", label: "Pare" },
    { value: "serang", label: "Serang" },
    { value: "banten", label: "Banten" },
    { value: "jogja", label: "Jogja" },
  ];

  const periodeOptions = [
    { value: "16 Desember 2024", label: "16 Desember 2024" },
  ];

  const paketTabList = [
    { value: "intensive", label: "Intensive" },
    { value: "english-master", label: "English Master" },
    { value: "desember-ceria", label: "Desember Ceria" },
    { value: "private", label: "Private" },
  ];

  const paketDurasiTabList = [
    { value: "1bulan", label: "1 Bulan" },
    { value: "2bulan", label: "2 Bulan" },
    { value: "3bulan", label: "3 Bulan" },
  ];

  return (
    <CustomLayout
      mainline="Pilih paket program yang relevan biar kamu makin jago! 🚀"
      line="Drives your success from here!✨ #KampungInggrisLC #BestEnvironmentForTheBestResult" 
    >
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col space-y-4">

        {/* Select Cabang dan Periode */}
        <div className="flex flex-row space-x-4">

          <div className="w-1/2 flex flex-col space-y-2">
            <Label htmlFor="cabang" required>Pilih Cabang :</Label>
            <Select
              name="cabang"
              options={cabangOptions}
              value={formData.cabang || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="w-1/2 flex flex-col space-y-2">
            <Label htmlFor="periode" required>Periode :</Label>
            <Select
              name="periode"
              options={periodeOptions}
              value={formData.periode || ""}
              onChange={handleChange}
              required
            />
          </div>

        </div>



        <div className="w-full flex flex-col space-y-2">
          <Label htmlFor="paket" required>Pilih Paket :</Label>

          <ul className="flex flex-row space-x-4">

            {paketTabList.map((item) => (
              <TabList
                key={item.value}
                label={item.label}
                value={item.value}
                onClick={handleTabClick}
                isActive={formData.paket === item.value}
              />
            ))}
          </ul>
        </div>

        <div className="w-full flex flex-col space-y-2">
          <Label htmlFor="paketDetail" required>Pilih Durasi Paket :</Label>

          <ul className="flex flex-row space-x-4">

            {paketDurasiTabList.map((item) => (
              <TabList
                key={item.value}
                label={item.label}
                value={item.value}
                onClick={handleTabDurasiClick}
                isActive={formData.paketDetail === item.value}
              />
            ))}
          </ul>
        </div>
        <div className="flex flex-row justify-between">

          <div className="flex flex-col space-y-2 w-2/3">
            <Label htmlFor="diskon" >Kode Voucher :</Label>
            <Input
              type="text"
              name="diskon"
              placeholder="Ketikan disini (jika ada)"
              value={formData.diskon || ""}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-center">Total Harga :</h2>
            <h2 className="border border-gray-400 text-center py-3 px-2 rounded-[10px] ">Rp 9.000.000</h2>
          </div>
        </div>


        {/* Submit Button */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-300 text-sm mt-16 mb-2">
            Pastikan anda telah memilih program anda dengan baik & benar sebelum lanjut!
          </p>
          <Button type="submit" className="w-full">Yuk Lanjut!</Button>
        </div>
      </form>

    </CustomLayout>
  );
}
