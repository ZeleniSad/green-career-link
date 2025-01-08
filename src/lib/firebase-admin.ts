"use server";

import { UserType } from "@/types/enums";
import * as dotenv from "dotenv";
import logger from "@/lib/logger";

import { initializeApp, getApps, cert, App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

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
export { registerUser, createUserDoc, checkEmailInUse };
