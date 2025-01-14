"use client";
import { DashboardAppBar } from "@/components/feed/feed-app-bar/dashboard-app-bar";
import { FeedItems } from "@/components/feed/feed-items/feed-Items";
import { Box } from "@mui/material";
import styles from "./feed.module.css";
import { useState } from "react";
import { FeedItemDto } from "@/types/dto";
import { FeedItemsFilters } from "@/types/interfaces";

export const Feed = () => {
  const [feedItems, setFeedItems] = useState<FeedItemDto[]>([]);
  const [filters, setFilters] = useState<FeedItemsFilters>({
    category: null,
    order: "desc",
  });

  return (
    <Box className={styles.wrapper}>
      <DashboardAppBar feedItems={feedItems} setFeedItems={setFeedItems} setFilters={setFilters} />
      <FeedItems feedItems={feedItems} setFeedItems={setFeedItems} filters={filters} />
    </Box>
  );
};
