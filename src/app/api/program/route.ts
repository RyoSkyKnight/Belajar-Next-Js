import { NextResponse } from "next/server";

// Define the form data structure
interface FormData {
  [key: string]: string | number | boolean;
}

// Variabel untuk menyimpan data form sementara (mock storage)
let formDataStore: FormData | null = null;

// Menangani POST request untuk menyimpan data
export async function POST(request: Request) {
  const data = await request.json(); // Ambil data dari body request
  formDataStore = data; // Simpan data di mock storage
  return NextResponse.json({ message: "Data berhasil disimpan!", data });
}

// Menangani GET request untuk mengambil data
export async function GET() {
  if (formDataStore) {
    return NextResponse.json(formDataStore);
  } else {
    return NextResponse.json({ error: "No data available" }, { status: 404 });
  }
}
