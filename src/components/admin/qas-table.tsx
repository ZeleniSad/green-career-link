"use client";

import { FC, useEffect, useState } from "react";
import { EducationQAItemDto } from "../../types/dto";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
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
import { deleteQA, getQAsData } from "../../services/educationService";
import ConfirmDialog from "../confirm-dialog/confirm-dialog";

const QARow: FC<{ row: EducationQAItemDto; onDelete: (id: string) => void }> = ({ row, onDelete }) => (
  <TableRow>
    <TableCell sx={{ p: 1 }}>{row.title}</TableCell>
    <TableCell sx={{ p: 1 }}>{row.body}</TableCell>
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

export const QAsTable: FC = () => {
  const [qas, setQAs] = useState<EducationQAItemDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [selectedQAId, setSelectedQAId] = useState<string | null>(null);
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const fetchQAs = async () => {
    setLoading(true);
    setSnackbarOpen(false);
    setSnackbarMessage("");
    try {
      const data = await getQAsData();
      setQAs(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching QAs for table data: ", error);
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      setLoading(false);
      setSnackbarMessage("Failed to fetch Q&A table items.");
    }
  };

  useEffect(() => {
    fetchQAs();
  }, []);

  const handleDeleteClick = (id: string) => {
    setSelectedQAId(id);
    setConfirmDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedQAId) {
      const deletedQA = qas.find((item) => item.id === selectedQAId)!;
      setQAs((prevQAs) => prevQAs.filter((item) => item.id !== selectedQAId));

      await deleteQA(deletedQA.id);
      setSnackbarMessage("Q&A item deleted successfully.");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setSelectedQAId(null);
    }
  };

  return (
    <Box sx={{ p: 3, width: "100%" }}>
      <Typography variant='h3' color='primary' gutterBottom>
        Q&A Items
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
                <TableCell sx={{ p: 1 }}>Body</TableCell>
                <TableCell sx={{ p: 1 }}>Edit</TableCell>
                <TableCell sx={{ p: 1 }}>Delete</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {qas.map((qa) => (
                <QARow key={qa.id} row={qa} onDelete={handleDeleteClick} />
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
          message: "Are you sure you want to delete this Q&A record?",
          onConfirm: handleConfirmDelete,
          onCancel: () => setConfirmDialogOpen(false),
        }}
      />
    </Box>
  );
};
