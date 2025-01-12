"use client";

import { FC, useEffect, useState } from "react";
import { EducationItemDto } from "../../types/dto";
import { deleteEducation, getEducationsData } from "../../services/educationService";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import ConfirmDialog from "../confirm-dialog/confirm-dialog";

const EducationRow: FC<{ row: EducationItemDto; onDelete: (id: string) => void }> = ({ row, onDelete }) => (
  <TableRow>
    <TableCell sx={{ p: 1 }}>{row.title}</TableCell>
    <TableCell sx={{ p: 1 }}>{row.fileName}</TableCell>
    <TableCell sx={{ p: 1 }}>
      <Box sx={{ display: "flex", gap: 1 }}>
        <IconButton href={row.fileUrl} target='_blank' underline='none'>
          <OpenInNew fontSize='small' />
        </IconButton>
      </Box>
    </TableCell>
    <TableCell sx={{ p: 1 }}>
      <Button variant='contained' color='primary' fullWidth>
        Edit
      </Button>
    </TableCell>
    <TableCell sx={{ p: 1 }}>
      <Button variant='contained' color='error' fullWidth onClick={() => onDelete(row.id)}>
        Delete
      </Button>
    </TableCell>
  </TableRow>
);

export const EducationsTable: FC = () => {
  const [educations, setEducations] = useState<EducationItemDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedEducationId, setSelectedEducationId] = useState<string | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

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
      console.error("Error fetching educations for table data: ", error);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setLoading(false);
      setSnackbarMessage("Failed to fetch education files.");
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleDeleteClick = (id: string) => {
    setSelectedEducationId(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedEducationId) {
      const deletedEducation = educations.find((item) => item.id === selectedEducationId)!;
      setEducations((prevEducations) => prevEducations.filter((item) => item.id !== selectedEducationId));

      await deleteEducation(deletedEducation.id, deletedEducation.fileUrl);
      setSnackbarMessage("Education item deleted successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setSelectedEducationId(null);
    }
  };

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Typography variant='h3' color='primary' gutterBottom>
        Education Files
      </Typography>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 200 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ p: 1 }}>Title</TableCell>
                <TableCell sx={{ p: 1 }}>File Name</TableCell>
                <TableCell sx={{ p: 1 }}>File</TableCell>
                <TableCell sx={{ p: 1 }}>Edit</TableCell>
                <TableCell sx={{ p: 1 }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {educations.map((education) => (
                <EducationRow key={education.id} row={education} onDelete={handleDeleteClick} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert severity={snackbarSeverity} sx={{ width: "100%" }} onClose={handleCloseSnackbar}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <ConfirmDialog
        dialog={{
          open: confirmDialogOpen,
          title: "Confirm Delete",
          message: "Are you sure you want to delete this education file?",
          onConfirm: handleConfirmDelete,
          onCancel: () => setConfirmDialogOpen(false),
        }}
      />
    </Box>
  );
};
