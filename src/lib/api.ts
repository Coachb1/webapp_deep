import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import {
  ParticipantsforLeaderBoardTypes,
  baseURL,
  basicAuth,
  calculateTotalActionPoints,
  configureTestsData,
  convertJsonToExpectedFormat,
  convertTestsData,
  emptyData,
  findCoachUID,
  findCoacheeUID,
  getUserAccount,
  getUsersForClientForTeam,
  parseStringList,
  sortByDateDescending,
} from "./utils";
import { CoachesDataType } from "@/app/Coaches";
import {
  CategoryData,
  ClientUserType,
  ConvertedConversation,
  FeedbackConversationType,
  KudosDetailsType,
  PositionedUserTypes,
  TestsType,
  UserInfoType,
  knowledgeBotJson,
  Book,
  CoursePackage,
  CompanyIQ
} from "./types";

export const getClientUserInfo = async (
  userEmail: string | null | undefined,
  user: KindeUser | null
): Promise<UserInfoType> => {
  if (userEmail !== null && userEmail !== undefined) {
    let attempt = 0;
    const maxRetries = 1;

    while (attempt <= maxRetries) {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Authorization", basicAuth);
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({ email: userEmail });

        const createOrAssignResponse = await fetch(
          `${baseURL}/accounts/create-or-assign-client-id/`,
          {
            method: "POST",
            headers: myHeaders,
            body: raw,
          }
        );

        if (createOrAssignResponse.ok) {
          console.log(
            "create-or-assign-client-id",
            await createOrAssignResponse.json()
          );

          const clientInfoResponse = await fetch(
            `${baseURL}/accounts/get-client-information/?for=user_info&email=${userEmail}`,
            {
              method: "GET",
              headers: {
                Authorization: basicAuth,
              },
            }
          );

          if (clientInfoResponse.ok) {
            const data = await clientInfoResponse.json();
            console.info("getClientUserInfo", data.data.user_info[0]);
            return {
              clientId: data.data.user_info[0].client_id,
              clientName: data.data.user_info[0].client_name,
              isDemoUser: data.data.user_info[0].is_demo_user,
              isRestricted: data.data.user_info[0].is_restricted,
              clientExpertise: parseStringList(
                data.data.user_info[0].coach_expertise
              ),
              clientDepartments: parseStringList(
                data.data.user_info[0].departments
              ),
              restrictedPages: data.data.user_info[0].restricted_pages,
              restrictedFeatures: data.data.user_info[0].restricted_features,
              headings: {
                heading: data.data.user_info[0].heading,
                subHeading: data.data.user_info[0].sub_heading,
                tagLine: data.data.user_info[0].tag_line,
              },
              helpText: data.data.user_info[0].help_text,
              is_active: data.data.user_info[0].is_active,
              snnipetConfig: data.data.user_info[0].universal_bot_config,
              libraryBotConfig: data.data.user_info[0].library_bot_config,
              portalPageConfig: data.data.user_info[0].portal_page_config,
              universalPageConfig: {
                "protected": data.data.user_info[0].leaderboard_report_protected,
                "password": data.data.user_info[0].leaderboard_report_password
              },
              collections: data.data.user_info[0].collections,
              owner_email_id: data.data.user_info[0].owner_id,
              clientLogoUrl: data.data.user_info[0].client_logo,
            };
          } else {
            throw new Error("Failed to fetch client information");
          }
        } else {
          throw new Error("Failed to run CreateOrAssignClientId");
        }
      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        if (attempt >= maxRetries) {
          return emptyData;
        }
      }
      attempt++;
    }
    console.error(`All attempts failed.`);
    return emptyData;
  } else {
    return emptyData;
  }
};

export const getClientbyClientId = async (
  clientID: string | null | undefined,
  no_cache_controle: boolean = false
): Promise<UserInfoType> => {
  if (clientID !== null && clientID !== undefined) {
    let attempt = 0;
    const maxRetries = 1;

    while (attempt <= maxRetries) {
      try {
        let headers: { Authorization: string , 'Cache-Control'?: string} = {
              Authorization: basicAuth,
            }
        if (no_cache_controle) {
          headers = {
              Authorization: basicAuth,
              'Cache-Control': 'no-cache, no-store, must-revalidate',
            }
        }
        const clientInfoResponse = await fetch(
          `${baseURL}/accounts/get-client-information/?for=only_client_data&client_id=${clientID}`,
          {
            method: "GET",
            cache: 'no-store',
            headers: headers,
          }
        );

        if (clientInfoResponse.ok) {
          const data = await clientInfoResponse.json();
          console.info("getClientbyClientId", data);
          return {
            clientId: data.data.only_client_data.uid,
            clientName: data.data.only_client_data.client_name,
            allowed_domain: data.data.only_client_data.domain_name,
            isDemoUser: data.data.only_client_data.demo_ids,
            isRestricted: data.data.only_client_data.restricted_ids,
            clientExpertise: parseStringList(
              data.data.only_client_data.coach_expertise
            ),
            clientDepartments: parseStringList(
              data.data.only_client_data.departments
            ),
            restrictedPages: data.data.only_client_data.restricted_pages,
            restrictedFeatures: data.data.only_client_data.restricted_features,
            headings: {
              heading: data.data.only_client_data.heading,
              subHeading: data.data.only_client_data.sub_heading,
              tagLine: data.data.only_client_data.tag_line,
            },
            helpText: data.data.only_client_data.help_text,
            is_active: data.data.only_client_data.is_active,
            snnipetConfig: data.data.only_client_data.bot_config,
            libraryBotConfig: data.data.only_client_data.library_bot_config,
            portalPageConfig: data.data.only_client_data.portal_page_config,
            universalPageConfig: {
              "protected": data.data.only_client_data.leaderboard_report_protected,
              "password": data.data.only_client_data.leaderboard_report_password
            },
            collections: data.data.only_client_data.collection_name,
            owner_email_id: data.data.only_client_data.owner_id,
            clientLogoUrl: data.data.only_client_data.client_logo,
          };
        } else {
          throw new Error("Failed to fetch client information");
        }

      } catch (error) {
        console.error(`Attempt ${attempt + 1} failed:`, error);
        if (attempt >= maxRetries) {
          return emptyData;
        }
      }
      attempt++;
    }
    console.error(`All attempts failed.`);
    return emptyData;
  } else {
    return emptyData;
  }
};


export const getDirectoryProfiles = async (
  userEmail: string | null | undefined,
  recommendationProfileIDs: string[] | null
) => {
  try{
  const response = await fetch(
    `${baseURL}/accounts/get-directory-informations/?email=${userEmail}`,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );
  console.log(response);
  if (response.ok) {
    let responseData = await response.json();
    console.log("RESPONSE DATA :", responseData);
    console.log("recommendationProfileIDs", recommendationProfileIDs);

    let updatedResponseData: CoachesDataType[] = [];

    recommendationProfileIDs?.forEach((rec) => {
      const reccCoach = responseData.find(
        (coach: CoachesDataType) => coach.profile_id === rec
      );
      if (reccCoach) {
        updatedResponseData.push(reccCoach);
      }
    });

    responseData.forEach((coach: CoachesDataType) => {
      if (!updatedResponseData.includes(coach)) {
        updatedResponseData.push(coach);
      }
    });

    updatedResponseData = updatedResponseData.map(
      (coachData: CoachesDataType) => {
        if (
          recommendationProfileIDs &&
          recommendationProfileIDs.includes(coachData.profile_id)
        ) {
          return { ...coachData, is_recommended: true };
        } else {
          return coachData;
        }
      }
    );

    return updatedResponseData;
  } else {
    console.log("Error fetching Directory info : ", response.statusText);
    return [];
  }
} catch (error) {
  console.error("Error fetching directory profiles:", error);
  return [];
}
};

export const getUserJoiningPreviledges = async (
  userEmail: string | null | undefined
) => {
  if (userEmail) {
    try{

      const response = await fetch(
        `${baseURL}/accounts/user-can-join-as/?email=${userEmail}`,
        {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        }
      );
      return response.json();
    } catch (error) {
      console.error("Error fetching user joining privileges:", error);
      return null;
    }

  }
};

export const getBots = async (userId: string) => {
  const response = await fetch(
    `${baseURL}/accounts/get-bots/?user_id=${userId}&approved_only=false`,
    {
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  if (response.ok) {
    const responseData = await response.json();
    console.log("responseData", responseData);
    return responseData;
  } else {
    return [];
  }
};

export const getUserConnections = async (userId: string) => {
  const profileResponse = await fetch(
    `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/?user_id=${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  const userProfiles = await profileResponse.json();
  const isApprovedData = userProfiles.data?.filter(
    (coachData: any) => coachData.is_approved === true
  );

  let connections = [];

  if (findCoacheeUID(isApprovedData).length > 0) {
    const connectionResponse = await fetch(
      `${baseURL}/accounts/coach-coachee-connections/?coachee_id=${findCoacheeUID(
        isApprovedData
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    );

    connections = await connectionResponse.json();
  } else if (findCoachUID(isApprovedData).length > 0) {
    const connectionResponse = await fetch(
      `${baseURL}/accounts/coach-coachee-connections/?coach_id=${findCoachUID(
        isApprovedData
      )}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    );

    connections = await connectionResponse.json();
  }

  return {
    connections,
    coacheeId: findCoacheeUID(isApprovedData),
    coachId: findCoachUID(isApprovedData),
    userProfiles: userProfiles.data,
  };
};

export const getConnections = async (coachId: string, coacheeId: string) => {
  let connections = [];
  if (coacheeId) {
    const connectionResponse = await fetch(
      `${baseURL}/accounts/coach-coachee-connections/?coachee_id=${coacheeId}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    );

    connections = await connectionResponse.json();
  } else if (coachId) {
    const connectionResponse = await fetch(
      `${baseURL}/accounts/coach-coachee-connections/?coach_id=${coachId}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    );

    connections = await connectionResponse.json();
  }

  return connections;
};

export const getAttemptedTestsList = async (userId: string) => {
  try {const response = await fetch(
    `${baseURL}/test-attempt-sessions/get-attempted-test-list/?user_id=${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  const responseData = await response.json();
  console.log("API TS", responseData);

  return responseData.data.codes;
} catch (error) {
  console.error("Error fetching attempted tests list:", error);
  return [];
}
};

export const getTestsByCompetencies = async (userId: string) => {
  const competencyResponse = await fetch(
    `${baseURL}/accounts/user-competency-details/?user_id=${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );
  const competencyData = await competencyResponse.json();

  const userCompetencies = Object.values(competencyData[0]).join(", ");
  console.log(userCompetencies);

  const testsResponse = await fetch(
    `${baseURL}/tests/get-tests-by-competency/?competencies=${userCompetencies.replace(
      /"/g,
      ""
    )}`,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );
  const testsData = await testsResponse.json();
  console.log("GET TESTS BY COMPETENCIES : ", testsData);

  const convertedCompetencyTests = convertTestsData(testsData);
  console.log(convertedCompetencyTests);
  return { competencyTests: [convertedCompetencyTests], competencyData };
};

export const getRequestedTests = async (userId: string) => {
  const response = await fetch(
    `${baseURL}/tests/get-requested-tests/?user_id=${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  if (response.ok) {
    const responseData = await response.json();
    const assignedscenarios = responseData.filter((test: TestsType) =>
      test.assigned_to?.includes(userId)
    );

    const requestedscenarios = responseData.filter((test: TestsType) =>
      test.creator_user_id?.includes(userId)
    );

    return {
      assignedscenarios: assignedscenarios || [],
      requestedscenarios: requestedscenarios || [],
    };
  } else {
    return {
      assignedscenarios: [],
      requestedscenarios: [],
    };
  }
};

export const getCategorisedTests = async (clientName: string) => {
  const testsResponse = await fetch(
    `${baseURL}/tests/get-tests-by-tab-category/?client_name=${clientName}`,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  if (!testsResponse.ok) return [];
  const testsResponseData = await testsResponse.json();
  const categorisedTestsData = configureTestsData(testsResponseData);
  console.log(categorisedTestsData);
  return categorisedTestsData;
};

export const getKnowledgeBots = async (clientName: string, userId: string) => {
  const response = await fetch(
    `${baseURL}/accounts/get-bots/?bot_type=user_bot&client_name=${clientName}`,
    {
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  const getBotsDataResponseData = await response.json();

  let knowledgeBots: {
    bot_id: string;
    bot_name: string;
    description: string;
    bot_type: string;
    scenario_case: string;
    creator_name: string;
  }[] = [];

  console.log("getBotsDataResponseData", getBotsDataResponseData);

  getBotsDataResponseData.data.forEach((item: knowledgeBotJson) => {
    const botJson = item.signature_bot;
    let description: string = "";
    try{

      if (typeof botJson.faqs === "string") {
        description = JSON.parse(
          //@ts-ignore
          botJson.faqs["What is the primary purpose of the bot?"]
        );
      } else {
        description = botJson.faqs["What is the primary purpose of the bot?"];
      }
    } catch (error){
      console.error("Error parsing FAQs:", error, botJson);
      description = "";
    }
    if (item.signature_bot.is_approved) {
      if (!item.signature_bot.is_private) {
        knowledgeBots.push({
          bot_id: botJson.bot_id,
          bot_name: item.bot_attributes.bot_name,
          bot_type: botJson.bot_type,
          description: description,
          scenario_case: botJson.bot_scenario_case,
          creator_name: botJson.creator_name,
        });
      } else {
        if (item.signature_bot.user_id === userId) {
          knowledgeBots.push({
            bot_id: botJson.bot_id,
            bot_name: item.bot_attributes.bot_name,
            bot_type: botJson.bot_type,
            description: description,
            scenario_case: botJson.bot_scenario_case,
            creator_name: botJson.creator_name,
          });
        }
      }
    }
  });

  console.log("Parsed AI Knowledge Agents : ", knowledgeBots);

  return knowledgeBots;
};

export const getClientUsers = async (clientName: string) => {
  const response = await fetch(
    `${baseURL}/accounts/client_id_user_modification`,
    {
      method: "GET",
      headers: { Authorization: basicAuth },
    }
  );

  if (response.ok) {
    const data = await response.json();
    return getUsersForClientForTeam(clientName, data);
  } else {
    return [];
  }
};

export const getLeaderboardPosition = async (
  userEmail: string,
  profileType: string,
  userId: string
) => {
  const response = await fetch(
    `${baseURL}/accounts/participant-leader-board-report/?email=${userEmail}&by_category=true`,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  if (response.ok) {
    let responseData = await response.json();

    console.log("Leaderboard Data : ", responseData);

    if (profileType === "coach" || profileType === "mentor") {
      responseData = responseData.coach_mentor;
    } else if (profileType === "coachee" || profileType === "mentee") {
      responseData = responseData.coachee_mentee;
    } else {
      responseData = responseData.full_data;
    }

    console.log(
      `Leaderboard API\n Email : ${userEmail} \n Profile : ${profileType} \n User ID : ${userId}`
    );

    const userDetails = responseData.map(
      (data: ParticipantsforLeaderBoardTypes, i: number) => {
        return {
          name: data.name,
          user_id: data.user_id,
          total_count: responseData.length,
          rating: data.total_score === 0 ? responseData.length : data.rating,
        };
      }
    );

    const positionedUser: PositionedUserTypes[] = userDetails.filter(
      (userr: PositionedUserTypes) => userr.user_id === userId
    );

    console.log("Data : ", positionedUser);
    return positionedUser;
  } else {
    return [];
  }
};

export const getCandidateReport = async (userId: string) => {
  const response = await fetch(`${baseURL}/frontend-auth/get-report-url/`, {
    method: "POST",
    headers: {
      Authorization: basicAuth,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      report_type: "participantReport",
      candidate_id: userId,
    }),
  });

  if (response.ok) {
    const responseData = await response.json();
    console.log('getCandidateReport', responseData)
    return responseData.url;
  } else {
    return "";
  }
};

export const getKudosData = async (userId: string, userEmail: string) => {
  const response = await fetch(
    `${baseURL}/accounts/feedback-leaderboard-report/?email=${userEmail}`,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  if (response.ok) {
    const responseData = await response.json();
    const FilteredUserDataForKudos = responseData.group.filter(
      (data: KudosDetailsType) => {
        if (data.user_id === userId) {
          return {
            ...data,
            total_users: responseData.group.length,
          };
        }
      }
    );
    return {
      totalUsersForFeedback: responseData.group.length,
      userKudosData: FilteredUserDataForKudos,
    };
  } else {
    return {
      totalUsersForFeedback: 0,
      userKudosData: [],
    };
  }
};

export const getConversations = async (
  userId: string,
  feedbackBotId: string | null | undefined
) => {
  let convertsationDataAdmin: ConvertedConversation[] = [];
  let conversationDataUser: ConvertedConversation[] = [];
  let feedbackConversations: FeedbackConversationType[] = [];

  const responseAdmin = await fetch(
    `${baseURL}/coaching-conversations/bot-conversation-data/?for=admin&user_id=${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  if (responseAdmin.ok) {
    const responseData = await responseAdmin.json();
    console.log("responseData ADMIN", responseData);
    if (responseData[0] != "Bot not Found") {
      const convertedData: ConvertedConversation[] =
        convertJsonToExpectedFormat(responseData);
      convertsationDataAdmin = convertedData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      console.log("convertedData ADMIN : ", convertedData);
    }
  }

  const responseUser = await fetch(
    `${baseURL}/coaching-conversations/bot-conversation-data/?for=user&user_id=${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  if (responseUser.ok) {
    const responseData = await responseUser.json();
    console.log("responseData USER", responseData);
    if (responseData[0] != "Bot not Found") {
      const convertedData: ConvertedConversation[] =
        convertJsonToExpectedFormat(responseData);
      conversationDataUser = convertedData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      console.log("convertedData USER : ", convertedData);
    }
  }

  if (feedbackBotId) {
    const responseFeedback = await fetch(
      `${baseURL}/accounts/get-user-feedback-data/?method=get&bot_id=${feedbackBotId}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    );

    if (responseFeedback.ok) {
      const responseData = await responseFeedback.json();
      console.log(responseData);
      const FeedbackConvo: FeedbackConversationType[] =
        responseData.message.map((entry: any) => ({
          participant_name: entry.is_anonymous
            ? "Anonymous User"
            : entry.participant_name,
          date: entry.date,
          msg: Object.keys(entry.msg).map((question) => ({
            question: question,
            answer: entry.msg[question],
          })),
        }));
      console.log(FeedbackConvo, "FeedbackConvo");
      feedbackConversations = FeedbackConvo.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
    console.log("convertedData USER : ", feedbackConversations);
  }

  return {
    conversationDataUser,
    convertsationDataAdmin,
    feedbackConversations,
  };
};

export const getActionPoints = async (userId: string) => {
  const response = await fetch(
    `${baseURL}/test-attempt-sessions/get-or-save-action-point/?mode=get&user_id=${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  if (response.ok) {
    const responseData = await response.json();
    return calculateTotalActionPoints(responseData);
  } else {
    return 0;
  }
};

export const getIDPs = async (userId: string) => {
  const response = await fetch(
    `${baseURL}/accounts/get_or_create_idp/?user_id=${userId}`,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  if (response.ok) {
    const responseData = await response.json();
    console.log(responseData);
    return sortByDateDescending(responseData);
  } else {
    return [];
  }
};

export const getCoursePackage = async (coursePackageId: string, userId?:string) => {
  let url = `${baseURL}/courses/course-package/?package_id=${coursePackageId}`;
  if (userId){
    url += `&user_id_for_progress=${userId}`
  }
  const response = await fetch(
    url,
    {
      method: "GET",
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  if (response.ok) {
    const responseData = await response.json();
    console.log('[getCoursePackage]',responseData);
    return responseData
  } else {
    console.error('failed [getcoursepackage]', response)
    return {
      'package_id': '',
      'package_name': '',
      'package_description': '',
      'image_link': '',
      'jobaid_id': '',
      'prompt_job_aid_uid': '',
      'books': []
    };
  }
};


export const fetchBooks = async (coursePackageId: string, userId?: string): Promise<CoursePackage> => {
  try {
    const data = await getCoursePackage(coursePackageId, userId);

    const package_details = {
      'package_id': data.uid,
      'package_name': data.title,
      'package_description': data.sub_title || data.description || '',
      'image_link': data.image_link,
      'jobaid_id': data.jobaid_uid,
      'prompt_job_aid_uid': data.prompt_job_aid_uid,
      'report_config': data.page_config || {},
    };

    // Flatten all courses → modules → books
    const books: Book[] = data.courses.flatMap((course: any) =>
      course.modules
        .filter((m: any) => m.chapter_type === "BOOK")
        .map((m: any) => ({
          id: m.uid,
          title: m.title,
          author: m.author,
          tag: m.tag? m.tag?.split(',') : [],
          business_outcome: m.business_outcome? m.business_outcome.split(',') : [],
          function: m.function? m.function.split(',') : [],
          implementation_complexity: m.implementation_complexity? m.implementation_complexity.split(',') : [],
          unexpected_outcomes: m.unexpected_outcome? m.unexpected_outcome.split(',') : [],
          emerging_players: m.emerging_player,
          start_up: m.startup,
          keywords: m.key_words,
          desc: m.description,
          card_button_config: m?.card_button_config,
          audio: m.audio_link,
          img: m.image_link,
          report: m.embed_link,
          course_id: course.uid,
          transform_iq: m.transform_iq,
          course_details: {
            'title': course.title,
            'desc': course.sub_title,
            'image_link': course.image_link,
            'embed_link': course.embed_link
          },
          package_detail: package_details,
          list_name: m.list_name || '',
          jobaid_id: data.jobaid_uid,
          prompt_job_aid_uid: data.prompt_job_aid_uid,
          userProgress: m.progress,
          totalLikes: m.total_likes || 0,
          sticker: m.sticker
        }))
    );
    console.log('[fetchBooks] Books:', books);
    const result = {
      ...package_details,
      ...{books: books}
    };
    return result;
  } catch (err) {
    console.error("Error fetching books:", err);
    return {
      package_id: '',
      package_name: '',
      package_description: '',
      image_link: '',
      jobaid_id: '',
      prompt_job_aid_uid: '',
      report_config: {},
      books: []
    };
  }
};

export const updateCourseProgress = async (
  courseId: string,
  userId: string,
  moduleId: string,
  status: string,
  trackingData: number,
  playedAudio: number
) => {
  try {

    if (!courseId || !userId || !moduleId || !status) {
      console.error("[updateCourseProgress] Missing required parameters : ", courseId, userId, moduleId, status);
      return null;
    }
    const data = JSON.stringify({
      course_id: courseId,
      user_uid: userId,
      module: {
        module_id: moduleId,
        status: status,
        completed_in_percentage: trackingData,
        played_audio: playedAudio,
      },
    });
    console.log("[updateCourseProgress] Data:", data);

    const response = await fetch(`${baseURL}/courses/course-progress/`, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
      body: data
    });

    if (!response.ok) {
      console.error("[updateCourseProgress] Failed:", response.statusText);
      return null;
    }

    const responseData = await response.json();
    console.log("[updateCourseProgress] Success:", responseData);
    return responseData;
  } catch (error) {
    console.error("[updateCourseProgress] Error:", error);
    return null;
  }
};


export const getModuleCompletion = async (
  userId: string,
  moduleId: string,
) => {
  try {

    if (  !userId || !moduleId) {
      console.error("[getModuleCompletion] Missing required parameters", userId, moduleId);
      return null;
    }


    const response = await fetch(`${baseURL}/courses/module-user-data/?module_id=${moduleId}&user_id=${userId}`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("[getModuleCompletion] Failed:", response.statusText);
      return null;
    }

    const responseData = await response.json();
    console.log("[getModuleCompletion] Success:", responseData);
    return responseData;
  } catch (error) {
    console.error("[getModuleCompletion] Error:", error);
    return null;
  }
};


export const addModuleLike = async (moduleId: string, userId: string) => {
  try {
    if (!userId || !moduleId) {
      console.error("[addModuleLike] Missing required parameters : ", userId, moduleId);
      return null;
    }

    console.log("[addModuleLike] Module ID:", moduleId, userId);

    const response = await fetch(`${baseURL}/courses/modules/${moduleId}/like/`, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });
    console.log(response.statusText)
    if (!response.ok) {
      console.error("[addModuleLike] Failed:", response.statusText);
      return null;
    }

    // ✅ Check if response has content
    const responseData = await response.json();
    console.log("[addModuleLike] Success:", responseData);
    return responseData;
  } catch (error) {
    console.error("[addModuleLike] Error:", error);
    return null;
  }
};

export const addModuleTotalLike = async (userId:string, moduleId: string, vote: 1 | -1) => {
  try {
    if (!moduleId || !vote || !userId) {
      console.error("[addModuleTotalLike] Missing required parameters : ", {vote, moduleId, userId});
      return null;
    }

    console.log("[addModuleTotalLike] Module ID:", moduleId, "Vote:", vote);

    const response = await fetch(`${baseURL}/courses/modules/${moduleId}/like/`, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ client_only_likes: true,  likes: vote, user_id: userId}),
    });
    console.log(response.statusText)
    if (!response.ok) {
      console.error("[addModuleTotalLike] Failed:", response.statusText);
      return null;
    }

    // ✅ Check if response has content
    const responseData = await response.json();
    console.log("[addModuleTotalLike] Success:", responseData);
    return responseData;
  } catch (error) {
    console.error("[addModuleTotalLike] Error:", error);
    return null;
  }
};

export const addModuleLater = async (moduleId: string, userId: string) => {
  try {
    if (!userId || !moduleId) {
      console.error("[addModuleLater] Missing required parameters : ", userId, moduleId);
      return null;
    }

    const response = await fetch(`${baseURL}/courses/modules/${moduleId}/later/`, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId }),
    });

    if (!response.ok) {
      console.error("[addModuleLater] Failed:", response.statusText);
      return null;
    }

    // Check for empty body (e.g. 204 response)
    const text = await response.text();
    if (!text) {
      console.log("[addModuleLater] Success: no content (probably removed)");
      return { success: true, removed: true }; // 👈 easier for frontend
    }

    const responseData = JSON.parse(text);
    console.log("[addModuleLater] Success:", responseData);
    return { success: true, removed: false, data: responseData };
  } catch (error) {
    console.error("[addModuleLater] Error:", error);
    return null;
  }
};



export const getcourseModuleLikesAndSaveLater = async(courseId:string, userId:string) => {
  try {
    
    if (  !userId || !courseId) {
      console.error("[getcourseModuleLikesAndSaveLater] Missing required parameters : ", userId, courseId);
      return null;
    }

    const response = await fetch(`${baseURL}/courses/get-liked-and-for-later-modules/?course_id=${courseId}&user_id=${userId}`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("[getcourseModuleLikesAndSaveLater] Failed:", response.statusText);
      return null;
    }

    const responseData = await response.json();
    console.log("[getcourseModuleLikesAndSaveLater] Success:", responseData);
    return responseData;
  } catch (error) {
    console.error("[getcourseModuleLikesAndSaveLater] Error:", error);
    return null;
  }
};

export const ActionsPerMonth = async(userId:string)=>{
  try{
    if (  !userId) {
      console.error("[ActionsPerMonth] Missing required parameters : ", userId);
      return null;
    }

    const response = await fetch(`${baseURL}/accounts/actions-per-month/?&user_id=${userId}`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      console.error("[ActionsPerMonth] Failed:", response.statusText);
      return null;
    }

    const responseData = await response.json();
    console.log("[ActionsPerMonth] Success:", responseData);
    return responseData;


  } catch (error){
    console.error("[ActionsPerMonth] got error: ", error);
    return {}
  }
}



export const getCompanyIQData = async (): Promise<CompanyIQ[]> => {
  try {
    const response = await fetch(`${baseURL}/company-iq/all/`, {
      method: "GET",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json",
      },
      cache: "no-store", // important for admin / live data
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const raw = await response.json();

    // If backend is paginated
    const results = raw.results ?? raw;
    console.log('results:', results)

    return results.map((item: any): CompanyIQ => ({
      id: item.uid,
      company: item.company,
      industry: item.industry,
      hq: item.hq,
      revenue: item.revenue_us_millions,
      employees: item.employees_full_time,

      leadership: item.ai_cloud_leadership_roles ?? [],
      initiatives: item.ai_digital_initiatives ?? [],
      techStack: item.cloud_tech_stack_signals ?? [],
      useCases: item.ai_use_cases ?? [],
      outlook: item.transformation_iq_outlook ?? "",

      source: item.source,
      approved: item.approved,
      created: item.created,
      sticker: item.sticker,
    }));

  } catch (error) {
    console.error("Error fetching CompanyIQ data:", error);
    return [];
  }
};


export const track = async (feature : string, featurePath:string, userId:string, event_type:string='click', description?:string) => { 
  try {
      console.debug("TRACK FIRED");
      const response = await fetch(`${baseURL}/analytics-events/`, {    
        method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      event_type: event_type,
      feature: feature,
      feature_path: featurePath, // '|' sperated
      user_id: userId,
      metadata: {
        page: window.location.pathname,
        description: description
      }
    })
  });


  console.debug("TRACK RESPONSE", response);
} catch (error) {
  console.error("Error tracking event:", error);
}
}

export const trackConceptProgressStart = async (userId:string, case_mapping_id:string) => { 
  try {
      console.debug("trackConceptProgressStart FIRED", {userId, case_mapping_id});
      const response = await fetch(`${baseURL}/analytics-progress/start/`, {    
        method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      case_mapping_id: case_mapping_id,
    })
  });


  console.debug("trackConceptProgressStart RESPONSE", response);
} catch (error) {
  console.error("Error trackConceptProgressStart:", error);
}
}

export const trackConceptProgressUpdate = async (userId:string, case_mapping_id:string, percentage:number) => { 
  try {
      console.debug("concpet progress update", {userId, case_mapping_id, percentage});
      const response = await fetch(`${baseURL}/analytics-progress/update/`, {    
        method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      case_mapping_id: case_mapping_id,
      completion_percentage: percentage
    })
  });


  console.debug("trackConceptProgressUpdate RESPONSE", response);
} catch (error) {
  console.error("Error trackConceptProgressUpdate:", error);
}
}

export const trackConceptProgressComplete = async (userId:string, case_mapping_id:string) => { 
  try {
      console.debug("trackConceptProgressComplete fired", {userId, case_mapping_id});
      const response = await fetch(`${baseURL}/analytics-progress/complete/`, {    
        method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      user_id: userId,
      case_mapping_id: case_mapping_id,
    })
  });


  console.debug("TtrackConceptProgressComplete", response);
} catch (error) {
  console.error("Error trackConceptProgressComplete:", error);
}
}

export const getTrackedConceptProgress = async (userId:string, case_mapping_id:string) => { 
  try {
      console.debug("Fetching tracked concept progress for userId:", userId, "case_mapping_id:", case_mapping_id);
      const response = await fetch(`${baseURL}/analytics-progress/concept-session/?user_id=${userId}&case_mapping_id=${case_mapping_id}`, {    
        method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": basicAuth
    },
  });


  console.debug("Tracked concept progress response:", response);
  if (!response.ok) {
    console.error("Failed to fetch tracked concept progress:", response.statusText);
    return null;
  }
  const data = await response.json();
  console.debug("Tracked concept progress data:", data);
  return data; // Assuming data contains completion_percentage
} catch (error) {
  console.error("Error tracking event:", error);
  return null;
}
}
