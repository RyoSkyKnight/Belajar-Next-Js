"use client"; // Harus ditambahkan karena menggunakan hooks

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Input from "./_components/_partials/input";
import CustomLayout from "./_components/layout";
import Label from "./_components/_partials/label";
import Select from "./_components/_partials/select";
import Button from "./_components/_partials/button";

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
  });

  // Baca data dari localStorage saat halaman dimuat
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedData = localStorage.getItem("formData");
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }
  }, []);

  // Handle perubahan input dan select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    // Simpan data ke localStorage setiap ada perubahan
    localStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  // Handle submit form dengan POST
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman

    try {
      const response = await fetch("/api/program", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Hapus data dari localStorage setelah submit
        localStorage.removeItem("formData");

        // Redirect ke halaman /pages/program jika sukses
        router.push("/pages/program");
      } else {
        console.error("Gagal mengirim data form");
      }
    } catch (error) {
      console.error("Terjadi kesalahan:", error);
    }
  };

  // Data dropdown
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
    { value: "instagram", label: "Instagram" },
    { value: "facebook", label: "Facebook" },
    { value: "iklan", label: "Iklan" },
  ];

  return (
    <CustomLayout
      mainline="Langkah pertama untuk sukses dimulai di sini! 🚀"
      line="Let's conquer English together! 💪 #KampungInggrisLC #BestEnvironmentForTheBestResult"
    >
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col space-y-6">
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
        <div className="flex flex-row space-x-4">
          <div className="flex flex-col space-y-2 w-1/2">
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
          <div className="flex flex-col space-y-2 w-1/2">
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
        <div className="flex flex-row space-x-4">
          <div className="w-1/2">
            <Select
              name="gender"
              options={genderOptions}
              value={formData.gender}
              onChange={handleChange}
              required
            />
          </div>
          <div className="w-1/2">
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

        {/* Submit Button */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-300 text-sm mt-5">
            Pastikan anda telah mengisi data diri dengan baik & benar sebelum lanjut!
          </p>
          <Button type="submit" className="w-full">Yuk Lanjut!</Button>
        </div>
      </form>
    </CustomLayout>
  );
}
