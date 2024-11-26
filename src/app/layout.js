import localFont from "next/font/local";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["500", "700"],
});

export const metadata = {
  title: "Ny Morgan",
  description: "Created by Mahbub Ahmed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${openSans.variable} antialiased font-sans`}>
        <div className="bg-black text-white flex flex-col justify-center items-center">
          <p className="py-2 tracking-widest text-sm">
            BLACK WEEK- SAVE 20% ON EVERYTHING
          </p>
        </div>
        <div className="bg-gray-100 flex flex-col justify-center items-center">
          <p className="py-2 tracking-wider text-sm">
            Free shipping / Christmas gifts are exchanged empty 15-01-25 / Easy
            return
          </p>
        </div>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
