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
