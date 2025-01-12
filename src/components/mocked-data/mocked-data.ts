// Mocked individual info
import { CompanyInformation, IndividualInformation } from "@/types/interfaces";
import { UserType } from "@/types/enums";

// Mocked individual user in the field of ecology
export const mockedIndividualUser: IndividualInformation = {
  firstName: "Alice",
  lastName: "Greenwood",
  email: "alice.greenwood@example.com",
  phone: "987-654-3210",
  moto: "Preserve the planet for future generations",
  description: "Environmental scientist dedicated to promoting sustainability and renewable energy solutions.",
  title: "Sustainability Consultant",
  educationalLevel: "Master's Degree in Environmental Science",
  yearsOfExperience: 8,
  currentJob: "Sustainability Advisor at EcoSolutions",
  languages: "English, French",
  availability: "Full-time",
  keySkills: "Environmental Policy, Renewable Energy, Project Management",
  image: "https://images.pexels.com/photos/5685904/pexels-photo-5685904.jpeg",
  userType: UserType.Individual,
};

// Mocked company user in the field of ecology
export const mockedCompanyUser: CompanyInformation = {
  companyName: "GreenFuture",
  email: "info@greenfuture.com",
  phone: "555-123-4567",
  city: "Seattle",
  country: "USA",
  description: "Innovative company focused on sustainable and renewable energy solutions.",
  founded: 2010,
  employeesNumber: "100-200",
  industry: "Environmental Solutions",
  companySize: "Small",
  workingTimes: "8 AM - 6 PM",
  benefits: "Remote work options, Health benefits, Eco-conscious initiatives",
  remote: "Yes",
  typeOfContract: "Full-time",
  missionAndVision: "To create a sustainable future through green technologies.",
  website: "greenfuture.com",
  image:
    "https://images.pexels.com/photos/6457495/pexels-photo-6457495.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  userType: UserType.Company,
};
