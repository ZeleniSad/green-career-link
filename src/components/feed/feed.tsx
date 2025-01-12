import { DashboardAppBar } from "@/components/feed/feed-app-bar/dashboard-app-bar";
import { FeedItems } from "@/components/feed/feed-items/feed-Items";
import { Box } from "@mui/material";
import styles from "./feed.module.css";

export const Feed = () => {
  return (
    <Box className={styles.wrapper}>
      <DashboardAppBar />
      <FeedItems />
    </Box>
  );
};
