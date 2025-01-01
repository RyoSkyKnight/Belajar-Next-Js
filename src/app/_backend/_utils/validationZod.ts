import {z} from "zod";

export const dataDiriSchema = z.object({
    nama : z.string().min(1, "Nama tidak boleh kosong"),
    email : z.string().email("Email tidak valid"),
    nomor : z.string().max(15, "Nomor WhatsApp tidak valid"),
    gender : z.string().min(1, "Jenis Kelamin harus dipilih"),
    umur : z.string().min(1, "Umur harus dipilih"),
    kesibukan : z.string().min(1, "Kesibukan harus dipilih"),
    knowlcfrom : z.string().min(1, "Harus dipilih"),
});


export const programSchema = z.object({
    cabang : z.string().min(1, "Cabang harus dipilih"),
    periode : z.string().min(1, "Periode harus dipilih"),
    paket : z.object({
        value : z.string().min(1, "Paket harus dipilih"),
        label : z.string().min(1, "Paket harus dipilih"),
    }),
    paketdetail : z.object({
        value : z.string().min(1, "Paket harus dipilih"),
        label : z.string().min(1, "Paket harus dipilih"),
    }),
    jampertemuan : z.string().min(1, "Jam Pertemuan harus dipilih"),
    jampertemuanprivate1 : z.string().min(1, "Jam Pertemuan Private 1 harus dipilih"),
    jampertemuanprivate2 : z.string().min(1, "Jam Pertemuan Private 2 harus dipilih"),
    tipekamar : z.string().min(1, "Tipe Kamar harus dipilih"),
});