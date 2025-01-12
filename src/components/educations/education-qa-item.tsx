import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

export const EducationQAItem = ({ index, title, body }) => {
  return (
    <Accordion
      sx={{
        width: "100%",
        backgroundColor: "background.paper",
        boxShadow: 2,
        borderRadius: 2,
        mb: 2,
        "&:before": {
          display: "none",
        },
      }}>
      <AccordionSummary
        expandIcon={<ExpandMore sx={{ color: "primary.main" }} />}
        sx={{
          backgroundColor: "primary.light",
          borderRadius: 1,
          "&.Mui-expanded": {
            backgroundColor: "primary.main",
            color: "primary.contrastText",
          },
        }}>
        <Typography variant='h6' component='div'>
          Q&A {index}: {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: "background.default",
          p: 2,
        }}>
        <Typography variant='body1'>{body}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
