import Image from "next/image";
import logo from "./_assets/logolc.png";
import jk from "./_assets/jk.png";
import tag from "./_assets/logo.png";
import Navbar from "./_partials/navbar";
import "../globals.css";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

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
        router.push("/");
      }
    }
  }, [router]);
  return (
    <div className="flex flex-row w-full h-auto lg:h-screen bg-img">
      {/* Container */}
      <div className="lg:w-[60%] w-[100%] h-full bg-white shadow-lg lg:rounded-tr-[40px] lg:rounded-br-[40px] items-center justify-center align-middle">
        <div className="mx-10 my-5">
          {/* Logo */}
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={150}
            className="mx-auto"
          />

          {/* Tagline */}
          <TagDescription mainline={mainline} line={line}/>

          {/* Navbar */}
          <Navbar />

          {/* Main Content */}
          <div className="mt-10">
            {children}
          </div>
        </div>
      </div>

      {/* Side Content */}

      <div className="lg:block hidden w-[40%] h-full relative">
        <div className="w-full h-full">
          <div className="lg:flex items-center justify-center w-full h-full relative">
            {/* Background image */}
            <Image
              src={jk}
              alt="Side Image"
              width={900} // Use appropriate width
              height={600} // Use appropriate height
              className="object-cover w-full" // Optional for styling
            />
            {/* Tag image */}
            <Image
              src={tag}
              alt="Tag Image"
              width={400} // Use appropriate width
              height={100} // Use appropriate height
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[100]" // Centering and layering
            />
          </div>
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
    <div className="my-4 text-center w-full mx-auto">
      <p className="font-bold text-black lg:text-base text-sm text-center">{mainline} <span> <br />  </span> <span className="text-gray-500 font-normal lg:text-base text-xs">{line}</span> </p>
    </div>
  );
}
