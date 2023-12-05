export interface Test {
  domain: string;
  test_code: string;
  title: string;
  description: string;
  interaction_mode: string;
}

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

export const DecisionGames: Test[] = [
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
    test_code: "QOJSU0B",
    title: "Deciding how to deal with challenging financial times as the CFO",
    description:
      "An administrative assistant is increasingly receiving additional tasks outside of their core job responsibilities which is impacting their ability to effectively complete their primary work. Unsure of how to have a constructive conversation with their manager about setting better boundaries and priorities to support a sustainable workload, they are seeking advice on how to address this sensitive issue. Respond to this situation as the administrative assistant.",
    interaction_mode: "Audio",
  },
];
export const oneTwoOne: Test[] = [
  {
    domain: "Reassessing Ambitious Goals",
    test_code: "QD7O1GQ",
    title: "Navigating Manufacturing Challenges",
    description:
      "Sarita, an engineer at a manufacturing company in India, set highly ambitious production goals for herself, with the aim of doubling her output compared to the previous year. However, as she delved into her tasks, she realized that the newly introduced manufacturing process was far more intricate and time-consuming than initially anticipated. This was exacerbated by recent changes in the industry regulations, which added further complexity to the production process. Sarita now finds herself struggling to meet her self-imposed objectives and reaches out to her manager for guidance on managing this situation effectively. Respond to this situation as her manager.",
    interaction_mode: "Audio",
  },
  {
    domain: "Conflict Resolution Discussion",
    test_code: "QG7Y5YA",
    title: "Balancing Production and Quality",
    description:
      "In a manufacturing company in Mumbai, the production supervisor, proposed increasing production targets by 20% to meet a surge in demand for their products following a major trade fair. Karan, the quality control inspector, expressed concerns about this decision, citing a recent analysis of product defects, which showed a 10% increase in defects over the past quarter. The conflict emerged due to the need to balance increased production with maintaining product quality and safety standards. The production supervisor decided to have a direct conversation with Karan to explore a compromise that would address both the production targets and quality concerns. Respond to this situation as the production supervisor.",
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
    test_code: "QQ6V0RH",
    title: "Health Insurance Consultation",
    description:
      "Akshita Singh, a marketing professional, is considering health insurance for herself and her parents. With a history of certain pre-existing conditions in the family, she is navigating the complexities of finding a policy that offers comprehensive coverage while managing premium costs. She has called the company number to gain more information about your insurance package. Your responsibility is to analyze her family's medical history, educate her on policy inclusions and exclusions, and recommend a health insurance plan that strikes the right balance between coverage and affordability. Respond to this situation as an Insurance Sales Rep.",
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
    domain: "HIPO Employee Feedback",
    test_code: "QRO4VYR",

    title: "Construction Supervisor Feedback",
    description:
      "A construction supervisors monthly feedback check in with manager.",
    interaction_mode: "Audio",
  },
  {
    domain: "PIP for a low performing employee",
    test_code: "Q5YC8DA",

    title: "Sales Manager Feedback",
    description: "A sales manager's monthly feedback check in with manager.",
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
    domain: "Mahindra car sales",
    test_code: "Q367PE8",
    title: "एक आशंकित ग्राहक के साथ सौदा करना",
    description:
      "महिंद्रा डीलरशिप में एक अनुभवी कार विक्रेता को एक प्रीमियम सेडान की तलाश करने वाले संभावित ग्राहक श्री कपूर के साथ एक चुनौतीपूर्ण स्थिति का सामना करना पड़ता है। पूरी तरह से शोध करने के बाद, श्री कपूर मौके पर प्रतिबद्ध होने से सावधान रहते हैं और कार की विशेषताओं, कीमत और इसके लिए भुगतान कैसे करें इसके विस्तृत विवरण की मांग करते हैं। विक्रेता को जानकारी प्रदान करने और भारी विवरण से बचने के बीच की बारीक रेखा को पार करना चाहिए, यह सुनिश्चित करते हुए कि श्री कपूर को सुना और समझा जाए। कार को प्रदर्शित करने से लेकर वित्त पर चर्चा करने और सौदे को पूरा करने तक निर्बाध रूप से बदलाव का दबाव है। विक्रेता के रूप में इस स्थिति पर प्रतिक्रिया दें।",
    interaction_mode: "Audio",
  },
];
