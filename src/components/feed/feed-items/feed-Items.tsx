"use client";

import { Grid } from "@mui/system";
import { Alert, Box, CircularProgress, Paper, Typography } from "@mui/material";
import { FeedItem } from "@/components/feed/feed-item/feed-item";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FeedItemDto } from "@/types/dto";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { UserType } from "@/types/enums";
import { getFeedItemsData } from "@/services/feedItemsService";
import { getUsersDataMapInChunks } from "@/services/userServices";
import { CompanyInformation, FeedItemsFilters, IndividualInformation } from "@/types/interfaces";
import { set } from "date-fns";

const FEED_ITEMS_DELAY = 800;

export const FeedItems: FC = ({
  feedItems,
  setFeedItems,
  filters,
}: {
  feedItems: FeedItemDto[];
  setFeedItems: (value: ((prevState: FeedItemDto[]) => FeedItemDto[]) | FeedItemDto[]) => void;
  filters: FeedItemsFilters;
}) => {
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const observer = useRef<IntersectionObserver | null>(null);
  const usersCache = useRef<Record<string, IndividualInformation | CompanyInformation>>({});
  const debounceTimeout = useRef<NodeJS.Timeout>();

  const mapCreatorsToFeedItems = async (feedItemCreatorIds: string[], newFeedItems: FeedItemDto[]) => {
    // Filter out already cached user IDs
    const uncachedUserIds = feedItemCreatorIds.filter((id) => !usersCache.current[id]);

    if (uncachedUserIds.length > 0) {
      const feedItemCreatorsMap = await getUsersDataMapInChunks(uncachedUserIds);
      // Update cache with new user data
      usersCache.current = { ...usersCache.current, ...feedItemCreatorsMap };
    }

    return newFeedItems.map((item) => {
      const feedUser = usersCache.current[item.userId];
      const userType = feedUser.userType;

      const createdBy =
        userType === UserType.Individual ? `${feedUser.firstName} ${feedUser.lastName}` : feedUser.companyName;

      return {
        ...item,
        userType,
        createdBy,
        applyToEmail: feedUser.email,
        profileUrl: feedUser.profileUrl,
      } as FeedItemDto;
    });
  };

  const fetchFeedItems = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);

      const { items: newFeedItems, lastDoc } = await getFeedItemsData(lastVisible, filters);

      if (!newFeedItems.length) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      // Use Set to ensure unique IDs
      const feedItemCreatorIds = [...new Set(newFeedItems.map((item) => item.userId))];
      const feedItemsWithUsers = await mapCreatorsToFeedItems(feedItemCreatorIds, newFeedItems);

      // Use Set to ensure unique feed items
      setFeedItems((prevItems) => {
        const uniqueItems = new Map<string, FeedItemDto>([
          ...prevItems.map((item) => [item.id, item] as [string, FeedItemDto]),
          ...feedItemsWithUsers.map((item) => [item.id, item] as [string, FeedItemDto]),
        ]);
        return Array.from(uniqueItems.values());
      });

      setLastVisible(lastDoc);
    } catch (error) {
      console.error("Error fetching feed items:", error);
    } finally {
      setLoading(false);
    }
  }, [hasMore, lastVisible, setFeedItems]);

  const debouncedFetch = useCallback(() => {
    if (loading) return;

    setLoading(true);

    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }

    debounceTimeout.current = setTimeout(() => {
      fetchFeedItems();
    }, FEED_ITEMS_DELAY);
  }, [fetchFeedItems, loading]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (loading) return;

      if (observer.current) observer.current?.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            debouncedFetch();
          }
        },
        {
          root: null,
          rootMargin: "100px",
          threshold: 0.1,
        } as IntersectionObserverInit
      );

      if (node) observer.current?.observe(node);
    },
    [debouncedFetch, loading, hasMore]
  );

  useEffect(() => {
    fetchFeedItems();

    return () => {
      if (observer.current) {
        observer.current?.disconnect();
      }
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [filters]);

  return (
    <Grid container>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          width: "100%",
          p: 3,
          borderRadius: 5,
        }}>
        {feedItems.map((feedItem, index) => (
          <Box id={feedItem.id} key={feedItem.id} ref={index === feedItems.length - 1 ? lastItemRef : null}>
            <FeedItem item={feedItem} />
          </Box>
        ))}

        {loading && (
          <Box display='flex' justifyContent='center' alignItems='center' mt={2}>
            <CircularProgress />
            <Typography variant='body1' sx={{ ml: 2 }}>
              Fetching new posts...
            </Typography>
          </Box>
        )}

        {!loading && feedItems.length === 0 && (
          <Alert severity='info' sx={{ mt: 2 }}>
            The feed is currently empty.
          </Alert>
        )}

        {/*{!loading && !hasMore && feedItems.length > 0 && (*/}
        {/*  <Alert severity="warning" sx={{ mt: 2 }}>*/}
        {/*    You&apos;ve reached the end of the feed.*/}
        {/*  </Alert>*/}
        {/*)}*/}
      </Paper>
    </Grid>
  );
};
