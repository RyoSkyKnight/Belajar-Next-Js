import Image from "next/image";
import logo from "./_assets/logo.png";
import Navbar from "./_partials/navbar";
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
  return (
    <html lang="en">
      <body>
        <div className="flex flex-row w-full h-auto lg:h-screen bg-main-color">
          {/* Container */}
          <div className="lg:w-[55%] w-full h-full bg-white shadow-lg lg:rounded-tr-[40px] lg:rounded-br-[40px]">
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
          <div className="lg:block hidden">
            <div className="lg:flex items-center justify-center flex-1">
                <p className="text-2xl">Side Content</p>
            </div>
          </div>
        </div>
      </body>
    </html>
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
