import { Button } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Grid } from "@mui/system";

const labels = {
  createPost: "Create post",
};
export const CreatePostButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Grid>
      <Button
        size="small"
        variant="contained"
        sx={{
          gap: 1,
          fontWeight: 100,
          height: "100%",
        }}
        onClick={onClick}
      >
        <Add fontSize="small" />
        {labels.createPost}
      </Button>
    </Grid>
  );
};
