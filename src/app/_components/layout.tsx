import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Registrasi language Center",
  description: "Registrasi Language Center",
};

export default function CustomLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-row w-full h-screen">
            <div className="">1</div>
            
            <div className="">2</div>
        </div>
        {children}
      </body>
    </html>
  );
}
