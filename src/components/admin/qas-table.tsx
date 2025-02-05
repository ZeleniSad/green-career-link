"use client";

import { FC, useEffect, useState } from "react";
import { EducationQAItemDto } from "@/types/dto";
import {
  Alert,
  Box,
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
import { deleteQA, getQAsData } from "@/services/educationService";
import ConfirmDialog from "../confirm-dialog/confirm-dialog";
import { Add, Delete, Edit } from "@mui/icons-material";
import { EducationQaModal } from "@/components/modals/education-qa-modal";

const QARow: FC<{
  row: EducationQAItemDto;
  onDelete: (id: string) => void;
  setSelectedQa: (item: EducationQAItemDto) => void;
  setModalOpen: (open: boolean) => void;
}> = ({ row, onDelete, setSelectedQa, setModalOpen }) => (
  <TableRow
    sx={{
      "&:nth-of-type(odd)": {
        backgroundColor: "action.hover",
      },
      "&:hover": {
        backgroundColor: "action.selected",
      },
    }}>
    <TableCell sx={{ p: 1, verticalAlign: "middle" }}>{row.title}</TableCell>
    <TableCell sx={{ p: 1, verticalAlign: "middle" }}>{row.body}</TableCell>
    <TableCell
      sx={{
        p: 1,
        textAlign: "right",
        verticalAlign: "middle",
        whiteSpace: "nowrap",
      }}>
      <IconButton
        color='primary'
        size='small'
        sx={{ padding: 0, marginRight: 1 }}
        onClick={() => {
          setSelectedQa(row);
          setModalOpen(true);
        }}>
        <Edit fontSize='small' />
      </IconButton>
      <IconButton color='error' size='small' sx={{ padding: 0 }} onClick={() => onDelete(row.id)}>
        <Delete fontSize='small' />
      </IconButton>
    </TableCell>
  </TableRow>
);

export const QAsTable: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQa, setSelectedQa] = useState<EducationQAItemDto | null>(null);
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
    <Box sx={{ width: "100%" }}>
      <Typography variant='h4' color='primary' gutterBottom>
        Q&A Items
      </Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: 200,
          }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 3, borderRadius: 2 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: "primary.main" }}>
                <TableCell
                  sx={{
                    p: 2,
                    color: "primary.contrastText",
                    fontWeight: "bold",
                  }}>
                  Title
                </TableCell>
                <TableCell
                  sx={{
                    p: 2,
                    color: "primary.contrastText",
                    fontWeight: "bold",
                  }}>
                  Body
                </TableCell>

                <TableCell
                  sx={{
                    p: 2,
                    color: "primary.contrastText",
                    fontWeight: "bold",
                    textAlign: "right",
                  }}>
                  <IconButton
                    color='inherit'
                    onClick={() => {
                      setSelectedQa(null);
                      setModalOpen(true);
                    }}
                    sx={{
                      color: "white",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                    aria-label='Create new Q&A'>
                    <Add />
                  </IconButton>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {qas.map((qa) => (
                <QARow
                  key={qa.id}
                  row={qa}
                  onDelete={handleDeleteClick}
                  setSelectedQa={setSelectedQa}
                  setModalOpen={setModalOpen}
                />
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

      <EducationQaModal
        open={modalOpen}
        onClose={() => {
          setSelectedQa(null);
          setModalOpen(false);
        }}
        item={selectedQa}
        onSave={() => {
          setSelectedQa(null);
          fetchQAs();
        }}
      />
    </Box>
  );
};
