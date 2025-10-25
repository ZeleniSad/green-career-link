import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getCountFromServer,
  getDocs,
  limit,
  orderBy,
  query,
  UpdateData,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../config/firebaseConfig";
import { EducationItemDto, EducationQAItemDto } from "../types/dto";
import { deleteObject, ref } from "firebase/storage";

export interface PaginatedEducationsResult {
  educations: EducationItemDto[];
  totalCount: number;
}

export interface PaginatedQAsResult {
  qas: EducationQAItemDto[];
  totalCount: number;
}

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

export const getEducationsPaginated = async (
  page: number,
  pageSize: number
): Promise<PaginatedEducationsResult> => {
  try {
    const educationsCollection = collection(db, "educations");

    // Get total count
    const countSnapshot = await getCountFromServer(educationsCollection);
    const totalCount = countSnapshot.data().count;

    // Calculate how many documents to fetch
    const skipCount = page * pageSize;
    const fetchLimit = skipCount + pageSize;

    // Firestore doesn't have efficient offset, so we fetch up to the needed documents
    // and slice client-side. For large datasets, consider cursor-based pagination instead.
    const q = query(
      educationsCollection,
      orderBy("title"), // Order by title for consistent pagination
      limit(fetchLimit)
    );

    const educationsSnapshot = await getDocs(q);
    const allEducations = educationsSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as EducationItemDto)
    );

    // Slice to get only the current page
    const educations = allEducations.slice(skipCount, fetchLimit);

    return {
      educations,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching paginated educations:", error);
    throw error;
  }
};

export const createEducation = async (education: EducationItemDto): Promise<void> => {
  try {
    const educationsCollection = collection(db, "educations");

    await addDoc(educationsCollection, education);
  } catch (error) {
    console.error("Error creating education:", error);
    throw error;
  }
};

export const updateEducation = async (education: EducationItemDto): Promise<void> => {
  try {
    const educationDoc = doc(db, "educations", education.id);
    await updateDoc(educationDoc, education as UpdateData<EducationItemDto>);
  } catch (error) {
    console.error("Error updating education:", error);
    throw error;
  }
};

export const deleteEducation = async (id: string, fileUrl: string): Promise<void> => {
  try {
    if (fileUrl && fileUrl !== "") {
      const encodedPath = fileUrl.split("/o/")[1].split("?")[0];

      const filePath = decodeURIComponent(encodedPath);

      const fileRef = ref(storage, filePath);
      await deleteObject(fileRef);
    }

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

export const getQAsPaginated = async (
  page: number,
  pageSize: number
): Promise<PaginatedQAsResult> => {
  try {
    const qasCollection = collection(db, "qas");

    // Get total count
    const countSnapshot = await getCountFromServer(qasCollection);
    const totalCount = countSnapshot.data().count;

    // Calculate how many documents to fetch
    const skipCount = page * pageSize;
    const fetchLimit = skipCount + pageSize;

    // Firestore doesn't have efficient offset, so we fetch up to the needed documents
    // and slice client-side. For large datasets, consider cursor-based pagination instead.
    const q = query(
      qasCollection,
      orderBy("title"), // Order by title for consistent pagination
      limit(fetchLimit)
    );

    const qasSnapshot = await getDocs(q);
    const allQAs = qasSnapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as EducationQAItemDto)
    );

    // Slice to get only the current page
    const qas = allQAs.slice(skipCount, fetchLimit);

    return {
      qas,
      totalCount,
    };
  } catch (error) {
    console.error("Error fetching paginated QAs:", error);
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

export const updateQA = async (qa: EducationQAItemDto): Promise<void> => {
  try {
    const qaDoc = doc(db, "qas", qa.id);
    await updateDoc(qaDoc, qa as UpdateData<EducationQAItemDto>);
  } catch (error) {
    console.error("Error updating QA:", error);
    throw error;
  }
};

export const createQA = async (qa: EducationQAItemDto): Promise<void> => {
  try {
    const qasCollection = collection(db, "qas");

    await addDoc(qasCollection, qa);
  } catch (error) {
    console.error("Error creating QA:", error);
    throw error;
  }
};
