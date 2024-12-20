"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./_components/_partials/input";
import CustomLayout from "./_components/layout";
import Select from "./_components/_partials/select";
import Button from "./_components/_partials/button";
import Label from "./_components/_partials/label";

export default function Page() {
  const router = useRouter();

  // State untuk menyimpan data form
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    nomor: "",
    gender: "",
    kesibukan: "",
    knowlcfrom: "",
    cabang: "",
    periode: "",
    paket: "",
    paketdetail: "",
    diskon: "",
    lokasijemput : "",
    kendaraan: "",
    tipekamar: "",
    ketentuan: false,
  });

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
    router.push("/pages/program");
  };

  // Options untuk dropdown
  const genderOptions = [
    { value: "laki-laki", label: "Laki-laki" },
    { value: "perempuan", label: "Perempuan" },
  ];

  const kesibukanOptions = [
    { value: "pelajar", label: "Pelajar" },
    { value: "mahasiswa", label: "Mahasiswa" },
    { value: "pekerja", label: "Pekerja" },
  ];

  const knowLCFromOptions = [
    { value: "google", label: "Google" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "lainnya", label: "Lainnya" },
  ];

  return (
    <CustomLayout
      mainline="Langkah pertama untuk sukses dimulai di sini! 🚀"
      line="Let's conquer English together! 💪 #KampungInggrisLC #BestEnvironmentForTheBestResult #RaihSuksesMuBersamaLC"
    >
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col space-y-10 lg:space-y-20">
      <div className="flex flex-col space-y-4 min-h-[320px] h-full">
        {/* Input Nama */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="nama" required>Nama Lengkap :</Label>
          <Input
            type="text"
            name="nama"
            placeholder="Masukan nama lengkap anda"
            value={formData.nama}
            onChange={handleChange}
            required
          />
        </div>

        {/* Input Email dan Nomor WhatsApp */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex flex-col space-y-2 w-full md:w-1/2">
            <Label htmlFor="email" required>Email :</Label>
            <Input
              type="email"
              name="email"
              placeholder="youremail@gmail.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col space-y-2 w-full md:w-1/2">
            <Label htmlFor="nomor" required>Nomor WhatsApp :</Label>
            <Input
              type="text"
              name="nomor"
              placeholder="0857xxxxxx"
              value={formData.nomor}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Select Gender dan Kesibukan */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="w-full md:w-1/2 flex flex-col space-y-2">
            <Label htmlFor="gender" required>Jenis Kelamin :</Label>
            <Select
              name="gender"
              options={genderOptions}
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-full md:w-1/2 flex flex-col space-y-2">
            <Label htmlFor="kesibukan" required>Kesibukan :</Label>
            <Select
              name="kesibukan"
              options={kesibukanOptions}
              value={formData.kesibukan}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Select Know LC From */}
        <div className="flex flex-col space-y-2">
          <Label htmlFor="knowlcfrom" required>Tau LC Darimana :</Label>
          <Select
            name="knowlcfrom"
            options={knowLCFromOptions}
            value={formData.knowlcfrom}
            onChange={handleChange}
            required
          />
        </div>
      </div>

        {/* Submit Button */}
        <div className="flex flex-col justify-center items-center ">
          <p className="text-gray-500 text-sm text-center pb-4">
            Pastikan anda telah mengisi data diri dengan baik & benar sebelum lanjut!
          </p>
          <Button type="submit" className="w-full lg:w-full">Yuk Lanjut!</Button>
        </div>
      </form>
    </CustomLayout>
  );
}
