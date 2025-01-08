import { UserType } from "@/types/enums";

export interface FeedItemDto {
  user: string;
  date: string;
  category: string;
  email: string;
  body: string;
  image: string;
  type: UserType;
}
