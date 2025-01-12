"use client";

import { Box, Grid } from "@mui/system";
import { Alert, CircularProgress, Snackbar, Typography } from "@mui/material";
import { EducationQAItem } from "@/components/educations/education-qa-item";
import { EducationQAItemDto } from "../../types/dto";
import { useEffect, useState } from "react";
import { getQAsData } from "../../services/educationService";

export const EducationQA = () => {
  const [qas, setQas] = useState<EducationQAItemDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const fetchQas = async () => {
    setLoading(true);
    setSnackbarOpen(false);
    setSnackbarMessage("");
    try {
      const data = await getQAsData();
      setQas(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching qas:", error);
      setSnackbarOpen(true);
      setLoading(false);
      setSnackbarMessage("Failed to fetch qas.");
    }
  };

  useEffect(() => {
    fetchQas();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant='h3' color='primary' gutterBottom>
        Education Questions & Answers
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "200px" }}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container size={12} spacing={1}>
          {qas.map((qa, index) => {
            return <EducationQAItem key={qa.id} index={++index} title={qa.title} body={qa.body} />;
          })}
        </Grid>
      )}

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert severity='error' sx={{ width: "100%" }} onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
