import { UserType } from "@/types/enums";
import { SortDirection } from "@/hooks/use-feed-state";

export interface FilterState {
  category: string | null;
  sortDirection: SortDirection;
}

export interface FeedItemDto {
  id: string;
  userId: string;
  createdAt: string;
  category: string;
  body: string;
  image: string;
  createdBy: string;
  userType: UserType;
  applyToEmail: string;
  profileUrl: string;
}

export interface EducationItemDto {
  id: string;
  fileUrl: string;
  title: string;
  fileName: string;
}

export interface EducationQAItemDto {
  id: string;
  title: string;
  body: string;
}

export interface IndividualUserDto extends UserDto {
  firstName: string;
  lastName: string;
  ambitions: string;
  currentJob: string;
  cvUrl: string;
  lookingForJob: boolean;
  motivation: string;
  yearsOfExperience: number;
  education: string;
}

export interface CompanyUserDto extends UserDto {
  companyName: string;
  goals: string;
  numOfEmployees: number;
  offeringJob: boolean;
  website: string;
}

export interface UserDto {
  id: string;
  city: string;
  country: string;
  phone: string;
  email: string;
  about: string;
  profileUrl: string;
  userType: UserType;
}
