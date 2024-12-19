"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();

  const [completedSteps, setCompletedSteps] = useState({
    dataDiri: false,
    program: false,
    akomodasi: false,
  });

  // Periksa status form dari sessionStorage
  useEffect(() => {
    const formData = sessionStorage.getItem("formData");
    if (formData) {
      const parsedData = JSON.parse(formData);

      // Validasi langkah-langkah
      setCompletedSteps({
        dataDiri: Boolean(parsedData?.nama && parsedData?.email && parsedData?.nomor && parsedData?.gender && parsedData?.kesibukan && parsedData?.knowlcfrom),
        program: Boolean(parsedData?.cabang && parsedData?.periode && parsedData?.paket && parsedData?.paketDetail),
        akomodasi: Boolean(parsedData?.lokasijemput && parsedData?.kendaraan && parsedData?.pilihankamar && parsedData?.tipekamar), // Contoh tambahan untuk akomodasi
      });
    }
  }, [pathname]); // Jalankan ulang jika pathname berubah

  const navItems = [
    { label: "Data Diri", path: "/", enabled: true },
    { label: "Program", path: "/pages/program", enabled: completedSteps.dataDiri },
    { label: "Akomodasi", path: "/pages/akomodasi", enabled: completedSteps.program },
    { label: "Konfirmasi", path: "/pages/konfirmasi", enabled: completedSteps.akomodasi },
  ];

  return (
    <nav className="w-auto">
      <div className="w-auto mx-auto">
        <div className="w-auto flex flex-row items-center justify-center lg:gap-6 gap-2 py-4">
          {navItems.map((item) => (
            <div className="relative group" key={item.path}>
              <Link
                href={item.enabled ? item.path : "#"} // Jika tidak enabled, gunakan '#'
                className={`relative px-2 py-1 transition-all duration-200 ${
                  pathname === item.path
                    ? "font-bold text-black"
                    : item.enabled
                    ? "text-gray-600 hover:text-main-color"
                    : "text-gray-400 cursor-not-allowed"
                }`}
              >
                {item.label}
                {pathname === item.path && item.enabled && (
                  <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-400" />
                )}
              </Link>

              {/* Tooltip untuk tab yang disabled */}
              {!item.enabled && (
               <span className="w-max absolute px-3 py-1 text-xs bg-black text-white rounded opacity-0 group-hover:opacity-100 transition-opacity z-10 top-7 left-1/2 transform -translate-x-1/2">
               Isi data form sebelumnya terlebih dahulu
             </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
