import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { ExpandMoreOutlined } from "@mui/icons-material";

export const EducationQAItem = ({ index, title, body }: { index: number; title: string; body: string }) => {
  return (
    <Accordion sx={{ width: "100%", pt: 1, pb: 1 }}>
      <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
        <Typography variant='h4'>
          QA {index}: {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant='body1'>{body}</Typography>
      </AccordionDetails>
    </Accordion>
  );
};
