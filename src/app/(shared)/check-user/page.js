"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/hooks/AuthProvider";
import { getUserRole } from "@/api/user";
import Cookies from "js-cookie";

const CheckUser = () => {
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserType = async () => {
      if (!user) {
        router.push("/login");
        return;
      }

      const savedRole = Cookies.get("user-role");
      if (savedRole) {
        setRole(savedRole);
        setLoading(false);
        return;
      }

      try {
        const fetchedRole = await getUserRole(user.email);
        setRole(fetchedRole);
        Cookies.set("user-role", fetchedRole, { expires: 7 });

        setLoading(false);
        if (fetchedRole === "admin") {
          router.push("/admindashboard");
        } else if (fetchedRole === "user") {
          router.push("/userdashboard");
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error fetching user role:", error);
        setLoading(false);
        router.push("/login");
      }
    };

    fetchUserType();
  }, [user, router]);

  if (loading) {
    return <div>Checking user type...</div>;
  }

  return null;
};

export default CheckUser;
