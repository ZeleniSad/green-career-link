"use client";
import { DashboardAppBar } from "@/components/feed/feed-app-bar/dashboard-app-bar";
import { Box } from "@mui/material";
import styles from "./feed.module.css";
import React, { useState } from "react";
import { FeedItemDto } from "@/types/dto";
import FeedItems, { FilterState } from "@/components/feed/feed-items";

export const Feed = () => {
  const [feedItems, setFeedItems] = useState<FeedItemDto[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    sortDirection: "desc",
  });

  return (
    <Box className={styles.wrapper}>
      <DashboardAppBar
        feedItems={feedItems}
        setFeedItems={setFeedItems}
        setFilters={setFilters}
      />
      <FeedItems filters={filters} />
    </Box>
  );
};
