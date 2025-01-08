import { FeedItemDto } from "@/types/dto";
import { UserType } from "@/types/enums";

export const feedItemsMocked: FeedItemDto[] = [
  {
    user: "EcoJobs Network",
    date: "12/20/2024",
    category: "Hiring",
    email: "jobs@ecojobsnetwork.com",
    body:
      "<p>🌱 We're hiring eco-enthusiasts!</p>" +
      "<p>EcoJobs Network is looking for a Sustainability Coordinator to help organizations reduce their environmental impact. If you’re passionate about green initiatives and have experience with environmental science or policy, we’d love to hear from you!</p>" +
      "<p>📩 Apply now at jobs@ecojobsnetwork.com</p>" +
      "<p>Join us in making a difference for our planet!</p>",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=3132&auto=format&fit=crop",
    type: UserType.Company,
  },
  {
    user: "Liam Green",
    date: "12/21/2024",
    category: "Looking for a job",
    email: "liam.green@gmail.com",
    body:
      "<p>👋 Hello,</p>" +
      "<p>I am an environmental scientist with expertise in renewable energy projects and sustainable development. I’m seeking a role where I can contribute to impactful ecological projects. If you know of any opportunities, please feel free to reach out!</p>" +
      "<p>📧 Contact: liam.green@gmail.com</p>",
    image: "",
    type: UserType.Individual,
  },
  {
    user: "Green Future Initiative",
    date: "12/22/2024",
    category: "Event",
    email: "events@greenfuture.org",
    body:
      "<p>🌍 Community Clean-Up Day</p>" +
      "<p>Join us for a day of action! Help clean up our local parks and rivers to make our community a greener, cleaner place to live.</p>" +
      "<p>📅 Date: 12/28/2024</p>" +
      "<p>📍 Location: Riverside Park</p>" +
      "<p>All ages are welcome, and we’ll provide gloves and bags. Together, we can make a difference!</p>",
    image: "https://images.pexels.com/photos/414807/pexels-photo-414807.jpeg",
    type: UserType.Company,
  },
  {
    user: "Emma EcoTips",
    date: "12/23/2024",
    category: "Sharing knowledge",
    email: "emma@ecotips.com",
    body:
      "<p>🌱 10 Ways to Reduce Your Carbon Footprint</p>" +
      "<p>Hi everyone! I’ve written a blog post full of simple and practical tips to help you live a more eco-friendly lifestyle. From reducing energy use to embracing sustainable travel, there’s something for everyone.</p>" +
      "<p>Read it here: <a href='https://ecotips.com/reduce-footprint'>ecotips.com/reduce-footprint</a></p>",
    image:
      "https://images.pexels.com/photos/2283496/pexels-photo-2283496.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: UserType.Individual,
  },
  {
    user: "EcoTech Solutions",
    date: "12/24/2024",
    category: "Announcement",
    email: "info@ecotechsolutions.com",
    body:
      "<p>🌟 Introducing EcoCharge!</p>" +
      "<p>We’re proud to announce EcoCharge, our new solar-powered charging station for public spaces. It’s a step toward clean energy and sustainable infrastructure.</p>" +
      "<p>✨ Learn more at <a href='https://ecotechsolutions.com/ecocharge'>ecotechsolutions.com/ecocharge</a></p>" +
      "<p>📧 Contact us for more information: info@ecotechsolutions.com</p>",
    image:
      "https://images.pexels.com/photos/414798/pexels-photo-414798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    type: UserType.Company,
  },
  {
    user: "Sophie Taylor",
    date: "12/25/2024",
    category: "Looking for a collaborator",
    email: "sophie@greenventures.dev",
    body:
      "<p>🤝 Looking for a collaborator</p>" +
      "<p>I’m an environmental engineer seeking a software developer interested in creating apps to promote sustainable living. If you’re passionate about technology and ecology, let’s collaborate!</p>" +
      "<p>📩 Contact: sophie@greenventures.dev</p>",
    image: "",
    type: UserType.Individual,
  },
];
