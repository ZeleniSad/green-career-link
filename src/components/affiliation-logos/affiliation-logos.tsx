"use client";
import Image from "next/image";
import { Grid } from "@mui/system";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

export const AffiliationLogos = ({
  position,
}: {
  position?: "column" | "row";
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Grid
      sx={{
        display: "flex",
        flexDirection: position ? position : isMobile ? "column" : "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Image
        src="/images/eu-logo.png"
        alt="Europe Union"
        width={200}
        height={0}
        layout="intrinsic"
      />
      <Image
        src="/images/green-logo.png"
        alt="Green"
        width={200}
        height={0}
        layout="intrinsic"
      />
    </Grid>
  );
};
