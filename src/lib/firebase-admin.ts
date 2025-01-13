"use server";

import { UserType } from "@/types/enums";
import * as dotenv from "dotenv";
import logger from "@/lib/logger";

import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const serviceAccount: any = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PROJECT_KEY_ID,
  private_key: process.env.FIREBASE_ADMIN_PK?.replace(/\\n/g, "\n"),
  client_email: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_ADMIN_CLIENT_ID,
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url:
    "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-o6xuk%40green-platform-1c981.iam.gserviceaccount.com",
  universe_domain: "googleapis.com",
};

let adminApp: App;

if (!getApps().length) {
  adminApp = initializeApp({
    credential: cert(serviceAccount),
  });
} else {
  adminApp = getApps()[0];
}

const adminAuth = getAuth(adminApp);
const adminDb = getFirestore(adminApp);
const adminStorage = getStorage(adminApp);

const registerUser = async ({
  email,
  password,
  displayName,
}: {
  email: string;
  password: string;
  displayName: string;
}): Promise<string> => {
  try {
    const user = await adminAuth.createUser({
      email,
      password,
      displayName,
    });

    return user.uid;
  } catch (error) {
    logger.error({ err: error, message: "Error registering user" });
    throw error;
  }
};

const createUserDoc = async (
  uid: string,
  data: {
    firstName?: string | undefined;
    lastName?: string | undefined;
    companyName?: string | undefined;
    email: string;
    userType: NonNullable<UserType | undefined>;
    country: string;
    city: string;
    phone: string;
  }
) => {
  try {
    await adminDb.collection("users").doc(uid).set(data);
  } catch (error) {
    logger.error({ err: error, message: "Error creating user document" });
    throw error;
  }
};

const checkEmailInUse = async (email: string): Promise<boolean> => {
  try {
    const user = await adminAuth.getUserByEmail(email);
    return !!user;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    return false;
  }
};

const generateVerificationLink = async (email: string): Promise<string> => {
  try {
    const link = await adminAuth.generateEmailVerificationLink(email, {
      url: `${process.env.NEXT_PUBLIC_VERIFICATION_URL}`,
    });

    return link;
  } catch (error) {
    logger.error({ err: error, message: "Error generating verification link" });
    throw error;
  }
};

const isAdminToken = async (token: string | null, uid: string) => {
  if (!token) {
    return false;
  }
  try {
    const adminUid = process.env.ADMIN_UID;
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken["admin"] === true && uid !== adminUid;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    return false;
  }
};

const deleteDocumentsConditionally = async (collectionName: string, field: string, value: string) => {
  const collectionRef = adminDb.collection(collectionName);
  const query = collectionRef.where(field, "==", value);
  const querySnapshot = await query.get();

  if (querySnapshot.empty) {
    logger.info(`No matching documents found in ${collectionName} where ${field} == ${value}.`);
    return;
  }

  const batchSize = 500; // Firestore allows up to 500 operations per batch
  let batch = adminDb.batch();
  let count = 0;

  querySnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
    count++;

    if (count % batchSize === 0) {
      batch.commit();
      batch = adminDb.batch();
    }
  });

  if (count % batchSize !== 0) {
    await batch.commit();
  }

  logger.info(`Deleted ${count} documents from ${collectionName} where ${field} == ${value}.`);
};

const deleteUserStorageFolder = async (userId: string): Promise<void> => {
  const folderPath = `documents/${userId}/`;
  const bucket = adminStorage.bucket(process.env.FIREBASE_BUCKET_NAME);

  await bucket.deleteFiles({ prefix: folderPath });

  logger.info(`Deleted storage folder for userId: ${userId}`);
};

const deleteUserColl = async (userId: string): Promise<void> => {
  await adminDb.collection("users").doc(userId).delete();

  logger.info(`Deleted user document for userId: ${userId}`);
};

const deleteUser = async (uid: string) => {
  try {
    try {
      await adminAuth.getUser(uid);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return;
    }

    await deleteUserStorageFolder(uid);
    await deleteDocumentsConditionally("feedItems", "userId", uid);
    await deleteUserColl(uid);

    await adminAuth.deleteUser(uid);
  } catch (error) {
    logger.error({ err: error, message: "Error deleting user" });
    throw error;
  }
};
export { registerUser, createUserDoc, checkEmailInUse, generateVerificationLink, isAdminToken, deleteUser };
