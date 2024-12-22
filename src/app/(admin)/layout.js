import { Open_Sans } from "next/font/google";
import "../globals.css";
import DashboardSidebar from "@/components/DashboardSideBar/DashboardSidebar";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  adjustFontFallback: false,
  display: "swap",
  weight: ["500", "700"],
});

export const metadata = {
  title: "Admin Dashboard",
  description: "Created by Mahbub Ahmed",
};

export default function RootLayout({ children }) {
  return (
    <>
      <div className="fixed w-full z-30 flex bg-white border p-2 items-center justify-center h-16 px-10">
        <div className="logo ml-12 dark:text-black  transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
          NERVE
        </div>
        <div className="grow h-full flex items-center justify-center"></div>
        <div className="flex-none h-full text-center flex items-center justify-center">
          <div className="flex space-x-3 items-center px-3">
            <div className="flex-none flex justify-center">
              <div className="w-8 h-8 flex ">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShta_GXR2xdnsxSzj_GTcJHcNykjVKrCBrZ9qouUl0usuJWG2Rpr_PbTDu3sA9auNUH64&usqp=CAU"
                  alt="profile"
                  className="shadow rounded-full object-cover"
                />
              </div>
            </div>

            <div className="hidden md:block text-sm md:text-md text-black dark:text-white">
              John Doe
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        <DashboardSidebar />
        <div className="bg-white text-black">{children}</div>
      </div>
    </>
  );
}
