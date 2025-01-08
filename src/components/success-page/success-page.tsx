"use client";
import { FC } from "react";
import { Grid } from "@mui/system";
import { Button, Typography, useMediaQuery } from "@mui/material";
import { AuthenticationWrapper } from "@/components/authentication-wrapper/authentication-wrapper";
import { useRouter } from "next/navigation";
import { useTheme } from "@mui/material/styles";

interface SuccessPageProps {
  label: string;
  title: string;
  subtitle?: string;
  buttonText: string;
  buttonUrl: string;
}

export const SuccessPage: FC<SuccessPageProps> = ({
  label,
  title,
  subtitle,
  buttonText,
  buttonUrl,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const router = useRouter();
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
        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push(buttonUrl)}
        >
          {buttonText}
        </Button>
      </Grid>
    </AuthenticationWrapper>
  );
};
