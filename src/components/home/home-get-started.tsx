import { Grid } from "@mui/system";
import { Button, Typography } from "@mui/material";
import Image from "next/image";

export const HomeGetStarted = () => {
  return (
    <Grid
      container
      sx={{ width: "100%", justifyContent: "center", pl: 20, pr: 20 }}
    >
      <Grid
        container
        sx={{
          position: "relative",
          backgroundColor: "rgba(0, 223, 129, 1)",
          borderRadius: 4,
          width: "100%",
        }}
      >
        <Grid
          size={{ lg: 4 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            p: 5,
            gap: 2,
          }}
        >
          <Typography variant="h5" fontWeight={500}>
            Ready to Get Started?
          </Typography>
          <Typography variant="body1">
            Are you an individual eager to contribute or a company ready to make
            a difference?
          </Typography>
          <Typography variant="body1">
            Click below to join our growing community:
          </Typography>
          <Button
            variant="contained"
            href="/register"
            sx={{
              backgroundColor: "black",
            }}
          >
            Get Started
          </Button>
        </Grid>
        <Grid size={{ lg: 8 }}>
          <Image
            src="/images/layers.png"
            alt="Green"
            width={775}
            height={0}
            layout="intrinsic"
            style={{ position: "absolute", bottom: -170 }}
          />
        </Grid>
      </Grid>
    </Grid>
  );
};
