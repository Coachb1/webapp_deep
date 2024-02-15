interface Recommendation {
  title: string;
  test_code: string;
  description: string;
}

interface DynamicRecommendation extends Recommendation {
  dynamic: {
    title: string;
    test_code: string;
    description: string;
  };
}

interface SimulationRecommendation extends Recommendation {
  simulation: {
    title: string;
    test_code: string;
    description: string;
  };
}

interface RecommendedScenarios {
  [key: string]: DynamicRecommendation | SimulationRecommendation;
}

export interface UserIDPsType {
  id: number;
  created: string;
  updated: string;
  deleted: number;
  uid: string;
  tenant_id: string;
  user_id: string;
  user_name: null | string;
  strengths: string;
  weakness: string;
  opportunities: string;
  threats: string;
  key_focus_areas: string;
  goals: string;
  priorities: string;
  learning_histories: string;
  key_skills: string;
  skill_gap_for_development: string;
  leadership_skill_focus_area: string;
  book_recommendations: string;
  course_recommendations: string;
  recommended_hbr: string;
  recommended_ted_talk: string;
  recommended_scenarios: RecommendedScenarios;
  report: string;
}

export interface TestsType {
  title: string;
  description: string;
  test_code: string;
  test_type?: string;
}

export interface competencySkillsTestType {
  skill: string;
  tests: TestsType[];
}

export interface TestsType {
  title: string;
  description: string;
  test_code: string;
  test_type?: string;
}

export interface newManagerTestsType {
  domain: string;
  tests: TestsType[];
}

export interface connectionType {
  id: number;
  created: string;
  updated: string;
  deleted: number;
  uid: string;
  tenant_id: string;
  coach_id: string;
  coachee_id: string;
  mentor_id: null | string;
  mentee_id: null | string;
  connection_type: null | string;
  status: string;
  is_approved: boolean;
  is_rejected: boolean;
  is_blocked: boolean;
  is_deleted: boolean;
  is_removed: boolean;
  coach_name: string;
  coachee_name: string;
  coach_user_id: string;
  coachee_user_id: string;
  coach_avatar_bot_id: string;
}
