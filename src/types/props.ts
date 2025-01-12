import { FeedItemDto } from "@/types/dto";
import { UserType } from "@/types/enums";

export interface CompanyRegisterFormProps {
  companyName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
}

export interface PersonalRegisterFormProps {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  password: string;
  confirmPassword: string;
  userType: UserType;
}

export interface CreateNewPasswordProps {
  password: string;
  confirmPassword: string;
}

export interface FeedItemProps {
  item: FeedItemDto;
}

export interface FeedItemHeaderProps {
  user: string;
  date: Date;
  category: string;
  email: string;
  type: UserType;
  profileUrl: string;
}

export interface FeedItemBodyProps {
  body: string;
  image: string;
}
