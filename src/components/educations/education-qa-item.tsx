import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMoreOutlined } from "@mui/icons-material";

export const EducationQAItem = () => {
  return (
    <Accordion sx={{ width: "100%", pt: 1, pb: 1 }}>
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        <Typography variant="h4">Question 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="body1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          malesuada lacus ex, sit amet blandit leo lobortis eget.Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada
          lacus ex, sit amet blandit leo lobortis eget.
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};
