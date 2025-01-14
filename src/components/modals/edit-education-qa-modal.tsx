import React, { FC, useEffect, useState } from "react";
import { Button, Modal, Paper, TextField, Typography } from "@mui/material";
import { doc, UpdateData, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { EducationQAItemDto } from "@/types/dto";
import { Grid } from "@mui/system";

interface EditEducationQaModalProps {
  open: boolean;
  onClose: () => void;
  item: EducationQAItemDto;
  onSave: () => void;
}

export const EditEducationQaModal: FC<EditEducationQaModalProps> = ({
  open,
  onClose,
  item,
  onSave,
}) => {
  const [formData, setFormData] = useState<EducationQAItemDto>(item);

  useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    } as EducationQAItemDto);
  };

  const handleSave = async () => {
    if (formData) {
      const educationDoc = doc(db, "educations", formData.id);
      await updateDoc(educationDoc, formData as UpdateData<EducationQAItemDto>);
      onSave();
      onClose();
    }
  };

  if (!formData) return null;

  return (
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
          <Typography>Edit Education File</Typography>
          <TextField
            label="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="body"
            name="body"
            value={formData.body}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={5}
          />

          <Grid container sx={{ width: "100%", justifyContent: "flex-end" }}>
            <Button variant="outlined" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleSave} color="primary">
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};
