import { FileCard } from "@/components/educations/file-card";
import { Grid } from "@mui/system";
import { Typography } from "@mui/material";

export const EducationFiles = () => {
  return (
    <Grid container sx={{ gap: 3 }}>
      <Typography variant="h3" color="primary">
        Education Files
      </Typography>
      <Grid container sx={{ gap: 3 }}>
        <FileCard />
        <FileCard />
        <FileCard />
        <FileCard />
      </Grid>
    </Grid>
  );
};
