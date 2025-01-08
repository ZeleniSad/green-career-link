import { ReactNode } from "react";
import { DashboardLayout } from "@/components/dashboard-layout/dashboard-layout";

const Layout = ({ children }: { children: ReactNode }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
