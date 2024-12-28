"use client";
import { Open_Sans } from "next/font/google";
import "../globals.css";
import DashboardSidebar from "@/components/DashboardSideBar/DashboardSidebar";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/hooks/AuthProvider";
import { getUserRole } from "@/api/user";
import Link from "next/link";
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

export default function RootLayout({ children }) {
  const { user } = useContext(AuthContext);
  // console.log(user);

  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      getUserRole(user.email).then((data) => {
        setRole(data);
        setLoading(false);
      });
    }
  }, [user]);

  // console.log(role);

  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className="">
            <div className="bg-gray-100 fixed w-full z-30 flex border p-2 items-center justify-center h-16 px-10">
              <div className="logo ml-12 dark:text-black  transform ease-in-out duration-500 flex-none h-full flex items-center justify-center">
                <Link href="/"> NY MORGEN</Link>
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
                    {user?.displayName}
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-10">
              <DashboardSidebar role={role} />
              <div className="pt-20 pl-16 px-10 min-h-screen text-black">
                {children}
              </div>
            </div>
          </div>
        )}
      </QueryClientProvider>
    </>
  );
}
