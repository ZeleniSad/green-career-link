import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { storage } from "@/config/firebaseConfig";
import {
  doc,
  DocumentData,
  DocumentReference,
  getFirestore,
  UpdateData,
  updateDoc,
} from "firebase/firestore";

export const uploadFile = async (
  file: File,
  userId: string,
): Promise<string> => {
  try {
    const name = `${file.name}_${Date.now()}`;
    const storageRef = ref(storage, `/documents/${userId}/${name}`);
    const snapshot = await uploadBytes(storageRef, file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {
    console.error("Upload failed", error);
    throw error;
  }
};

export const removeFileAndUpdateRecord = async (
  fileUrl: string,
  userId: string,
) => {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, fileUrl);
    await deleteObject(fileRef);

    const db = getFirestore();
    const userDocRef: DocumentReference<DocumentData> = doc(
      db,
      "users",
      userId,
    );
    await updateDoc(userDocRef, { cvUrl: "" } as UpdateData<{ cvUrl: string }>);
    return true;
  } catch (error) {
    console.error("Error removing file: ", error);
    return false;
  }
};
