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
    test_code: "QLW2EVP",
    title: "AWS Migration Strategy for Scalability",
    description:
      "This is the last day of your AWS training. To complete the training complete this real life customer interaction. Mr. Arjun Sharma, an experienced IT professional at a leading Indian e-commerce firm, faces challenges with the current infrastructure's scalability. The company's user base has grown significantly, causing performance issues and escalating infrastructure costs. Arjun seeks to migrate to AWS to address these issues, leveraging its scalable and cost-effective solutions to optimize the e-commerce platform's performance. Respond to this situation and guide Mr. Sharma through the process of implementing AWS into the existing system to enhance scalability and overall performance. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Team buiding & Leadership",
    test_code: "QLW2EVP",
    title: "Teams using Agile Strategies ",
    description:
      "After returning from the team-building training, an operations manager receives a challenging exercise from her trainer. She must dismantle the current production team, plagued by communication gaps and delays, and build a new team for an upcoming high-stakes product launch. The textile industry demands precision, and she needs to implement agile methodologies learned during training to improve efficiency. She's meeting with the Department Head, Harish to strategize this overhaul. Respond as the operations manager in this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Edtech sales",
    test_code: "QLW2EVP",
    title: "Pitching a Computer Science Course ",
    description:
      "After returning from the team-building training, an operations manager receives a challenging exercise from her trainer. She must dismantle the current production team, plagued by communication gaps and delays, and build a new team for an upcoming high-stakes product launch. The textile industry demands precision, and she needs to implement agile methodologies learned during training to improve efficiency. She's meeting with the Department Head, Harish to strategize this overhaul. Respond as the operations manager in this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Coaching Assistant",
    test_code: "QLW2EVP",
    title: "Assertive Communication for Workplace ",
    description:
      "A junior manager, in a IT company specializing in e-commerce solutions, faces challenges articulating innovative ideas for a tight-deadline project involving a new payment gateway system. He seeks guidance on assertive communication strategies to facilitate clear articulation of ideas and enhance his contribution to project discussions. After the session, the trainer has given you an exercise to connect with the AI assistant to implement the strategies. Now, the AI assistant, taking the role of the senior manager, Rahul is asking specific questions about the project,  encouraging the junior manager to apply assertive communication strategies for clearer expression of ideas and improved collaboration within the team. Respond as the junior manager.",
    interaction_mode: "Audio",
  },
  {
    domain: "Hotel customer service",
    test_code: "QLW2EVP",
    title: "Crisis Resolution in Hotel Management",
    description:
      "At the last day of your orientation as a Hotel Receptionist. As the last task complete this real life customer interaction where a guest is angry at a mistake the staff made. This is the situation. Mr. Rajiv Verma, a corporate guest hosting a crucial business meeting at the hotel's conference hall, discovers that the meeting room reservation has been miscalculated, leading to an overlapping schedule with another event. Rajiv expresses his displeasure, emphasizing the importance of the meeting's agenda and the inconvenience caused to his guests. Your role is to resolve this issue swiftly, ensuring minimal disruption to Mr. Verma's business plans while maintaining the hotel's professional image. Respond as the Hotel Receptionist to this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Luxury real estate ",
    test_code: "QLW2EVP",
    title: "Handling a High-Profile Client",
    description:
      "At the end of your workshop for Luxury Real Estate selling techniques, your trainer has given you an exercise to complete this real life customer interaction simulation. Ms. Priya Deshmukh, a renowned actress, is in search of an exclusive retreat in for private getaways. She prioritizes privacy, a stunning beachfront location, and state-of-the-art security. Your role involves understanding the unique needs of a high-profile client, ensuring confidentiality, and securing a deal that aligns with her lifestyle and preferences. Respond to this situation as the real estate sales agent.",
    interaction_mode: "Audio",
  },
  {
    domain: "Air Hostess Training",
    test_code: "QLW2EVP",
    title: "Real-Life Customer Resolutions",
    description:
      "On the last day of your training as the Air hostess for a renowned airline. To complete the training you need to complete this real life customer interaction simulation. Mr. Rajat Singh, a high-profile passenger, has a strict vegan diet due to health reasons. Unfortunately, there is an oversight, and the available in-flight meal does not align with his dietary requirements. Balancing the need for a quick resolution and maintaining the airline's service standards, your challenge is to find a suitable alternative or make necessary arrangements to accommodate Mr. Singh's dietary restrictions. Respond to this situation as the Air hostess. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Bank branch situation",
    test_code: "QLW2EVP",
    title: "Addressing a delay in service",
    description:
      "This is the last day of your orientation training as a bank employee. As the last task complete this real life customer interaction simulation. Mr. Rohit Sharma, a dedicated customer of the bank for the past 15 years, encounters a delay in opening a new account due to a discrepancy in his address proof. The challenge lies in maintaining Mr. Sharma's confidence, given his long-standing relationship with the bank, while adhering to the stringent industry norms. As the employee, you are tasked with striking a balance between ensuring compliance and providing reassurance to Mr. Sharma, who expresses valid concerns about the extended procedural timelines. Respond as the bank employee to this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Provding Feedback ",
    test_code: "QLW2EVP",
    title: "Guiding an Employee as a New Manager",
    description:
      "A seasoned automotive professional with 7+ years of experience, has recently assumed a managerial role. In her first check-in with Riya, the project lead for a vehicle redesign initiative, she grapples with a production delay owing to a manufacturing flaw discovered in the initial prototypes. The project further faces a setback as a recent supply chain disruption, impedes the timely delivery of critical components. The new manager must provide feedback to Riya on finding swift resolution strategies, communicate efficiently with suppliers and recalibration of production timelines to mitigate project risks. Respond to this situation as the manager. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Healthcare counselling",
    test_code: "QLW2EVP",
    title: "Diabetic Patient Preoperative Counseling",
    description:
      "This is the last day of your orientation as a Nurse. As the last task complete this real life patient interaction. Mrs. Anvita Kapoor, a 65-year-old diabetic patient, has been admitted for a hip replacement surgery. During your orientation, you learned that she is apprehensive about postoperative care due to her diabetes. You are tasked with providing reassurance and educating her on maintaining stable blood sugar levels to facilitate a smooth recovery. Respond to this situation as the nurse. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Production units communication",
    test_code: "QLW2EVP",
    title: "Addressing Defective Products",
    description:
      "Ms. Nandini Kapoor, the quality control manager, identifies a batch of defective products during routine inspections. She raises concerns about potential production flaws that could harm the factory's reputation. The production floor manager, needs to collaborate with Nandini to isolate and rectify the root cause while maintaining production efficiency. Respond to this situation as the production floor manager. ",
    interaction_mode: "Audio",
  },
  {
    domain: "Healthcare sales",
    test_code: "QLW2EVP",
    title: "Tailored Health Package Solution ",
    description:
      "This is the last day of your orientation training as a health package sales rep. To complete the orientation you need to complete this exercise of a real life customer interaction simulation. Sajeev, a young entrepreneur in the fitness industry, is seeking a health package solution for his startup's employees. With a workforce focused on physical well-being, Sajeev is interested in a package that includes coverage for sports injuries, specialized health programs, and preventive health check-ups. Your role as a Sales Rep is to showcase how your company's health package can cater to the unique needs of Sajeev's fitness-oriented team. Respond to this situation as the Sales Rep.  ",
    interaction_mode: "Audio",
  },
  {
    domain: "Insurance Consultantation",
    test_code: "QLW2EVP",
    title: "Health Insurance Consultation",
    description:
      "Akshita Singh, a marketing professional, is considering health insurance for herself and her parents. With a history of certain pre-existing conditions in the family, she is navigating the complexities of finding a policy that offers comprehensive coverage while managing premium costs. She has called the company number to gain more information about your insurance package. Your responsibility is to analyze her family's medical history, educate her on policy inclusions and exclusions, and recommend a health insurance plan that strikes the right balance between coverage and affordability. Respond to this situation as an Insurance Sales Rep. ",
    interaction_mode: "Audio",
  },
  {
    domain: "IT-Business Collaboration",
    test_code: "QLW2EVP",
    title: "Strategizing Retail Insights",
    description:
      "The Retail Manager, Swati met with the IT Dev Lead for optimizing the retail analytics dashboard. Swati highlights the imperative for real-time inventory tracking and customer behavior analytics. The challenge identified is the seamless integration of data from disparate sources such as point-of-sale (POS) systems and e-commerce platforms. The objective is to enhance the dashboard to provide comprehensive insights, crucial for strategic decision-making in a fiercely competitive Indian retail market. Respond to this situation as the IT Dev Lead. ",
    interaction_mode: "Audio",
  },
];

export const EQTests: Test[] = [
  {
    domain: "Self-Awareness",
    test_code: "QLW2EVP",
    title: "Navigating uncertainty in a new role",
    description:
      "A recent joinee in tech industry, was excited to start his new role. However, within days of joining, a corporate restructuring led to changes in his responsibilities and team composition. This unexpected turn of events introduced complexity and apprehension. The following questions by the manager, Ajay aim to gauge the team member's ability to handle uncertainty and adapt to change. Respond as a team member to this situation.",
    interaction_mode: "Audio",
  },
  {
    domain: "Self-Regulation",
    test_code: "QLW2EVP",
    title: "Prioritizing Tasks in Time-Critical Situations",
    description:
      "The time crunch situation with competing priorities is quite common in a workplace. As an entry-level team member, one has to make a judgment call to determine which task deserves immediate attention. The questions below aim to assess the thought process behind the decision making in such a scenario.  Respond to this situation as the team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Motivation",
    test_code: "QLW2EVP",
    title: "Driving Team Engagement for an Initiative",
    description:
      "Nisha trying to involve her disinterested team in a process improvement initiative. The team is reluctant to adopt a new project management methodology due to their familiarity with the existing process and concerns about potential disruptions. The new initiative aims to streamline project workflows and improve efficiency. Respond to this situation as the team member, Nisha.",
    interaction_mode: "Audio",
  },
  {
    domain: "Empathy",
    test_code: "QLW2EVP",
    title: "Supporting a Struggling Colleague",
    description:
      "Harsha and Franklin, postgraduates from the same B-School, share a close friendship at Hy-tech technology solutions. Harsha, a team member counselor, enjoys recognition due to daily interactions, while Franklin, a finance executive, feels unrecognized. His resignation prompts Mr. Mehta to address the situation. Mr. Mehta highlights Franklin's expertise through emails, cross-departmental projects, and discussions. Team-building activities and an inclusive environment are promoted. Harsha supports Franklin by involving him, sharing skills, and maintaining their friendship. These efforts ensure Franklin's value and strengthen their workplace dynamics. The questions evaluate the team member's learning from this case lesson. Respond to this context appropriately.",
    interaction_mode: "Audio",
  },
  {
    domain: "Social Awareness ",
    test_code: "QLW2EVP",
    title: "Supplier Selection Dilemma",
    description:
      "The team member has to make a tricky choice between two suppliers for procurement of office equipment. One offers cheaper pricing but the other provides eco-friendly options at a higher cost. He has to evaluate various factors like cost-effectiveness, environmental sustainability, product quality, and service. This decision requires careful consideration of the pros and cons of both options and how they align with the company's priorities. Respond to this situation as the team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Cooperation",
    test_code: "QLW2EVP",
    title: "Managing Disagreements in cross-functional team dynamics",
    description:
      "Team dynamics can be challenging to navigate, especially when opinions differ. This scenario explores how to handle disagreements and advocate for one's ideas without damaging team cohesion. A team member of a cross-functional teamis very innovative, but his ideas often clash with those of his team members. He faces the decision of adapting his approach to fit in or advocating for his ideas while maintaining a collaborative atmosphere.  Respond to this situation as the team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Influence",
    test_code: "QLW2EVP",
    title: "Feedback for Coworker Who Interrupts Frequently",
    description:
      "Distractions and interruptions are an unavoidable part of any workplace. However, interrupting coworkers during discussions can damage teamwork and effectiveness. Here is a context to help evaluate and provide feedback to a team member who frequently interrupts coworkers. Respond to this situation as the team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Anallytical Mindset",
    test_code: "QLW2EVP",
    title: "Double-Booking Crisis Management",
    description:
      "Unforeseen challenges frequently require creative problem-solving. When a junior project coordinator double-books an important meeting room, quick thinking and collaboration are critical to resolve the issue.  A junior project coordinator accidentally double-books a meeting room for two important client presentations at the same time.  Respond to this situation as the junior project coordinator.",
    interaction_mode: "Audio",
  },
  {
    domain: "Needs and Wants",
    test_code: "QLW2EVP",
    title: "Discussing Career Growth Aspirations with Manager",
    description:
      "A team member wishes to have an open and understanding conversation with his manager regarding his aspirations for career growth but fears coming across as dissatisfied in his current role. He schedules a meeting with his manager. The objective of the meeting is to discuss his long-term career goals, skill development, professional support, current role satisfaction, and suggestions for enhancing career growth opportunities and transparency within the team. Respond to the questions asked by the manager as a team member.",
    interaction_mode: "Audio",
  },
  {
    domain: "Curiosity",
    test_code: "QLW2EVP",
    title: "Mentorship for Enhancing Cross-functional Harmony",
    description:
      "Vishal, a new product manager, is seeking a mentor to help improve collaboration with his engineering team. The conversation aims to assess Vishal's approach to learning, communication, and relationship building. By reflecting on these areas, Vishal can gain insights into strengthening cross-functional partnerships. Respond to this situation as the product manager, Vishal.",
    interaction_mode: "Audio",
  },
];
