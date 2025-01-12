import { CompanyInformation, IndividualInformation } from "@/types/interfaces";
import { UserType } from "@/types/enums";
import { FeedAppBarUser } from "@/components/feed/feed-app-bar/feed-app-bar-user";

export const mapUserData = (
  data,
): IndividualInformation | CompanyInformation => {
  if (data.userType === UserType.Individual) {
    return {
      firstName: data.firstName ?? "",
      lastName: data.lastName ?? "",
      phone: data.phone ?? "",
      email: data.email ?? "",
      country: data.country ?? "",
      city: data.city ?? "",
      about: data.about ?? "",
      ambitions: data.ambitions ?? "",
      currentJob: data.currentJob ?? "",
      cvUrl: data.cvUrl ?? "",
      lookingForJob: data.lookingForJob ?? false,
      motivation: data.motivation ?? "",
      yearsOfExperience: data.yearsOfExperience ?? 0,
      education: data.education ?? "",
      profileUrl: data.profileUrl ?? "",
      userType: UserType.Individual,
    };
  } else if (data.userType === UserType.Company) {
    return {
      companyName: data.companyName ?? "",
      country: data.country ?? "",
      city: data.city ?? "",
      phone: data.phone ?? "",
      email: data.email ?? "",
      about: data.about ?? "",
      goals: data.goals ?? "",
      numOfEmployees: data.numOfEmployees ?? 0,
      offeringJob: data.offeringJob ?? false,
      website: data.website ?? "",
      profileUrl: data.profileUrl ?? "",
      userType: UserType.Company,
    };
  } else {
    throw new Error("Invalid user type");
  }
};

export const mapUserDataToFeedAppBarUser = (userData): FeedAppBarUser => {
  return {
    displayName:
      userData.userType === UserType.Company
        ? userData.companyName
        : `${userData.firstName} ${userData.lastName}`,
    photoURL: userData.profileUrl,
    uid: userData.uid,
  };
};
