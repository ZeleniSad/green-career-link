"use client";

import { FileCard } from "@/components/educations/file-card";
import { Box, Grid } from "@mui/system";
import { Alert, CircularProgress, Snackbar, Typography } from "@mui/material";
import { EducationItemDto } from "@/types/dto";
import { useEffect, useState } from "react";
import { getEducationsData } from "@/services/educationService";

export const EducationFiles = () => {
  const [educations, setEducations] = useState<EducationItemDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const fetchEducations = async () => {
    setLoading(true);
    setSnackbarOpen(false);
    setSnackbarMessage("");
    try {
      const data = await getEducationsData();
      setEducations(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching educations:", error);
      setSnackbarOpen(true);
      setLoading(false);
      setSnackbarMessage("Failed to fetch education files.");
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  return (
    <Box>
      <Typography variant="h3" color="primary" gutterBottom>
        Education Files
      </Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "200px",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {educations.map(({ id, fileUrl, title }) => (
            <Grid xs={12} sm={6} md={4} key={id}>
              <FileCard title={title} fileUrl={fileUrl} />
            </Grid>
          ))}
        </Grid>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity="error"
          sx={{ width: "100%" }}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
