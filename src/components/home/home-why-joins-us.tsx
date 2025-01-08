import { Typography } from "@mui/material";
import { Grid } from "@mui/system";
import {
  CampaignOutlined,
  RecordVoiceOverOutlined,
  SensorOccupiedOutlined,
  WorkOutlineOutlined,
} from "@mui/icons-material";
import { FC, ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description }) => (
  <Grid
    sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 2,
      background: "rgba(6, 15, 14, 0.05)",
      p: 2,
      height: "100%",
      borderRadius: 4,
    }}
    size={{ lg: 2 }}
  >
    {icon}
    <Typography variant="body1" textAlign="center">
      {title}
    </Typography>
    <Typography variant="body2" textAlign="center">
      {description}
    </Typography>
  </Grid>
);

export const HomeWhyJoinsUs = () => {
  const features: FeatureCardProps[] = [
    {
      icon: <WorkOutlineOutlined sx={{ fontSize: 32 }} />,
      title: "Find Your Dream Job",
      description:
        "Explore a variety of job openings in the fields of ecology, renewable energy, conservation, sustainable design, and more.",
    },
    {
      icon: <RecordVoiceOverOutlined sx={{ fontSize: 32 }} />,
      title: "Share Your Voice",
      description:
        "Contribute articles, insights, and ideas to inspire and connect with like-minded individuals.",
    },
    {
      icon: <SensorOccupiedOutlined sx={{ fontSize: 32 }} />,
      title: "Build a Network",
      description:
        "Connect with professionals, companies, and organizations dedicated to sustainability.",
    },
    {
      icon: <CampaignOutlined sx={{ fontSize: 32 }} />,
      title: "Advertise Opportunities",
      description:
        "Companies can easily post job listings and reach a targeted audience passionate about the environment.",
    },
  ];

  return (
    <Grid container sx={{ justifyContent: "center", gap: 5 }} id="whyJoinUs">
      <Typography variant="h1" fontWeight={500} textAlign="center">
        Why Join Us?
      </Typography>
      <Grid
        container
        sx={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon as ReactNode}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </Grid>
    </Grid>
  );
};
