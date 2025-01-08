import { UserType } from "@/types/enums";

export interface IndividualInformation {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  moto: string;
  description: string;
  title: string;
  educationalLevel: string;
  yearsOfExperience: number;
  currentJob: string;
  languages: string;
  availability: string;
  keySkills: string;
  image?: string;
  type: UserType.Individual;
}

export interface CompanyInformation {
  companyName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  description: string;
  founded: number;
  employeesNumber: string;
  industry: string;
  companySize: string;
  workingTimes: string;
  benefits: string;
  remote: string;
  typeOfContract: string;
  missionAndVision: string;
  website: string;
  image?: string;
  type: UserType.Company;
}
