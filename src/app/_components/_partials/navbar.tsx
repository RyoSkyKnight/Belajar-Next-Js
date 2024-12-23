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
      // Get data from sessionStorage
      const savedData = sessionStorage.getItem("formData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setFormData(parsedData);

        // Validate steps
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
      enabled: true, // Always enabled
    },
    {
      label: "Program",
      path: "/pages/program",
      step: "program",
      enabled: completedSteps.dataDiri, // Enabled only if Data Diri is completed
    },
    ...(formData?.cabang === "PARE - JATIM"
      ? [
          {
            label: "Akomodasi",
            path: "/pages/akomodasi",
            step: "akomodasi",
            enabled: completedSteps.program, // Enabled only if Program is completed
          },
        ]
      : []),
    {
      label: "Konfirmasi",
      path: "/pages/konfirmasi",
      step: "konfirmasi",
      enabled:
        formData?.cabang === "PARE - JATIM"
          ? completedSteps.akomodasi // If "PARE - JATIM", depends on Akomodasi
          : completedSteps.program, // Otherwise, depends on Program
    },
  ];

  return (
    <nav className="w-full mx-auto lg:max-w-5 pt-5 px-6">
      <div className="flex items-center justify-center -space-x-2">
        {navItems.map((item, index) => (
          <div key={item.path} className="flex items-center">
            {/* Step Item */}
            <div className="flex flex-col items-center">
              <Link
                href={item.enabled ? item.path : "#"}
                className={`relative flex flex-col items-center gap-2 transition-all text-center ${
                  !item.enabled ? "cursor-not-allowed opacity-50" : ""
                }`}
              >
                {/* Step Circle */}
                <div
                  className={`lg:w-3.5 lg:h-3.5 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                    item.enabled
                      ? "bg-yellow-400 border-yellow-400"
                      : "border-gray-300"
                  } ${
                    pathname === item.path
                      ? "shadow-md scale-105" // Highlight current path
                      : ""
                  }`}
                >
                  {pathname === item.path && item.enabled && (
                    <div className="lg:w-2.5 lg:h-2.5 w-3.5 h-3.5 rounded-full bg-white"></div>
                  )}
                </div>

                {/* Step Label */}
                <span
                  className={`lg:text-xs text-[10px] w-12 font-medium ${
                    item.enabled ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </div>

            {/* Divider */}
            {index < navItems.length - 1 && (
              <div
                className={`h-[1px] lg:w-12 w-10 mb-5 transition-all ${
                  item.enabled &&
                  navItems[index + 1]?.enabled
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
