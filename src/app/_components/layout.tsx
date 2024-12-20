import Image from "next/image";
import logo from "./_assets/logolc.png";
import jk from "./_assets/jk.png";
import tag from "./_assets/logo.png";
import Navbar from "./_partials/navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import "../globals.css";

interface CustomLayoutProps {
  children: React.ReactNode;
  mainline: string; // Tambahkan mainline
  line: string; // Tambahkan line
}

export default function CustomLayout({
  children,
  mainline,
  line,
}: CustomLayoutProps) {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = sessionStorage.getItem("formData");
      if (!savedData) {
        // Redirect to home page if session data is not found
        router.push("/");
      }
    }
  }, [router]);

  return (
    <div className="flex flex-row w-full h-auto lg:h-screen bg-img">
      {/* Container */}
      <div className="lg:w-[60%] md:w-full w-full h-full bg-white shadow-lg lg:rounded-tr-[40px] lg:rounded-br-[40px]">
        <div className="mx-10 my-10">
          {/* Logo */}
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={150}
            className="mx-auto"
          />

          {/* Tagline */}
          <TagDescription mainline={mainline} line={line} />

          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <div className="mt-10">
            {children}
          </div>
        </div>
      </div>

      {/* Side Content */}
      <div className="lg:block hidden h-full relative">
        <div className="lg:flex items-center justify-center w-full h-full relative">
          {/* Background image */}
          <Image
            src={jk}
            alt="Side Image"
            className="object-cover w-full"
          />
          {/* Tag image */}
          <Image
            src={tag}
            alt="Tag Image"
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]"
          />
        </div>
      </div>
    </div>
  );
}

// Komponen Tagline/Deskripsi
function TagDescription({
  mainline,
  line,
}: {
  mainline: string;
  line: string;
}) {
  return (
    <div className="my-4 text-center">
      <p className="font-bold text-black">{mainline} <span className="text-gray-500 font-normal">{line}</span> </p>
    </div>
  );
}
