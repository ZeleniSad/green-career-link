import { db } from "@/config/firebaseConfig"; // Assume you have a Firestore instance
import { collection, doc, documentId, getDoc, getDocs, query, where } from "firebase/firestore";
import { CompanyInformation, IndividualInformation } from "@/types/interfaces";

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
