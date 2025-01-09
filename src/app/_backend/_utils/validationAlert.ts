import { FormData } from "./Interfaces";

export const validateFormData = (formData: FormData ) => {
  const requiredFields = [
    { field: "nama", label: "Nama Lengkap" },
    { field: "email", label: "Email" },
    { field: "nomor", label: "Nomor WhatsApp" },
    { field: "gender", label: "Jenis Kelamin" },
    { field: "kesibukan", label: "Kesibukan" },
  ];

  const missingFields = requiredFields.filter(
    (item) => !formData[item.field as keyof typeof formData]
  );

  // Validate nama field
  const namaValue = String(formData.nama || '');
  const isNameValid = /^[a-zA-Z\s.,]+$/.test(namaValue);
  const isNameStartsWithSpace = namaValue.startsWith(' ');
  const nomorValue = String(formData.nomor);

  if (nomorValue.length < 10) {
    return {
      isValid: false,
      missingFields: [{ field: "nomor", label: "Nomor WhatsApp minimal 10 digit" }],
    };
  }

  if (nomorValue.length > 15) {
    return {
      isValid: false,
      missingFields: [{ field: "nomor", label: "Nomor WhatsApp tidak valid" }],
    };
  }

  if (!isNameValid && namaValue) {
    return {
      isValid: false,
      missingFields: [{ field: "nama", label: "Nama Lengkap hanya boleh mengandung huruf, titik, dan koma" }],
    };
  }

  if (isNameStartsWithSpace) {
    return {
      isValid: false,
      missingFields: [{ field: "nama", label: "Nama Lengkap tidak boleh diawali dengan spasi" }],
    };
  }

  // Validate email field
  const emailValue = String(formData.email || '');
  const isEmailStartsWithSpace = emailValue.startsWith(' ');

  if (isEmailStartsWithSpace) {
    return {
      isValid: false,
      missingFields: [{ field: "email", label: "Email tidak boleh diawali dengan spasi" }],
    };
  }

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};

export const validateFormDataProgram = ( formData: FormData) => {

  const savedData = JSON.parse(sessionStorage.getItem("formData") || "{}");

  const requiredFields = [
    { field: "cabang", label: "Cabang" },
    { field: "periode", label: "Periode" },
    { field: "paket", label: "Paket" },
    { field: "paketdetail", label: "Durasi Paket" },
  ];

  // Tambahkan field berdasarkan nilai `data.paket`
  switch (savedData?.paket?.value) {
    case "intergrated":
      requiredFields.push(
        { field: "jampertemuan", label: "Jam Pertemuan" }
      );
      break;
    case "private":
      requiredFields.push(
        { field: "jampertemuanprivate1", label: "Jam Pertemuan Private 1" },
        { field: "jampertemuanprivate2", label: "Jam Pertemuan Private 2" }
      );
      break;
    default:
      requiredFields.push(
        { field: "tipekamar", label: "Tipe Kamar" }
      );
      break;
  }

  // Cek field yang kosong
  const missingFields = requiredFields.filter(
    (item) => !formData[item.field as keyof typeof formData]
  );

  // Output validasi
  return {
    isValid: missingFields.length === 0,
    missingFields, // Field yang kosong beserta label
  };

};

export const validateFormDataAkomodasi = (formData: FormData) => {

  const requiredFields = [
    { field: "lokasijemput", label: "Penjemputan" },
  ];

  switch (formData.lokasijemput) {
    case "ga_perlu_dijemput":
      break;
    default:
      requiredFields.push(
        { field: "kendaraan", label: "Kendaraan" },
        { field: "penumpang", label: "Banyak Penumpang" },
      );
      break;
  };
  const missingFields = requiredFields.filter(
    (item) => !formData[item.field as keyof typeof formData]
  );

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};


export const validateFormDataKonfirmasi = (formData: FormData) => {

  const requiredFields = [
    { field: "pembayaran", label: "Metode Pembayaran" },
  ];
  const missingFields = requiredFields.filter(
    (item) => !formData[item.field as keyof typeof formData]
  );

  return {
    isValid: missingFields.length === 0,
    missingFields,
  };
};