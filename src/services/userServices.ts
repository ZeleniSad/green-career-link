import { db } from "@/config/firebaseConfig"; // Assume you have a Firestore instance
import { doc, getDoc } from "firebase/firestore";

export const getUserData = async (uid: string) => {
  const userDoc = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDoc);
  if (userSnapshot.exists()) {
    return userSnapshot.data();
  } else {
    throw new Error("User not found");
  }
};
