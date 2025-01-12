import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { EducationItemDto, EducationQAItemDto } from "../types/dto";

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
