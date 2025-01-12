import { UserType } from "@/types/enums";

export interface FeedItemDto {
  id: string;
  userId: string;
  createdAt: Date;
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
