export interface FormData {
    nama: string;
    email: string;
    nomor: string | number;
    gender: string;
    umur: string;
    kesibukan: string;
    knowlcfrom: string;
    ketentuan: boolean;
    paket: { value: string; label: string };
    paketdetail: { value: string; label: string };
    jampertemuanprivate1: string;
    jampertemuanprivate2: string;
    jampertemuan: string;
    tipekamar: string;
    cabang: string;
    periode: string;
    lokasijemput: string;
    kendaraan: string;
    penumpang: string;
    diskon: string;
    pembayaran: string;
    [key: string]: string | number | boolean | { value: string; label: string };
  }
  

export const defaultFormData: FormData = {
    nama: "",
    email: "",
    nomor: "",
    gender: "",
    umur: "",
    kesibukan: "",
    knowlcfrom: "",
    ketentuan: false,
    cabang: "",
    periode: "",
    paket: { value: "", label: "" },
    paketdetail: { value: "", label: "" },
    jampertemuanprivate1: "",
    jampertemuanprivate2: "",
    jampertemuan: "",
    tipekamar: "",
    lokasijemput: "",
    kendaraan: "",
    penumpang: "",
    diskon: "",
    pembayaran: "",
  };
  