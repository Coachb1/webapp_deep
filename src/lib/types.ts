
export interface Book {
  report: string | undefined;
  id: string;
  title: string;
  author: string;
  tag: string[];
  function: string[];
  business_outcome: string[];
  implementation_complexity: string[];
  unexpected_outcomes: string[];
  emerging_players: boolean;
  start_up: boolean;
  keywords: string[];
  desc: string;
  card_button_config?: CardButtonConfig;
  img: string;
  audio: string;
  course_id: string;
  jobaid_id:string;
  course_details: Record<string, any>;
  package_detail: Record<string, any>;
  list_name: string;
  transform_iq?: Record<string, any>;
  userProgress?: Record<string, any>;
  totalLikes?: number;
  sticker?: string;
}
export interface CardButtonConfig {
    description?: {
      show: boolean;
      label: string;
    };
    report?: {
      show: boolean;
      label: string;
    };
    audio_button?: {
      show: boolean;
      label: string;
    };
  }
export interface CoursePackage {
  package_id: string;
  package_name: string;
  package_description: string;
  image_link: string;
  report_config: any;
  jobaid_id: string;
  prompt_job_aid_uid?: string;
  books: Book[];
}


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
export interface LibraryPaageScenariosType {
  page_scenarios: any;
  tab_type_info: any;
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
  domain?: string;
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
  interaction_mode?: string;
  descriptoin_media?: string;
  tab_sticker?: string;
  scenario_case?: string;

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
  send_profile_for_reapproval: boolean;
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
  msg: Message[];
  coach_name: string;
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
    is_private: string;
    user_id: string;
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
  creator_name?: string;
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
  profileType?: string;
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
  userProfileId?: string;
}

export interface CaseItem {
  id: number;
  tab_name: string;
  embed_link: string;
  transform_iq?: string;
  action_name?: string;
  sticker?: string;
  uid?: string;
}

export interface CollectionBlock {
  action_tab_info: DashboardItem;
  iframe_link?: string;
  iframe_title?: string;
  iframe_subtitle?: string;
  id: number;
  collection_name: string;
  case_items: CaseItem[];
  heading?:string;
  sticker?:string;
}

export interface IframeTablePanel {
  iframe_link?: string;
  iframe_title?: string;
  iframe_subtitle?: string;
  enable?: boolean;
}

export interface ActionButton {
  collection_name?: string;
  label: string;
  action?: string;
  heading?: string;
  type?:string;
  iframe_table_panel?: IframeTablePanel[];
}

export interface DashboardItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  buttons: ActionButton[];
  type?: string;
  iframe_config?: {
    show_iframe_panel?: boolean;
    use_default_iframe?: boolean;
  }
}

export interface AnnouncementSection {
  enabled: boolean;
  heading: {
    text: string;
    link: string | null;
    link_text: string | null;
    append_text?: string;
  },
  subheading: {
    text: string;
    link: string | null;
    link_text: string | null;
    append_text?: string;

  }
}

export interface UserInfoType {
  clientId?: string;
  clientLogoUrl?: string;
  allowed_domain?: string;
  clientName: string;
  isDemoUser: boolean;
  isRestricted: boolean;
  clientExpertise: string;
  clientDepartments: string;
  restrictedPages: string | null;
  restrictedFeatures: string | null;
  headings: {
    heading: string | null;
    subHeading: string | null;
    tagLine: string | null;
  } | null;
  helpText: any;
  is_active?: boolean;
  snnipetConfig?: any;
  libraryBotConfig?: any;
  portalPageConfig?: any;
  universalPageConfig?: any;
  collections?: CollectionBlock[] | null;
  owner_email_id?: string;
}

export interface PositionedUserTypes {
  name: string;
  user_id: string;
  total_count: number;
  rating: number;
}

export interface KudosDetailsType {
  bot_name: string;
  owner_name: string;
  positive_feedback_count: number;
  negative_feedback_count: number;
  rating: number;
  user_id: string;
  total_users: number;
}

export interface Result {
  uid: string;
  coach_message_text?: string;
  participant_message_text?: string | null;
  status: string;
  created: string;
  updated?: string;
}

export interface Conversation {
  results: Result[];
  participant_name: string;
  participant_uid: string;
  role: string;
  date: string;
  bot_name?: string; // Add bot_name to the Conversation interface
  bot_type?: string;
  scenario_case?: string;
  bot_id: string;
}

export interface ConvertedResult {
  participant_message: string;
  coach_message: string;
  user_role: string;
  conversation_date: string;
  bot_name?: string; // Add bot_name to the ConvertedResult interface
}

export interface ConvertedConversation {
  participant_name: string;
  conversation: ConvertedResult[];
  role: string;
  date: string;
  bot_name?: string; // Add bot_name to the ConvertedConversation interface
  bot_type?: string;
  participant_uid: string;
  bot_id: string;
}


export interface CompanyIQ {
  id: string; // uid
  company: string;
  industry: string;
  hq: string;
  revenue: number;
  employees: number;
  sticker?: string;

  leadership?: string[];
  initiatives?: string[];
  techStack?: string[];
  useCases?: string[];
  outlook?: string;

  source: "LLM" | "CSV" | "Manual";
  approved: boolean;
  created: string;
}