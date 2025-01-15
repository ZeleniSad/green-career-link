"use client";

import { FC, useEffect, useState } from "react";
import { EducationItemDto } from "@/types/dto";
import { deleteEducation, getEducationsData } from "@/services/educationService";
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
import { Add, Delete, Edit, OpenInNew } from "@mui/icons-material";
import ConfirmDialog from "../confirm-dialog/confirm-dialog";
import { EducationFileModal } from "@/components/modals/education-file-modal";

const EducationRow: FC<{
  row: EducationItemDto;
  onDelete: (id: string) => void;
  setSelectedFile: (value: ((prevState: EducationItemDto | null) => EducationItemDto) | EducationItemDto) => void;
  setModalOpen: (value: ((prevState: boolean) => boolean) | boolean) => void;
}> = ({ row, onDelete, setSelectedFile, setModalOpen }) => (
  <TableRow
    sx={{
      "&:nth-of-type(odd)": {
        backgroundColor: "action.hover",
      },
      "&:hover": {
        backgroundColor: "action.selected",
      },
    }}>
    <TableCell sx={{ p: 2 }}>{row.title}</TableCell>
    <TableCell sx={{ p: 2 }}>{row.fileName}</TableCell>
    <TableCell sx={{ p: 2 }}>
      {row.fileUrl ? (
        <IconButton
          href={row.fileUrl}
          target='_blank'
          rel='noopener noreferrer'
          size='small' // Set the size to small
        >
          <OpenInNew fontSize='small' />
        </IconButton>
      ) : (
        <></>
      )}
    </TableCell>
    <TableCell sx={{ p: 2, textAlign: "right" }}>
      <IconButton
        color='primary'
        size='small'
        onClick={() => {
          setModalOpen(true);
          setSelectedFile(row);
        }}>
        <Edit fontSize='medium' />
      </IconButton>
      <IconButton color='error' size='small' onClick={() => onDelete(row.id)}>
        <Delete fontSize='medium' />
      </IconButton>
    </TableCell>
  </TableRow>
);

export const EducationsTable: FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<EducationItemDto | null>(null);
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
    <Box sx={{ width: "100%" }}>
      <Typography variant='h4' color='primary' gutterBottom>
        Education Files
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
                  File Name
                </TableCell>
                <TableCell
                  sx={{
                    p: 2,
                    color: "primary.contrastText",
                    fontWeight: "bold",
                  }}>
                  File
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
                      setSelectedFile(null);
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
              {educations.map((education) => (
                <EducationRow
                  key={education.id}
                  row={education}
                  onDelete={handleDeleteClick}
                  setSelectedFile={setSelectedFile}
                  setModalOpen={setModalOpen}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
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
      <EducationFileModal
        open={modalOpen}
        item={selectedFile}
        onClose={() => setModalOpen(false)}
        onSave={fetchEducations}
      />
    </Box>
  );
};
