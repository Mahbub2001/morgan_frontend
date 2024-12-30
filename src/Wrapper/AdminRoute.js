"use client";

import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/navigation";
import { getUserRole } from "@/api/getUserRole";
import { AuthContext } from "@/hooks/AuthProvider";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    if (user?.email) {
      setRoleLoading(true);
      getUserRole(user.email).then((data) => {
        setRole(data);
        setRoleLoading(false);
      });
    } else if (!loading) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!roleLoading && role !== "admin") {
      alert(
        "Warning: You tried to access an admin route, but you don't have the required permissions."
      );
      router.push("/");
    }
  }, [roleLoading, role, router]);

  if (loading || roleLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <div
          className="animate-spin inline-block w-8 h-8 border-4 rounded-full
        border-current"
        >
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (role === "admin") {
    return children;
  }

  return null;
};

export default AdminRoute;
