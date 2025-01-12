import { Box, IconButton, Typography } from "@mui/material";
import { Delete, OpenInNew, UploadFileOutlined } from "@mui/icons-material";
import { ErrorCode, FileRejection, useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { Grid } from "@mui/system";
import { getFileNameFromUrl } from "@/util/helpers";
import { getAuth } from "firebase/auth";
import { removeFileAndUpdateRecord } from "@/services/fileServices";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const MAX_FILES = 1;
const ERROR_MESSAGES: { [key in ErrorCode]: string } = {
  [ErrorCode.FileInvalidType]: "Invalid file type. Please upload a valid file format.",
  [ErrorCode.FileTooLarge]: "The file is too large. Please upload a smaller file. Max file size is 5 MB.",
  [ErrorCode.FileTooSmall]: "The file is too small. Please upload a larger file.",
  [ErrorCode.TooManyFiles]: "Too many files selected. Please select fewer files.",
};
const ALLOWED_FILE_TYPES = {
  "image/png": [".png"],
  "image/jpeg": [".jpg", ".jpeg"],
  "application/pdf": [".pdf"],
};

export const UploadFile = ({
  disabled,
  onFileSelect,
  allowedFileTypes = ALLOWED_FILE_TYPES,
  alreadyAddedFileUrl,
  isEditing,

  handleFileRemoveFromFormik,
}: {
  disabled: boolean;
  onFileSelect: (file: File | null) => void;
  allowedFileTypes?: { [key: string]: string[] };
  alreadyAddedFileUrl?: string;
  isEditing?: boolean;
  handleFileRemoveFromFormik?: () => void;
}) => {
  const [fileUploadErrors, setFileUploadErrors] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  useEffect(() => {
    if (alreadyAddedFileUrl) {
      const fileName = getFileNameFromUrl(alreadyAddedFileUrl);
      if (fileName) {
        const file = new File([], fileName);
        setUploadedFile(file);
      }
    }
  }, [alreadyAddedFileUrl]);

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[]) => {
    setFileUploadErrors([]);
    setUploadedFile(null);

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      onFileSelect(file);
    }

    if (fileRejections.length > 0) {
      const errors = fileRejections.flatMap(({ errors }) =>
        errors.map((error) => ERROR_MESSAGES[error.code as ErrorCode])
      );
      setFileUploadErrors(errors);
    }
  };

  const handleRemoveFile = async () => {
    if (alreadyAddedFileUrl && !isEditing) {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const success = await removeFileAndUpdateRecord(alreadyAddedFileUrl, currentUser.uid);
        if (success) {
          setUploadedFile(null);
          onFileSelect(null);
          if (handleFileRemoveFromFormik) handleFileRemoveFromFormik();
        }
      }
    } else {
      setUploadedFile(null);
      onFileSelect(null);
      if (handleFileRemoveFromFormik) handleFileRemoveFromFormik();
    }
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: allowedFileTypes,
    maxFiles: MAX_FILES,
    maxSize: MAX_FILE_SIZE,
    disabled,
  });

  return (
    <Box style={{ width: "100%" }}>
      <div
        {...getRootProps()}
        style={{
          width: "100%",
          height: 100,
          display: uploadedFile ? "none" : "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#F1F7F6",
          gap: 8,
          borderRadius: 6,
          cursor: disabled ? "not-allowed" : "pointer",
          border: isDragReject ? "2px solid red" : "2px dashed #cccccc",
        }}>
        <input {...getInputProps()} />
        <Grid container sx={{ gap: 1, justifyContent: "center", alignItems: "center" }}>
          <UploadFileOutlined color={isDragReject ? "error" : ("primary" as "error" | "primary")} />
          <Typography variant='body1'>
            {isDragActive ? "Drop the file here..." : "Drag & drop a file here, or click to select one"}
          </Typography>
        </Grid>
      </div>
      {uploadedFile && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            marginTop: 2,
            padding: 1,
            border: "1px solid #cccccc",
            borderRadius: 4,
            background: "#e0f7fa",
            justifyContent: "space-between",
          }}>
          <Typography variant='body2' sx={{ flexGrow: 1 }}>
            {uploadedFile.name}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            {alreadyAddedFileUrl && (
              <IconButton href={alreadyAddedFileUrl} target='_blank' underline='none'>
                <OpenInNew fontSize='small' />
              </IconButton>
            )}
            {isEditing && (
              <IconButton onClick={handleRemoveFile} size='small' aria-label='Remove file'>
                <Delete fontSize='small' />
              </IconButton>
            )}
          </Box>
        </Box>
      )}
      {fileUploadErrors.length > 0 && (
        <Box style={{ marginTop: 8 }}>
          {fileUploadErrors.map((message) => (
            <Typography key={message} variant='body2' color='error'>
              {message}
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};
