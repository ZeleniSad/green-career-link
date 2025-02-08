import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Modal,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { EducationQAItemDto } from "@/types/dto";
import { Box, Grid } from "@mui/system";
import { createQA, updateQA } from "@/services/educationService";

interface EducationQaModalProps {
  open: boolean;
  onClose: () => void;
  item: EducationQAItemDto | null;
  onSave: () => void;
}

export const EducationQaModal: FC<EducationQaModalProps> = ({
  open,
  onClose,
  item,
  onSave,
}) => {
  const [formData, setFormData] = useState<EducationQAItemDto | null>(item);
  const [errors, setErrors] = useState({
    title: false,
    body: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success",
  );
  const [loading, setLoading] = useState(false);
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({ title: "", body: "" } as EducationQAItemDto);
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }) as EducationQAItemDto);
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {
      title: formData?.title.trim() === "",
      body: formData?.body.trim() === "",
    };
    setErrors(newErrors);
    return !newErrors.title && !newErrors.body;
  };

  const handleSave = async () => {
    if (validateForm() && formData) {
      setLoading(true);
      try {
        if (item) {
          await updateQA(formData);
        } else {
          await createQA(formData);
        }

        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage("Q&A item saved successfully");
        onSave();
        onClose();
      } catch (error) {
        console.error(error);
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to save Q&A item");
      } finally {
        setLoading(false);
        setFormData(null);
      }
    }
  };

  if (!formData) return null;

  return (
    <Box>
      <Modal open={open} onClose={onClose}>
        <Paper
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "40%",
            padding: 5,
            borderRadius: 0,
          }}
        >
          <Grid container spacing={2}>
            <Typography>{item ? "Edit Q&A" : "Create Q&A"}</Typography>
            <TextField
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              fullWidth
              error={errors.title}
              helperText={errors.title ? "Title is required" : ""}
            />
            <TextField
              label="Text"
              name="body"
              value={formData.body}
              onChange={handleChange}
              fullWidth
              multiline
              minRows={5}
              error={errors.body}
              helperText={errors.body ? "Text is required" : ""}
            />

            <Grid container sx={{ width: "100%", justifyContent: "flex-end" }}>
              <Button variant="outlined" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="contained"
                onClick={handleSave}
                color="primary"
                disabled={loading}
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          onClose={handleCloseSnackbar}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
