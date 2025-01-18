import localFont from "next/font/local";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/hooks/AuthProvider";
import { ToastContainer, toast } from "react-toastify";
import SettingsProvider from "@/hooks/SettingsProvider";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  adjustFontFallback: false,
  display: "swap",
  weight: ["500", "700"],
});

const futuraSans = localFont({
  src: [
    {
      path: "/fonts/FuturaLT-Book.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/FuturaLT-BookOblique.woff",
      weight: "400",
      style: "italic",
    },
    {
      path: "/fonts/FuturaLT-Light.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "/fonts/FuturaLT-LightOblique.woff",
      weight: "300",
      style: "italic",
    },
    {
      path: "/fonts/FuturaLT.woff",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-futura-sans",
});

export const metadata = {
  title: "Ny Morgan",
  description: "Created by Mahbub Ahmed",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning={true}
        className={`${openSans.variable} ${futuraSans.variable} antialiased`}
      >
        <AuthProvider>
          <SettingsProvider>
            <main>{children}</main>
          </SettingsProvider>
        </AuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
{
  /* <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script> */
}
