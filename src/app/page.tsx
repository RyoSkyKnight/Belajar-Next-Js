"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Input from "./_components/_partials/input";
import CustomLayout from "./_components/layout";
import Select from "./_components/_partials/select";
import Button from "./_components/_partials/button";
import Label from "./_components/_partials/label";
import TabList from "./_components/_partials/tablist";
import { validateFormData } from "./_backend/_utils/validationAlert";
import { dataDiriSchema } from "./_backend/_utils/validationZod";

interface FromData {
  nama: string;
  email: string;
  nomor: string | number;
  gender: string;
  umur: string;
  kesibukan: string;
  knowlcfrom: string;
  ketentuan: boolean;
  [key: string]: string | number | boolean;
}


export default function Page() {
  const router = useRouter();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // State untuk menyimpan data form
  const [formData, setFormData] = useState<FromData>({
    nama: "",
    email: "",
    nomor: "",
    gender: "",
    umur: "",
    kesibukan: "",
    knowlcfrom: "",
    ketentuan: false,
  });

  // Ambil data dari sessionStorage jika ada
  useEffect(() => {
    const savedData = sessionStorage.getItem("formData");
    if (savedData) setFormData(JSON.parse(savedData));
  }, []);


  // Handle submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = dataDiriSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
      console.log("Validasi Berhasil:", formData);
    }

    // Simpan data di sessionStorage
    sessionStorage.setItem("formData", JSON.stringify(formData));

    // Redirect ke halaman program
    const { isValid, missingFields } = validateFormData(formData);

    if (isValid) {
      router.push("/pages/program")
    } else {
      const missingLabels = missingFields.map((item) => item.label);
      toast.error(
        "Mohon lengkapi data berikut: " + missingLabels.join(", ")
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Reset error untuk field yang sedang diubah
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

    // Update state secara asinkron dan sinkronkan dengan sessionStorage
    setFormData((oldFormData) => {
      const updatedFormData = { ...oldFormData, [name]: value };
      sessionStorage.setItem("formData", JSON.stringify(updatedFormData));
      return updatedFormData;
    });
  };


  const handleTabClick = (value: string | number) => {
    setErrors((prevErrors) => ({ ...prevErrors, gender : "" }));

    const updatedFormData = { ...formData, gender: String(value) };
    setFormData(updatedFormData);
    sessionStorage.setItem("formData", JSON.stringify(updatedFormData));
  };


  // Options untuk dropdown
  const genderOptions = [
    { value: "laki-laki", label: "Laki-laki" },
    { value: "perempuan", label: "Perempuan" },
  ];

  const umurOptions = [
    { value: "17-20", label: "17-20 Tahun" },
    { value: "21-25", label: "21-25 Tahun" },
    { value: "26-30", label: "26-30 Tahun" },
    { value: "31-35", label: "31-35 Tahun" },
    { value: "36-40", label: "36-40 Tahun" },
    { value: "41-45", label: "41-45 Tahun" },
    { value: "46-50", label: "46-50 Tahun" },
    { value: "51-55", label: "51-55 Tahun" },
    { value: "56-60", label: "56-60 Tahun" },
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
      line="Let's conquer English together! 💪 #KampungInggrisLC #RaihSuksesMuBersamaLC"
    >
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col space-y-10 lg:space-y-32 h-min">
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
              className={` ${errors.nama ? 'border-red-500' : ''} `}
            />

            {errors.nama && <p className="text-red-500 text-[10px] pl-2 lg:absolute lg:translate-y-[3.8rem]">{errors.nama}</p>}
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
                className={` ${errors.email ? 'border-red-500' : ''} `}
              />

              {errors.email && <p className="text-red-500 text-[10px] pl-2 lg:absolute lg:translate-y-[3.8rem]">{errors.email}</p>}

            </div>

            <div className="flex flex-col space-y-2 w-full md:w-1/2">
              <Label htmlFor="nomor" required>Nomor WhatsApp :</Label>
              <Input
                type="text"
                name="nomor"
                placeholder="0857xxxxxx"
                value={formData.nomor}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) { // Hanya mengizinkan angka
                    handleChange(e); // Lanjutkan hanya jika input valid
                  }
                }}
                className={` ${errors.nomor ? 'border-red-500' : ''} `}
              />

              {errors.nomor && <p className="text-red-500 text-[10px] pl-2 lg:absolute lg:translate-y-[3.8rem]">{errors.nomor}</p>}

            </div>
          </div>

          {/* Select Gender dan Kesibukan */}
          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">


            <div className="w-full flex flex-col space-y-2 md:w-1/2">
              <Label htmlFor="gender" required>Jenis Kelamin:</Label>



              <ul className=" lg:flex lg:flex-row lg:space-x-4 grid :grid-cols-auto-fit grid-cols-2 gap-4 lg:gap-0">

                {genderOptions.map((item) => (
                  <TabList
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    onClick={handleTabClick}
                    isActive={formData.gender === item.value}
                    className={` ${errors.gender ? 'border-red-500' : ''} `}
                  />
                ))}
              </ul>

              {errors.gender && <p className="text-red-500 text-[10px] pl-2 lg:absolute lg:translate-y-[3.8rem]">{errors.gender}</p>}


            </div>

            <div className="w-full md:w-1/2 flex flex-col space-y-2">
              <Label htmlFor="umur" required>Umur :</Label>
              <Select
                name="umur"
                options={umurOptions}
                value={formData.umur}
                onChange={handleChange}
                className={` ${errors.umur ? 'border-red-500' : ''} `}
              />

              {errors.umur && <p className="text-red-500 text-[10px] pl-2 lg:absolute lg:translate-y-[3.8rem]">{errors.umur}</p>}

            </div>

          </div>

          <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
            <div className="flex flex-col space-y-2 md:w-1/2">
              <Label htmlFor="kesibukan" required>Kesibukan :</Label>
              <Select
                name="kesibukan"
                options={kesibukanOptions}
                value={formData.kesibukan}
                onChange={handleChange}
                className={` ${errors.kesibukan ? 'border-red-500' : ''} `}
              />

              {errors.kesibukan && <p className="text-red-500 text-[10px] pl-2 lg:absolute lg:translate-y-[3.8rem]">{errors.kesibukan}</p>}

            </div>

            {/* Select Know LC From */}
            <div className="flex flex-col space-y-2 md:w-1/2">
              <Label htmlFor="knowlcfrom" required>Tau LC Darimana :</Label>
              <Select
                name="knowlcfrom"
                options={knowLCFromOptions}
                value={formData.knowlcfrom}
                onChange={handleChange}
                className={` ${errors.knowlcfrom ? 'border-red-500' : ''} `}
              />

              {errors.knowlcfrom && <p className="text-red-500 text-[10px] pl-2 lg:absolute lg:translate-y-[3.8rem]">{errors.knowlcfrom}</p>}

            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="">
          <div className="flex flex-col justify-center items-center ">
            <p className="text-gray-500 text-sm text-center pb-4">
              Pastikan anda telah mengisi data diri dengan baik & benar sebelum lanjut!
            </p>
            <Button type="submit" className="w-full lg:w-full">Yuk Lanjut!</Button>
          </div>
        </div>
      </form>
    </CustomLayout>
  );
}
