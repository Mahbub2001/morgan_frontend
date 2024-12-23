import localFont from "next/font/local";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import AuthProvider from "@/hooks/AuthProvider";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  adjustFontFallback: false,
  display: "swap",
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
        <AuthProvider>
          <div>{children}</div>
        </AuthProvider>
      <script src="../path/to/flowbite/dist/flowbite.min.js"></script>
      </body>
    </html>
  );
}
