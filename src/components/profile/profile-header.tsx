import { Welcome } from "@/components/feed/feed-app-bar/welcome";
import { Grid } from "@mui/system";
import { FeedAppBarUser } from "@/components/feed/feed-app-bar/feed-app-bar-user";

export const ProfileHeader = () => {
  return (
    <Grid
      container
      sx={{ justifyContent: "space-between", alignItems: "center" }}
    >
      <Welcome />
      <Grid container sx={{ gap: 3 }}>
        <FeedAppBarUser />
      </Grid>
    </Grid>
  );
};
