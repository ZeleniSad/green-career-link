import { ReactNode } from "react";
import { DashboardLayout } from "@/components/dashboard-layout/dashboard-layout";
import ProtectedRoute from "@/components/routes/protected-route";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <ProtectedRoute>
      <DashboardLayout>{children}</DashboardLayout>
    </ProtectedRoute>
  );
};

export default Layout;
