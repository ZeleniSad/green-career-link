import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "@/config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    if (!userCredential.user.emailVerified) {
      throw new Error("Email not verified");
    }
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

export const logout = async () => {
  try {
    await signOut(auth);
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

export const getAuthenticatedUser = () => {
  return new Promise((resolve, reject) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        resolve(user);
      } else {
        reject("No user is signed in");
      }
    });
  });
};

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
