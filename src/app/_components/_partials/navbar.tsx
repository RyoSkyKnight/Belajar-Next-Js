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

  enum ReferrerEnum {
    DataDiri = 0,
    Program = 1,
    Akomodasi = 2,
    Konfirmasi = 3,
  }

  const getActiveStatus = (currentPath: string) => {
    switch (currentPath) {
      case "/":
        return ReferrerEnum.DataDiri;
      case "/pages/program":
        return ReferrerEnum.Program;
      case "/pages/akomodasi":
        return ReferrerEnum.Akomodasi;
      case "/pages/konfirmasi":
        return ReferrerEnum.Konfirmasi;
      default:
        return ReferrerEnum.DataDiri;
    }
  };

  const shouldBeActive = (itemEnum: ReferrerEnum, currentPathEnum: ReferrerEnum) => {
    return itemEnum <= currentPathEnum;
  };

  const currentPathEnum = getActiveStatus(pathname);

  // Update `completedSteps` whenever `formData` changes
  useEffect(() => {
    setCompletedSteps({
      dataDiri: Boolean(
        formData.nama &&
          formData.email &&
          formData.nomor &&
          formData.gender &&
          formData.kesibukan &&
          formData.knowlcfrom
      ),
      program: Boolean(
        formData.cabang &&
          formData.periode &&
          formData.paket &&
          formData.paketdetail &&
          (() => {
            switch (formData.paket) {
              case "intergrated":
                return formData.jampertemuan;
              case "private":
                return formData.jampertemuanprivate1 && formData.jampertemuanprivate2;
              default:
                return formData.tipekamar;
            }
          })()
      ),
      akomodasi: Boolean(
        formData.cabang  === "PARE - JATIM" &&
        formData.lokasijemput && 
        formData.kendaraan
      ),
    });
  }, [formData]);

  // Load initial data from sessionStorage
  useEffect(() => {
      const savedData = sessionStorage.getItem("formData");
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
  }, []);

  const navItems = [
    {
      label: "Data Diri",
      path: "/",
      step: "dataDiri",
      enabled: true,
      enumValue: ReferrerEnum.DataDiri,
    },
    {
      label: "Program",
      path: "/pages/program",
      step: "program",
      enabled: completedSteps.dataDiri,
      enumValue: ReferrerEnum.Program,
    },
    ...(formData?.cabang === "PARE - JATIM" && completedSteps.program && completedSteps.dataDiri
      ? [
          {
            label: "Akomodasi",
            path: "/pages/akomodasi",
            step: "akomodasi",
            enabled: completedSteps.program && completedSteps.dataDiri,
            enumValue: ReferrerEnum.Akomodasi,
          },
        ]
      : []),
    {
      label: "Konfirmasi",
      path: "/pages/konfirmasi",
      step: "konfirmasi",
      enabled:
        formData?.cabang === "PARE - JATIM"
          ? completedSteps.akomodasi && completedSteps.program && completedSteps.dataDiri
          : completedSteps.program && completedSteps.dataDiri,
      enumValue: ReferrerEnum.Konfirmasi,
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
                    shouldBeActive(item.enumValue, currentPathEnum)
                      ? "bg-yellow-400 border-yellow-400"
                      : "border-gray-300"
                  } ${
                    pathname === item.path
                      ? "shadow-md scale-105"
                      : ""
                  }`}
                >
                  {pathname === item.path && (
                    <div className="lg:w-2.5 lg:h-2.5 w-3.5 h-3.5 rounded-full bg-white"></div>
                  )}
                </div>
                <span
                  className={`lg:text-xs text-[10px] w-12 font-medium ${
                    shouldBeActive(item.enumValue, currentPathEnum) ? "text-yellow-400" : "text-gray-400"
                  }`}
                >
                  {item.label}
                </span>
              </Link>

              {!item.enabled && (
                <div className="absolute top-full w-max hidden px-3 py-1 text-xs text-white bg-black rounded shadow-lg group-hover:block">
                  Isi data sebelumnya
                </div>
              )}
            </div>

            {index < navItems.length - 1 && (
              <div
                className={`h-[1px] lg:w-12 w-10 mb-5 transition-all ${
                  shouldBeActive(item.enumValue, currentPathEnum) && 
                  shouldBeActive(navItems[index + 1].enumValue, currentPathEnum)
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