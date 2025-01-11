import { Box, IconButton, Typography } from "@mui/material";
import { UploadFileOutlined, Delete } from "@mui/icons-material";
import { ErrorCode, FileRejection, useDropzone } from "react-dropzone";
import { useState } from "react";
import { Grid } from "@mui/system";

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
}: {
  disabled: boolean;
  onFileSelect: (file: File | null) => void;
}) => {
  const [fileUploadErrors, setFileUploadErrors] = useState<string[]>([]);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

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

  const handleRemoveFile = () => {
    setUploadedFile(null);
    onFileSelect(null);
  };

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: ALLOWED_FILE_TYPES,
    maxFiles: MAX_FILES,
    maxSize: MAX_FILE_SIZE,
    disabled,
  });

  return (
    <Box style={{ width: "100%" }}>
      <Box
        {...getRootProps()}
        style={{
          width: "100%",
          height: 100,
          display: "flex",
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
          <UploadFileOutlined color={isDragReject ? "error" : "primary"} />
          <Typography variant='body1'>
            {isDragActive ? "Drop the file here..." : "Drag & drop a file here, or click to select one"}
          </Typography>
        </Grid>
      </Box>
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
          }}>
          <Typography variant='body2' sx={{ flexGrow: 1 }}>
            {uploadedFile.name}
          </Typography>
          <IconButton onClick={handleRemoveFile} size='small' aria-label='Remove file'>
            <Delete fontSize='small' />
          </IconButton>
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
