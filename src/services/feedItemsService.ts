import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { FeedItemDto } from "../types/dto";

export const getFeedItemsData = async (
  lastVisible: QueryDocumentSnapshot<DocumentData> | null
): Promise<{ items: FeedItemDto[]; lastDoc: QueryDocumentSnapshot<DocumentData> | null }> => {
  let feedItemsQuery = query(collection(db, "feedItems"), orderBy("createdAt", "desc"), limit(10));

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
