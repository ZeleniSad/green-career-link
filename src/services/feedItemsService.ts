import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
  where,
} from "firebase/firestore";
import { db, storage } from "@/config/firebaseConfig";
import { FeedItemDto } from "@/types/dto";
import { FeedItemsFilters } from "@/types/interfaces";
import { deleteObject, ref } from "firebase/storage";

export interface PaginatedFeedItemsResult {
  feedItems: FeedItemDto[];
  totalCount: number;
}

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
      createdBy: data.createdBy,
    } as FeedItemDto;
    feedItems.push(feedItem);
  });
  return feedItems;
};

export const getFeedItemsPaginated = async (
  page: number,
  pageSize: number
): Promise<PaginatedFeedItemsResult> => {
  try {
    const feedItemsCollection = collection(db, "feedItems");

    // Get total count
    const countSnapshot = await getCountFromServer(feedItemsCollection);
    const totalCount = countSnapshot.data().count;

    // Calculate how many documents to fetch
    const skipCount = page * pageSize;
    const fetchLimit = skipCount + pageSize;

    // Firestore doesn't have efficient offset, so we fetch up to the needed documents
    // and slice client-side. For large datasets, consider cursor-based pagination instead.
    const q = query(
      feedItemsCollection,
      orderBy("createdAt", "desc"), // Order by createdAt descending for consistent pagination
      limit(fetchLimit)
    );

    const feedItemsSnapshot = await getDocs(q);
    const allFeedItems: FeedItemDto[] = [];
    feedItemsSnapshot.forEach((doc) => {
      const data = doc.data();
      const feedItem = {
        id: doc.id,
        userId: data.userId,
        createdAt: data.createdAt.toDate(),
        category: data.category,
        body: data.body,
        image: data.image,
        createdBy: data.createdBy,
      } as FeedItemDto;
      allFeedItems.push(feedItem);
    });

    // Slice to get only the current page
    const feedItems = allFeedItems.slice(skipCount, fetchLimit);

    return {
      feedItems,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching paginated feed items:", error);
    throw error;
  }
};

export const deleteFeedItem = async (
  id: string,
  fileUrl: string,
): Promise<void> => {
  try {
    if (fileUrl && fileUrl !== "") {
      const encodedPath = fileUrl.split("/o/")[1].split("?")[0];

      const filePath = decodeURIComponent(encodedPath);

      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
    }

    await deleteDoc(doc(db, "feedItems", id));
  } catch (error) {
    console.error("Error deleting feed item:", error);
    throw error;
  }
};
