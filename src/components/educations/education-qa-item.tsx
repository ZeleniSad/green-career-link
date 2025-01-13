import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export const EducationQAItem = ({ title, body }) => {
  return (
    <Accordion
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        boxShadow: 2,
        borderRadius: 2,
        "&:before": {
          display: "none",
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore sx={{ color: "primary.main" }} />}
        sx={{
          borderRadius: 1,
          "&.Mui-expanded": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          },
        }}
      >
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          p: 2,
        }}
      >
        <Typography variant="body1">{body}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
