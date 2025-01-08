import { Grid } from "@mui/system";
import { Typography } from "@mui/material";
import Image from "next/image";

const labels = {
  title: "Welcome to Green Career Link",
  text:
    "Are you passionate about making a positive impact on the planet? Green\n" +
    "        Career Link is the platform where individuals and companies come\n" +
    "        together to shape the future of ecology and sustainable development.\n" +
    "        Whether you’re looking for the next big opportunity or seeking talented\n" +
    "        professionals to join your mission, you’ve come to the right place.",
};
export const HomeOverview = () => {
  return (
    <Grid
      container
      sx={{ justifyContent: "center", pl: 30, pr: 30, gap: 5 }}
      id="overview"
    >
      <Typography variant="h1" fontWeight={500} textAlign="center">
        {labels.title}
      </Typography>
      <Typography variant="body1" textAlign="center">
        {labels.text}
      </Typography>
      <Image
        src="/images/lamp.png"
        alt="Lamp mockup"
        width={900}
        height={0}
        layout="intrinsic"
      />
    </Grid>
  );
};
