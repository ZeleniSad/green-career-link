import {
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { Download, InsertDriveFileOutlined } from "@mui/icons-material";

export const FileCard = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent
        sx={{
          gap: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InsertDriveFileOutlined fontSize="large" />
        <Typography variant="body1">Education File Name</Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "#060F0E0D",
        }}
      >
        <Typography variant="body2">Filename.pdf</Typography>
        <IconButton color="primary">
          <Download />
        </IconButton>
      </CardActions>
    </Card>
  );
};
