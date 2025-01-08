import { NextRequest, NextResponse } from "next/server";
import { checkEmailInUse } from "@/lib/firebase-admin";
import { object, string, ValidationError } from "yup";

export async function GET(_: NextRequest, context: { params: Promise<{ email: string }> }) {
  try {
    const { email } = (await context.params) as { email: string };

    await emailCheckSchema.validate({ email }, { abortEarly: false });

    const inuse = await checkEmailInUse(email);

    return NextResponse.json({ inuse }, { status: 200 });
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json({ message: "An unexpected error occurred" }, { status: 500 });
  }
}

const emailCheckSchema = object({
  email: string().trim().email("Invalid email format").required("Email is required"),
});
