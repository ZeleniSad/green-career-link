// pages/feed.tsx
import { useCallback, useEffect, useRef, useState } from "react";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/system";
import { HorizontalSplitOutlined } from "@mui/icons-material";
import { FeedItemDto } from "@/types/dto";
import { FeedItem } from "@/components/feed/feed-item/feed-item";

const ITEMS_PER_PAGE = 4;

export type SortDirection = "asc" | "desc";

export interface FilterState {
  category: string | null;
  sortDirection: SortDirection;
}

export default function FeedItems({ filters }: { filters: FilterState }) {
  const [feedItems, setFeedItems] = useState<FeedItemDto[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const loadItems = async (isInitial: boolean = false) => {
    if ((!isInitial && !lastDoc) || loading) return;

    try {
      setLoading(true);
      const feedRef = collection(db, "feedItems");

      // Build query with filters
      let baseQuery = query(
        feedRef,
        orderBy("createdAt", filters.sortDirection),
        limit(ITEMS_PER_PAGE),
      );

      // Add category filter if selected
      if (filters.category) {
        baseQuery = query(baseQuery, where("category", "==", filters.category));
      }

      // Add pagination if not initial load
      if (!isInitial && lastDoc) {
        baseQuery = query(baseQuery, startAfter(lastDoc));
      }

      const snapshot = await getDocs(baseQuery);
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as FeedItemDto[];

      if (isInitial) {
        setFeedItems(items);
      } else {
        setFeedItems((prev) => [...prev, ...items]);
      }

      setLastDoc(snapshot.docs[snapshot.docs.length - 1] || null);
      setHasMore(items.length === ITEMS_PER_PAGE);
    } catch (error) {
      console.error("Error loading feed:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset and reload when filters change
  useEffect(() => {
    setLastDoc(null);
    setHasMore(true);
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
    const option: IntersectionObserverInit = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    } as IntersectionObserverInit;

    if (loadingRef.current) {
      observerRef.current = new IntersectionObserver(handleObserver, option);
      observerRef.current?.observe(loadingRef.current as Element);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current?.disconnect();
      }
    };
  }, [handleObserver]);

  return (
    <Grid container>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
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

        {loading && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={2}
          >
            <CircularProgress />
            <Typography variant="body1" sx={{ ml: 2 }}>
              Fetching new posts...
            </Typography>
          </Box>
        )}

        {!loading && feedItems.length === 0 && (
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            sx={{ flexDirection: "column" }}
          >
            <HorizontalSplitOutlined
              fontSize="large"
              sx={{ width: 89, height: 89 }}
            />
            <Typography variant="h5" align="center">
              No posts found in this category.
            </Typography>
          </Grid>
        )}
      </Paper>

      {/* Loading indicator and observer target */}
      {hasMore && (
        <div ref={loadingRef} className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
        </div>
      )}
    </Grid>
  );
}
