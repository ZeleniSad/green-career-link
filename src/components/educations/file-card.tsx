import { Card, CardActions, CardContent, IconButton, Typography } from "@mui/material";
import { InsertDriveFileOutlined, OpenInNew } from "@mui/icons-material";

export const FileCard = ({ title, fileName, fileUrl }: { title: string; fileName: string; fileUrl: string }) => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent
        sx={{
          gap: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
        <InsertDriveFileOutlined fontSize='large' />
        <Typography variant='body1'>{title}</Typography>
      </CardContent>
      <CardActions
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          backgroundColor: "#060F0E0D",
        }}>
        <Typography variant='body2'>{fileName}</Typography>
        <IconButton color='primary' href={fileUrl} target='_blank' underline='none'>
          <OpenInNew fontSize='small' />
        </IconButton>
      </CardActions>
    </Card>
  );
};
