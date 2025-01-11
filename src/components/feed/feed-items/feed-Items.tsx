"use client";

import { Grid } from "@mui/system";
import { Paper } from "@mui/material";
import { FeedItem } from "@/components/feed/feed-item/feed-item";
import { FC, useCallback, useEffect, useRef, useState } from "react";
import { FeedItemDto } from "../../../types/dto";
import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  documentId,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from "firebase/firestore";
import { db } from "@/config/firebaseConfig";
import { CompanyInformation, IndividualInformation } from "../../../types/interfaces";

export type SortOrder = "ascending" | "descending";
interface FeedItemsProps {
  sortOrder: SortOrder;
}

export const FeedItems: FC<FeedItemsProps> = ({ sortOrder }) => {
  const [feedItems, setFeedItems] = useState<FeedItemDto[]>([]);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true); // State to track if more items are available
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchFeedItems = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      setLoading(true);
      let feedQuery = query(
        collection(db, "feedItems"),
        orderBy("createdAt", sortOrder === "ascending" ? "asc" : "desc"),
        limit(10)
      );

      if (lastVisible) {
        feedQuery = query(feedQuery, startAfter(lastVisible));
      }

      const feedSnapshot = await getDocs(feedQuery);
      const newFeedItems: FeedItemDto[] = [];
      const userIdsToFetch: Set<string> = new Set();

      feedSnapshot.forEach((doc) => {
        const data = doc.data();
        const feedItem = {
          id: doc.id,
          userId: data.userId,
          createdAt: data.createdAt.toDate(),
          category: data.category,
          body: data.body,
          image: data.image,
        } as FeedItemDto;

        newFeedItems.push(feedItem);
        userIdsToFetch.add(data.userId);
      });

      if (feedSnapshot.empty) {
        setHasMore(false);
        setLoading(false);
        return;
      }

      const userIdsArray = Array.from(userIdsToFetch);
      const userChunks = [];
      const chunkSize = 10;

      for (let i = 0; i < userIdsArray.length; i += chunkSize) {
        userChunks.push(userIdsArray.slice(i, i + chunkSize));
      }

      const userDocsPromises = userChunks.map((chunk) =>
        getDocs(query(collection(db, "users"), where(documentId(), "in", chunk)))
      );

      const userDocsSnapshots = await Promise.all(userDocsPromises);
      const userMap: Record<string, IndividualInformation | CompanyInformation> = {};

      userDocsSnapshots.forEach((snapshot) => {
        snapshot.forEach((userDoc) => {
          const userData = userDoc.data();
          userMap[userDoc.id] = { id: userDoc.id, ...userData } as unknown as
            | IndividualInformation
            | CompanyInformation;
        });
      });

      const feedItemsWithUsers = newFeedItems.map((item) => {
        const feedUser = userMap[item.userId];
        const userType = feedUser.userType;
        const createdBy =
          userType === "individual" ? `${feedUser.firstName} ${feedUser.lastName}` : feedUser.companyName;

        return {
          ...item,
          userType,
          createdBy,
          applyToEmail: feedUser.email,
        } as FeedItemDto;
      });

      setFeedItems((prevItems) => [...prevItems, ...feedItemsWithUsers]);
      setLastVisible(feedSnapshot.docs[feedSnapshot.docs.length - 1]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching feed items:", error);
      setLoading(false);
    }
  }, [lastVisible, loading, hasMore, sortOrder]);

  const lastItemRef = useCallback(
    (node: HTMLDivElement) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          fetchFeedItems();
        }
      });
      if (node) observer.current.observe(node);
    },
    [fetchFeedItems]
  );

  useEffect(() => {
    fetchFeedItems();
  }, []);

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
          <div key={feedItem.id} ref={index === feedItems.length - 1 ? lastItemRef : null}>
            <FeedItem item={feedItem} />
          </div>
        ))}
        {loading && <p>Loading more items...</p>}
        {!hasMore && <p>No more items to load.</p>}
      </Paper>
    </Grid>
  );
};
