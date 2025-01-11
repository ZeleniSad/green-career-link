import type { Metadata } from "next";
import { YesDoItThemeProvider } from "@/config/theme/yes-do-it-theme-provider";
import { GlobalStyles } from "@mui/material";
import React from "react";
import { AuthProvider } from "@/context/authContext";

export const metadata: Metadata = {
  title: "Yes Do It",
  description: "Yes Do It",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <YesDoItThemeProvider>
        <GlobalStyles styles={{ html: { scrollBehavior: "smooth" } }} />
        <html lang="en">
          <body style={{ margin: 0 }}>{children}</body>
        </html>
      </YesDoItThemeProvider>
    </AuthProvider>
  );
}
