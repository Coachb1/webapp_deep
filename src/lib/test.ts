export interface Test {
  domain: string;
  test_code: string;
  title: string;
  description: string;
  interaction_mode: string;
  test_type?: string;
  is_recommended?: boolean;
  is_assigned?: boolean;
  assigned_by?: string;
  assigned_to?: string;
  creator_user_id?: string;
  is_micro?: boolean;
  descriptoin_media?: string;
  tab_sticker?: string;
  scenario_case?: string;
}

export type CategoryMap = {
  [category: string]: Test[];
  };

import { CategoryData } from "./types";

export const Audiotests: Test[] = [
  {
    domain: "Marketing",
    test_code: "QWLHI90",
    title: "Learn new skills",
    description:
      "A junior developer at a software development firm in Bangalore, is keen to acquire expertise in Python, an unfamiliar programming language for the company's upcoming project. His initial progress is slower than expected, with him facing challenges in grasping the language's syntax and frameworks. His manager, Priya, schedules a one-on-one meeting to assess his learning journey and application of Python to real development tasks. Respond to this situation as the junior developer.",
    interaction_mode: "Audio",
  },
  {
    domain: "Marketing",
    test_code: "QU7G2X3",
    title: "Project proposal",
    description:
      "A recent recruit in a software development firm, delivered his project proposal to his manager, Rahul. He presented a shift to a relatively new technology stack, which, although potentially more efficient, lacked prior data to substantiate its success. Furthermore, the proposed project timeline seemed ambitious, raising concerns about its feasibility in light of past project data and resource availability. Respond to this situation as the new recruit.",
    interaction_mode: "Audio",
  },
  {
    domain: "Marketing",
    test_code: "QPN48NO",
    title: "Performance Review",
    description:
      "A recent engineering graduate, joined an IT firm as a software developer. His first performance review takes place after six months, where he is evaluated based on his project contributions and coding efficiency. The manager, Rajat, discusses his progress and suggests areas for improvement to meet industry standards. Respond as the software developer.",
    interaction_mode: "Audio",
  },
];

export const TextTests: Test[] = [
  {
    domain: "Marketing",
    test_code: "QBEWUOM",
    title: "Take initiative",
    description:
      "A new software engineer at a tech startup, wants to contribute to the company's initiative to improve product performance. He discovers that the software codebase lacks proper documentation, which hinders the team's productivity. He discusses this with his manager, Anika, and proposes a plan to create comprehensive documentation, which will help streamline development and reduce errors. Anika engages in a detailed discussion with him to better understand the issue before considering the proposal for the team. Respond to this situation as the software engineer.",
    interaction_mode: "Text",
  },
  {
    domain: "Management",
    test_code: "QJ3RTFF",
    title: "Tough decision",
    description:
      "A new junior engineer working on a residential construction project, recently discovered that one of the project's key subcontractors had failed to comply with safety and quality regulations, leading to structural deficiencies in the building. She seeks guidance from her manager, Neha on how to address the situation and make a decision regarding the subcontractor's future involvement. Neha wants to understand the situation completely before she makes a decision. Respond to this situation as the junior engineer",
    interaction_mode: "Text",
  },
  {
    domain: "Human Resourse",
    test_code: "QLW2EVP",
    title: "Project timeline",
    description:
      "Raj, a manager in a Mumbai-based company, noticed that a new joiner, consistently arrived on time during his first month. However, as the monsoon season hit, his commute time significantly increased due to waterlogged roads and public transport disruptions. This led to a gradual decline in his punctuality, with the employee frequently arriving late to the office. Raj, concerned about the impact on project timelines, decided to address this issue with him. Respond to this situation as the employee.",
    interaction_mode: "Audio",
  },
];

export const Samples: Test[] = [
  {
    domain: "Technical training",
    test_code: "QEEG5VY",
    title: "AWS Migration Strategy for Scalability",
    description:
      "This is the last day of your AWS training. To complete the training complete this real life customer interaction. Mr. Arjun Sharma, an experienced IT professional at a leading Indian e-commerce firm, faces challenges with the current infrastructure's scalability. The company's user base has grown significantly, causing performance issues and escalating infrastructure costs. Arjun seeks to migrate to AWS to address these issues, leveraging its scalable and cost-effective solutions to optimize the e-commerce platform's performance. Respond to this situation and guide Mr. Sharma through the process of implementing AWS into the existing system to enhance scalability and overall performance. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Team buiding & Leadership",
    test_code: "QMFMKQ4",
    title: "Teams using Agile Strategies ",
    description:
      "After returning from the team-building training, an operations manager receives a challenging exercise from her trainer. She must dismantle the current production team, plagued by communication gaps and delays, and build a new team for an upcoming high-stakes product launch. The textile industry demands precision, and she needs to implement agile methodologies learned during training to improve efficiency. She's meeting with the Department Head, Harish to strategize this overhaul. Respond as the operations manager in this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Edtech sales",
    test_code: "QUPR9AO",
    title: "Pitching a Computer Science Course ",
    description:
      "After returning from the team-building training, an operations manager receives a challenging exercise from her trainer. She must dismantle the current production team, plagued by communication gaps and delays, and build a new team for an upcoming high-stakes product launch. The textile industry demands precision, and she needs to implement agile methodologies learned during training to improve efficiency. She's meeting with the Department Head, Harish to strategize this overhaul. Respond as the operations manager in this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Coaching Assistant",
    test_code: "QLDQ2IY",
    title: "Assertive Communication for Workplace ",
    description:
      "A junior manager, in a IT company specializing in e-commerce solutions, faces challenges articulating innovative ideas for a tight-deadline project involving a new payment gateway system. He seeks guidance on assertive communication strategies to facilitate clear articulation of ideas and enhance his contribution to project discussions. After the session, the trainer has given you an exercise to connect with the AI assistant to implement the strategies. Now, the AI assistant, taking the role of the senior manager, Rahul is asking specific questions about the project,  encouraging the junior manager to apply assertive communication strategies for clearer expression of ideas and improved collaboration within the team. Respond as the junior manager.",
    interaction_mode: "Audio",
  },
  {
    domain: "Hotel customer service",
    test_code: "QKLX4V0",
    title: "Crisis Resolution in Hotel Management",
    description:
      "At the last day of your orientation as a Hotel Receptionist. As the last task complete this real life customer interaction where a guest is angry at a mistake the staff made. This is the situation. Mr. Rajiv Verma, a corporate guest hosting a crucial business meeting at the hotel's conference hall, discovers that the meeting room reservation has been miscalculated, leading to an overlapping schedule with another event. Rajiv expresses his displeasure, emphasizing the importance of the meeting's agenda and the inconvenience caused to his guests. Your role is to resolve this issue swiftly, ensuring minimal disruption to Mr. Verma's business plans while maintaining the hotel's professional image. Respond as the Hotel Receptionist to this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Luxury real estate ",
    test_code: "QULNNNE",
    title: "Handling a High-Profile Client",
    description:
      "At the end of your workshop for Luxury Real Estate selling techniques, your trainer has given you an exercise to complete this real life customer interaction simulation. Ms. Priya Deshmukh, a renowned actress, is in search of an exclusive retreat in for private getaways. She prioritizes privacy, a stunning beachfront location, and state-of-the-art security. Your role involves understanding the unique needs of a high-profile client, ensuring confidentiality, and securing a deal that aligns with her lifestyle and preferences. Respond to this situation as the real estate sales agent.",
    interaction_mode: "Audio",
  },
  {
    domain: "Air Hostess Training",
    test_code: "QZ4R9QW",
    title: "Real-Life Customer Resolutions",
    description:
      "On the last day of your training as the Air hostess for a renowned airline. To complete the training you need to complete this real life customer interaction simulation. Mr. Rajat Singh, a high-profile passenger, has a strict vegan diet due to health reasons. Unfortunately, there is an oversight, and the available in-flight meal does not align with his dietary requirements. Balancing the need for a quick resolution and maintaining the airline's service standards, your challenge is to find a suitable alternative or make necessary arrangements to accommodate Mr. Singh's dietary restrictions. Respond to this situation as the Air hostess. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Bank branch situation",
    test_code: "QJV5AEY",
    title: "Addressing a delay in service",
    description:
      "This is the last day of your orientation training as a bank employee. As the last task complete this real life customer interaction simulation. Mr. Rohit Sharma, a dedicated customer of the bank for the past 15 years, encounters a delay in opening a new account due to a discrepancy in his address proof. The challenge lies in maintaining Mr. Sharma's confidence, given his long-standing relationship with the bank, while adhering to the stringent industry norms. As the employee, you are tasked with striking a balance between ensuring compliance and providing reassurance to Mr. Sharma, who expresses valid concerns about the extended procedural timelines. Respond as the bank employee to this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Provding Feedback ",
    test_code: "QEYTB3I",
    title: "Guiding an Employee as a New Manager",
    description:
      "A seasoned automotive professional with 7+ years of experience, has recently assumed a managerial role. In her first check-in with Riya, the project lead for a vehicle redesign initiative, she grapples with a production delay owing to a manufacturing flaw discovered in the initial prototypes. The project further faces a setback as a recent supply chain disruption, impedes the timely delivery of critical components. The new manager must provide feedback to Riya on finding swift resolution strategies, communicate efficiently with suppliers and recalibration of production timelines to mitigate project risks. Respond to this situation as the manager. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Healthcare counselling",
    test_code: "QYCZJDN",
    title: "Diabetic Patient Preoperative Counseling",
    description:
      "This is the last day of your orientation as a Nurse. As the last task complete this real life patient interaction. Mrs. Anvita Kapoor, a 65-year-old diabetic patient, has been admitted for a hip replacement surgery. During your orientation, you learned that she is apprehensive about postoperative care due to her diabetes. You are tasked with providing reassurance and educating her on maintaining stable blood sugar levels to facilitate a smooth recovery. Respond to this situation as the nurse. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Production units communication",
    test_code: "Q125Z1B",
    title: "Addressing Defective Products",
    description:
      "Ms. Nandini Kapoor, the quality control manager, identifies a batch of defective products during routine inspections. She raises concerns about potential production flaws that could harm the factory's reputation. The production floor manager, needs to collaborate with Nandini to isolate and rectify the root cause while maintaining production efficiency. Respond to this situation as the production floor manager. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Healthcare sales",
    test_code: "Q9QW1HF",
    title: "Tailored Health Package Solution ",
    description:
      "This is the last day of your orientation training as a health package sales rep. To complete the orientation you need to complete this exercise of a real life customer interaction simulation. Sajeev, a young entrepreneur in the fitness industry, is seeking a health package solution for his startup's employees. With a workforce focused on physical well-being, Sajeev is interested in a package that includes coverage for sports injuries, specialized health programs, and preventive health check-ups. Your role as a Sales Rep is to showcase how your company's health package can cater to the unique needs of Sajeev's fitness-oriented team. Respond to this situation as the Sales Rep.  ",
    interaction_mode: "Audio",
  },
  {
    domain: "Insurance Consultantation",
    test_code: "QHYRLGN",
    title: "Health Insurance Consultation",
    description:
      "Akshita Singh, a marketing professional, is considering health insurance for herself and her parents. With a history of certain pre-existing conditions in the family, she is navigating the complexities of finding a policy that offers comprehensive coverage while managing premium costs. She has called the company number to gain more information about your insurance package. Your responsibility is to analyze her family's medical history, educate her on policy inclusions and exclusions, and recommend a health insurance plan that strikes the right balance between coverage and affordability. Respond to this situation as an Insurance Sales Rep. ",
    interaction_mode: "Audio",
  },
  {
    domain: "IT-Business Collaboration",
    test_code: "QJZWYYB",
    title: "Strategizing Retail Insights",
    description:
      "The Retail Manager, Swati met with the IT Dev Lead for optimizing the retail analytics dashboard. Swati highlights the imperative for real-time inventory tracking and customer behavior analytics. The challenge identified is the seamless integration of data from disparate sources such as point-of-sale (POS) systems and e-commerce platforms. The objective is to enhance the dashboard to provide comprehensive insights, crucial for strategic decision-making in a fiercely competitive Indian retail market. Respond to this situation as the IT Dev Lead. ",
    interaction_mode: "Audio",
  },
];

export const EQTestsCategorised: CategoryData[] = [
  {
    category_name: "EQ mini course",
    tests_data: [
      {
        domain: "Self-Awareness",
        tests: [
          {
            test_code: "QB6FX7C",
            title: "Navigating uncertainty in a new role",
            description:
              "A recent joinee in tech industry, was excited to start his new role. However, within days of joining, a corporate restructuring led to changes in his responsibilities and team composition. This unexpected turn of events introduced complexity and apprehension. The following questions by the manager, Ajay aim to gauge the team member's ability to handle uncertainty and adapt to change. Respond as a team member to this situation.",
            test_type: "Audio",
            is_recommended: false,
          },
        ],
      },
      {
        domain: "Self-Regulation",
        tests: [
          {
            test_code: "QKJF0XW",
            title: "Prioritizing Tasks in Time-Critical Situations",
            description:
              "The time crunch situation with competing priorities is quite common in a workplace. As an entry-level team member, one has to make a judgment call to determine which task deserves immediate attention. The questions below aim to assess the thought process behind the decision making in such a scenario.  Respond to this situation as the team member.",
            test_type: "Audio",
            is_recommended: false,
          },
        ],
      },
      {
        domain: "Motivation",
        tests: [
          {
            test_code: "QO4RRDL",
            title: "Driving Team Engagement for an Initiative",
            description:
              "Nisha trying to involve her disinterested team in a process improvement initiative. The team is reluctant to adopt a new project management methodology due to their familiarity with the existing process and concerns about potential disruptions. The new initiative aims to streamline project workflows and improve efficiency. Respond to this situation as the team member, Nisha.",
            test_type: "Audio",
            is_recommended: false,
          },
        ],
      },
      {
        domain: "Empathy",
        tests: [
          {
            test_code: "QJETQM4",
            title: "Supporting a Struggling Colleague",
            description:
              "Harsha and Franklin, postgraduates from the same B-School, share a close friendship at Hy-tech technology solutions. Harsha, a team member counselor, enjoys recognition due to daily interactions, while Franklin, a finance executive, feels unrecognized. His resignation prompts Mr. Mehta to address the situation. Mr. Mehta highlights Franklin's expertise through emails, cross-departmental projects, and discussions. Team-building activities and an inclusive environment are promoted. Harsha supports Franklin by involving him, sharing skills, and maintaining their friendship. These efforts ensure Franklin's value and strengthen their workplace dynamics. The questions evaluate the team member's learning from this case lesson. Respond to this context appropriately.",
            test_type: "Audio",
            is_recommended: false,
          },
        ],
      },
      {
        domain: "Social Awareness ",
        tests: [
          {
            test_code: "Q8A5C4I",
            title: "Supplier Selection Dilemma",
            description:
              "The team member has to make a tricky choice between two suppliers for procurement of office equipment. One offers cheaper pricing but the other provides eco-friendly options at a higher cost. He has to evaluate various factors like cost-effectiveness, environmental sustainability, product quality, and service. This decision requires careful consideration of the pros and cons of both options and how they align with the company's priorities. Respond to this situation as the team member.",
            test_type: "Audio",
            is_recommended: false,
          },
        ],
      },
      {
        domain: "Cooperation",
        tests: [
          {
            test_code: "Q2GE3U9",
            title: "Managing Disagreements in cross-functional team dynamics",
            description:
              "Team dynamics can be challenging to navigate, especially when opinions differ. This scenario explores how to handle disagreements and advocate for one's ideas without damaging team cohesion. A team member of a cross-functional team is very innovative, but his ideas often clash with those of his team members. He faces the decision of adapting his approach to fit in or advocating for his ideas while maintaining a collaborative atmosphere.  Respond to this situation as the team member.",
            test_type: "Audio",
            is_recommended: false,
          },
        ],
      },
      {
        domain: "Influence",
        tests: [
          {
            test_code: "Q03F4LB",
            title: "Feedback for Coworker Who Interrupts Frequently",
            description:
              "Distractions and interruptions are an unavoidable part of any workplace. However, interrupting coworkers during discussions can damage teamwork and effectiveness. Here is a context to help evaluate and provide feedback to a team member who frequently interrupts coworkers. Respond to this situation as the team member.",
            test_type: "Audio",
            is_recommended: false,
          },
        ],
      },
      {
        domain: "Analytical Mindset",
        tests: [
          {
            test_code: "Q8DFIM4",
            title: "Double-Booking Crisis Management",
            description:
              "Unforeseen challenges frequently require creative problem-solving. When a junior project coordinator double-books an important meeting room, quick thinking and collaboration are critical to resolve the issue.  A junior project coordinator accidentally double-books a meeting room for two important client presentations at the same time.  Respond to this situation as the junior project coordinator.",
            test_type: "Audio",
            is_recommended: false,
          },
        ],
      },
      {
        domain: "Needs and Wants",
        tests: [
          {
            test_code: "QND4PNE",
            title: "Discussing Career Growth Aspirations with Manager",
            description:
              "A team member wishes to have an open and understanding conversation with his manager regarding his aspirations for career growth but fears coming across as dissatisfied in his current role. He schedules a meeting with his manager. The objective of the meeting is to discuss his long-term career goals, skill development, professional support, current role satisfaction, and suggestions for enhancing career growth opportunities and transparency within the team. Respond to the questions asked by the manager as a team member.",
            test_type: "Audio",
            is_recommended: false,
          },
        ],
      },
      {
        domain: "Curiosity",
        tests: [
          {
            test_code: "QK3FJSW",
            title: "Mentorship for Enhancing Cross-functional Harmony",
            description:
              "Vishal, a new product manager, is seeking a mentor to help improve collaboration with his engineering team. The conversation aims to assess Vishal's approach to learning, communication, and relationship building. By reflecting on these areas, Vishal can gain insights into strengthening cross-functional partnerships. Respond to this situation as the product manager, Vishal.",
            test_type: "Audio",
            is_recommended: false,
          },
        ],
      },
    ],
    domainOptionsForFilter: [
      {
        value: "Self-Awareness",
        label: "Self-Awareness",
      },
      {
        value: "Self-Regulation",
        label: "Self-Regulation",
      },
      {
        value: "Motivation",
        label: "Motivation",
      },
      {
        value: "Empathy",
        label: "Empathy",
      },
      {
        value: "Social Awareness ",
        label: "Social Awareness ",
      },
      {
        value: "Cooperation",
        label: "Cooperation",
      },
      {
        value: "Influence",
        label: "Influence",
      },
      {
        value: "Analytical Mindset",
        label: "Analytical Mindset",
      },
      {
        value: "Needs and Wants",
        label: "Needs and Wants",
      },
      {
        value: "Curiosity",
        label: "Curiosity",
      },
    ],
  },
];

export const EQTests: Test[] = [
  {
    domain: "Self-Awareness",
    test_code: "QB6FX7C",
    title: "Navigating uncertainty in a new role",
    description:
      "A recent joinee in tech industry, was excited to start his new role. However, within days of joining, a corporate restructuring led to changes in his responsibilities and team composition. This unexpected turn of events introduced complexity and apprehension. The following questions by the manager, Ajay aim to gauge the team member's ability to handle uncertainty and adapt to change. Respond as a team member to this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Self-Regulation",
    test_code: "QKJF0XW",
    title: "Prioritizing Tasks in Time-Critical Situations",
    description:
      "The time crunch situation with competing priorities is quite common in a workplace. As an entry-level team member, one has to make a judgment call to determine which task deserves immediate attention. The questions below aim to assess the thought process behind the decision making in such a scenario.  Respond to this situation as the team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Motivation",
    test_code: "QO4RRDL",
    title: "Driving Team Engagement for an Initiative",
    description:
      "Nisha trying to involve her disinterested team in a process improvement initiative. The team is reluctant to adopt a new project management methodology due to their familiarity with the existing process and concerns about potential disruptions. The new initiative aims to streamline project workflows and improve efficiency. Respond to this situation as the team member, Nisha.",
    interaction_mode: "Audio",
  },
  {
    domain: "Empathy",
    test_code: "QJETQM4",
    title: "Supporting a Struggling Colleague",
    description:
      "Harsha and Franklin, postgraduates from the same B-School, share a close friendship at Hy-tech technology solutions. Harsha, a team member counselor, enjoys recognition due to daily interactions, while Franklin, a finance executive, feels unrecognized. His resignation prompts Mr. Mehta to address the situation. Mr. Mehta highlights Franklin's expertise through emails, cross-departmental projects, and discussions. Team-building activities and an inclusive environment are promoted. Harsha supports Franklin by involving him, sharing skills, and maintaining their friendship. These efforts ensure Franklin's value and strengthen their workplace dynamics. The questions evaluate the team member's learning from this case lesson. Respond to this context appropriately.",
    interaction_mode: "Audio",
  },
  {
    domain: "Social Awareness ",
    test_code: "Q8A5C4I",
    title: "Supplier Selection Dilemma",
    description:
      "The team member has to make a tricky choice between two suppliers for procurement of office equipment. One offers cheaper pricing but the other provides eco-friendly options at a higher cost. He has to evaluate various factors like cost-effectiveness, environmental sustainability, product quality, and service. This decision requires careful consideration of the pros and cons of both options and how they align with the company's priorities. Respond to this situation as the team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Cooperation",
    test_code: "Q2GE3U9",
    title: "Managing Disagreements in cross-functional team dynamics",
    description:
      "Team dynamics can be challenging to navigate, especially when opinions differ. This scenario explores how to handle disagreements and advocate for one's ideas without damaging team cohesion. A team member of a cross-functional teamis very innovative, but his ideas often clash with those of his team members. He faces the decision of adapting his approach to fit in or advocating for his ideas while maintaining a collaborative atmosphere.  Respond to this situation as the team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Influence",
    test_code: "Q03F4LB",
    title: "Feedback for Coworker Who Interrupts Frequently",
    description:
      "Distractions and interruptions are an unavoidable part of any workplace. However, interrupting coworkers during discussions can damage teamwork and effectiveness. Here is a context to help evaluate and provide feedback to a team member who frequently interrupts coworkers. Respond to this situation as the team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Analytical Mindset",
    test_code: "Q8DFIM4",
    title: "Double-Booking Crisis Management",
    description:
      "Unforeseen challenges frequently require creative problem-solving. When a junior project coordinator double-books an important meeting room, quick thinking and collaboration are critical to resolve the issue.  A junior project coordinator accidentally double-books a meeting room for two important client presentations at the same time.  Respond to this situation as the junior project coordinator.",
    interaction_mode: "Audio",
  },
  {
    domain: "Needs and Wants",
    test_code: "QND4PNE",
    title: "Discussing Career Growth Aspirations with Manager",
    description:
      "A team member wishes to have an open and understanding conversation with his manager regarding his aspirations for career growth but fears coming across as dissatisfied in his current role. He schedules a meeting with his manager. The objective of the meeting is to discuss his long-term career goals, skill development, professional support, current role satisfaction, and suggestions for enhancing career growth opportunities and transparency within the team. Respond to the questions asked by the manager as a team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Curiosity",
    test_code: "QK3FJSW",
    title: "Mentorship for Enhancing Cross-functional Harmony",
    description:
      "Vishal, a new product manager, is seeking a mentor to help improve collaboration with his engineering team. The conversation aims to assess Vishal's approach to learning, communication, and relationship building. By reflecting on these areas, Vishal can gain insights into strengthening cross-functional partnerships. Respond to this situation as the product manager, Vishal.",
    interaction_mode: "Audio",
  },
];

export const Managerial: Test[] = [
  {
    domain: "Pursuing career growth",
    test_code: "QG8OTQR",
    title: "Discussing the next steps in career ladder",
    description:
      "The team member is interested in progressing into a leadership role and has requested a meeting with their manager to discuss next steps. The manager aims to evaluate the team member's motivations, skills, and development needs to determine if they would be a good fit for a leadership position. Respond to this situation as the team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Handling change and uncertainty",
    test_code: "QXA0FHL",
    title: "Navigating uncertainty in a new role",
    description:
      "A recent joinee in tech industry, was excited to start his new role. However, within days of joining, a corporate restructuring led to changes in his responsibilities and team composition. This unexpected turn of events introduced complexity and apprehension. The following questions by the manager, Ajay aim to gauge the team member's ability to handle uncertainty and adapt to change. Respond as a team member to this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Team building & Leadership",
    test_code: "QQJPCFI",
    title: "Teams using Agile Strategies ",
    description:
      "After returning from the team-building training, an operations manager receives a challenging exercise from her trainer. She must dismantle the current production team, plagued by communication gaps and delays, and build a new team for an upcoming high-stakes product launch. The textile industry demands precision, and she needs to implement agile methodologies learned during training to improve efficiency. She's meeting with the Department Head, Harish to strategize this overhaul. Respond as the operations manager in this situation.",
    interaction_mode: "Audio",
  },
];

export const Reflection: Test[] = [
  {
    domain: "Making ethical decisions",
    test_code: "QHZPPK1",
    title: "Evaluating Cost vs. Sustainability in Procurement",
    description:
      "The team member in procurement has to choose between cheaper but eco-friendly office equipment options. While cost-cutting is a priority, environmental sustainability is also important to the organization. The decision requires the team member to weigh these conflicting priorities and determine what would create the most value. Doing a proper analysis of the options and understanding the trade-offs involved can help arrive at an optimal choice. Respond to this situation as the team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Managing Work Life Balance",
    test_code: "QTTDTXG",
    title: "Balancing Workload and Setting Boundaries Discussion",
    description:
      "An administrative assistant is increasingly receiving additional tasks outside of their core job responsibilities which is impacting their ability to effectively complete their primary work. Unsure of how to have a constructive conversation with their manager about setting better boundaries and priorities to support a sustainable workload, they are seeking advice on how to address this sensitive issue. Respond to this situation as the administrative assistant.",
    interaction_mode: "Audio",
  },
];

export const ijp: Test[] = [
  {
    domain: "Pursuing professional development",
    test_code: "QA61J85",
    title: "Leadership Aptitude Interview for Project Lead Promotion",
    description:
      "A proactive team member in an Indian IT firm seeks internal promotion to a project lead role. The HR Manager, Mr. Rao, conducts an interview to assess the candidate's leadership potential. Despite strong technical proficiency, Mr. Rao focuses on evaluating the candidate's leadership style and communication skills, recognizing their significance in the prospective role. The context underscores the critical need for effective stakeholder communication and leadership skills. The interview aims to gauge the candidate's aptitude for managing projects and fostering collaboration in a culturally specific professional environment. Respond to this situation as a team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Interview for Managerial Role",
    test_code: "QMP4OXU",
    title: "Team Lead's Managerial Potential Assessment",
    description:
      "A skilled Team Lead expressed interest in a managerial role through the Internal Job Posting IJP. Aarav, the HR manager, conducted an interview to assess her leadership capabilities. The company, a prominent player in the Indian IT sector, had recently expanded its project portfolio. The need for effective team management and inspiration became crucial to meeting heightened client expectations. Aarav aimed to gauge the team's potential to navigate this growth, ensuring seamless collaboration among team members and fostering a motivational work environment. Respond to this situation as the Team Lead.",
    interaction_mode: "Audio",
  },
];

export const DiversityPlus: Test[] = [
  {
    domain: "Equality in Pay",
    test_code: "QU0BI9G",
    title: "Gender Pay Gap Investigation",
    description:
      "In a prominent corporation, a diligent female employee in a mid-level management position discovers a stark gender pay gap within their organization. Through extensive research and data analysis, they have noticed that female colleagues in equivalent roles are consistently paid less than their male counterparts. Troubled by this inequity, the female employee decides to voice her concerns by formally submitting a written inquiry to the organization's HR department. So in response, the HR manager has lined up a meeting to understand her concerns. In this case, act as a manager to answer her questions.",
    interaction_mode: "Audio",
  },
  {
    domain: "Cultural Sensitivity",
    test_code: "QC9OYMG",
    title: "Addressing Workplace Cultural Insensitivity	",
    description:
      "Within a dynamic workplace, an employee experiences an unsettling cultural insensitivity incident. During a team meeting, a colleague makes derogatory comments about the employee's cultural background. This incident leaves the employee feeling uncomfortable and marginalized. In response, the employee decides to escalate the matter to the HR department, triggering discussions on how to rectify such DEI issues. The manager scheduled a meeting with her to understand the situation. In this case act as a manager to answer her questions.",
    interaction_mode: "Audio",
  },
];

export const DescoveryPlus: Test[] = [
  {
    domain: "Making time critical decisions",
    test_code: "Q7LRADG",
    title: "Making decision for a Critical Project Delay Under Pressure",
    description:
      "A project manager leading a team on a tight deadline for a critical project. The team is facing a sudden technical issue that jeopardizes the project's timeline. The client is expecting the deliverables within the week, and any delay could have significant consequences for the project's success. As the project manager, you need to make a decision to address this issue promptly.",
    interaction_mode: "Audio",
  },
  {
    domain: "Difficult executive decisions",
    test_code: "Q9B086X",
    title:
      "Deciding how to deal with challenging financial times as the Senior Director",
    description:
      "The candidate is a Chief Financial Officer (Senior Director) of a large multinational corporation. The company is navigating a challenging financial quarter, and a significant cost-cutting decision is required to maintain profitability. The board is looking to the Senior Director for guidance on the next steps.",
    interaction_mode: "Audio",
  },
];

export const oneTwoOne: Test[] = [
  {
    domain: "Delegation and Task Prioritization",
    test_code: "QQMTKIU",
    title:
      "Optimizing Delegation and Task Prioritization for the Thompson Project Deadline",
    description:
      "The Thompson project is a critical initiative for the organization, with a rapidly approaching deadline. The project scope has expanded significantly, and the current project team is overwhelmed with the workload. The manager must evaluate the team's bandwidth and prioritize tasks to ensure the successful completion of the project within the given timeline. You are the project manager, interacting with the team lead. Your intent is to optimize the delegation and task prioritization to meet the Thompson project deadline.",
    interaction_mode: "Audio",
  },
  {
    domain: "Work-Life Balance and Conflict Resolution",
    test_code: "QL4JI6A",
    title: "Navigating Workload Challenges and Fostering Work-Life Balance",
    description:
      "The marketing team at a leading technology company is under immense pressure to deliver a high-profile campaign for a new product launch within a tight timeline. The team has been working long hours and weekends to meet the aggressive targets set by the executive leadership. However, the manager has noticed that the team members' productivity and morale have started to decline, and there are signs of burnout and work-life balance issues. You are the marketing manager, interacting with the team members. Your intent is to address the workload challenges and foster a healthy work-life balance within the team.",
    interaction_mode: "Audio",
  },
];
export const Technology: Test[] = [
  {
    domain: "Technical training",
    test_code: "Q5GCYW5",
    title: "AWS Migration Strategy for Scalability",
    description:
      "This is the last day of your AWS training. To complete the training complete this real life customer interaction. Mr. Arjun Sharma, an experienced IT professional at a leading Indian e-commerce firm, faces challenges with the current infrastructure scalability. The company's user base has grown significantly, causing performance issues and escalating infrastructure costs. Arjun seeks to migrate to AWS to address these issues, leveraging its scalable and cost-effective solutions to optimize the e-commerce platform performance. Respond to this situation and guide Mr. Sharma through the process of implementing AWS into the existing system to enhance scalability and overall performance. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Technical discussion",
    test_code: "QHLQLIY",
    title: "API Integration Issues",
    description:
      "The manager of the IT company reached out to a software developer to address an issue where the data from the database is not visible on the frontend even though the APIs are working properly. The manager wants to understand the root cause of the issue by asking some questions to the developer. Respond as a software developer to this situation and provide appropriate support to the Manager.",
    interaction_mode: "Audio",
  },
  {
    domain: "Managing Data",
    test_code: "Q1XC4XU",
    title: "Data Integration Challenge",
    description:
      "The product manager is facing challenges with effectively integrating data from various sources, including databases, third-party APIs, and streaming data feeds. This integration issue has resulted in data inconsistencies, making it challenging to provide reliable analytics and reporting. In response to this issue, an employee is seeking answers from the manager, who will provide explanations and solutions to address these challenges. Respond as a manager to this situation and provide appropriate support.",
    interaction_mode: "Audio",
  },
];

export const DSA: Test[] = [
  {
    domain: "Warehouse Inventory Management",
    test_code: "Q2V8XPN",
    title:
      "Optimizing Warehouse Inventory Management for a Thriving E-commerce Business",
    description:
      "Isha, the head of operations at a rapidly growing e-commerce company, is tasked with designing an efficient inventory management system for the company's warehouse. The warehouse currently stores thousands of unique products, each with its own SKU (Stock Keeping Unit). As the business expands, the warehouse receives new shipments daily and fulfills a high volume of orders continuously. Isha recognizes the need for a robust system that can handle the increasing complexity of inventory operations, including adding new products, removing products, updating quantities, and quickly identifying the product with the highest quantity in the warehouse. You are Isha, the head of operations, interacting with Raj, the lead software engineer. Raj will ask you questions related to designing an efficient inventory management system for the company's warehouse. Your intent is to provide Raj with a comprehensive solution that addresses the key requirements and challenges.",
    interaction_mode: "Audio",
  },
  {
    domain: "Social Media Feed",
    test_code: "QUG7UXZ",
    title:
      "Optimizing Social Media Platform's Follower-Following Dynamics and News Feed Delivery",
    description:
      "The marketing team of a rapidly growing social media platform is facing challenges in efficiently managing the dynamic relationships between its millions of users and their news feed updates. As the user base expands, the platform is struggling to handle the increasing volume of follow/unfollow actions and the need to provide a real-time, personalized news feed experience for each user. The team must devise a robust system that can scale to handle the platform's growth while ensuring optimal performance for critical operations such as following/unfollowing users and fetching news feeds. You are Aditya, the lead data engineer at the social media platform. Priya, the product manager, will ask you questions related to the efficient management of the follower-following relationships and news feed delivery. Your intent is to propose a solution that addresses the platform's scalability and performance requirements.",
    interaction_mode: "Audio",
  },
];

export const DataScience: Test[] = [
  {
    domain: "Customer Churn Prediction for a Telecom Company",
    test_code: "QDN6W9V",
    title:
      "Predicting Customer Churn for a Telecom Company: A Data Science Challenge",
    description:
      "The telecom industry is highly competitive, and customer retention is a critical factor for success. A leading telecom company is facing a significant challenge with customer churn, where a substantial number of customers are leaving the service. The company's management has tasked the data science team to develop a predictive model that can identify customers who are likely to churn in the next month. The team has access to historical data, including customer demographics, service usage patterns, billing information, and customer support interactions. The goal is to leverage this data to build an accurate predictive model and provide actionable insights to help the company reduce customer churn. You are Isha, a data scientist, interacting with Raj, the head of the customer retention department. Raj will ask you questions related to the data science challenge of predicting customer churn for the telecom company. Your intent is to demonstrate your expertise in data science and analytics to help the company address this critical business problem.",
    interaction_mode: "Audio",
  },
  {
    domain: "Sales Forecasting for a Retail Chain",
    test_code: "QRT9985",
    title:
      "Optimizing Inventory Management and Sales Forecasting for a Retail Giant",
    description:
      "A retail giant, operates a vast network of stores across multiple regions, offering a diverse range of products to its customers. The company's management has identified the need to improve its inventory management and sales forecasting capabilities to enhance operational efficiency and profitability. As the data analyst, you have been tasked with developing a comprehensive sales forecasting model that can accurately predict weekly sales for each store and product category, taking into account various internal and external factors. You are Aadhya, the data analyst at the company. Rajesh, the regional manager, will ask you questions related to the development and implementation of the sales forecasting model. Your intent is to provide Rajesh with a detailed plan and demonstrate your expertise in data science and analytics to optimize the company's inventory management.",
    interaction_mode: "Audio",
  },
];

export const Sales: Test[] = [
  {
    domain: "Edtech sales",
    test_code: "QUEP49K",
    title: "Pitching a Computer Science Course",
    description:
      "This is the last day of your orientation training as a Education Sales Rep. As the last task complete this real life customer interaction. Mrs. Ananya Menon, a school principal, grapples with budget constraints hindering the implementation of a robust computer science curriculum. The school, with 800 students from diverse socioeconomic backgrounds, is committed to elevating digital literacy. However, financial limitations impede progress. The challenge is to present a compelling case for how this course offers a cost-effective solution, meeting the school's educational aspirations within the financial boundaries it faces. Respond as the Education Sales Rep to this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Luxury real estate",
    test_code: "Q812FEK",
    title: "Handling a High-Profile Client",
    description:
      "At the end of your workshop for Luxury Real Estate selling techniques, your trainer has given you an exercise to complete this real life customer interaction simulation. Ms. Priya Deshmukh, a renowned actress, is in search of an exclusive retreat in for private getaways. She prioritizes privacy, a stunning beachfront location, and state-of-the-art security. Your role involves understanding the unique needs of a high-profile client, ensuring confidentiality, and securing a deal that aligns with her lifestyle and preferences. Respond to this situation as the real estate sales agent.",
    interaction_mode: "Audio",
  },
  {
    domain: "Healthcare sales",
    test_code: "QQ6V0RH",
    title: "Tailored Health Package Solution ",
    description:
      "This is the last day of your orientation training as a health package sales rep. To complete the orientation you need to complete this exercise of a real life customer interaction simulation. Sajeev, a young entrepreneur in the fitness industry, is seeking a health package solution for his startup's employees. With a workforce focused on physical well-being, Sajeev is interested in a package that includes coverage for sports injuries, specialized health programs, and preventive health check-ups. Your role as a Sales Rep is to showcase how your company's health package can cater to the unique needs of Sanjeev's fitness-oriented team. Respond to this situation as the Sales Rep.",
    interaction_mode: "Audio",
  },
  {
    domain: "Insurance Consultation",
    test_code: "QCKU3BT",
    title: "Health Insurance Consultation",
    description:
      "Akshita Singh, a marketing professional, is considering health insurance for herself and her parents. With a history of certain pre-existing conditions in the family, she is navigating the complexities of finding a policy that offers comprehensive coverage while managing premium costs. She has called the company number to gain more information about your insurance package. Your responsibility is to analyze her family's medical history, educate her on policy inclusions and exclusions, and recommend a health insurance plan that strikes the right balance between coverage and affordability. Respond to this situation as an Insurance Sales Rep.",
    interaction_mode: "Audio",
  },
];

export const coachingPlus: Test[] = [
  {
    domain: "Sales Coaching",
    test_code: "QPON191",
    title: "Coaching session on sales performance",
    description:
      "A sales rep engages in a coaching session with a sales coach to address his recent performance. The rep is seeking constructive feedback on their sales techniques, presentation skills, and client interactions, aiming to identify specific areas for improvement and enhance overall sales effectiveness. Respond as the sales rep in this coaching session.",
    interaction_mode: "Audio",
  },
  {
    domain: "Stress management coaching",
    test_code: "QFN8OWT",
    title: "Counselling session for stress management.",
    description:
      "A manager schedules a coaching conversation with a life coach to navigate work-related stress and improve work-life balance. The coaching session aims to provide personalized guidance for stress management, fostering resilience and promoting a healthier work environment. Respond as the manager in this coaching session.",
    interaction_mode: "Audio",
  },
  {
    domain: "Development Coaching",
    test_code: "QJQOPMO",
    title: "Enhancing Leadership and Team Collaboration",
    description:
      "A team member participates in a coaching session with his ICF coach. The session focuses on refining the team member's leadership skills, strategic thinking, and team collaboration. The team member seeks guidance on handling challenging team dynamics and improving communication within his team. Respond as the team member in this coaching session.",
    interaction_mode: "Audio",
  },
  {
    domain: "GROW Model Intake",
    test_code: "QIQHBZ7",
    title: "",
    description:
      "In this session, you're presented with a list of questions from the GROW Model seeking your input towards your goal. Provide concise and thoughtful responses to these questions. ",
    interaction_mode: "Audio",
  },
  {
    domain: "ABCDE Model Intake",
    test_code: "QQTJD7G",
    title: "",
    description:
      "In this session, you're presented with a list of questions from the ABCDE Model seeking your input. Provide concise and thoughtful responses to these questions. ",
    interaction_mode: "Audio",
  },
];

export const pms: Test[] = [
  {
    domain: "Develop communication and interpersonal skills",
    test_code: "QQHHC29",
    title: "Addressing Aggressive Communication Style",
    description:
      "The situation revolves around a team member's aggressive communication style, which has led to conflicts and discomfort among coworkers. To address this problem, the team leader, Vijay has scheduled a meeting with the team member to provide constructive feedback and work on improving his communication skills. Respond to this situation as the team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Performace Management",
    test_code: "QNN0SML",
    title: "Feedback Implementation and Professional Development Discussion",
    description:
      "Alok, the manager has observed that you struggle to effectively implement the constructive feedback provided to improve his work skills and career growth. To address this, the manager schedules a follow-up meeting to ask targeted questions that assess your challenges in applying feedback and provide guidance on optimizing his professional development. Respond to this situation as the team member..",
    interaction_mode: "Audio",
  },
];

export const pitch: Test[] = [
  {
    domain: "Investors' Pitch Mastery",
    test_code: "Q7FLWU4",
    title: "Tech-Driven Food Waste Solution",
    description:
      "An entrepreneur stands before a diverse group of potential investors. She pitches her innovative startup idea for a sustainable, tech-driven solution to reduce food waste. She aims to convey the unique value proposition of her tech-based solution, emphasizing its market relevance, scalability, and revenue potential. The investors, known for their discerning scrutiny, expect a concise yet compelling presentation that addresses key aspects: market research, competitive analysis, monetization strategy, and a clear roadmap. Present the pitch as the entrepreneur in this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Pitching Coaching Program",
    test_code: "QOP6PXE",
    title: "Elevating Skills and Engagement",
    description:
      "An L&D manager stands confidently in front of the Head of HR, presenting a proposal for an enterprise-wide coaching program. The manager highlights the program's potential to enhance employee skills, foster leadership development, and boost overall team performance. The pitch emphasizes the program's scalability and adaptability to diverse roles within the organization. The L&D manager stresses the positive impact on employee engagement and retention, aligning the coaching initiative with strategic HR goals. The presentation includes a detailed plan, incorporating feedback mechanisms and measurable outcomes, to ensure the program's effectiveness and long-term success. Present the pitch as the L&D manager in this situation.",
    interaction_mode: "Audio",
  },
];

export const serviceslashConsulting: Test[] = [
  {
    domain: "Hotel customer service",
    test_code: "QCW8FWO",
    title: "Crisis Resolution in Hotel Management",
    description:
      "At the last day of your orientation as a Hotel Receptionist. As the last task complete this real life customer interaction where a guest is angry at a mistake the staff made. This is the situation. Mr. Rajiv Verma, a corporate guest hosting a crucial business meeting at the hotel's conference hall, discovers that the meeting room reservation has been miscalculated, leading to an overlapping schedule with another event. Rajiv expresses his displeasure, emphasizing the importance of the meeting's agenda and the inconvenience caused to his guests. Your role is to resolve this issue swiftly, ensuring minimal disruption to Mr. Verma's business plans while maintaining the hotel's professional image. Respond as the Hotel Receptionist to this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Air Hostess Training",
    test_code: "Q4YWWWY",
    title: "Real-Life Customer Resolutions",
    description:
      "On the last day of your training as the Air hostess for a renowned airline. To complete the training you need to complete this real life customer interaction simulation. Mr. Rajat Singh, a high-profile passenger, has a strict vegan diet due to health reasons. Unfortunately, there is an oversight, and the available in-flight meal does not align with his dietary requirements. Balancing the need for a quick resolution and maintaining the airline's service standards, your challenge is to find a suitable alternative or make necessary arrangements to accommodate Mr. Singh's dietary restrictions. Respond to this situation as the Air hostess. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Bank branch situation",
    test_code: "QD4MQJI",
    title: "Addressing a delay in service",
    description:
      "This is the last day of your orientation training as a bank employee. As the last task complete this real life customer interaction simulation. Mr. Rohit Sharma, a dedicated customer of the bank for the past 15 years, encounters a delay in opening a new account due to a discrepancy in his address proof. The challenge lies in maintaining Mr. Sharma's confidence, given his long-standing relationship with the bank, while adhering to the stringent industry norms. As the employee, you are tasked with striking a balance between ensuring compliance and providing reassurance to Mr. Sharma, who expressed valid concerns about the extended procedural timelines. Respond as the bank employee to this situation. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Healthcare counselling",
    test_code: "QEH6YUA",
    title: "Diabetic Patient Preoperative Counseling",
    description:
      "This is the last day of your orientation as a Nurse. As the last task complete this real life patient interaction. Mrs. Anvita Kapoor, a 65-year-old diabetic patient, has been admitted for a hip replacement surgery. During your orientation, you learned that she is apprehensive about postoperative care due to her diabetes. You are tasked with providing reassurance and educating her on maintaining stable blood sugar levels to facilitate a smooth recovery. Respond to this situation as the nurse.",
    interaction_mode: "Audio",
  },
  {
    domain: "Production units communication",
    test_code: "QFDNH0I",
    title: "Addressing Defective Products",
    description:
      "Ms. Nandini Kapoor, the quality control manager, identifies a batch of defective products during routine inspections. She raises concerns about potential production flaws that could harm the factory's reputation. The production floor manager, needs to collaborate with Nandini to isolate and rectify the root cause while maintaining production efficiency. Respond to this situation as the production floor manager. ",
    interaction_mode: "Audio",
  },
];

export const roundFeedback: Test[] = [
  {
    domain: "Performance management",
    test_code: "QISOFJB", //
    title: "Providing Constructive Feedback as a Manager",
    description:
      "A team member has been working hard but feels frustrated due to lack of feedback from the manager which is hindering his growth. He scheduled a meeting to discuss this issue and get clarity on his performance and areas of improvement. Respond to this situation as the  manager.",
    interaction_mode: "Audio",
  },
  {
    domain: "Performance management",
    test_code: "QKB2XR0", //
    title: "Improving Performance Through Feedback",
    description:
      "A team member's performance has been suffering recently due to lack of proper training and growth opportunities in the organization. The team member wants to discuss this issue with the manager to understand the reasons behind it and find solutions to improve performance. Respond to this situation as the manager.",
    interaction_mode: "Audio",
  },
  {
    domain: "Providing Feedback",
    test_code: "QMHIGIF",
    title: "Guiding an Employee as a New Manager",
    description:
      "A seasoned automotive professional with 7+ years of experience, has recently assumed a managerial role. In her first check-in with Riya, the project lead for a vehicle redesign initiative, she grapples with a production delay owing to a manufacturing flaw discovered in the initial prototypes. The project further faces a setback as a recent supply chain disruption, impedes the timely delivery of critical components. The new manager must provide feedback to Riya on finding swift resolution strategies, communicate efficiently with suppliers and recalibration of production timelines to mitigate project risks. Respond to this situation as the manager.",
    interaction_mode: "Audio",
  },
];

export const meetings: Test[] = [
  {
    domain: "Driving Digital Transformation",
    test_code: "Q97STR8",
    title: "Aligning Teams and Overcoming Resistance",
    description:
      "The marketing department of a leading consumer electronics company is facing significant challenges as it navigates a digital transformation initiative. The company has recognized the need to modernize its e-commerce platform, improve data analytics capabilities, and enhance the overall customer experience. However, the transition has been met with resistance from some long-tenured employees who are skeptical of the proposed changes. The senior leadership team has communicated the vision and rationale for the digital transformation, emphasizing the benefits of increased efficiency, data-driven decision-making, and competitiveness in the rapidly evolving market. Despite these efforts, the middle managers are struggling to effectively implement the changes and address the concerns raised by their teams. The situation has reached a critical juncture, with the need to align the entire organization and overcome the resistance to ensure the success of the digital transformation project. You are Anita, the marketing director, interacting with Rajesh, the sales manager, Parul, the team member and Neha, the IT project manager. Rajesh, Parul and Neha will ask you questions related to driving the digital transformation initiative and addressing the resistance within the organization. Your intent is to effectively communicate the vision, address concerns, and foster a collaborative environment to achieve the desired outcomes.",
    interaction_mode: "Audio",
  },
  {
    domain: "Navigating Organizational Change",
    test_code: "Q67G437",
    title: "Addressing Employees' Concerns and Ensuring Smooth Transition",
    description:
      "The marketing department of a leading e-commerce company is facing a major transformation. The company has decided to implement a new customer relationship management (CRM) system to streamline its operations and improve customer service. However, the change has caused significant resistance among the marketing team, who are concerned about job security, the steep learning curve, and the potential impact on their day-to-day responsibilities. The senior marketing manager, Rupesh, has organized a small group discussion to address these concerns and facilitate an open dialogue with his team. The goal is to create a safe space for employees to voice their questions and anxieties, and for Rupesh to provide clear information and assurances to manage the resistance and ensure a successful transition to the new system. You are Rupesh, the senior marketing manager, interacting with Neha, Aaditya, and Priya. Neha, Aaditya, and Priya will ask you questions related to the implementation of the new CRM system and the concerns of the marketing team. Your intent is to address their concerns, provide clear information, and facilitate a smooth transition to the new system.",
    interaction_mode: "Audio",
  },
];
export const immersive: Test[] = [
  {
    domain: "Handling Project Delays",
    test_code: "QMAYNNN",
    title: "Addressing Project Delays Due to External Factors",
    description:
      "During a project execution at a construction firm, unexpected delays have arisen due to adverse weather conditions and supply chain disruptions. These delays have impacted the construction timeline, jeopardizing key milestones. A team member wants to understand how the Manager plans to handle the situation and what kind of support is required from them. Respond to this situation as the Manager.",
    interaction_mode: "Audio",
  },
  {
    domain: "Mastering Career Development Dialogues",
    test_code: "QJXK6VY",
    title: "Career Growth Conversation with the manager",
    description:
      "The team member has been performing consistently in his current role but struggles to communicate his desire for career growth to his manager. In a meeting to discuss performance and development, the manager asks questions to understand the team member's aspirations and determine next steps to support his growth. Respond as a team member to this situation.",
    interaction_mode: "Audio",
  },
];

export const presentation: Test[] = [
  {
    domain: "Risk Analysis Presentation ",
    test_code: "QXG4FYR",
    title: "Presenting a Risk Assessment for a High-Stakes Business Deal",
    description:
      "In a boardroom meeting, Raj, the project manager, is tasked with presenting a comprehensive risk assessment for an 80-million-dollar merger with a competitor. He must outline potential financial, legal, and operational risks and mitigation strategies. The board expects a structured walkthrough in under 15 minutes and understands the questions or recommendations. The manager is anxious to make a positive mark as he addresses the room and starts to run with his slides. Please respond to the structured prompts to continue.",
    interaction_mode: "Audio",
  },
  {
    domain: "Project Ending Presentation",
    test_code: "Q48S46Y",
    title: "Presenting a project closing report",
    description:
      "Rahul, the project manager, is delivering a comprehensive presentation on a recently completed project. This presentation will focus on the critical phase of project closure, providing an in-depth analysis of the project's performance, achievements, challenges, and lessons learned. His goal is to ensure that all stakeholders have a clear understanding of the project's outcomes and can conclude it successfully.",
    interaction_mode: "Audio",
  },
  {
    domain: "Presentation",
    title: "Project Ending Presentation : Presenting a project closing report",
    description: `Rahul, the project manager, is delivering a comprehensive presentation on a recently completed project. This presentation will focus on the critical phase of project closure, providing an in-depth analysis of the project's performance, achievements, challenges, and lessons learned. His goal is to ensure that all stakeholders have a clear understanding of the project's outcomes and can conclude it successfully.`,
    test_code: "Q48S46Y",
    interaction_mode: "any",
  }
];

export const caseStudy: Test[] = [
  {
    domain: "Strategic Decisions",
    test_code: "QWGW7N3",
    title: "Marketing Optimism vs. Fiscal Prudence Clash",
    description:
      "As a technology firm aiming to launch a groundbreaking product, the leadership team grapples with divergent perspectives on the viability of their market strategy. The Chief Marketing Officer, relying on optimistic customer feedback, champions an aggressive approach. Simultaneously, the Chief Financial Officer, scrutinizing financial projections, advocates for a more conservative stance. The team faces a critical decision point: whether to invest heavily in marketing and innovation or adopt a restrained fiscal strategy. The challenge arises from the team's predisposition to favor information confirming their preconceptions, leading to potential conflict and suboptimal decisions. Reflect on the situation and answer the questions as the Chief Marketing Officer based on the article you just read.",
    interaction_mode: "Audio",
  },
  {
    domain: "Leadership initiatives",
    test_code: "QE4334M",
    title: "Balancing Creativity and Accountability in Office Dynamics",
    description:
      "In a dynamic marketing agency, the team is facing a productivity challenge. Traditional management practices, emphasizing strict office hours, clash with the team's diverse work styles and the nature of creative tasks. Despite having a highly skilled and motivated team, morale is plummeting due to rigid adherence to a 9 to 5 schedule. The disconnect between management expectations and the team's need for flexibility is hindering creativity and collaboration. The manager, caught in the tension between traditional management practices and the team's desire for autonomy, must find a way to foster a more conducive work environment without compromising productivity and accountability. Reflect on the situation and answer the questions as the manager based on the Ted talk you just watched.",
    interaction_mode: "Audio",
  },
];
export const onBoarding: Test[] = [
  {
    domain: "Performance Review",
    test_code: "Q877O08",
    title: "First Performance Review Discussion with Manager",
    description:
      "A recent engineering graduate, joined an IT firm as a software developer. His first performance review takes place after six months, where he is evaluated based on his project contributions and coding efficiency. The manager, Rajat, discusses his progress and suggests areas for improvement to meet industry standards. Respond to this situation as the software developer.",
    interaction_mode: "Audio",
  },
  {
    domain: "Managing Project Timeline",
    test_code: "Q9SSEH3",
    title: "Punctuality challenges due to weather issue",
    description:
      "Raj, a manager in a Mumbai-based company, noticed that a new joiner, consistently arrived on time during his first month. However, as the monsoon season hit, his commute time significantly increased due to waterlogged roads and public transport disruptions. This led to a gradual decline in his punctuality, with the employee frequently arriving late to the office. Raj, concerned about the impact on project timelines, decided to address this issue with him. Respond to this situation as the employee.",
    interaction_mode: "Audio",
  },
];
export const englishSupport: Test[] = [
  {
    domain: "English speaking proficiency",
    test_code: "Q38R7BR",
    title: "Addressing Guest Complaint Regarding Room Cleanliness",
    description:
      "Ramesh, a recent guest at a hotel in Mumbai, approaches the receptionist to express dissatisfaction with the cleanliness of his room during his stay. Upon inspection, he discovered dust accumulation in corners, uncleaned bathroom fixtures, and stained linens. He had booked a deluxe room for a four-day stay, expecting high standards of cleanliness. However, the lapse in housekeeping standards left him disappointed and frustrated. Communicate with the guest and assure him that necessary actions will be taken. Respond to this situation as the receptionist. Demonstrate suitable English communication skills as you respond to this business context.",
    interaction_mode: "Audio",
  },
  {
    domain: "English speaking proficiency",
    test_code: "Q52S75K",
    title: "Handling Customer Inquiry Regarding Account Discrepancy",
    description:
      "Sarah, a customer at the bank, approaches the customer service representative to inquire about a discrepancy in her account balance. She noticed unauthorized transactions and discrepancies in her recent statements. Sarah expresses concern about the security of her account and seeks clarification on the irregularities. As the customer service representative, you must address her concerns promptly and reassure her that the bank will investigate the matter thoroughly to resolve the issue and ensure the security of her account. Respond to this situation as the customer service representative. Demonstrate suitable English communication skills as you respond to this business context.",
    interaction_mode: "Audio",
  },
  {
    domain: "English speaking proficiency",
    test_code: "Q8C4WBS",
    title: "Resolving Customer Concern Over Damaged Merchandise	",
    description:
      "Meena, a customer at a clothing store in Bangalore, approaches the cashier with a pair of jeans she wishes to purchase. However, upon reaching the counter, she notices a small tear in the fabric. She expresses her concern to the cashier, explaining that she had selected the jeans for a special occasion. The cashier listens attentively, assuring Meena that they will promptly exchange the damaged item for a new one. The cashier apologizes for the inconvenience and assures Meena that her satisfaction is a top priority for the store. Respond to this situation as the cashier. Demonstrate suitable English communication skills as you respond to this business context.",
    interaction_mode: "Audio",
  },
  {
    domain: "English speaking proficiency",
    test_code: "Q5786RP",
    title:
      "Assessing Valve Malfunction is a Discussion with the Supervisor on the Shop Floor (Style A)",
    description:
      "During an important site inspection by city administrators at a commercial complex hosting critical city infrastructure, a significant issue arose. The main valve, which controls the water flow to all the commercial complex pipes, unexpectedly malfunctioned. This failure was particularly problematic because the inspection was meant to showcase the efficiency and reliability of the city's waterworks system. The inspection team noticed an immediate drop in water pressure across the complex, causing concerns among the administrators regarding the system’s reliability. A maintenance team had to act swiftly to troubleshoot the issue. They had to quickly determine whether the malfunction was due to a genuine mechanical failure or human error. The supplementary valve, designed to take over in such emergencies, also showed signs of low efficiency, complicating efforts further. There were additional challenges in directing water flow to each of the ten towers of the complex due to the vertically placed control valves. This incident led to urgent scrutiny of the entire valve complex network during the inspection. You are Mark, a newly appointed maintenance engineer, interacting with John, the senior inspection officer. John will ask you questions related to the malfunction of valves during the inspection walkthrough. Your intent is to demonstrate your understanding of the pipeline network and provide effective solutions for immediate resolution.",
    interaction_mode: "Audio",
  },
  {
    domain: "English speaking proficiency",
    test_code: "Q47ZIUY",
    title:
      "Assessing Valve Malfunction is a Discussion with the Supervisor on the Shop Floor (Style B)",
    description:
      "During an important site inspection by city administrators at a commercial complex hosting critical city infrastructure, a significant issue arose. The main valve, which controls the water flow to all the commercial complex pipes, unexpectedly malfunctioned. This failure was particularly problematic because the inspection was meant to showcase the efficiency and reliability of the city's waterworks system. The inspection team noticed an immediate drop in water pressure across the complex, causing concerns among the administrators regarding the system’s reliability. A maintenance team had to act swiftly to troubleshoot the issue. They had to quickly determine whether the malfunction was due to a genuine mechanical failure or human error. The supplementary valve, designed to take over in such emergencies, also showed signs of low efficiency, complicating efforts further. There were additional challenges in directing water flow to each of the ten towers of the complex due to the vertically placed control valves. This incident led to urgent scrutiny of the entire valve complex network during the inspection. You are Mark, a newly appointed maintenance engineer, interacting with John, the senior inspection officer. John will ask you questions related to the malfunction of valves during the inspection walkthrough. Your intent is to demonstrate your understanding of the pipeline network and provide effective solutions for immediate resolution.",
    interaction_mode: "Audio",
  },
];
export const questionPro: Test[] = [
  {
    domain: "Navigating Operational Challenges",
    test_code: "QO0WRWA",
    title: "Assessing Impact of Cost-Cutting Measures in Manufacturing",
    description:
      "Diya, the operations executive, is dealing with a mandate to cut costs at a manufacturing company. The company recently faced a substantial increase in raw material prices due to global supply chain disruptions. To offset these rising costs, Diya implemented a cost-cutting strategy affecting various departments, including procurement, maintenance, and manpower. The ground-level teams are now experiencing challenges, particularly in meeting production targets due to delayed procurement processes and reduced maintenance schedules. The team lead wants to understand how these strategic decisions are translating into operational hurdles, impacting workforce efficiency and day-to-day functions on the shop floor. Respond as the team lead and ask questions to understand the situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Uncovering Production Challenges",
    test_code: "QJHZKWJ",
    title: "Operational Impact of Raw Material Shortage",
    description:
      "A team lead in the production department, is investigating the repercussions of a sudden shortage of key raw materials in a manufacturing company. The scarcity is affecting the procurement timelines, causing delays in production schedules and impacting the overall operational efficiency. The team lead seeking clarity, is probing a senior leader, Ravi about the specific challenges faced by various functions such as production, quality control, and inventory management due to the shortage. The team lead's goal is to uncover the root cause behind the material shortage and understand how it trickles down to affect day-to-day operations at the ground level. Respond as the team lead and ask questions to understand the situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Understanding Causes and Solutions",
    test_code: "QRUB1AK",
    title: "Bug Surge Analysis Meeting",
    description:
      "The project manager, is leading a software development team facing a surge in bug reports. Two developers, Aarav and Priya, are grappling with the increased number of reported issues affecting the application's stability and user experience. The manager calls a meeting to delve into the specifics, seeking insights on the root causes, possible patterns, and any challenges hindering the debugging process. The project manager aims to grasp the nuanced impact on their workflow and the end-user experience to devise targeted solutions and streamline the development process. Respond as the project manager and ask questions to understand the situation.",
    interaction_mode: "Audio",
  },
];

export const frontLineStaff: Test[] = [
  {
    domain: "Edtech sales",
    test_code: "QMJLBVC",
    title: "कंप्यूटर विज्ञान पाठ्यक्रम बेचना",
    description:
      "शिक्षा बिक्री प्रतिनिधि के रूप में यह आपके ओरिएंटेशन प्रशिक्षण का अंतिम दिन है। अंतिम कार्य के रूप में इस वास्तविक जीवन ग्राहक संपर्क को पूरा करें। श्रीमती अनन्या मेनन, एक स्कूल प्रिंसिपल, एक मजबूत कंप्यूटर विज्ञान पाठ्यक्रम के कार्यान्वयन में बाधा डालने वाली बजट बाधाओं से जूझ रही हैं। विविध सामाजिक-आर्थिक पृष्ठभूमि के 800 छात्रों वाला यह स्कूल डिजिटल साक्षरता को बढ़ाने के लिए प्रतिबद्ध है। हालाँकि, वित्तीय सीमाएँ प्रगति में बाधा डालती हैं। चुनौती यह है कि कैसे यह पाठ्यक्रम वित्तीय सीमाओं के भीतर स्कूल की शैक्षिक आकांक्षाओं को पूरा करते हुए एक लागत प्रभावी समाधान प्रदान करता है, इसके लिए एक सम्मोहक मामला प्रस्तुत करना है। इस स्थिति में शिक्षा बिक्री प्रतिनिधि के रूप में प्रतिक्रिया दें।",
    interaction_mode: "Audio",
  },
  {
    domain: "Luxury real estate",
    test_code: "QI5SZ8G",
    title: "एक हाई-प्रोफाइल क्लाइंट को संभालना",
    description:
      "लक्ज़री रियल एस्टेट बिक्री तकनीकों के लिए आपकी कार्यशाला के अंत में, आपके प्रशिक्षक ने आपको इस वास्तविक जीवन ग्राहक संपर्क सिमुलेशन को पूरा करने के लिए एक अभ्यास दिया है। सुश्री प्रिया देशमुख, एक प्रसिद्ध अभिनेत्री, निजी अवकाश के लिए एक विशेष आश्रय की तलाश में हैं। वह गोपनीयता, एक शानदार समुद्र तट स्थान और अत्याधुनिक सुरक्षा को प्राथमिकता देती है। आपकी भूमिका में एक हाई-प्रोफाइल ग्राहक की अनूठी जरूरतों को समझना, गोपनीयता सुनिश्चित करना और उसकी जीवनशैली और प्राथमिकताओं के अनुरूप सौदा हासिल करना शामिल है। रियल एस्टेट बिक्री एजेंट के रूप में इस स्थिति पर प्रतिक्रिया दें।",
    interaction_mode: "Audio",
  },
  {
    domain: "Car sales",
    test_code: "Q367PE8",
    title: "एक आशंकित ग्राहक के साथ सौदा करना",
    description:
      "महिंद्रा डीलरशिप में एक अनुभवी कार विक्रेता को एक प्रीमियम सेडान की तलाश करने वाले संभावित ग्राहक श्री कपूर के साथ एक चुनौतीपूर्ण स्थिति का सामना करना पड़ता है। पूरी तरह से शोध करने के बाद, श्री कपूर मौके पर प्रतिबद्ध होने से सावधान रहते हैं और कार की विशेषताओं, कीमत और इसके लिए भुगतान कैसे करें इसके विस्तृत विवरण की मांग करते हैं। विक्रेता को जानकारी प्रदान करने और भारी विवरण से बचने के बीच की बारीक रेखा को पार करना चाहिए, यह सुनिश्चित करते हुए कि श्री कपूर को सुना और समझा जाए। कार को प्रदर्शित करने से लेकर वित्त पर चर्चा करने और सौदे को पूरा करने तक निर्बाध रूप से बदलाव का दबाव है। विक्रेता के रूप में इस स्थिति पर प्रतिक्रिया दें।",
    interaction_mode: "Audio",
  },
];

export const InteractiveVisualSimulation: Test[] = [
  {
    domain: "Management Development",
    title: "Navigating Team Dynamics After a Major Deal Loss ",
    description: `A large consulting firm has recently lost a significant deal to a competitor, causing concern within the organization. Maya, the pursuit lead for this deal, must now discuss the outcome with her manager, Ravi. The loss of this deal has potential implications for team morale, client relationships, and the firm's competitive position in the market. The situation is particularly delicate as it may reflect on Maya's leadership and the team's performance. Ravi, aware of the sensitivity of the situation, has initiated the conversation by asking a question, setting the stage for a crucial discussion about the lost deal, its impact, and the path forward. You are Maya, the pursuit lead, interacting with Ravi, your manager. Ravi will ask you questions related to the lost consulting deal. Your intent is to provide a comprehensive overview of the situation, address any concerns, and discuss strategies for future improvements.`,
    test_code: "Q42IQVJ",
    interaction_mode: "",
  },
  {
    domain: "Management Development",
    title: "Strategic Decisions: Marketing Optimism vs. Fiscal Prudence Clash",
    description: `As a technology firm aiming to launch a groundbreaking product, the leadership team grapples with divergent perspectives on the viability of their market strategy. The Chief Marketing Officer, relying on optimistic customer feedback, champions an aggressive approach. Simultaneously, the Chief Financial Officer, scrutinizing financial projections, advocates for a more conservative stance. The team faces a critical decision point: whether to invest heavily in marketing and innovation or adopt a restrained fiscal strategy. The challenge arises from the team's predisposition to favor information confirming their preconceptions, leading to potential conflict and suboptimal decisions. Reflect on the situation and answer the questions as the Chief Marketing Officer based on the article you just read.`,
    test_code: "QWGW7N3",
    interaction_mode: "any",
  },
  {
    domain: "Management Development",
    title: "Leadership initiatives : Balancing Creativity and Accountability in Office Dynamics",
    description: `In a dynamic marketing agency, the team is facing a productivity challenge. Traditional management practices, emphasizing strict office hours, clash with the team's diverse work styles and the nature of creative tasks. Despite having a highly skilled and motivated team, morale is plummeting due to rigid adherence to a 9 to 5 schedule. The disconnect between management expectations and the team's need for flexibility is hindering creativity and collaboration. The manager, caught in the tension between traditional management practices and the team's desire for autonomy, must find a way to foster a more conducive work environment without compromising productivity and accountability. Reflect on the situation and answer the questions as the manager based on the Ted talk you just watched.`,
    test_code: "QWGW7N3",
    interaction_mode: "any",
  },
];

export const Assessment: Test[] = [
  {
    domain: "",
    title: "Sales Manager Feedback",
    description: "A sales manager's monthly feedback check in with manager.",
    test_code: "QF4CLRR",
    interaction_mode: "Sales Performance Management",
  },
  {
    domain: "",
    title:
      "Optimizing Marketing Automation and Team Collaboration Amid a Tight Deadline",
    description: `A mid-sized marketing agency is facing a critical deadline for a major client's campaign launch. The client has specific requirements for marketing automation, and the sales and marketing teams are struggling to coordinate effectively. The agency's leadership is concerned about maintaining team morale and delivering the project on time and within budget, while also ensuring the campaigns are optimized for success. You are the Marketing Director, interacting with the Agency CEO. The CEO will ask you questions related to balancing project deadlines, maintaining team morale, and fostering collaboration between sales and marketing teams. Your intent is to provide a well-thought-out plan to address the agency's challenges.`,
    test_code: "QDO4V1I",
    interaction_mode: "Marketing Project Management",
  },
];


export const gamePlay: Test[] = [
  {
    domain: "Management Games",
    test_code: "Q0W76DW",
    title: "New Manager Navigator: Corporate Odyssey",
    description:
      "New Manager Navigator positions you as a new manager within a vast multinational conglomerate. Your mission is to conquer each of the five levels, using advanced management theories and strategic decision-making to optimize outcomes and influence organizational success.Engage across the levels by leveraging strategic resource optimization, stakeholder negotiation, and problem-solving. Your ultimate aim is to utilize advanced management concepts to maximize your performance score and make a lasting impact on the organization.",
    interaction_mode: "",
  },
  {
    domain: "Management Games",
    test_code: "QQPR0QM",
    title: "Cultivating Leadership: Delegation Pro",
    description:
      `Step into the shoes of a seasoned leader in this immersive role-playing game, where you master the art of delegation by guiding a rising star to become an effective leader. Through carefully crafted scenarios, you will foster team trust and competence while demonstrating strategic coaching techniques. Transform knowledge into practice, emulating the mentor-mentee relationship as senior members aid junior colleagues to achieve success within organizational settings.`,
    interaction_mode: "",
  },
]

export const psychAssessment: Test[] = [
  {
    domain: "Critical Hire",
    test_code: "QWDHWI1",
    title: "The Global Project Impasse",
    description:
      "You are leading a global project team with members based in both the US and India. The project, focused on developing a new sustainable energy solution, has reached a critical juncture. A major disagreement has arisen between the US and Indian teams regarding the project's core technology. The US team favors a more expensive but potentially more efficient technology, while the Indian team advocates for a cheaper, though less efficient, alternative due to local resource availability and cost constraints. This disagreement has stalled the project significantly, with both teams becoming increasingly entrenched in their positions. The project's sponsor, based in Switzerland, is growing increasingly impatient and demands a resolution within the next week. They are requesting a clear and well-justified proposal outlining the chosen technology, and a plan to move the project forward expeditiously.",
    interaction_mode: "text",
  },
  {
    domain: "Critical Hire",
    test_code: "QQEJFZG",
    title: "Corporate Leadership Crisis",
    description:
      `A serious security incident has put sensitive customer and employee data at risk, triggering urgent demands from clients and stakeholders. The leadership team faces intense pressure to contain the breach swiftly, ensure transparency, support team morale, and maintain company stability. The leader’s key challenges are to halt further data exposure, communicate strategically with stakeholders to manage concerns, and balance limited resources to address both immediate and long-term needs. With teams working around the clock, the leader must also manage rising stress levels and prevent burnout, ensuring productivity is sustained. Critical decisions need to be made quickly and thoughtfully, balancing speed with strategic foresight. This assessment evaluates your ability to navigate these complexities—making risk-aware choices, communicating effectively, and prioritizing team support to secure the company’s future.`,
    interaction_mode: "text",
  },
  
]

export const LeadershipPsychometric: Test[] = [
  {
    domain: "Leadership Psychometrics",
    test_code: "QXI23E5",
    title: "Strategic Leadership Approaches (Belbin) for Navigating the Complex Project Phoenix Implementation Crisis",
    description:
      `A Fortune 500 company launched "Project Phoenix," an ambitious $75 million organizational transformation initiative aimed at restructuring operations across 12 regional offices. Six months into implementation, critical failures emerged simultaneously. Leadership communication breakdowns created significant confusion about project goals and implementation timelines, with 65% of middle managers reporting they lacked clear direction. Employee satisfaction scores plummeted from 78% to 43%, triggering a 32% turnover rate, primarily affecting high-performing talent. Productivity metrics declined by 24% across departments, and customer satisfaction scores fell by 18 points. The disruption coincided with an unexpected market downturn, creating additional financial pressures as quarterly revenues missed projections by $14 million. Media outlets began publishing critical analyses of the company's strategy, while industry analysts downgraded performance forecasts. The board of directors expressed mounting concerns about executive leadership's ability to stabilize operations and restore stakeholder confidence. As a crisis response manager answer the following questions which your leadership has asked you to come prepared with.`,
    interaction_mode: "any",
    test_type: "",
    is_recommended: false,
    is_micro: false
  },
  {
    domain: "Leadership Psychometrics",
    test_code: "QXI23E5",
    title: "Strategic Leadership Approaches (Big 5) for Navigating the Complex Project Phoenix Implementation Crisis",
    description:
      `A Fortune 500 company launched "Project Phoenix," an ambitious $75 million organizational transformation initiative aimed at restructuring operations across 12 regional offices. Six months into implementation, critical failures emerged simultaneously. Leadership communication breakdowns created significant confusion about project goals and implementation timelines, with 65% of middle managers reporting they lacked clear direction. Employee satisfaction scores plummeted from 78% to 43%, triggering a 32% turnover rate, primarily affecting high-performing talent. Productivity metrics declined by 24% across departments, and customer satisfaction scores fell by 18 points. The disruption coincided with an unexpected market downturn, creating additional financial pressures as quarterly revenues missed projections by $14 million. Media outlets began publishing critical analyses of the company's strategy, while industry analysts downgraded performance forecasts. The board of directors expressed mounting concerns about executive leadership's ability to stabilize operations and restore stakeholder confidence. As a crisis response manager answer the following questions which your leadership has asked you to come prepared with.`,
    interaction_mode: "any",
  },{
    domain: "Leadership Psychometrics",
    test_code: "QXI23E5",
    title: "Strategic Leadership Approaches (Blanchard) for Navigating the Complex Project Phoenix Implementation Crisis",
    description:
      `A Fortune 500 company launched "Project Phoenix," an ambitious $75 million organizational transformation initiative aimed at restructuring operations across 12 regional offices. Six months into implementation, critical failures emerged simultaneously. Leadership communication breakdowns created significant confusion about project goals and implementation timelines, with 65% of middle managers reporting they lacked clear direction. Employee satisfaction scores plummeted from 78% to 43%, triggering a 32% turnover rate, primarily affecting high-performing talent. Productivity metrics declined by 24% across departments, and customer satisfaction scores fell by 18 points. The disruption coincided with an unexpected market downturn, creating additional financial pressures as quarterly revenues missed projections by $14 million. Media outlets began publishing critical analyses of the company's strategy, while industry analysts downgraded performance forecasts. The board of directors expressed mounting concerns about executive leadership's ability to stabilize operations and restore stakeholder confidence. As a crisis response manager answer the following questions which your leadership has asked you to come prepared with.`,
    interaction_mode: "any",
  },{
    domain: "Leadership Psychometrics",
    test_code: "QXI23E5",
    title: "Strategic Leadership Approaches (DISC) for Navigating the Complex Project Phoenix Implementation Crisis",
    description:
      `A Fortune 500 company launched "Project Phoenix," an ambitious $75 million organizational transformation initiative aimed at restructuring operations across 12 regional offices. Six months into implementation, critical failures emerged simultaneously. Leadership communication breakdowns created significant confusion about project goals and implementation timelines, with 65% of middle managers reporting they lacked clear direction. Employee satisfaction scores plummeted from 78% to 43%, triggering a 32% turnover rate, primarily affecting high-performing talent. Productivity metrics declined by 24% across departments, and customer satisfaction scores fell by 18 points. The disruption coincided with an unexpected market downturn, creating additional financial pressures as quarterly revenues missed projections by $14 million. Media outlets began publishing critical analyses of the company's strategy, while industry analysts downgraded performance forecasts. The board of directors expressed mounting concerns about executive leadership's ability to stabilize operations and restore stakeholder confidence. As a crisis response manager answer the following questions which your leadership has asked you to come prepared with.`,
    interaction_mode: "any",
  },{
    domain: "Leadership Psychometrics",
    test_code: "QXI23E5",
    title: "Strategic Leadership Approaches (16PF) for Navigating the Complex Project Phoenix Implementation Crisis",
    description:
      `A Fortune 500 company launched "Project Phoenix," an ambitious $75 million organizational transformation initiative aimed at restructuring operations across 12 regional offices. Six months into implementation, critical failures emerged simultaneously. Leadership communication breakdowns created significant confusion about project goals and implementation timelines, with 65% of middle managers reporting they lacked clear direction. Employee satisfaction scores plummeted from 78% to 43%, triggering a 32% turnover rate, primarily affecting high-performing talent. Productivity metrics declined by 24% across departments, and customer satisfaction scores fell by 18 points. The disruption coincided with an unexpected market downturn, creating additional financial pressures as quarterly revenues missed projections by $14 million. Media outlets began publishing critical analyses of the company's strategy, while industry analysts downgraded performance forecasts. The board of directors expressed mounting concerns about executive leadership's ability to stabilize operations and restore stakeholder confidence. As a crisis response manager answer the following questions which your leadership has asked you to come prepared with.`,
    interaction_mode: "any",
  },
  
]


export const TopTenRoles: Test[] = [
    {
      domain: "Software Engineer",
      title: "Optimizing Warehouse Inventory Management for a Thriving E-commerce Business",
      description: `Isha, the head of operations at a rapidly growing e-commerce company, is tasked with designing an efficient inventory management system for the company's warehouse. The warehouse currently stores thousands of unique products, each with its own SKU (Stock Keeping Unit). As the business expands, the warehouse receives new shipments daily and fulfills a high volume of orders continuously. Isha recognizes the need for a robust system that can handle the increasing complexity of inventory operations, including adding new products, removing products, updating quantities, and quickly identifying the product with the highest quantity in the warehouse. You are Isha, the head of operations, interacting with Raj, the lead software engineer. Raj will ask you questions related to designing an efficient inventory management system for the company's warehouse. Your intent is to provide Raj with a comprehensive solution that addresses the key requirements and challenges.`,
      test_code: "Q2V8XPN",
      interaction_mode: "any",
    },
    {
      domain: "Data science Manager",
      title: "Predicting Customer Churn for a Telecom Company: A Data Science Challenge",
      description: `The telecom industry is highly competitive, and customer retention is a critical factor for success. A leading telecom company is facing a significant challenge with customer churn, where a substantial number of customers are leaving the service. The company's management has tasked the data science team to develop a predictive model that can identify customers who are likely to churn in the next month. The team has access to historical data, including customer demographics, service usage patterns, billing information, and customer support interactions. The goal is to leverage this data to build an accurate predictive model and provide actionable insights to help the company reduce customer churn. You are Isha, a data scientist, interacting with Raj, the head of the customer retention department. Raj will ask you questions related to the data science challenge of predicting customer churn for the telecom company. Your intent is to demonstrate your expertise in data science and analytics to help the company address this critical business problem.`,
      test_code: "QDN6W9V",
      interaction_mode: "any",
    },
      {
        domain: "Finance Manager",
        title: "Addressing Revenue Forecasting Discrepancies Following Recent Budget Cuts in Conglomerate",
        description: `Arun Sharma, the Finance Manager at a large Indian conglomerate, faces a challenging situation. The company recently announced a 15% budget cut across all departments, impacting the Finance team's resources significantly. Following the announcement, the team has observed inconsistencies in revenue forecasting. Specifically, the sales department's projections for the next quarter are significantly higher (22% increase) than what the finance department's statistical models (based on historical data and market trends) are projecting (7% increase). This discrepancy poses a significant risk, potentially leading to over-optimistic resource allocation and investment decisions. The team is now tasked to analyze and address this disparity in forecasting to ensure accurate financial planning amidst the budget constraints. Arun needs to discuss with a team member to understand how to address this issue. You are Arun Sharma, interacting with a Team Member. The Team Member will ask you questions related to the discrepancy in revenue forecasting. Your intent is to achieve accurate financial planning.`,
        test_code: "Q4CJ9ZM",
        interaction_mode: "any",
      },
      {
        domain: "Operations Manager",
        title: "Addressing Increased Defect Rates in Injection Molding Process",
        description: `Rajan, the Operations Manager at Bharat Plastics, is facing a critical situation. Recent quality control reports indicate a significant spike in defect rates in the injection molding line, specifically concerning the production of automotive components. The data reveals a 15% increase in defects related to dimensional inaccuracies and surface imperfections over the past month. Preliminary investigations point towards inconsistencies in temperature control during the molding process and potential issues with the raw material batch received last week from a new supplier, "ChemCo India". The production schedule is tight, and these defects are causing delays in fulfilling orders for Maruti Suzuki. This is the second time in the last quarter that such a significant quality issue has surfaced. The last time it was related to a malfunctioning cooling system, which was quickly rectified. However, this current situation seems more complex, requiring a deeper dive into the process parameters and material properties. Rajan needs to address this urgently to avoid further disruptions and maintain customer satisfaction. You are Rajan, interacting with the Process Improvement Analyst. The Process Improvement Analyst will ask you questions related to the defect rates in injection molding. Your intent is to achieve improved process control and reduced defect rates.`,
        test_code: "Q2ZPY77",
        interaction_mode: "any",
      },
      {
        domain: "Business Development",
        title: "Analyzing FMCG Client's Discount Request Impact on XYZ Holdings' Profitability",
        description: `Anil Sharma, the Business Development Manager at XYZ Holdings, calls a meeting with a pricing analyst to discuss a critical issue. A major FMCG client, responsible for 18% of XYZ's annual revenue, is demanding a 15% volume-based discount on all orders exceeding ₹50 lakhs per month, citing internal budget cuts and increased competition. The current standard discount offered by XYZ for similar volumes is 8%. This client has historically been a reliable partner with consistent payment history. Anil needs to assess the financial implications of acceding to this request, considering XYZ's current cost structure, production capacity, and the potential impact on overall profitability. He wants a detailed analysis of various discount scenarios and their effect on the company's bottom line. A quick decision is needed as the client expects an answer within 48 hours. The meeting has been scheduled to dissect the numbers and explore possible solutions. You are Anil, interacting with the pricing analyst. The pricing analyst will ask you questions related to the FMCG client's discount request and its impact on XYZ Holdings' profitability. Your intent is to achieve a clear understanding of the financial implications and identify a mutually acceptable solution.`,
        test_code: "QHRIRAQ",
        interaction_mode: "any",
      },
      {
        domain: "Project Manager",
        title: "Addressing Bottlenecks Through Task Decomposition in a Telecom Project",
        description: `Priya, the project lead at a prominent Indian telecommunications firm, is facing a critical delay in the rollout of a new 5G infrastructure project. The delay stems from a bottleneck in the network configuration phase. The team member responsible for configuring the core network elements is struggling to complete the task within the allocated timeframe. Initial estimates assumed a straightforward configuration process, but unforeseen complexities related to integrating legacy systems have significantly increased the workload. Priya observes that the team member, while technically proficient, may be struggling with breaking down the complex configuration task into smaller, manageable sub-tasks. The configuration is on the critical path, and any further delay will impact the project's launch date and budget. Priya needs to discuss task decomposition and potential process improvements with the team member. You are the team member, interacting with Priya. Priya will ask you questions related to the current network configuration task. Your intent is to achieve an optimal scheduling solution.`,
        test_code: "Q5BNX46",
        interaction_mode: "any",
      },
      {
        domain: "Marketing Manager",
        title: "Assessing the Impact of Campaign Delay on Digital Marketing Performance Metrics",
        description: `Vikas, the Marketing Manager at a leading Indian automotive conglomerate, is facing the aftermath of a delayed electric vehicle launch campaign. The campaign's digital component, crucial for generating initial buzz and pre-orders, has suffered a setback. The original plan involved a targeted social media blitz, influencer collaborations, and interactive website content, all scheduled to coincide with the festive season. Data analysis reveals a projected 30% decrease in website traffic and a 40% drop in social media engagement compared to pre-delay forecasts. Key performance indicators (KPIs) related to lead generation and conversion rates are also trending downwards. The delay necessitates a revised digital marketing strategy that can effectively recapture lost momentum and meet revised sales targets. The challenge lies in optimizing the remaining timeframe to maximize impact and ensure a successful campaign rollout. You are Vikas, interacting with a team member. The team member will ask you questions related to the delayed launch campaign of the new vehicle. Your intent is to achieve clarity on the revised strategy and ensure timely execution.`,
        test_code: "Q8IW7Z1",
        interaction_mode: "any",
      },
      {
        domain: "Supply Chain Manager",
        title: "Addressing Critical Raw Material Shortage Impacting Production Targets and Customer Orders",
        description: `Priya Sharma, the Supply Chain Manager at Bharat Auto Components, faces a critical situation. A major supplier of specialized steel, crucial for manufacturing high-precision engine parts, has declared bankruptcy due to unforeseen market fluctuations and labor disputes. This has resulted in an immediate and significant shortage of the raw material, jeopardizing Bharat Auto Components' ability to meet its production targets for the next quarter. The situation is further complicated by existing contracts with automotive manufacturers that include stringent delivery schedules and penalty clauses for delays. Initial attempts to find alternative suppliers have been unsuccessful due to the specific grade and quality of steel required. This shortage is now directly impacting the customer service team, as they are dealing with increasing inquiries and complaints regarding delayed orders. Priya needs to discuss this with a customer service team member to strategize on managing customer expectations and minimizing potential damage to the company's reputation. You are Priya, interacting with a team member. The team member will ask you questions related to the raw material shortage and its impact. Your intent is to minimize customer dissatisfaction and find the best way to deliver the news to the customers.`,
        test_code: "QC4T4WP",
        interaction_mode: "any",
      },
      {
        domain: "Business Analyst",
        title: "Modernizing Customer Service: A Roadmap for Enhanced Efficiency and Performance",
        description: `Infosys BPO, Pune, is facing increasing customer churn due to prolonged query resolution times. Recent data indicates a 30% increase in average handling time (AHT) over the last quarter. This is largely attributed to outdated systems, lack of real-time data access for customer service representatives (CSRs), and inefficient workflow processes. The current CRM system is slow and lacks integration with other key platforms, leading to CSRs spending considerable time manually searching for information. Mr. Sharma, the Head of Customer Service, has tasked his Business Analyst to develop a modernization roadmap. He wants to understand how the project will specifically improve the CSRs' ability to handle customer interactions and reduce AHT. He is concerned about the cost implications of the project and wants a clear justification for the investment. You are the Business Analyst, interacting with Mr. Sharma. Mr. Sharma will ask you questions related to the roadmap. Your intent is to achieve alignment and approval for the proposed modernization project.`,
        test_code: "Q7PRF1Y",
        interaction_mode: "any",
      },
      {
        domain: "Strategy & Culture Manager",
        title: "Evaluating Resource Allocation Efficiency and Project Prioritization in IT Department",
        description: `Rahul Verma, the Strategy & Culture Manager at a mid-sized IT firm in Bangalore, notices a growing tension within the project teams. Recent data indicates a dip in project completion rates, and employee satisfaction surveys reveal increasing frustration with resource allocation. Several team members have voiced concerns about the prioritization of projects, feeling that strategically important initiatives are being sidelined in favor of less impactful, client-driven tasks. A recent internal audit highlighted inconsistencies in the application of the company's resource allocation policy. This has led to some teams feeling overburdened while others have idle capacity. A key project, the implementation of a new CRM system, is significantly behind schedule, impacting the sales team's performance. Rahul is concerned about the long-term effects of these issues on the company's overall performance and culture. The situation came to a head when the lead developer of the CRM project threatened to resign due to constant shifting of priorities and lack of necessary resources. You are Rahul Verma, interacting with the lead developer. The lead developer will ask you questions. Your intent is to achieve a better understanding of the issues and find a way to align project priorities with company strategy.`,
        test_code: "QZJVZVX",
        interaction_mode: "any",
      },
      {
        domain: "Human Resource Professional",
        title: "Discrepancies in Payroll Processing and Reconciliation Following System Migration",
        description: `Following a recent migration to a new cloud-based payroll processing system, significant discrepancies have emerged in employee paychecks. Initial audits reveal inconsistencies in calculating overtime pay, tax withholdings, and benefit deductions for approximately 30% of the workforce. Specifically, the new system is incorrectly applying state tax laws for employees working remotely across state lines, leading to over or under withholdings. Furthermore, the system is failing to accurately calculate overtime for employees with tiered pay rates, resulting in substantial payroll errors. Data validation processes implemented during the migration phase appear to have overlooked these critical calculation errors, impacting employee morale and creating potential legal liabilities for the company. The payroll department is now facing a backlog of employee inquiries and requires immediate corrective action to rectify these errors and ensure accurate payroll processing moving forward. You are a Human Resource Professional, interacting with a candidate who has just joined the company. The candidate will ask you questions related to discrepancies in payroll processing and reconciliation following system migration. Your intent is to achieve accurate and compliant payroll processing.`,
        test_code: "QZOOKZA",
        interaction_mode: "any",
      }

]

export const PresentationTest: Test[] = [
  {
    domain: "Presentation",
    title: "Project Ending Presentation : Presenting a project closing report",
    description: `Rahul, the project manager, is delivering a comprehensive presentation on a recently completed project. This presentation will focus on the critical phase of project closure, providing an in-depth analysis of the project's performance, achievements, challenges, and lessons learned. His goal is to ensure that all stakeholders have a clear understanding of the project's outcomes and can conclude it successfully.`,
    test_code: "Q48S46Y",
    interaction_mode: "any",
  }
]

export const Diversity: Test[] = [
  {
    domain: "Diversity",
    title: "Addressing Gender Disparities in Project Leadership: A Mentoring Opportunity",
    description: `Priya Mehra, a seasoned HR Manager at CB Consultancy Services (CBCS), is mentoring a high-potential woman employee who is poised to take on a leadership role in a critical new project involving the implementation of AI-driven solutions for a major banking client. Recent internal data revealed a significant disparity in project leadership roles, with women being underrepresented, particularly in technically demanding projects. Furthermore, the woman employee expressed concerns about potential biases she might face from senior male colleagues who have historically dominated such roles. The situation is further complicated by the aggressive timelines set by the client and the need to quickly build a cohesive and high-performing team. The lack of female representation in leadership roles at CBCS has also led to low morale among junior female employees. Priya aims to equip the employee with the necessary skills and confidence to navigate these challenges effectively and establish herself as a successful project leader. You are Priya Mehra, interacting with the woman employee. The woman employee will ask you questions related to the challenges she faces in taking on a project leadership role, particularly concerning gender biases and team dynamics within CBCS. Your intent is to achieve empowering the woman employee to confidently assume her leadership role and address potential gender-related challenges effectively.`,
    test_code: "QWWP7P1",
    interaction_mode: "any",
  },
  {
    domain: "Diversity",
    title: "Navigating Promotion Gridlock Amidst Shifting Organizational Priorities in a Conglomerate",
    description: `A seasoned manager within a conglomerate's Human Resources department finds herself at a career crossroads. She consistently exceeds performance expectations, demonstrated strong leadership, and successfully spearheaded several critical projects. An informal conversation revealed the potential for upward mobility within the department. However, a recent restructuring initiative, driven by evolving market dynamics and a strategic shift towards technological innovation, has led to a reassessment of roles and responsibilities. The department head, while acknowledging the manager's capabilities, expresses concerns about the timing of the promotion request. The restructuring has placed a temporary freeze on promotions, prioritizing roles aligned with the new strategic direction. Compounding the situation is the perception that the manager's current role, while vital, does not directly contribute to the technological advancement goals. The manager is now seeking clarity on her career path and exploring potential avenues for advancement despite these organizational changes. You are a seasoned HR Manager, interacting with your department head. Your department head will ask you questions. Your intent is to understand the path to promotion and align your skills with the new strategic direction.`,
    test_code: "QKRL2J1",
    interaction_mode: "any",
  }
]


export const SalesAndService: Test[] = [
  {
    domain: "Sales & Service",
    title: "Addressing Customer Dissatisfaction: Escalated Property Purchase Progress Inquiry",
    description: `Priya Sharma, the Customer Service Manager at "Shanti Properties," is facing a challenging situation. A customer, Mr. Rajesh Kumar, who invested in a premium apartment in their new "Green Heights" project located in Gurgaon, is extremely dissatisfied. Mr. Kumar claims that since making the booking amount three months ago, he has received minimal updates on the construction progress. He also alleges that his calls to the sales representative are often unanswered or met with vague responses. He expressed his frustration, citing delays in obtaining loan approvals due to the lack of concrete documentation from Shanti Properties. He threatens to escalate the issue on social media and consumer forums if his concerns aren't addressed immediately. The "Green Heights" project is crucial for Shanti Properties' reputation in the competitive Gurgaon market, and negative publicity could significantly impact future sales. You are Priya Sharma, interacting with Rajesh Kumar. Rajesh Kumar will ask you questions related to the lack of property updates and delays in documentation. Your intent is to achieve customer satisfaction and prevent escalation.`,
    test_code: "QALTOMN",
    interaction_mode: "any",
  },
  {
    domain: "Sales & Service",
    title: "Navigating Term Insurance Hesitancy Amidst Economic Uncertainty and Evolving Client Needs",
    description: `Global Assurance Inc. faces a challenge in converting initial interest in term insurance into concrete sales. Economic instability, coupled with the rise of personalized digital insurance platforms, has increased client hesitancy. Salaried individuals are more cautious about long-term financial commitments and frequently compare options across multiple providers online, seeking the most competitive rates and flexible terms. Data indicates that while initial inquiries about term insurance have risen by 15% in the last quarter, the conversion rate to actual policies has dropped by 8%. This decline is attributed to a perceived lack of personalized advice and a reluctance to engage in traditional sales processes. The company’s sales team needs to adapt their approach to address these modern client concerns, emphasizing value and building trust in a rapidly changing market. You are a Sales Manager, interacting with a Potential Client. The Potential Client will ask you questions related to the insurance options provided by the company. Your intent is to educate and persuade the Potential Client regarding the benefits of term insurance.`,
    test_code: "QVSFB4Q",
    interaction_mode: "any",
  }
]

export const TechManager: Test[] = [
  {
    domain: "Tech Manager",
    title: "Addressing API Integration Failures in the Supply Chain Management System",
    description: `Rajesh Khanna, the Technology Manager at a large Indian conglomerate, is facing a critical issue. The integration of their new Supply Chain Management (SCM) system with existing Enterprise Resource Planning (ERP) and Customer Relationship Management (CRM) systems is riddled with API failures. These failures are causing significant disruptions in order processing, inventory management, and logistics. Specifically, the API connecting the SCM's demand forecasting module to the ERP's inventory database is intermittently failing, leading to inaccurate stock levels and delayed order fulfillment. The team recently migrated to a microservices architecture, and the API gateway seems to be a bottleneck. A recent code deployment, intended to improve the API's performance during peak hours (Diwali season), appears to have exacerbated the problem. Initial monitoring suggests intermittent connectivity issues and inconsistent data formats between the systems. Rajesh is now interacting with one of the senior developers to diagnose the root cause. You are Rajesh Khanna, interacting with one of your senior developer. Your developer will ask you questions related to the integration failures. Your intent is to resolve API failure issues.`,
    test_code: "QGIQLMC",
    interaction_mode: "any",
  },
  {
    domain: "Tech Manager",
    title: "Integration System Failure Post-Merger Disrupts Order Fulfillment Process",
    description: `Following a major merger between two large retail corporations, the integration of their individual order management systems has resulted in a critical failure. The legacy system of the acquired company, responsible for processing a significant portion of online orders, encountered a major incompatibility when interfaced with the parent company’s more modern ERP system. The integration was planned to be seamless, but a previously undetected difference in data structures – specifically, how customer addresses are stored and validated – caused a cascade of errors. Orders are being misrouted, duplicated, or simply disappearing from the system. The support team is receiving a deluge of complaints from customers about delayed or incorrect deliveries. This has caused a severe backlog, impacting fulfillment centers and eroding customer trust. The CIO has called an emergency meeting to address the escalating situation and restore order processing capabilities as soon as possible. The failure is costing the company significant revenue and damaging its reputation. You are the Lead Integration Engineer, interacting with the CIO. The CIO will ask you questions related to the system failure. Your intent is to provide a clear and actionable plan to resolve the issues.`,
    test_code: "QJZGCC4",
    interaction_mode: "any",
  }
]

export const NewManager: Test[] = [
  {
    domain: "New Manager",
    title: "Addressing Project Delays and Unrealistic Deadlines in the Operations Department",
    description: `Rohan Verma, the newly appointed Operations Manager at "Bharat Industries," faces a challenging situation. A critical infrastructure project, aimed at streamlining supply chain logistics, is running significantly behind schedule. Initial timelines, set by the Senior Executive Leader (SEL) before Rohan's arrival, proved overly optimistic. The SEL is now pressuring for immediate results and expressing dissatisfaction with the project's progress. Data indicates that the primary bottlenecks are due to unforeseen regulatory hurdles in land acquisition and delayed equipment delivery from international vendors. Rohan has identified potential mitigation strategies, including renegotiating timelines with the SEL and exploring alternative sourcing options. The SEL's communication style is often perceived as demanding and leaves little room for detailed explanations. A recent meeting ended with the SEL reiterating the original deadline, despite Rohan's presentation outlining the challenges. You are Rohan, interacting with the SEL. The SEL will ask you questions related to project delays and unrealistic deadlines. Your intent is to achieve a realistic timeline and secure the necessary resources to complete the project successfully.`,
    test_code: "QSVEXN1",
    interaction_mode: "any"
  },
  {
    domain: "New Manager",
    title: "Addressing Declining User Engagement in a Mobile Health Application Post-Update",
    description: `A leading digital health company launched a major update to its flagship mobile application, designed to enhance user experience and incorporate new personalized health tracking features. Pre-launch, internal testing indicated a positive user reception. However, post-launch, the application experienced a 25% drop in daily active users (DAU) within the first two weeks. User reviews and social media sentiment analysis reveal that users are finding the new interface confusing and the personalized tracking features intrusive rather than helpful. The development team is under pressure to identify the root causes of this decline and implement corrective measures swiftly to prevent further user attrition. This situation is compounded by the fact that the company invested heavily in marketing the update, and the negative feedback is impacting brand reputation. The executive team views this as a critical issue that needs immediate attention and a data-driven solution. You are a Senior Product Manager, interacting with a Junior Data Analyst. The Data Analyst will ask you questions related to declining user engagement in a mobile health application post-update. Your intent is to restore user engagement and improve the application's user experience.`,
    test_code: "QRVZWON",
    interaction_mode: "any"
  }
]


