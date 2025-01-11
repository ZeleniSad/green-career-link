import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebaseConfig";

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
