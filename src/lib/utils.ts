import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { Metadata } from "next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMetadata({
  title = "Coachbots - Playground",
  description = "",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: image,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@ffalah_",
    },
    icons,
    metadataBase: new URL("https://coachbots.com"),
    // themeColor: "#FFF",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}

export const convertDate = (date: string) => {
  const utcTimestamp = new Date(date);
  const istOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "2-digit",
  } as Intl.DateTimeFormatOptions;

  const istDateString = utcTimestamp.toLocaleString("en-US", istOptions);
  return istDateString;
};

export const convertDateWithTime = (date: string) => {
  const utcTimestamp = new Date(date);
  const istOptions = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false, // Use 24-hour format
  } as Intl.DateTimeFormatOptions;

  const istDateString = utcTimestamp.toLocaleString("en-US", istOptions);
  return istDateString;
};

interface ActionPoints {
  feedback_given: number;
  feedback_received: number;
  chat_attempted: number;
  transcript_email_received: number;
  transcript_email_sent: number;
  interaction_attempted: number;
}

interface ActionPointsData {
  action_points: ActionPoints;
}

export function calculateTotalActionPoints(jsonData: ActionPointsData): number {
  const actionPoints: ActionPoints = jsonData.action_points;
  const totalActionPoints: number = Object.values(actionPoints).reduce(
    (total, points) => total + points,
    0
  );
  return totalActionPoints;
}

export function capitalizeText(text: string) {
  if (typeof text !== "string" || text.length === 0) {
    return text;
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

// api endpoints via subdomain match
export const subdomain =
  typeof window !== "undefined" ? window.location.hostname.split(".")[0] : null;
export const devUrl = "https://coach-api-ovh.coachbots.com/api/v1";
export const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
export const baseURL = subdomain === "platform" ? prodUrl : devUrl;

export const basicAuth =
  "Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";

export const hideBots = () => {
  const coachtalk = document.getElementsByClassName("deep-chat-poc")[0];
  const coachScribe = document.getElementsByClassName("deep-chat-poc2")[0];

  if (coachScribe && coachtalk) {
    coachtalk.setAttribute("style", "display: none;");
    coachScribe.setAttribute("style", "display: none;");
  }

  console.log("Hidden");
};

export const getUserAccount = (user: any) => {
  return fetch(`${baseURL}/accounts/`, {
    method: "POST",
    headers: {
      Authorization: basicAuth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_context: {
        name: user.given_name,
        role: "member",
        user_attributes: {
          tag: "deepchat_profile",
          attributes: {
            username: "web_user",
            email: user.email,
          },
        },
      },
      identity_context: {
        identity_type: "deepchat_unique_id",
        value: user.email,
      },
    }),
  });
};
export const dummyRequested = [
  {
    title: "Saying no, being assertive",
    description:
      "Rahul is the manager leading a team developing a new mobile app. Recently, he noticed one of the team members, Priya, has been struggling to meet deadlines and her work lacks attention to detail.",
    test_code: "Q2GYULT",
  },
  {
    title: "Saying no, being assertive",
    description:
      "A manager is trying to get a team member to work on a project that the team member does not want to work on. The manager is trying to be persuasive and is using a lot of pressure. The team member is feeling overwhelmed and is not sure how to respond.",
    test_code: "QITKCGC",
  },
  {
    title: "Saying no, being assertive",
    description:
      "A manager is trying to convince a team member to take on a new project. The team member is not interested in the project and does not want to take it on.",
    test_code: "QGXEED8",
  },
  {
    title: "Declining Unreasonable Workload",
    description:
      "A manager, Akash, is having a conversation with his team member, Akash, about his workload. Akash is feeling overwhelmed and is considering declining some of his work.",
    test_code: "QOCYID1",
  },
  {
    title: "Declining Unreasonable Workload",
    description:
      "A team member is assigned a large and complex project with an unreasonable deadline. The team member is concerned that they will not be able to complete the project on time and in a high-quality manner. They are also concerned that the project will take away from their ability to complete their other work.",
    test_code: "QXQL9YY",
  },
  {
    title: "Standing up and speaking up",
    description:
      "Rahul is the manager of a software development team in an IT company based in Bangalore. Recently, one of his team members, Ramesh has been taking a lot of leaves from work. In the last 2 months, Ramesh has taken 12 leaves already, affecting his contributions to an important project the team is working on.",
    test_code: "Q099Z8V",
  },
  {
    title: "Standing up and speaking up",
    description:
      "A manager is having a one on one with a team member who is struggling with a project. The manager is trying to be supportive and helpful, but the team member is becoming increasingly defensive and argumentative. The manager is starting to feel frustrated and is unsure how to handle the situation.",
    test_code: "QHJU80S",
  },
  {
    title: "Building strong teams",
    description:
      "Raj is having a conversation with Priya, who is part of his team. There have been some recent miscommunications between team members leading to delays and errors in projects. Raj noticed Priya has been struggling to collaborate effectively with others. He wants to understand the communication gaps and help set expectations for improvement.",
    test_code: "QP6U6GI",
  },
  {
    title: "Building strong teams",
    description:
      "A team is struggling to meet their deadlines. The team members are not working well together and are not communicating effectively. The manager is not sure what to do to improve the situation.",
    test_code: "QVGXK9K",
  },
  {
    title: "Finding meaning at work",
    description:
      "Rahul is the manager of a software development team in an IT company. Recently, he noticed that one of his team members, a programmer named Raj, seems to be lacking energy and engagement with his work. He observes that Raj comes in late sometimes, misses deadlines, and spends time chatting with coworkers instead of focusing on tasks.",
    test_code: "QTBWR95",
  },
  {
    title: "Finding meaning at work",
    description:
      "A team is working on a new project. The team is excited about the project, but they are also feeling stressed and overwhelmed. The team leader is trying to keep everyone motivated, but she is also feeling stressed.",
    test_code: "Q2WJBM5",
  },
  {
    title: "Managing workplace politics",
    description:
      "Raj is the manager of a software development team in an IT company based in Bangalore. One of his team members, Kamal is very talented but also temperamental. He often has conflicts with other team members due to his aggressive communication style.",
    test_code: "Q7PMNNV",
  },
  {
    title: "Managing workplace politics",
    description:
      "A new employee is struggling to fit in with the team. They are being excluded from conversations, and their ideas are being ignored. The manager has noticed this, and is concerned about the employee's morale.",
    test_code: "QTYXXCK",
  },
  {
    title: "Managing difficult customers",
    description:
      "Rahul is the sales manager at a pharmaceutical company. He recently noticed that one of his team members, Ganesh, has not been meeting his monthly sales targets for the last 3 months. Rahul called Ganesh for a one-on-one meeting to understand why his performance has declined. Ganesh revealed that he has been struggling with some personal issues that have affected his focus at work. However, Rahul emphasized the importance of meeting targets and asked Ganesh to share an action plan on how he plans to improve.",
    test_code: "QZ0T7L3",
  },
  {
    title: "Managing difficult customers",
    description:
      "A customer is calling to complain about a product they bought. They are very angry and are yelling at the customer service representative. The customer service representative is trying to be polite and calm, but the customer is not cooperating.",
    test_code: "QL42L8Q",
  },
  {
    title: "Adjusting to a new workplace",
    description:
      "A new employee is struggling to adjust to the new workplace. They are not sure what is expected of them and are feeling overwhelmed.",
    test_code: "QI8FMRG",
  },
  {
    title: "Adjusting to a new workplace",
    description:
      "A new employee is struggling to adjust to their new workplace. They are feeling overwhelmed by the amount of work they have to do, and they are not sure how to prioritize their tasks. They are also feeling isolated and lonely, and they are not sure how to make friends at their new job.",
    test_code: "Q290HU9",
  },
  {
    title: "Changing roles and departments",
    description:
      "Raj is the manager of a software development team in an IT company. Recently a few team members have left the company for better opportunities. Raj has called one of the senior developers, Vineet, for a meeting to discuss about the increasing attrition rate and understand the reasons and possible solutions.",
    test_code: "QQVJBA8",
  },
  {
    title: "Changing roles and departments",
    description:
      "A manager is trying to convince a team member to change roles and departments. The team member is happy in their current role and does not want to change. The manager is trying to convince the team member that the new role would be a better fit for them and would offer more opportunities for growth.",
    test_code: "Q02LW2T",
  },
  {
    title: "Managing tricky meetings",
    description:
      "Raj is the manager of a software development team in an IT company based in Bangalore. He recently had a one-on-one meeting with Vinod, a developer who has been struggling with meeting deadlines. In the last sprint, Vinod did not complete two tasks assigned to him on time, causing delays for other team members.",
    test_code: "QCJJK1R",
  },
  {
    title: "Managing tricky meetings",
    description:
      "A manager is having a difficult conversation with a team member about their performance. The team member is defensive and argumentative, and the manager is struggling to stay calm and focused.",
    test_code: "Q7OCS5O",
  },
  {
    title: "Seeking and obtaining sponsorship",
    description:
      "Rahul, the manager of the software development team at a technology company in Bangalore, calls Ajit, one of his team members, for a meeting. Ajit had recently asked Rahul if the company can sponsor his executive MBA program. Rahul wants to discuss this request with Ajit, understand his motivation and long term plans, and see if it aligns with the company's policies on sponsorship and employee development.",
    test_code: "QAEUXNP",
  },
  {
    title: "Seeking and obtaining sponsorship",
    description:
      "A company is looking for a new sponsor for their annual charity event. The company has a budget of $10,000 and is looking for a sponsor who will provide a variety of benefits, including cash, in-kind donations, and promotional opportunities. The company has already identified a few potential sponsors, but they are still in the early stages of the process.",
    test_code: "QGA32T8",
  },
  {
    title: "Starting and leading initiatives",
    description:
      "Alok is a manager in a software company. He has been asked to start a new initiative to improve the company's customer service. He is not sure where to start and is feeling overwhelmed.",
    test_code: "QZ6ZJMW",
  },
  {
    title: "Starting and leading initiatives",
    description:
      "The team is working on a new project and the manager is not sure how to lead them. The team members are all very talented and have different ideas about how to proceed. The manager is worried that they will not be able to get everyone on the same page and that the project will not be successful.",
    test_code: "QHV3KXA",
  },
  {
    title: "Saying no, being assertive",
    description:
      "Rahul is the manager of a software development team in an IT company. Recently one of his team members, Nisha came to him saying that she is overburdened with work and is finding it very difficult to meet deadlines. Nisha complained that she has been assigned multiple complex projects and has to put in long hours, often over weekends. Rahul discussed this issue with Nisha in detail to understand the challenges she is facing and whether the workload can be distributed better across the team.",
    test_code: "QNGAX9B",
  },
  {
    title: "Saying no, being assertive",
    description:
      "A manager is trying to convince a team member to work on a project that the team member does not want to work on. The manager is being very pushy and is not taking no for an answer.",
    test_code: "QGGTDXY",
  },
  {
    title: "Saying no, being assertive",
    description:
      "A manager is asked to give a presentation on a new product. The manager is not comfortable with the product and does not want to give the presentation.",
    test_code: "QEV8DOD",
  },
  {
    title: "Managing tricky meetings",
    description:
      "Rahul is the manager of a software development team in an IT services company. Recently, he noticed that one of his team members, Ganesh, has been underperforming and missing deadlines. In the last monthly review meeting, Ganesh could not provide proper justification for why his module had bugs that delayed the release by 2 weeks. Rahul decided to have a one-on-one meeting with Ganesh to understand the reasons behind his underperformance and see how it can be improved.",
    test_code: "QNY0OLB",
  },
  {
    title: "Managing tricky meetings",
    description:
      "A manager is having a meeting with their team to discuss the results of a recent project. The team is not happy with the results, and they are blaming the manager for the failure. The manager is trying to calm the team down and get them to focus on the future.",
    test_code: "Q1XTEW4",
  },
  {
    title: "Seeking and obtaining sponsorship",
    description:
      "Rahul is the manager of a software development team in an IT company based in Bangalore. The team is working on developing a custom software application for a client. Recently, the team has been missing deadlines for delivering application features and bug fixes.",
    test_code: "QFH7T9L",
  },
  {
    title: "Seeking and obtaining sponsorship",
    description:
      "A company is looking to sponsor a local sports team. The company is looking for a team that is well-respected in the community and has a strong track record of success. The company is also looking for a team that is aligned with the company's values and mission.",
    test_code: "Q47OXGH",
  },
  {
    title: "Starting and leading initiatives",
    description:
      "Ashish is a senior manager in a large IT company. He has been tasked with starting a new initiative to improve the company's customer service. He has been given a budget and a team of people to work with, but he is not sure where to start. He is worried that he will not be able to get the initiative off the ground and that it will fail.",
    test_code: "QM3LGZP",
  },
  {
    title: "Starting and leading initiatives",
    description:
      "A team of engineers are working on a new product. The product is still in the early stages of development, and the team is struggling to come up with a clear vision for the product. The team leader is trying to get the team to focus on the product's goals, but the team is resistant. The team leader is frustrated and doesn't know what to do.",
    test_code: "QN4U5WC",
  },
  {
    title: "Saying no, being assertive",
    description:
      "Rahul is the program manager leading a software development team. Recently, a major client made an unreasonable last-minute request to add a complex new feature into the product even though the requirements had already been finalized in the contract. Rahul's team is already over capacity and working evenings and weekends to hit the deadline. However, given the size of the client's contract and future business potential, Rahul's director has asked him to accommodate the request somehow without delaying the delivery timeline. Rahul calls a team meeting to discuss how to handle this difficult situation.",
    test_code: "QOB5OJX",
  },
  {
    title: "Saying no, being assertive",
    description:
      "A client meeting goes poorly when the client makes unreasonable demands and uses aggressive language. The account manager tries to placate the client at first but eventually stands firm on company policies.",
    test_code: "QQEYAWY",
  },
  {
    title: "Managing tricky meetings",
    description:
      "Rahul is the manager of a software development team in an IT company based in Bangalore. Recently, one of his team members, Akash has been frequently missing deadlines and displaying unprofessional behavior in team meetings like losing temper on small issues. Rahul called Akash for a one-on-one conversation to understand the reasons behind his behavior, provide feedback and come up with an improvement plan.",
    test_code: "QWBKFYF",
  },
  {
    title: "Managing tricky meetings",
    description:
      "A manager is having a meeting with their team to discuss the results of a recent project. The team is not happy with the results, and they are blaming the manager for the failure. The manager is trying to defend their decisions, but the team is not listening. The manager is starting to feel frustrated and angry.",
    test_code: "QR9920G",
  },
  {
    title: "Seeking and obtaining sponsorship",
    description:
      "Akash is a senior software engineer who has been working at the company for 5 years. He is a good engineer but he is not very good at networking. He has never been able to get any sponsorships for conferences or events. His manager, Ashish, is concerned that Akash is not getting the opportunities that he needs to grow in his career.",
    test_code: "QA44YYQ",
  },
  {
    title: "Seeking and obtaining sponsorship",
    description:
      "A company is looking to sponsor a local charity event. The company has a budget of $10,000 and is looking for a sponsorship that will provide exposure to their brand. The company is also looking for a sponsorship that will help them to reach their target audience.",
    test_code: "Q2WPXQJ",
  },
  {
    title: "Starting and leading initiatives",
    description:
      "Raj is the manager of a software development team in an IT company in Bangalore. Recently, he has noticed that one of his team members, Sayan, has been frequently absent from team meetings without any prior notification. Just last week, Sayan missed two sprint planning meetings that were critical for the team to plan work for the next release. Raj is concerned that Sayan's absenteeism is affecting the team's productivity and morale. He decides to have a one-on-one meeting with Sayan to understand what's going on and see how he can support him.",
    test_code: "QEFS2R1",
  },
  {
    title: "Starting and leading initiatives",
    description:
      "The company is looking to launch a new product line. The product line is very different from anything the company has done before. The company is looking for someone to lead the initiative. The person who leads the initiative will be responsible for developing the product line, getting it approved by the board, and launching it.",
    test_code: "QRVUPCW",
  },
  {
    title: "Saying no, being assertive",
    description:
      "Rahul is the operations manager at a software services company. He noticed that one of his team members, Priya often works in isolation and does not collaborate effectively with others. In the last project, this created miscommunication and rework. Rahul decides to have a conversation with Priya to provide constructive feedback about the need to improve her teamwork skills.",
    test_code: "Q0RI9D9",
  },
  {
    title: "Saying no, being assertive",
    description:
      "A manager is trying to get a team member to work on a project that the team member does not want to work on. The manager is being very pushy and is not taking no for an answer.",
    test_code: "Q0IGB4T",
  },
];
export const dummyCompetencyBasedPowerSkills = {
  Accountable: [],
  Resilience: [
    {
      title: "Saying no, being assertive",
      description:
        "Rahul is the manager leading a team developing a new mobile app. Recently, he noticed one of the team members, Priya, has been struggling to meet deadlines and her work lacks attention to detail.",
      test_code: "Q2GYULT",
      test_type: "dynamic_discussion_thread",
    },
    {
      title: "Saying no, being assertive",
      description:
        "A manager is trying to get a team member to work on a project that the team member does not want to work on. The manager is trying to be persuasive and is using a lot of pressure. The team member is feeling overwhelmed and is not sure how to respond.",
      test_code: "QITKCGC",
      test_type: "test",
    },
    {
      title: "Saying no, being assertive",
      description:
        "A manager is trying to convince a team member to take on a new project. The team member is not interested in the project and does not want to take it on.",
      test_code: "QGXEED8",
      test_type: "test",
    },
    {
      title: "Declining Unreasonable Workload",
      description:
        "A manager, Akash, is having a conversation with his team member, Akash, about his workload. Akash is feeling overwhelmed and is considering declining some of his work.",
      test_code: "QOCYID1",
      test_type: "dynamic_discussion_thread",
    },
    {
      title: "Declining Unreasonable Workload",
      description:
        "A team member is assigned a large and complex project with an unreasonable deadline. The team member is concerned that they will not be able to complete the project on time and in a high-quality manner. They are also concerned that the project will take away from their ability to complete their other work.",
      test_code: "QXQL9YY",
      test_type: "test",
    },
    {
      title: "Saying no, being assertive",
      description:
        "Rahul is the manager of a software development team in an IT company. Recently one of his team members, Nisha came to him saying that she is overburdened with work and is finding it very difficult to meet deadlines. Nisha complained that she has been assigned multiple complex projects and has to put in long hours, often over weekends. Rahul discussed this issue with Nisha in detail to understand the challenges she is facing and whether the workload can be distributed better across the team.",
      test_code: "QNGAX9B",
      test_type: "dynamic_discussion_thread",
    },
    {
      title: "Saying no, being assertive",
      description:
        "A manager is trying to convince a team member to work on a project that the team member does not want to work on. The manager is being very pushy and is not taking no for an answer.",
      test_code: "QGGTDXY",
      test_type: "test",
    },
    {
      title: "Saying no, being assertive",
      description:
        "A manager is asked to give a presentation on a new product. The manager is not comfortable with the product and does not want to give the presentation.",
      test_code: "QEV8DOD",
      test_type: "test",
    },
    {
      title: "Saying no, being assertive",
      description:
        "Rahul is the program manager leading a software development team. Recently, a major client made an unreasonable last-minute request to add a complex new feature into the product even though the requirements had already been finalized in the contract. Rahul's team is already over capacity and working evenings and weekends to hit the deadline. However, given the size of the client's contract and future business potential, Rahul's director has asked him to accommodate the request somehow without delaying the delivery timeline. Rahul calls a team meeting to discuss how to handle this difficult situation.",
      test_code: "QOB5OJX",
      test_type: "dynamic_discussion_thread",
    },
    {
      title: "Saying no, being assertive",
      description:
        "A client meeting goes poorly when the client makes unreasonable demands and uses aggressive language. The account manager tries to placate the client at first but eventually stands firm on company policies.",
      test_code: "QQEYAWY",
      test_type: "test",
    },
  ],
  Influencing: [
    {
      title: "Managing tricky meetings",
      description:
        "Rahul is the manager of a software development team in an IT company based in Bangalore. Recently, one of his team members, Akash has been frequently missing deadlines and displaying unprofessional behavior in team meetings like losing temper on small issues. Rahul called Akash for a one-on-one conversation to understand the reasons behind his behavior, provide feedback and come up with an improvement plan.",
      test_code: "QWBKFYF",
      test_type: "dynamic_discussion_thread",
    },
  ],
};
