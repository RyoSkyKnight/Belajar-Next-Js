import type { Metadata } from "next";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Registrasi language Center",
  description: "Registrasi Language Center",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = sessionStorage.getItem("formData");
      if (!savedData) {
        router.push("/");
      }
    }
  }, [router]);
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
