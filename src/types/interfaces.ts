import { UserType } from "@/types/enums";

export interface IndividualInformation {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  country: string;
  city: string;
  about: string;
  ambitions: string;
  currentJob: string;
  cvUrl: string;
  lookingForJob: boolean;
  motivation: string;
  yearsOfExperience: number;
  education: string;
  profileUrl: string;
  userType: UserType.Individual;
}

export interface CompanyInformation {
  companyName: string;
  country: string;
  city: string;
  phone: string;
  email: string;
  about: string;
  goals: string;
  numOfEmployees: number;
  offeringJob: boolean;
  website: string;
  profileUrl: string;
  userType: UserType.Company;
}

export interface EmailTemplate {
  to: string;
  subject: string;
  html: string;
}
