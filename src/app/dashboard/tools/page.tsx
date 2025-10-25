"use client";

import { Box, Card, CardContent, Grid, Typography } from "@mui/material";
import {
  CalculateOutlined,
  DescriptionOutlined,
  DashboardOutlined,
  TrendingUpOutlined,
  OpenInNew,
} from "@mui/icons-material";
import { ProfileHeader } from "@/components/profile/profile-header";
import styles from "./tools.module.css";

interface Tool {
  name: string;
  url: string;
  country: "HR" | "RS";
  icon: React.ReactNode;
}

const tools: Tool[] = [
  {
    name: "YES kalkulator",
    url: "https://ppkalkulator.czmd.hr/",
    country: "HR",
    icon: <CalculateOutlined />,
  },
  {
    name: "YES Izrada poslovnog plana",
    url: "https://pp.czmd.hr/",
    country: "HR",
    icon: <DescriptionOutlined />,
  },
  {
    name: "YES Canvas alat",
    url: "https://canvas.czmd.hr/",
    country: "HR",
    icon: <DashboardOutlined />,
  },
  {
    name: "YES alat za karijerni razvoj",
    url: "https://yes.czmd.hr/",
    country: "HR",
    icon: <TrendingUpOutlined />,
  },
  {
    name: "YES kalkulator",
    url: "https://kalkulator.eocv.org",
    country: "RS",
    icon: <CalculateOutlined />,
  },
  {
    name: "YES Izrada poslovnog plana",
    url: "https://poslovniplan.eocv.org",
    country: "RS",
    icon: <DescriptionOutlined />,
  },
  {
    name: "YES Canvas alat",
    url: "https://canvas.eocv.org",
    country: "RS",
    icon: <DashboardOutlined />,
  },
  {
    name: "YES alat za karijerni razvoj",
    url: "https://karijera.eocv.org",
    country: "RS",
    icon: <TrendingUpOutlined />,
  },
];

const ToolCard = ({ tool }: { tool: Tool }) => {
  const handleClick = () => {
    window.open(tool.url, "_blank", "noopener,noreferrer");
  };

  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        transition: "all 0.3s ease-in-out",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: 6,
        },
      }}
      onClick={handleClick}>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
          p: 3,
          flexGrow: 1,
        }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 64,
            height: 64,
            borderRadius: "50%",
            bgcolor: "primary.main",
            color: "white",
            mb: 1,
          }}>
          {tool.icon}
        </Box>
        <Typography
          variant='h6'
          align='center'
          sx={{ fontWeight: 500, flexGrow: 1, display: "flex", alignItems: "center" }}>
          {tool.name}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "2px solid",
            borderColor: "primary.main",
            color: "primary.main",
            transition: "all 0.2s",
            "&:hover": {
              bgcolor: "primary.main",
              color: "white",
            },
          }}>
          <OpenInNew />
        </Box>
      </CardContent>
    </Card>
  );
};

const ToolsPage = () => {
  const hrTools = tools.filter((tool) => tool.country === "HR");
  const rsTools = tools.filter((tool) => tool.country === "RS");

  return (
    <Box className={styles.wrapper}>
      <ProfileHeader />
      <Box sx={{ mb: 5 }}>
        <Typography variant='h3' color='primary' gutterBottom fontWeight={700}>
          Tools
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          Choose the tool you need to develop your business ideas
        </Typography>
      </Box>

      {/* Croatia Tools */}
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}>
          <Box
            sx={{
              width: 6,
              height: 40,
              bgcolor: "primary.main",
              borderRadius: 1,
            }}
          />
          <Typography variant='h5' fontWeight={600}>
            Hrvatska (HR)
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {hrTools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ToolCard tool={tool} />
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Serbia Tools */}
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            mb: 3,
          }}>
          <Box
            sx={{
              width: 6,
              height: 40,
              bgcolor: "primary.main",
              borderRadius: 1,
            }}
          />
          <Typography variant='h5' fontWeight={600}>
            Srbija (RS)
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {rsTools.map((tool, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ToolCard tool={tool} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default ToolsPage;
