"use client";
import { useAuth } from "@/context/authContext";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading, accessToken } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      const decodedToken: { admin: boolean } = jwtDecode(accessToken ?? "");
      if (!decodedToken.admin) {
        router.push("/not-authorized");
      }
    } else if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default AdminRoute;
