"use client";
import { FC } from "react";
import { Grid } from "@mui/system";
import { Typography, useMediaQuery } from "@mui/material";
import { AuthenticationWrapper } from "@/components/authentication-wrapper/authentication-wrapper";
import { useTheme } from "@mui/material/styles";

interface SuccessPageProps {
  label: string;
  title: string;
  subtitle?: string;
}

export const SuccessPage: FC<SuccessPageProps> = ({
  label,
  title,
  subtitle,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <AuthenticationWrapper>
      <Grid
        container
        flexDirection="column"
        gap={3}
        width={isMobile ? "100%" : "50%"}
      >
        <Typography variant="h4" fontWeight={700}>
          {label}
        </Typography>
        <Typography variant="h1" fontWeight={700}>
          {title}
        </Typography>
        <Typography variant="body1">{subtitle}</Typography>
      </Grid>
    </AuthenticationWrapper>
  );
};
