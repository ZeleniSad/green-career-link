import { Welcome } from "@/components/feed/feed-app-bar/welcome";
import { Grid } from "@mui/system";
import { CreatePostButton } from "@/components/feed/feed-app-bar/create-post-button";
import { FeedAppBarUser } from "@/components/feed/feed-app-bar/feed-app-bar-user";

export const ProfileHeader = ({ handleOpen }: { handleOpen: () => void }) => {
  return (
    <Grid
      container
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Welcome />
      <Grid container sx={{ gap: 3 }}>
        <CreatePostButton onClick={handleOpen} />
        <FeedAppBarUser />
      </Grid>
    </Grid>
  );
};
