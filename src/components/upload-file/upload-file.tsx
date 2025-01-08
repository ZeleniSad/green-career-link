import { Grid } from "@mui/system";
import { UploadFileOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import Dropzone from "react-dropzone";

const labels = {
  attachFiles: "Attach files",
};

export const UploadFile = ({ disabled }: { disabled: boolean }) => {
  return (
    <Dropzone
      onDrop={(acceptedFiles) => console.log(acceptedFiles)}
      disabled={disabled}
    >
      {({ getRootProps, getInputProps }) => (
        <div
          style={{
            width: "100%",
            height: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            background: "#F1F7F6",
            gap: 8,
            borderRadius: 6,
            cursor: "pointer",
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <Grid container sx={{ gap: 1 }}>
            <UploadFileOutlined color="primary" />
            <Typography variant="body1">{labels.attachFiles}</Typography>
          </Grid>
        </div>
      )}
    </Dropzone>
  );
};
