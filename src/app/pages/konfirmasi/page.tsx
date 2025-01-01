"use client";

import CustomLayout from "@/app/_components/layout";
import { useEffect, useState } from "react";
import Button from "@/app/_components/_partials/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Select from "@/app/_components/_partials/select";
import { toast } from "react-toastify";
import { validateFormDataKonfirmasi } from "@/app/_backend/_utils/validationAlert";
import Label from "@/app/_components/_partials/label";
import PaymentOption from "@/app/_components/_partials/paymentOption";

interface FormData {
  [key: string]: string | number | { label: string };
  paymentmethod: string;
  paket: { label: string };
  paketdetail: { label: string };
  nama: string | number;
  email: string;
  nomor: string | number;
  gender: string;
  kesibukan: string;
}
export default function KonfirmasiPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    paymentmethod: "",
    paket: { label: "" },
    paketdetail: { label: "" },
    nama: "",
    email: "",
    nomor: "",
    gender: "",
    kesibukan: ""
  });
  const [accepted, setAccepted] = useState(false);
  const [akomodasi, setAkomodasi] = useState(false);



  useEffect(() => {
    const savedData = sessionStorage.getItem("formData");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setFormData(parsedData);

      const isAkomodasi = Boolean(
        parsedData.cabang === "PARE - JATIM" &&
        parsedData.penjemputan &&
        parsedData.kendaraan &&
        parsedData.penumpang
      );

      setAkomodasi(isAkomodasi);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // Update state secara asinkron dan sinkronkan dengan sessionStorage
    setFormData((oldFormData) => {
      const updatedFormData = { ...oldFormData, [name]: value };
      sessionStorage.setItem("formData", JSON.stringify(updatedFormData));
      return updatedFormData;
    });
  };

  const handlePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedFormData = { ...formData, paymentmethod: e.target.value };
    setFormData(updatedFormData);
    sessionStorage.setItem("formData", JSON.stringify(updatedFormData));
  };


  // Handle submit form
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Simpan data di sessionStorage
    sessionStorage.setItem("formData", JSON.stringify(formData));

    // Redirect ke halaman thankyou
    const { isValid, missingFields } = validateFormDataKonfirmasi(formData);

    if (isValid) {
      router.push("/pages/thankyou")
    } else {
      const missingLabels = missingFields.map((item) => item.label);
      toast.error(
        "Mohon lengkapi data berikut: " + missingLabels.join(", ")
      );
    }
  };

  function capitalizeFirstLetter(val: string | number | undefined) {
    if (val === null || val === undefined) return val; // Return the value as is if it's null or undefined
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }


  const paymentMethod = [
    {
      id: "bsm",
      value: "Bank Syariah Indonesia",
      checked: formData.paymentmethod === "Bank Syariah Indonesia",
      icon: "https://idn-static-assets.s3-ap-southeast-1.amazonaws.com/website/img/merchant_logos/idn_bsi.png",
      label: "Bank Syariah Indonesia",
    },
    {
      id: "prismalink_bca",
      value: "Bank BCA",
      checked: formData.paymentmethod === "Bank BCA",
      icon: "https://idn-static-assets.s3-ap-southeast-1.amazonaws.com/emailblast/assets/merchant/img_logo_merchant_bca.png",
      label: "Bank BCA",
    },
    {
      id: "jatelindo",
      value: "Bank Mandiri",
      checked: formData.paymentmethod === "Bank Mandiri",
      icon: "https://idn-static-assets.s3-ap-southeast-1.amazonaws.com/emailblast/assets/merchant/img_logo_merchant_mandiri.png",
      label: "Bank Mandiri",
    },
    {
      id: "bni",
      value: "BNI",
      checked: formData.paymentmethod === "BNI",
      icon: "https://idn-static-assets.s3-ap-southeast-1.amazonaws.com/emailblast/assets/merchant/img_logo_merchant_bni.png",
      label: "BNI",
    },
    {
      id: "bri",
      value: "BRI",
      checked: formData.paymentmethod === "BRI",
      icon: "https://idn-static-assets.s3-ap-southeast-1.amazonaws.com/emailblast/assets/merchant/img_logo_merchant_bri.png",
      label: "BRI",
    },
  ];
  


  return (
    <CustomLayout
      mainline="Tinggal selangkah lagi menuju kesuksesan! 🚀"
      line="Konfirmasi dulu biar gak ada kekeliruan nanti {'<3'} ! 😍 #InggrisItuSeru #BelajarSeruDiLC"
    >

      <form onSubmit={handleSubmit}  >
        <div className={`mx-auto flex flex-col space-y-10 ${formData.cabang === "PARE - JATIM" ? "lg:space-y-3" : "lg:space-y-6"}`}>
          {/* Main Content */}

          <div className="w-full mx-auto rounded-3xl lg:border lg:border-gray-400 bg-white p-2 lg:py-3 lg:px-6 h-auto">
            <h2 className="mb-4 text-center text-black text-xl font-bold">Ringkasan Pembayaran</h2>
            {/* Data Diri */}
            <div className="lg:mb-3 mb-6">
              <h3 className="mb-3 text-[16px] font-semibold text-gray-700">Data Diri</h3>
              <div className="grid grid-cols-1 gap-y-4 lg:grid-cols-2 lg:gap-x-8">
                <div className="space-y-2">
                  <div className="flex items-center text-[14px]">
                    <span className="w-24 text-gray-500">Nama</span>
                    <span className="text-gray-700">: {capitalizeFirstLetter(formData.nama) || "Belum diisi"}</span>
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
                    <span className="w-24 text-gray-500">Jenis Kelamin</span>
                    <span className="text-gray-700">: {capitalizeFirstLetter(formData.gender) || "Belum diisi"}</span>
                  </div>
                  <div className="flex items-center text-[14px]">
                    <span className="w-24 text-gray-500">Kesibukan</span>
                    <span className="text-gray-700">: {capitalizeFirstLetter(formData.kesibukan) || "Belum diisi"}</span>
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
                    Paket {formData.paket?.label || ''} {formData.paketdetail?.label || ''}
                  </span>
                  <span>Rp. 9.000.000</span>
                </div>
                {
                 akomodasi ? (
                    <div className="flex justify-between text-gray-600">
                      <span>Biaya Tambahan</span>
                      <span>Rp. 900.000</span>
                    </div>
                  ) : []
                }
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

          <div className="w-full flex-col space-y-2 lg:block hidden">
            <Label htmlFor="paymentMethod" className="font-bold" required>Metode Pembayaran :</Label>
            <Select
              className=""
              name="paymentmethod"
              options={paymentMethod}
              placeholder="Pilih Metode Pembayaran"
              value={formData.paymentmethod}
              onChange={handleChange}
              required

            />
          </div>

          <div className="flex flex-col space-y-3 lg:hidden">
          <Label htmlFor="paymentMethod" className="font-bold" required>Metode Pembayaran :</Label>    
          <div className="flex flex-col space-y-4 lg:hidden">
            {
              paymentMethod.map((item) => (
                <PaymentOption
                  key={item.id}
                  id={item.id}
                  value={item.value}
                  checked={item.checked}
                  icon={item.icon}
                  label={item.label}
                  onChange={handlePayment}
                />
              ))
            }
          </div>
          </div>




          {/* Privacy Policy */}
          <div className="">
            <div className="flex items-center justify-center space-x-2 pb-4">
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
            <div className="flex flex-row w-full gap-4">
              <Button type="button" className="w-full bg-white border-2 border-main-color" onClick={() => formData.cabang !== "PARE - JATIM" ? router.push("/pages/program") : router.push("/pages/akomodasi")}>Kembali</Button>

              <Button
                disabled={!accepted}
                type="submit"
                className="w-full transition-all duration-200 bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Konfirmasi
              </Button>

            </div>
          </div>

        </div>
      </form>

    </CustomLayout>
  );
}

