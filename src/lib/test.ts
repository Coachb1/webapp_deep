export interface Test {
  domain: string;
  test_code: string;
  title: string;
  description: string;
  interaction_mode: string;
}

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
        domain: "Anallytical Mindset",
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
        value: "Anallytical Mindset",
        label: "Anallytical Mindset",
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
    domain: "Anallytical Mindset",
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
      "A proactive team member in an Indian IT firm seeks internal promotion to a project lead role. The HR Manager, Mr. Rao, conducts an interview to assess the candidate's leadership potential. Despite strong technical proficiency, Mr. Rao focuses on evaluating the candidate's leadership style and communication skills, recognizing their significance in the prospective role. The context underscores the critical need for effective stakeholder communication and leadership skills. The interview aims to gauge the candidate's aptitude for managing projects and fostering collaboration in a culturally specific professional environment. Respond to this situation as the team member. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Interview for Managerial Role",
    test_code: "QMP4OXU",
    title: "Team Lead's Managerial Potential Assessment",
    description:
      "A skilled Team Lead expressed interest in a managerial role through the Internal Job Posting (IJP). Aarav, the HR manager, conducted an interview to assess her leadership capabilities. The company, a prominent player in the Indian IT sector, had recently expanded its project portfolio. The need for effective team management and inspiration became crucial to meet heightened client expectations. Aarav aimed to gauge the Team Lead's potential to navigate this growth, ensuring seamless collaboration among team members and fostering a motivational work environment. Respond to this situation as the Team Lead.",
    interaction_mode: "Audio",
  },
];

export const DiversityPlus: Test[] = [
  {
    domain: "Equality in Pay",
    test_code: "QU0BI9G",
    title: "Gender Pay Gap Investigation",
    description:
      "In a prominent corporation, a diligent female employee in a mid-level management position discovers a stark gender pay gap within their organization. Through extensive research and data analysis, they notice that female colleagues in equivalent roles are consistently paid less than their male counterparts. Troubled by this inequity, the female employee decides to voice her concerns by formally submitting a written inquiry to the organization's HR department. So in response the HR manager has lined up a meeting to understand her concerns. In this case act as a manager to answer her questions.",
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
  {
    domain: "Interview Dilemma",
    test_code: "QICGX1I",
    title: "Balancing Skills and Formal Education",
    description:
      "Ananya, a candidate with a mechanical engineering diploma, impresses the interviewers with her hands-on skills in machinery operation, drawing from her experience as a machine operator in a textile factory. However, concerns arise due to her lack of formal education in the field. The job opening, seeking a skilled shop floor worker in a prominent manufacturing unit, requires formal education in mechanical engineering. The industry data indicates a preference for candidates with professional technical qualifications. Additionally, the factory has a notable gender imbalance on the shop floor, with very few female workers. This raises apprehensions about Ananya's seamless integration into the predominantly male workforce, prompting the HR manager to consider potential adaptation challenges for her in this specific work environment. Respond to this situation as the HR manager.",
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
    domain: "Contribute effectively in team settings",
    test_code: "QO3CBR3",
    title: "Handling communication in team meetings as a new employee",
    description:
      "The new business analyst who had joined 3 months ago, was working on a new project. In the daily standup meetings, the manager, Neha noticed he would only speak when asked a direct question. He did not voluntarily provide updates or suggestions, even though he had good ideas that would benefit the project. The team felt that the business analyst's quiet nature was hindering collaboration. After observing this for 2 weeks, Neha decided to have a one-on-one discussion with him to better understand his perspective. Respond to this situation as the business analyst.",
    interaction_mode: "Audio",
  },
  {
    domain: "Work Life Balance Discussion",
    test_code: "Q0HP80X",
    title: "Managing workload and addressing burnout",
    description:
      "Following a recent acquisition, the surge in project load became a prominent issue. Employees faced an increased workload, leading to difficulties in preserving a healthy work-life balance and affecting the quality of project deliverables. The overwhelming situation prompted a team member to seek a discussion with the manager, Amit to address the growing challenges in managing work-related stress and employee burnout. Respond to this situation as the team member.",
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
  {
    domain: "Luxury real estate",
    test_code: "QX1W8IG",
    title: "Handling a High-Profile Client",
    description:
      "A successful entrepreneur, Mr. Jaideep, seeks a residence that seamlessly blends modern luxury with classic charm. His emphasis is on spacious interiors, a well-appointed kitchen, and a private garden for family gatherings. Your task is to showcase properties that meet his criteria, highlighting features that complement his sophisticated taste and desire for a comfortable yet elegant living space. Engage in a conversation that addresses his lifestyle aspirations and guides him towards a property that resonates with his vision. Respond to this situation as the real estate sales agent.",
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
      "A entrepreneur stands before a diverse group of potential investors. She pitches her innovative startup idea for a sustainable, tech-driven solution to reduce food waste. She aims to convey the unique value proposition of her tech-based solution, emphasizing its market relevance, scalability, and revenue potential. The investors, known for their discerning scrutiny, expect a concise yet compelling presentation that addresses key aspects: market research, competitive analysis, monetization strategy, and a clear roadmap. Present the pitch as the entrepreneur in this situation.",
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
    domain: "Coaching Assistant",
    test_code: "QIBY52O",
    title: "Assertive Communication for Workplace ",
    description:
      "A junior manager, in a IT company specializing in e-commerce solutions, faces challenges articulating innovative ideas for a tight-deadline project involving a new payment gateway system. He seeks guidance on assertive communication strategies to facilitate clear articulation of ideas and enhance his contribution to project discussions. After the session, the trainer has given you an exercise to connect with the AI assistant to implement the strategies. Now, the AI assistant, taking the role of the senior manager, Rahul is asking specific questions about the project, encouraging the junior manager to apply assertive communication strategies for clearer expression of ideas and improved collaboration within the team. Respond as the junior manager.",
    interaction_mode: "Audio",
  },
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
  {
    domain: "IT-Business Collaboration",
    test_code: "QQZMF9B",
    title: "Strategizing Retail Insights",
    description:
      "The Retail Manager, Swati met with the IT Dev Lead for optimizing the retail analytics dashboard. Swati highlights the imperative for real-time inventory tracking and customer behavior analytics. The challenge identified is the seamless integration of data from disparate sources such as point-of-sale (POS) systems and e-commerce platforms. The objective is to enhance the dashboard to provide comprehensive insights, crucial for strategic decision-making in a fiercely competitive Indian retail market. Respond to this situation as the IT Dev Lead.",
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
    domain: "Collaborating on resource allocation",
    test_code: "QSKUOD0",
    title: "Resource Allocation Tensions",
    description:
      "There has been an unexpected surge in demand for the company's software services following a major government initiative. This surge has created resource constraints, with multiple projects competing for limited talent and infrastructure. As a result, the company is facing challenges in meeting client deadlines and managing team dynamics. As tensions rise, they must navigate the delicate balance between advocating for their needs and maintaining a cooperative team dynamic. They have a meeting to discuss how to handle this situation in a collaborative manner. These are the opening comments from Vikram, Rahul, Sakshi. Join in the discussion as a team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Strategizing cross functional projects",
    test_code: "Q7E1DGY",
    title: "Navigating cross-project challenges",
    description:
      "Employees from various departments of the company have gathered for an essential meeting. The primary agenda is to address cross-project challenges that have arisen due to overlapping deadlines, resource constraints, and shifting priorities. The objective of this meeting is to foster collaboration and devise strategies to navigate these challenges effectively. These are the opening comments from Anuv(Project Manager), Sahil(Project Supervisor), Sakshi(Project Accountant), Sachin(Project Specialist).  Join in the discussion as a team member.",
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
      "In a boardroom meeting, Raj, the project manager, is tasked with presenting a comprehensive risk assessment for an 80-million-dollar merger with a competitor. He must outline potential financial, legal, and operational risks and mitigation strategies. The board expects a structured walkthrough in under 15 minutes and understand the asks or recommendation. The manager is anxious to make a positive mark as he addresses the room and starts to run with his slides. Please respond to the structured prompts to continue.",
    interaction_mode: "Audio",
  },
  {
    domain: "Project Ending Presentation",
    test_code: "Q48S46Y",
    title: "Presenting a project closing report",
    description:
      "Rahul the Project manager is delivering a comprehensive presentation on a recently completed project. This presentation will focus on the critical phase of project closure, providing an in-depth analysis of project's performance, achievements, challenges, and lessons learned. His goal is to ensure that all stakeholders have a clear understanding of the project's outcomes to conclude it successfully.",
    interaction_mode: "Audio",
  },
];

export const caseStudy: Test[] = [
  {
    domain: "Strategic Decisions",
    test_code: "QWGW7N3",
    title: "Marketing Optimism vs. Fiscal Prudence Clash",
    description:
      "A technology firm aiming to launch a groundbreaking product, the leadership team grapples with divergent perspectives on the viability of their market strategy. The Chief Marketing Officer, relying on optimistic customer feedback, champions an aggressive approach. Simultaneously, the Chief Financial Officer, scrutinizing financial projections, advocates for a more conservative stance. The team faces a critical decision point: whether to invest heavily in marketing and innovation or adopt a restrained fiscal strategy. The challenge arises from the team's predisposition to favor information confirming their preconceptions, leading to potential conflict and suboptimal decisions. Reflect on the situation and answer the questions as the Chief Marketing Officer based on the article you just read. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Leadership initiatives",
    test_code: "QE4334M",
    title: "Balancing Creativity and Accountability in Office Dynamics",
    description:
      "In a dynamic marketing agency, the team is facing a productivity challenge. Traditional management practices, emphasizing strict office hours, clash with the team's diverse work styles and the nature of creative tasks. Despite having a highly skilled and motivated team, morale is plummeting due to a rigid adherence to a 9 to 5 schedule. The disconnect between management's expectations and the team's need for flexibility is hindering creativity and collaboration. The manager, caught in the tension between traditional management practices and the team's desire for autonomy, must find a way to foster a more conducive work environment without compromising productivity and accountability. Reflect on the situation and answer the questions as the manager based on the ted talk you just watched.",
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
      "Meena, a customer at a clothing store in Bangalore, approaches the cashier with a pair of jeans she wishes to purchase. However, upon reaching the counter, she notices a small tear in the fabric. She expresses her concern to the cashier, explaining that she had selected the jeans for a special occasion. The cashier listens attentively, assuring Meena that they will promptly exchange the damaged item for a new one. The cashier apologizes for the inconvenience and ensures Meena that her satisfaction is a top priority for the store. Respond to this situation as the cashier. Demonstrate suitable English communication skills as you respond to this business context.",
    interaction_mode: "Audio",
  },
];
export const questionPro: Test[] = [
  {
    domain: "Navigating Operational Challenges",
    test_code: "QO0WRWA",
    title: "Assessing Impact of Cost-Cutting Measures in Manufacturing",
    description:
      "Diya, the operations executive, is dealing with a mandate to cut costs in a manufacturing company. The company recently faced a substantial increase in raw material prices due to global supply chain disruptions. To offset these rising costs, Diya implemented a cost-cutting strategy affecting various departments, including procurement, maintenance, and manpower. The ground-level teams are now experiencing challenges, particularly in meeting production targets due to delayed procurement processes and reduced maintenance schedules. The team lead wants to understand how these strategic decisions are translating into operational hurdles, impacting workforce efficiency and day-to-day functions on the shop floor. Respond as the team lead and ask questions to understand the situation.",
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
