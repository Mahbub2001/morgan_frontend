"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const withProtectedRoute = (WrappedComponent) => {
  const WithAuthProtection = (props) => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
      return null;
    };

    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      setIsLoading(true);
      const token = getCookie("ny-token");
      if (!token) {
        router.push("/login");
      } else {
        setIsLoading(false);
      }
    }, [router]);

    if (isLoading) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} />;
  };

  WithAuthProtection.displayName = `WithProtectedRoute(${
    WrappedComponent.displayName || WrappedComponent.name || "Component"
  })`;

  return WithAuthProtection;
};

export default withProtectedRoute;
