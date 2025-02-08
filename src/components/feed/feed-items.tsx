import { useCallback, useEffect, useRef } from "react";
import { Box, Paper } from "@mui/material";
import { Grid } from "@mui/system";
import { FeedItemDto } from "@/types/dto";
import { FeedItem } from "@/components/feed/feed-item/feed-item";
import { FilterState } from "@/hooks/use-feed-state";

interface FeedItemsProps {
  feedItems: FeedItemDto[];
  loading: boolean;
  hasMore: boolean;
  filters: FilterState;
  loadItems: (isInitial?: boolean) => Promise<void>;
}

export default function FeedItems({
  feedItems,
  loading,
  hasMore,
  filters,
  loadItems,
}: FeedItemsProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  // Reset and reload when filters change
  useEffect(() => {
    loadItems(true);
  }, [filters]);

  // Callback for intersection observer
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        loadItems();
      }
    },
    [hasMore, loading],
  );

  // Set up intersection observer
  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    if (loadingRef.current) {
      observerRef.current = new IntersectionObserver(
        handleObserver,
        option as IntersectionObserverInit,
      );
      observerRef.current?.observe(loadingRef.current as Element);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current?.disconnect();
      }
    };
  }, [handleObserver]);

  return (
    <Grid container sx={{}}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          height: "100%",
          width: "100%",
          p: 3,
          borderRadius: 0,
        }}
      >
        {feedItems.map((feedItem) => (
          <Box id={feedItem.id} key={feedItem.id}>
            <FeedItem item={feedItem} />
          </Box>
        ))}
      </Paper>
      {/* Loading indicator and observer target */}
      {hasMore && <Box ref={loadingRef} />}
    </Grid>
  );
}
