"use client";

import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/hooks/AuthProvider";
import { getUserRole } from "@/api/user";
import Cookies from "js-cookie";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setRole(Cookies.get("user-role"));

    if (!role) {
      if (user?.email) {
        setRoleLoading(true);
        getUserRole(user.email)
          .then((data) => {
            setRole(data);
            setRoleLoading(false);
          })
          .catch(() => setRoleLoading(false));
      } else {
        setRoleLoading(false);
      }
    }
  }, [user]);

  if (loading || roleLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (user && user.uid && role === "admin") {
    return <>{children}</>;
  }

  // Redirect to the dashboard if not authorized
  router.push("/admindashboard");
  return null;
};

export default AdminRoute;
