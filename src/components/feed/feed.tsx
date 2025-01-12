"use client";
import { DashboardAppBar } from "@/components/feed/feed-app-bar/dashboard-app-bar";
import { FeedItems } from "@/components/feed/feed-items/feed-Items";
import { Box } from "@mui/material";
import styles from "./feed.module.css";
import { useState } from "react";
import { FeedItemDto } from "@/types/dto";

export const Feed = () => {
  const [feedItems, setFeedItems] = useState<FeedItemDto[]>([]);

  return (
    <Box className={styles.wrapper}>
      <DashboardAppBar feedItems={feedItems} setFeedItems={setFeedItems} />
      <FeedItems feedItems={feedItems} setFeedItems={setFeedItems} />
    </Box>
  );
};
