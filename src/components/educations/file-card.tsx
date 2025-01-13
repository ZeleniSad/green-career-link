import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Typography,
} from "@mui/material";
import { InsertDriveFileOutlined, OpenInNew } from "@mui/icons-material";

export const FileCard = ({ title, fileUrl }) => {
  return (
    <Card
      sx={{
        minWidth: 275,
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
        mb: 2,
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          p: 2,
          backgroundColor: "background.paper",
        }}
      >
        <InsertDriveFileOutlined color="action" />
        <Box>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
        </Box>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 1,
          backgroundColor: "background.default",
        }}
      >
        <IconButton
          color="primary"
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          sx={{
            transition: "transform 0.2s",
            "&:hover": {
              transform: "scale(1.1)",
            },
          }}
        >
          <OpenInNew />
        </IconButton>
      </CardActions>
    </Card>
  );
};
