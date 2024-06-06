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
  is_recommended: boolean;
  is_assigned?: boolean;
  assigned_by?: string;
  assigned_to?: string;
  creator_user_id?: string;
}

export interface competencySkillsTestType {
  skill: string;
  tests: TestsType[];
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
  allow_coachee_to_create_session: boolean;
}

export interface TestData {
  title: string;
  description: string;
  test_code: string;
  test_type: string;
  is_recommended: boolean;
  is_micro?: boolean;
}

export interface DomainData {
  domain: string;
  tests: TestData[];
}

export interface CategoryData {
  category_name: string;
  tests_data: DomainData[];
  domainOptionsForFilter?: { value: string; label: string }[];
}

export type Categories = CategoryData[];

export interface UserClientInfoType {
  client_name: string;
  avatar_bot_creation: boolean;
  feedback_bot_creation: boolean;
  subject_matter_bot_creation: boolean;
  monthly_conversation_limit: number;
  required_form_details: null | any; // You might want to replace 'any' with a more specific type
  is_restricted: boolean;
  is_demo_user: boolean;
  accessed_bot_ids: null | any[]; // You might want to replace 'any' with a more specific type
  coach_skills: null | any; // You might want to replace 'any' with a more specific type
  coach_expertise: null | any; // You might want to replace 'any' with a more specific type
  departments: null | any; // You might want to replace 'any' with a more specific type
}

export interface UserClientInfoDataType {
  user_info: UserClientInfoType[];
}

type Message = {
  question: string;
  answer: string;
};

export interface FeedbackConversationType {
  participant_name: string;
  date: string;
  msg: Message;
}

export interface SkillnRoleBotsType {
  bot_id: string;
  bot_name: string;
  bot_type: string;
  description: string;
  scenario_case: string;
}

export interface knowledgeBotJson {
  signature_bot: {
    bot_id: string;
    faqs: string;
    bot_type: string;
    bot_scenario_case: string;
    creator_name: string;
    is_approved: boolean;
  };
  bot_attributes: {
    bot_name: string;
  };
}

export interface knowledgeBotType {
  bot_id: string;
  bot_name: string;
  description: string;
  bot_type: string;
  scenario_case: string;
}

export interface BotDetailsType {
  signature_bot: {
    id: number;
    created: string;
    updated: string;
    deleted: number;
    uid: string;
    tenant_id: string;
    bot_id: string;
    bot_type: string;
    bot_details: {
      coach_name: string;
      is_login_required: boolean;
      is_strict_login_required: boolean;
    };
    recommended_codes: any; // Update type if it's known
    user_id: string;
    tag: any; // Update type if it's known
    attributes: {
      heading: string;
      feedback_questions: {
        "1": string;
        "2": string;
        "3": string;
        "4": string;
      };
    };
    data: {
      coach_data: any; // Update type if it's known
      media_data: Record<string, any>; // Update type if it's known
      additional_data: {
        current_projects: string;
        short_profile_bio: string;
        suggested_projects: string;
      };
    };
    custom_prompt: any; // Update type if it's known
    faqs: any; // Update type if it's known
    is_fitment_analysis: boolean;
    is_strict_fitment: boolean;
    is_approved: boolean;
    is_active: boolean;
    is_system_bot: boolean;
    is_sample_bot: boolean;
    use_google_context: boolean;
    use_personality_context: boolean;
    use_idp: boolean;
    bot_scenario_case: string;
  };
  bot_attributes: {
    id: number;
    created: string;
    updated: string;
    deleted: number;
    uid: string;
    tenant_id: string;
    bot_id: string;
    bot_name: string;
    coach_name: string;
    coach_email: string;
    attached_data: any; // Update type if it's known
    attached_links: any; // Update type if it's known
    client_name: any; // Update type if it's known
    conversations_per_month: any; // Update type if it's known
    fitment_answers: any; // Update type if it's known
    fitment_data: any; // Update type if it's known
    feedback_questions: {
      "1": string;
      "2": string;
      "3": string;
      "4": string;
    };
    attached_faqs_context: any; // Update type if it's known
    attached_files: any; // Update type if it's known
    initial_qnas: any; // Update type if it's known
    is_audio_response: boolean;
    about: any; // Update type if it's known
    admirer_ids: any; // Update type if it's known
    ui_information: any; // Update type if it's known
  };
}

export interface ClientUserType {
  userEmail: string;
  userName: string;
  userId: string;
}

export interface ClientUserTeamType {
  userEmail: string;
  userName: string;
  userId: string;
  profileType: string;
}

export interface ClientDataType {
  clientName: string;
  clientId: string;
  Users: ClientUserType[];
  allowAudioInteractions?: boolean;
}

export interface ExtractedData {
  [source: string]: { [fileName: string]: string };
}
export interface ExtractedDataCochee {
  [fileName: string]: string;
}

export interface MediaItem {
  fileName: string;
  fileContent: string;
  isDeleted: boolean;
}

export interface MediaData {
  extracted_from_article: MediaItem[];
  extracted_from_pdf: MediaItem[];
  extracted_from_youtube: MediaItem[];
}

export interface OptionalMediaData {
  extracted_from_optional_file: MediaItem[];
}

export interface AllUserDataType {
  userEmail: string;
  userClientId: string;
  isDemoUser: boolean;
  userId: string;
  userRole: string;
  userDeniedAccesses: string;
}
