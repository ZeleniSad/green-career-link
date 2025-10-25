import { db } from "@/config/firebaseConfig"; // Assume you have a Firestore instance
import {
  collection,
  doc,
  documentId,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { CompanyInformation, IndividualInformation } from "@/types/interfaces";
import { CompanyUserDto, IndividualUserDto } from "@/types/dto";

export interface PaginatedUsersResult {
  users: (IndividualUserDto | CompanyUserDto)[];
  totalCount: number;
}

export const fetchUserByUid = async (uid: string) => {
  try {
    const userDoc = doc(db, "users", uid); // Reference to the user's document
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      return { id: userSnapshot.id, ...userSnapshot.data() };
    } else {
      console.error("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export const fetchAllUsers = async () => {
  try {
    const usersCollection = collection(db, "users"); // Reference to the users collection
    const usersSnapshot = await getDocs(usersCollection);
    return usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const fetchUsersPaginated = async (page: number, pageSize: number): Promise<PaginatedUsersResult> => {
  try {
    const usersCollection = collection(db, "users");

    // Get total count
    const countSnapshot = await getCountFromServer(usersCollection);
    const totalCount = countSnapshot.data().count;

    // Calculate how many documents to fetch
    const skipCount = page * pageSize;
    const fetchLimit = skipCount + pageSize;

    // Firestore doesn't have efficient offset, so we fetch up to the needed documents
    // and slice client-side. For large datasets, consider cursor-based pagination instead.
    const q = query(
      usersCollection,
      orderBy("email"), // Order by email for consistent pagination
      limit(fetchLimit)
    );

    const usersSnapshot = await getDocs(q);
    const allUsers = usersSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as IndividualUserDto | CompanyUserDto)
    );

    // Slice to get only the current page
    const users = allUsers.slice(skipCount, fetchLimit);

    return {
      users,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching paginated users:", error);
    throw error;
  }
};

export const getUsersDataMapInChunks = async (
  userIds: string[]
): Promise<Record<string, IndividualInformation | CompanyInformation>> => {
  const userChunks = [];
  const chunkSize = 10;

  for (let i = 0; i < userIds.length; i += chunkSize) {
    userChunks.push(userIds.slice(i, i + chunkSize));
  }

  const userDocsPromises = userChunks.map((chunk) =>
    getDocs(query(collection(db, "users"), where(documentId(), "in", chunk)))
  );

  const userDocsSnapshots = await Promise.all(userDocsPromises);
  const userMap: Record<string, IndividualInformation | CompanyInformation> = {};

  userDocsSnapshots.forEach((snapshot) => {
    snapshot.forEach((userDoc) => {
      const userData = userDoc.data();
      userMap[userDoc.id] = { id: userDoc.id, ...userData } as unknown as IndividualInformation | CompanyInformation;
    });
  });

  return userMap;
};
