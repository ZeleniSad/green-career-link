// hooks/useFeedState.ts
import { useCallback, useState } from "react";
import {
  addDoc,
  collection,
  CollectionReference,
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
import { FeedItemDto } from "@/types/dto";

const ITEMS_PER_PAGE = 10;

export type SortDirection = "asc" | "desc";

export interface FilterState {
  category: string | null;
  sortDirection: SortDirection;
}

export const useFeedState = () => {
  const [feedItems, setFeedItems] = useState<FeedItemDto[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    category: null,
    sortDirection: "desc",
  });

  const loadItems = useCallback(
    async (isInitial: boolean = false) => {
      if ((!isInitial && !lastDoc) || loading) return;

      try {
        setLoading(true);
        const feedRef = collection(db, "feedItems");

        let baseQuery = query(
          feedRef,
          orderBy("createdAt", filters.sortDirection),
          limit(ITEMS_PER_PAGE),
        );

        if (filters.category) {
          baseQuery = query(
            baseQuery,
            where("category", "==", filters.category),
          );
        }

        if (!isInitial && lastDoc) {
          baseQuery = query(baseQuery, startAfter(lastDoc));
        }

        const snapshot = await getDocs(baseQuery);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt.toDate(),
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
    },
    [filters, lastDoc, loading],
  );

  const addFeedItem = async (newItem: Omit<FeedItemDto, "id">) => {
    try {
      setLoading(true);
      const feedItemsCollection = collection(db, "feedItems");
      const docRef = await addDoc(
        feedItemsCollection as CollectionReference<FeedItemDto>,
        newItem,
      );

      const addedItem = {
        ...newItem,
        id: docRef.id,
      } as FeedItemDto;

      setFeedItems((prev) => [addedItem, ...prev]);
      return addedItem;
    } catch (error) {
      console.error("Error creating feed item: ", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resetAndReload = useCallback(() => {
    setLastDoc(null);
    setHasMore(true);
    loadItems(true);
  }, [loadItems]);

  return {
    feedItems,
    loading,
    hasMore,
    filters,
    setFilters,
    loadItems,
    addFeedItem,
    resetAndReload,
  };
};
