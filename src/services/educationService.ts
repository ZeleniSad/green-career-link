import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db, storage } from "../config/firebaseConfig";
import { EducationItemDto, EducationQAItemDto } from "../types/dto";
import { deleteObject, ref } from "firebase/storage";

export const getEducationsData = async (): Promise<EducationItemDto[]> => {
  try {
    const educationsCollection = collection(db, "educations");
    const educationsSnapshot = await getDocs(educationsCollection);

    const educations = educationsSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as EducationItemDto)
    );
    return educations;
  } catch (error) {
    console.error("Error fetching educations:", error);
    throw error;
  }
};

export const deleteEducation = async (id: string, fileUrl: string): Promise<void> => {
  try {
    const encodedPath = fileUrl.split("/o/")[1].split("?")[0];

    const filePath = decodeURIComponent(encodedPath);

    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);

    await deleteDoc(doc(db, "educations", id));
  } catch (error) {
    console.error("Error deleting education:", error);
    throw error;
  }
};

export const getQAsData = async (): Promise<EducationQAItemDto[]> => {
  try {
    const qasCollection = collection(db, "qas");
    const qasSnapshot = await getDocs(qasCollection);

    const qas = qasSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as EducationQAItemDto)
    );
    return qas;
  } catch (error) {
    console.error("Error fetching qas:", error);
    throw error;
  }
};

export const deleteQA = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, "qas", id));
  } catch (error) {
    console.error("Error deleting QA:", error);
    throw error;
  }
};
