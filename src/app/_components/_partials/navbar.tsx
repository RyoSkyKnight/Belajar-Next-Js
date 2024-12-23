"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const Navbar = () => {
  const pathname = usePathname();

  const [completedSteps, setCompletedSteps] = useState<{
    [key: string]: boolean;
  }>({
    dataDiri: false,
    program: false,
    akomodasi: false,
  });

  const [formData, setFormData] = useState<{ [key: string]: string | number }>({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = sessionStorage.getItem("formData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);

        setCompletedSteps({
          dataDiri: Boolean(
            parsedData.nama &&
              parsedData.email &&
              parsedData.nomor &&
              parsedData.gender &&
              parsedData.kesibukan &&
              parsedData.knowlcfrom
          ),
          program: Boolean(
            parsedData.cabang &&
              parsedData.periode &&
              parsedData.paket &&
              parsedData.paketdetail &&
              parsedData.tipekamar
          ),
          akomodasi: Boolean(
            parsedData.cabang === "PARE - JATIM" &&
              parsedData.lokasijemput &&
              parsedData.kendaraan
          ),
        });
      }
    }
  }, [pathname]);

  const navItems = [
    {
      label: "Data Diri",
      path: "/",
      step: "dataDiri",
      enabled: true,
    },
    {
      label: "Program",
      path: "/pages/program",
      step: "program",
      enabled: completedSteps.dataDiri,
    },
    ...(formData?.cabang === "PARE - JATIM"
      ? [
          {
            label: "Akomodasi",
            path: "/pages/akomodasi",
            step: "akomodasi",
            enabled: completedSteps.program,
          },
        ]
      : []),
    {
      label: "Konfirmasi",
      path: "/pages/konfirmasi",
      step: "konfirmasi",
      enabled:
        formData?.cabang === "PARE - JATIM"
          ? completedSteps.akomodasi
          : completedSteps.program,
    },
  ];

  return (
    <nav className="w-full mx-auto lg:max-w-5 pt-5 px-6">
      <div className="flex items-center justify-center -space-x-2">
        {navItems.map((item, index) => (
          <div key={item.path} className="flex items-center">
            <div className="relative flex flex-col items-center group">
              <Link
                href={item.enabled ? item.path : "#"}
                className={`relative flex flex-col items-center gap-2 transition-all text-center ${
                  !item.enabled ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                <div
                  className={`lg:w-3.5 lg:h-3.5 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                    item.enabled
                      ? "bg-yellow-400 border-yellow-400"
                      : "border-gray-300"
                  } ${
                    pathname === item.path
                      ? "shadow-md scale-105"
                      : ""
                  }`}
                >
                  {pathname === item.path && item.enabled && (
                    <div className="lg:w-2.5 lg:h-2.5 w-3.5 h-3.5 rounded-full bg-white"></div>
                  )}
                </div>
                <span
                  className={`lg:text-xs text-[10px] w-12 font-medium ${
                    item.enabled ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>

              {/* Tooltip */}
              {!item.enabled && (
                <div className="absolute top-full w-max hidden px-3 py-1 text-xs text-white bg-black rounded shadow-lg group-hover:block">
                  Isi data sebelumnya
                </div>
              )}
            </div>

            {index < navItems.length - 1 && (
              <div
                className={`h-[1px] lg:w-12 w-10 mb-5 transition-all ${
                  item.enabled && navItems[index + 1]?.enabled
                    ? "bg-yellow-400"
                    : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
