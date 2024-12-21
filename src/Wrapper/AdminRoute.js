import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/hooks/AuthProvider";
import { getUserRole } from "@/api/user";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [role, setRole] = useState(null);
  const [roleLoading, setRoleLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
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
  router.push("/dashboard");
  return null;
};

export default AdminRoute;
