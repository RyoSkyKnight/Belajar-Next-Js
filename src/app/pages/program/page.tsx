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
    const updatedFormData = { ...formData, paket: value };
    setFormData(updatedFormData);
    sessionStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  // Handle tab durasi paket
  const handleTabDurasiClick = (value: string | number) => {
    const updatedFormData = { ...formData, paketdetail: value };
    setFormData(updatedFormData);
    sessionStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  // Handle tab paket
  const handleTipeTabClick = (value: string | number) => {
    const updatedFormData = { ...formData, tipekamar: value };
    setFormData(updatedFormData);
    sessionStorage.setItem("formData", JSON.stringify(updatedFormData));
  };

  // Handle submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simpan data di sessionStorage
    sessionStorage.setItem("formData", JSON.stringify(formData));

    // Redirect ke halaman program
    const data = JSON.parse(sessionStorage.getItem("formData") || "{}");

    if (data.cabang === "PARE - JATIM") {
      router.push("/pages/akomodasi");
    } else {
      router.push("/pages/konfirmasi");
    }
  };

  // Options untuk dropdown
  const cabangOptions = [
    { value: "PARE - JATIM", label: "Pare - Jawa Timur" },
    { value: "Serang - Banten", label: "Serang - Banten" },
    { value: "Bandar Lampung - Lampung", label: "Bandar Lampung - Lampung" },
    { value: "BANDUNG - JABAR", label: "Bandung - Jawa Barat" },
    { value: "BOGOR - JABAR", label: "Bogor - Jawa Barat" },
    { value: "JOGJA - JOGJA", label: "Jogja - DI Yogyakarta" },
    { value: "MAKASSAR - SULAWESI", label: "Makassar - Sulawesi" },
    { value: "MEDAN - SUMATRA", label: "Medan - Sumatra" },
    { value: "ONLINE", label: "Online" },
  ];

  const periodeOptions = [
    { value: "16 Desember 2024", label: "16 Desember 2024" },
  ];

  const paketTabList = [
    { value: "intensive", label: "Intensive Class" },
    { value: "english_master", label: "English Master Pro" },
    { value: "desember_ceria", label: "Desember Ceria" },
    { value: "private", label: "Private Class" },
    { value: "business", label: "Business English" },
    { value: "toefl", label: "TOEFL Preparation" },
    { value: "ielts", label: "IELTS Ready" },
    { value: "conversation", label: "Daily Conversation" }
  ];

  const paketDurasiTabList = [
    { value: "1bulan", label: "1 Bulan" },
    { value: "2bulan", label: "2 Bulan" },
    { value: "3bulan", label: "3 Bulan" },
  ];

  const tipeKamar = [
    { value: "camp_grade_1", label: "Camp Grade 1", desc: "Kamar ber-AC, 2 tempat tidur, kamar mandi dalam"},
    { value: "camp_grade_2", label: "Camp Grade 2", desc: "Kamar ber-AC, 3 tempat tidur, kamar mandi dalam" },
    { value: "non_camp", label: "Non-Camp", desc: "" },
  ];

  const [selectedTipe, setSelectedTipe] = useState<string | null>(null);

  return (
    <CustomLayout
      mainline="Pilih paket program yang relevan biar kamu makin jago! 🚀"
      line="Drives your success from here!✨ #KampungInggrisLC #BestEnvironmentForTheBestResult"
    >
      <form onSubmit={handleSubmit} className="mx-auto flex flex-col space-y-10 lg:space-y-20">
        <div className="flex flex-col space-y-4 min-h-[320px] h-full">

          {/* Select Cabang dan Periode */}
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">


            <div className="w-full lg:w-1/2 flex flex-col space-y-2">
              <Label htmlFor="cabang" required>Pilih Cabang :</Label>
              <Select
                name="cabang"
                options={cabangOptions}
                value={formData.cabang || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className="w-full lg:w-1/2 flex flex-col space-y-2">
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

            <div className="lg:overflow-y-auto scroll-hidden">

              <ul className="lg:w-max w-full lg:flex lg:flex-row lg:space-x-4 grid :grid-cols-auto-fit grid-cols-2 gap-4 lg:gap-0">

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
          </div>

          <div className="w-full flex flex-col space-y-2">
            <Label htmlFor="paketDetail" required>Pilih Durasi Paket :</Label>

            <div className="overflow-y-auto scroll-hidden">

              <ul className="w-max flex flex-row space-x-4">

                {paketDurasiTabList.map((item) => (
                  <TabList
                    key={item.value}
                    label={item.label}
                    value={item.value}
                    onClick={handleTabDurasiClick}
                    isActive={formData.paketdetail === item.value}
                  />

                ))}
              </ul>
            </div>


          </div>

          <div className="flex flex-col lg:flex-row justify-between w-full space-y-4 lg:space-y-0">

            <div className="flex flex-col space-y-2 w-full lg:w-1/2">
              <Label htmlFor="tipekamar" required>Pilih Tipe Kamar :</Label>

              <div className="lg:overflow-y-auto scroll-hidden">
                <ul className="lg:w-max w-full lg:flex lg:flex-row lg:space-x-4 grid grid-cols-2 gap-4 lg:gap-0">
                  {tipeKamar.map((item) => (
                    <div key={item.value}>
                      <TabList
                        label={item.label}
                        value={item.value}
                        onClick={(value) => {
                          handleTipeTabClick(value);
                          setSelectedTipe(value as string);
                        }}
                        isActive={formData.tipekamar === item.value}
                      />
                    </div>
                  ))}
                </ul>
                  {/* Display description in one place */}
              {selectedTipe && (
                <div className="lg:absolute lg:w-1/4 w-auto h-auto pt-4">
                  <p className="lg:text-left text-center text-xs text-gray-400">
                    {tipeKamar.find((item) => item.value === selectedTipe)?.desc || "-"}
                  </p>
                </div>
              )}
              </div>

            </div>

            {/* <div className="flex flex-col justify-center items-center w-full lg:w-1/4">
              <h2 className="text-center text-black font-semibold text-sm pb-2">Total Harga :</h2>
              <h2 className="bg-none text-center text-black border-2 border-gray-400 py-2 px-6 rounded-[10px]">Rp 9.000.000</h2>
            </div> */}

            <div className="flex flex-col justify-center items-center w-full lg:pt-0 lg:w-1/4">
              <h2 className="text-center text-black font-semibold text-sm pb-2">Total Harga :</h2>
              <h2 className="bg-bill text-center text-white py-2 px-6 rounded-[10px]">Rp 9.000.000</h2>
            </div>

          </div>
        </div>
        {/* Submit Button */}
        <div className="flex flex-col justify-center items-center">
          <p className="text-gray-500 text-sm text-center pb-4">
            Pastikan anda telah memilih program anda dengan baik & benar sebelum lanjut!
          </p>
          <Button type="submit" className="w-full">Yuk Lanjut!</Button>
        </div>
      </form>

    </CustomLayout>
  );
}
