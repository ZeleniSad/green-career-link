"use client";
import { ReactNode } from "react";
import { Grid } from "@mui/system";
import { Typography } from "@mui/material";
import { LogoBar } from "@/components/logos/logo-bar";
import { useRouter } from "next/navigation";

const label = {
  greenCareerLink: "GREEN CAREER LINK",
};

export const AuthenticationWrapper = ({
  children,
}: {
  children: ReactNode;
}) => {
  const router = useRouter();
  return (
    <Grid
      container
      sx={{
        backgroundImage: "url(/images/authentication-background.png)",
        overflow: "hidden",
        width: "100%",
        minHeight: "100vh",
        p: 2,
      }}
    >
      <Grid container width="100%">
        <LogoBar />
        <Grid container width="100%" justifyContent="center">
          {children}
        </Grid>
        <Grid container sx={{ alignItems: "flex-end" }}>
          <Typography
            variant="h4"
            color="primary"
            fontWeight={900}
            onClick={() => router.push("/")}
            sx={{ cursor: "pointer" }}
          >
            {label.greenCareerLink}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};
