"use client";
import { Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Grid } from "@mui/system";

const label = {
  yesDoIt: "YES DO IT",
};
export const LoadingScreen = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{
        height: "100vh",
        width: "100vw",
        background:
          "linear-gradient(0deg, rgb(3, 98, 76, 0.3), rgb(3, 98, 76, 0.3)), url(/images/loading-screen.png)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid>
        <Typography
          variant="h1"
          color={theme.palette.common.white}
          fontWeight={900}
          fontSize={isMobile ? 48 : 140}
          sx={{ textTransform: "uppercase" }}
        >
          {label.yesDoIt}
        </Typography>
      </Grid>
    </Grid>
  );
};