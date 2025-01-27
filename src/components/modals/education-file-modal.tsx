import React, { FC, useEffect, useState } from "react";
import { Alert, Button, Modal, Paper, Snackbar, TextField, Typography } from "@mui/material";
import { EducationItemDto } from "@/types/dto";
import { Box, Grid } from "@mui/system";
import { UploadFile } from "../upload-file/upload-file";
import { removeEducationFile, uploadEducationFile } from "../../services/fileServices";
import { createEducation, updateEducation } from "../../services/educationService";

interface EducationFileModalProps {
  open: boolean;
  onClose: () => void;
  item: EducationItemDto | null;
  onSave: () => void;
}

export const EducationFileModal: FC<EducationFileModalProps> = ({ open, onClose, item, onSave }) => {
  const [formData, setFormData] = useState<EducationItemDto | null>(item);
  const [errors, setErrors] = useState({
    title: false,
    fileName: false,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (file: File | null) => {
    setSelectedFile(file);
  };

  useEffect(() => {
    if (item) {
      setFormData(item);
    } else {
      setFormData({ fileName: "", title: "" } as EducationItemDto);
    }
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value } as EducationItemDto));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const validateForm = () => {
    const newErrors = {
      fileName: formData?.fileName.trim() === "",
      title: formData?.title.trim() === "",
    };
    setErrors(newErrors);
    return !newErrors.title && !newErrors.fileName;
  };

  const uploadFile = async () => {
    if (selectedFile) {
      const fileUrl = await uploadEducationFile(selectedFile);

      if (item?.fileUrl) {
        await removeEducationFile(item.fileUrl);
      }

      return fileUrl;
    }

    return item?.fileUrl;
  };

  const handleSave = async () => {
    if (validateForm() && formData) {
      try {
        const fileUrl = await uploadFile();

        if (item) {
          await updateEducation({ ...formData, fileUrl: fileUrl ?? "" });
        } else {
          await createEducation({ ...formData, fileUrl: fileUrl ?? "" });
        }

        setSnackbarOpen(true);
        setSnackbarSeverity("success");
        setSnackbarMessage("Education file saved successfully");
        onSave();
        onClose();
      } catch (error) {
        console.log("Error saving Education file", error);
        setSnackbarOpen(true);
        setSnackbarSeverity("error");
        setSnackbarMessage("Failed to save Education file");
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
            width: "30%",
            padding: 5,
            borderRadius: 0,
          }}>
          <Grid container spacing={2}>
            <Typography>{item ? "Edit Education file" : "Create Education file"}</Typography>
            <TextField
              label='Title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              fullWidth
              error={errors.title}
              helperText={errors.title ? "Title is required" : ""}
            />
            <TextField
              label='File name'
              name='fileName'
              value={formData.fileName}
              onChange={handleChange}
              fullWidth
              error={errors.fileName}
              helperText={errors.fileName ? "File name is required" : ""}
            />

            <UploadFile
              disabled={false}
              onFileSelect={handleFileSelect}
              alreadyAddedFileUrl={item?.fileUrl}
              isEditing={true}
              isOwner={true}
            />
            <Grid container sx={{ width: "100%", justifyContent: "flex-end" }}>
              <Button variant='outlined' onClick={onClose}>
                Cancel
              </Button>
              <Button variant='contained' onClick={handleSave} color='primary'>
                Save
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert severity={snackbarSeverity} sx={{ width: "100%" }} onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
