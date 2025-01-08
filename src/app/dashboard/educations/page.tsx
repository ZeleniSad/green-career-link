import styles from "./educations.module.css";
import { Box } from "@mui/material";
import { EducationFiles } from "@/components/educations/education-files";
import { EducationQA } from "@/components/educations/education-qa";

const Educations = () => {
  return (
    <Box className={styles.wrapper}>
      <EducationFiles />
      <EducationQA />
    </Box>
  );
};

export default Educations;
