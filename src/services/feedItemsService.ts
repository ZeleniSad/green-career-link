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
import { FeedItemDto } from "@/types/dto";
import { FeedItemsFilters } from "@/types/interfaces";

export const getFeedItemsData = async (
  lastVisible: QueryDocumentSnapshot<DocumentData> | null,
  filters: FeedItemsFilters,
): Promise<{
  items: FeedItemDto[];
  lastDoc: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  let feedItemsQuery = query(
    collection(db, "feedItems"),
    orderBy("createdAt", filters.order),
    limit(10),
  );

  if (filters.category) {
    feedItemsQuery = query(
      feedItemsQuery,
      where("category", "==", filters.category),
    );
  }

  if (lastVisible) {
    feedItemsQuery = query(feedItemsQuery, startAfter(lastVisible));
  }

  const feedItemsSnapshot = await getDocs(feedItemsQuery);

  if (feedItemsSnapshot.empty) {
    return { items: [], lastDoc: null };
  }

  const items: FeedItemDto[] = [];
  feedItemsSnapshot.forEach((doc) => {
    const data = doc.data();
    const feedItem = {
      id: doc.id,
      userId: data.userId,
      createdAt: data.createdAt.toDate(),
      category: data.category,
      body: data.body,
      image: data.image,
    } as FeedItemDto;
    items.push(feedItem);
  });

  return {
    items,
    lastDoc: feedItemsSnapshot.docs[feedItemsSnapshot.docs.length - 1],
  };
};

export const getAllFeedItems = async (): Promise<FeedItemDto[]> => {
  // Get All feed items from firebase
  const feedItemsQuery = query(
    collection(db, "feedItems"),
    orderBy("createdAt", "desc"),
  );
  const feedItemsSnapshot = await getDocs(feedItemsQuery);
  const feedItems: FeedItemDto[] = [];
  feedItemsSnapshot.forEach((doc) => {
    const data = doc.data();
    const feedItem = {
      id: doc.id,
      userId: data.userId,
      createdAt: data.createdAt.toDate(),
      category: data.category,
      body: data.body,
      image: data.image,
    } as FeedItemDto;
    feedItems.push(feedItem);
  });
  return feedItems;
};
