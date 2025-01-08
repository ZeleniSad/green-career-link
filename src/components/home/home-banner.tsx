import { Grid } from "@mui/system";
import { Button, Typography } from "@mui/material";
import Image from "next/image";

const labels = {
  title: "Green Career Link",
  text: `Create an account and become part of the</br>
            <span style="color: #00DF81">Green Career Link</span>
            community!`,
  subtitle:
    "Create an account and become part of the Green Career Link community!",
  description:
    "Welcome! Whether you are looking for a job or want to advertise open " +
    "positions in your company, our registration process is quick and easy. " +
    "Create an account and connect with companies and professionals in the field of ecology " +
    "and sustainable development.",
  question: "Ready? Are you an individual or a company?",
  company: "Company",
  individual: "Individual",
};

export const HomeBanner = () => {
  return (
    <Grid
      container
      sx={{
        backgroundColor: "#03624C",
        width: "100%",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Grid size={5}>
        <Grid container sx={{ gap: 4, p: 3 }}>
          <Typography
            variant="h1"
            fontWeight={800}
            color="white"
            dangerouslySetInnerHTML={{ __html: labels.text }}
          />
          <Typography variant="body1" color="white">
            {labels.description}
          </Typography>
          <Typography variant="body1" color="white">
            {labels.question}
          </Typography>
          <Grid container size={12} spacing={2}>
            <Button color="white" href="/register" fullWidth>
              {labels.company}
            </Button>
            <Button color="white" variant="outlined" href="/register" fullWidth>
              {labels.individual}
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={7}>
        <Image
          src="/images/overview_laptop_mockup.png"
          alt="Green"
          width={1274}
          height={0}
          layout="intrinsic"
        />
      </Grid>
    </Grid>
  );
};
