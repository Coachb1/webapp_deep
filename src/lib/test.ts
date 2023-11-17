export interface Test {
  test_code: string;
  title: string;
  description: string;
  interaction_mode: string;
}

export const Audiotests: Test[] = [
  {
    test_code: "QWLHI90",
    title: "Learn new skills",
    description:
      "A junior developer at a software development firm in Bangalore, is keen to acquire expertise in Python, an unfamiliar programming language for the company's upcoming project. His initial progress is slower than expected, with him facing challenges in grasping the language's syntax and frameworks. His manager, Priya, schedules a one-on-one meeting to assess his learning journey and application of Python to real development tasks. Respond to this situation as the junior developer.",
    interaction_mode: "Audio",
  },
  {
    test_code: "QU7G2X3",
    title: "Project proposal",
    description:
      "A recent recruit in a software development firm, delivered his project proposal to his manager, Rahul. He presented a shift to a relatively new technology stack, which, although potentially more efficient, lacked prior data to substantiate its success. Furthermore, the proposed project timeline seemed ambitious, raising concerns about its feasibility in light of past project data and resource availability. Respond to this situation as the new recruit.",
    interaction_mode: "Audio",
  },
  {
    test_code: "QPN48NO",
    title: "Performance Review",
    description:
      "A recent engineering graduate, joined an IT firm as a software developer. His first performance review takes place after six months, where he is evaluated based on his project contributions and coding efficiency. The manager, Rajat, discusses his progress and suggests areas for improvement to meet industry standards. Respond as the software developer.",
    interaction_mode: "Audio",
  },
];

export const TextTests: Test[] = [
  {
    test_code: "QBEWUOM",
    title: "Take initiative",
    description:
      "A new software engineer at a tech startup, wants to contribute to the company's initiative to improve product performance. He discovers that the software codebase lacks proper documentation, which hinders the team's productivity. He discusses this with his manager, Anika, and proposes a plan to create comprehensive documentation, which will help streamline development and reduce errors. Anika engages in a detailed discussion with him to better understand the issue before considering the proposal for the team. Respond to this situation as the software engineer.",
    interaction_mode: "Text",
  },
  {
    test_code: "QJ3RTFF",
    title: "Tough decision",
    description:
      "A new junior engineer working on a residential construction project, recently discovered that one of the project's key subcontractors had failed to comply with safety and quality regulations, leading to structural deficiencies in the building. She seeks guidance from her manager, Neha on how to address the situation and make a decision regarding the subcontractor's future involvement. Neha wants to understand the situation completely before she makes a decision. Respond to this situation as the junior engineer",
    interaction_mode: "Text",
  },
  {
    test_code: "QLW2EVP",
    title: "Project timeline",
    description:
      "Raj, a manager in a Mumbai-based company, noticed that a new joiner, consistently arrived on time during his first month. However, as the monsoon season hit, his commute time significantly increased due to waterlogged roads and public transport disruptions. This led to a gradual decline in his punctuality, with the employee frequently arriving late to the office. Raj, concerned about the impact on project timelines, decided to address this issue with him. Respond to this situation as the employee.",
    interaction_mode: "Text",
  },
];
