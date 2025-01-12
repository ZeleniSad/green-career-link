import type { Metadata } from "next";
import { GreenCareerLinkThemeProvider } from "@/config/theme/green-career-link-theme-provider";
import { GlobalStyles } from "@mui/material";
import React from "react";
import { AuthProvider } from "@/context/authContext";

export const metadata: Metadata = {
  title: "Green Career Link",
  description: "Green Career Link",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <GreenCareerLinkThemeProvider>
        <GlobalStyles styles={{ html: { scrollBehavior: "smooth" } }} />
        <html lang="en">
          <body style={{ margin: 0 }}>{children}</body>
        </html>
      </GreenCareerLinkThemeProvider>
    </AuthProvider>
  );
}
