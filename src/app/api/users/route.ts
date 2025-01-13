import { NextRequest, NextResponse } from "next/server";
import { ValidationError } from "yup";
import { RegisterPayload, registrationSchema } from "@/shared/register.schema";
import {
  registerUser,
  createUserDoc,
  checkEmailInUse,
  generateVerificationLink,
  isAdminToken,
  deleteUser,
} from "@/lib/firebase-admin";
import { UserType } from "@/types/enums";
import { sendEmailVerification } from "@/lib/email-sender";
import logger from "@/lib/logger";

export async function DELETE(request: NextRequest) {
  try {
    const jwt = request.headers.get("Authorization");
    const userId = request.headers.get("userId");
    if (!userId || !(await isAdminToken(jwt, userId))) {
      return NextResponse.json({ messsage: "Unauthorized" }, { status: 403 });
    }

    await deleteUser(userId);

    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    logger.error({ err: error, message: "Error deleting user" });
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();

    await registrationSchema.validate(payload, { abortEarly: false });

    const inuse = await checkEmailInUse(payload.email);

    if (inuse) {
      return NextResponse.json({ errors: { email: "Email is already in use" } }, { status: 400 });
    }

    await handleRegister(payload as RegisterPayload);

    await sendVerificationEmail(
      payload.email,
      payload.userType === UserType.Individual ? payload.firstName : payload.companyName
    );

    return NextResponse.json({ message: "Registration successful" });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}

const handleRegister = async ({
  email,
  password,
  firstName,
  lastName,
  companyName,
  userType,
  city,
  country,
  phone,
}: RegisterPayload) => {
  const displayName = userType === UserType.Individual ? `${firstName} ${lastName}` : `${companyName}`;
  const uid = await registerUser({ email, password, displayName });

  await createUserDoc(uid, cleanObject({ email, firstName, lastName, companyName, userType, city, country, phone }));
};

const sendVerificationEmail = async (email: string, name: string) => {
  const verificationLink = await generateVerificationLink(email);

  await sendEmailVerification(email, verificationLink, name);
};

/* eslint-disable @typescript-eslint/no-unused-vars */
const cleanObject = (user: Partial<RegisterPayload>): RegisterPayload =>
  Object.fromEntries(Object.entries(user).filter(([_, value]) => value !== undefined)) as RegisterPayload;
