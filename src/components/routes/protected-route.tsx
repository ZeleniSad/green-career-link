"use client";
import { useAuth } from "@/context/authContext";
import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loading } from "@/components/loading/loading";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return <Loading isOpen={loading} />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
