import { Grid } from "@mui/system";
import { Typography } from "@mui/material";
import Image from "next/image";
import {
  BadgeOutlined,
  HowToRegOutlined,
  SavedSearchOutlined,
} from "@mui/icons-material";
import { FC, ReactNode } from "react";

interface StepCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const steps: StepCardProps[] = [
  {
    icon: <HowToRegOutlined />,
    title: "Quick and Easy Registration",
    description:
      "Our streamlined process ensures you can sign up in just a few minutes. Simply provide your basic details, and you will be ready to dive into a world of opportunities and connections dedicated to sustainability.",
  },
  {
    icon: <BadgeOutlined />,
    title: "Personalized Profiles",
    description:
      "Customize your profile to reflect your unique interests, skills, and professional goals. For individuals, showcase your experience, qualifications, and aspirations. Companies can highlight their mission, open positions, and commitment to sustainable practices.",
  },
  {
    icon: <SavedSearchOutlined />,
    title: "Discover Opportunities",
    description:
      "Browse through a rich database of job listings tailored to ecology and sustainability. Engage with inspiring content, including articles, tips, and personal stories shared by members of our passionate community. Whether you’re searching for a job or looking for fresh ideas, our platform has something for everyone.",
  },
];

const StepCard: FC<StepCardProps> = ({ icon, title, description }) => (
  <Grid
    container
    sx={{
      gap: 1,
      p: 2,
      borderRadius: 4,
      "&:hover": {
        backgroundColor: "#060F0E0D",
      },
    }}
  >
    <Grid sx={{ display: "flex", gap: 1 }}>
      {icon}
      <Typography variant="body1">{title}</Typography>
    </Grid>
    <Typography variant="body2">{description}</Typography>
  </Grid>
);

export const HomeHowItWorks = () => {
  return (
    <Grid container sx={{ gap: 5, justifyContent: "center" }} id="howItWorks">
      <Grid container>
        <Typography variant="h1" fontWeight={500} textAlign="center">
          How It Works
        </Typography>
      </Grid>
      <Grid container sx={{ justifyContent: "center", gap: 3 }}>
        <Grid size={{ lg: 2 }} sx={{ height: "100%" }}>
          <Image
            src="/images/steps.png"
            alt="Green"
            width={416}
            height={0}
            layout="intrinsic"
          />
        </Grid>
        <Grid
          size={{ lg: 5 }}
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {steps.map((step, index) => (
            <StepCard
              key={index}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};
