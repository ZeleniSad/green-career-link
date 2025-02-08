// components/feed/feed.tsx
"use client";
import { DashboardAppBar } from "@/components/feed/feed-app-bar/dashboard-app-bar";
import { Box } from "@mui/material";
import styles from "./feed.module.css";
import FeedItems from "@/components/feed/feed-items";
import { useFeedState } from "@/hooks/use-feed-state";

export const Feed = () => {
  const {
    feedItems,
    loading,
    hasMore,
    filters,
    setFilters,
    loadItems,
    addFeedItem,
  } = useFeedState();

  return (
    <Box className={styles.wrapper}>
      <DashboardAppBar
        filters={filters}
        addFeedItem={addFeedItem}
        setFilters={setFilters}
      />
      <FeedItems
        feedItems={feedItems}
        loading={loading}
        hasMore={hasMore}
        filters={filters}
        loadItems={loadItems}
      />
    </Box>
  );
};
