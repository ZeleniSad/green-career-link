import { Grid } from "@mui/system";
import { Typography } from "@mui/material";
import { EducationQAItem } from "@/components/educations/education-qa-item";

export const EducationQA = () => {
  return (
    <Grid container sx={{ gap: 3 }}>
      <Grid size={12}>
        <Typography variant="h3" color="primary">
          Education Questions & Answers
        </Typography>
      </Grid>
      <Grid container size={12} sx={{ gap: 1 }}>
        <EducationQAItem />
        <EducationQAItem />
        <EducationQAItem />
        <EducationQAItem />
      </Grid>
    </Grid>
  );
};
