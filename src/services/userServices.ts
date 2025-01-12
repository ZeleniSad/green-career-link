import { db } from "@/config/firebaseConfig"; // Assume you have a Firestore instance
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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
