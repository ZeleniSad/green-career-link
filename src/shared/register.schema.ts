import { object, string, mixed, ref, InferType } from "yup";
import { UserType } from "@/types/enums";

const passwordSchema = string()
  .required("Password is required")
  .min(8, "Password must be at least 8 characters long")
  .matches(/[a-z]/, "Password must contain at least one lowercase letter")
  .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
  .matches(/\d/, "Password must contain at least one number")
  .matches(/[@$!%*?&]/, "Password must contain at least one special character");

const repeatPasswordSchema = string()
  .required("Please confirm your password")
  .oneOf([ref("password")], "Passwords must match");

const baseRegisterSchema = object({
  userType: mixed<UserType>().oneOf(Object.values(UserType), "Invalid user type").required("User type is required"),
  email: string().trim().email("Invalid email format").required("Email is required"),
  country: string().trim().required("Country is required"),
  city: string().trim().required("City is required"),
  password: passwordSchema,
  repeatPassword: repeatPasswordSchema,
});

export const registrationSchema = baseRegisterSchema.shape({
  firstName: string()
    .trim()
    .when("userType", {
      is: UserType.Individual,
      then: (schema) => schema.required("First name is required"),
      otherwise: (schema) => schema,
    }),
  lastName: string()
    .trim()
    .when("userType", {
      is: UserType.Individual,
      then: (schema) => schema.required("Last name is required"),
      otherwise: (schema) => schema,
    }),
  companyName: string()
    .trim()
    .when("userType", {
      is: UserType.Company,
      then: (schema) => schema.required("Company name is required"),
      otherwise: (schema) => schema,
    }),
});

export type RegisterPayload = InferType<typeof registrationSchema>;
