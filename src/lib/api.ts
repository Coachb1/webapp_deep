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
} from "./types";

export const getClientUserInfo = async (
  userEmail: string | null | undefined,
  user: KindeUser | null
): Promise<UserInfoType> => {
  if (userEmail !== null && userEmail !== undefined) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", basicAuth);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      email: userEmail,
    });

    const response = await fetch(
      `${baseURL}/accounts/create-or-assign-client-id/`,
      {
        method: "POST",
        headers: myHeaders,
        body: raw,
      }
    );

    const data = await response.json();
    console.log("create-or-assign-client-id", data);
    if (response.ok) {
      const response = await fetch(
        `${baseURL}/accounts/get-client-information/?for=user_info&email=${userEmail}`,
        {
          method: "GET",
          headers: {
            Authorization: basicAuth,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        return {
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
        };
      } else {
        return emptyData;
      }
    } else {
      console.error(`Failed to run CreateOrAssignClientId`);
      return emptyData;
    }
  } else {
    return emptyData;
  }
};

export const getDirectoryProfiles = async (
  userEmail: string | null | undefined,
  recommendationProfileIDs: string[] | null
) => {
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
};

export const getUserJoiningPreviledges = async (
  userEmail: string | null | undefined
) => {
  if (userEmail) {
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

export const getAttemptedTestsList = async (userId: string) => {
  const response = await fetch(
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

export const getKnowledgeBots = async (clientName: string, userId : string) => {
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

  console.log("getBotsDataResponseData", getBotsDataResponseData)

  getBotsDataResponseData.data.forEach((item: knowledgeBotJson) => {
    const botJson = item.signature_bot;
    let description: string = "";
    if (typeof botJson.faqs === "string") {
      description = JSON.parse(
        //@ts-ignore
        botJson.faqs["What is the primary purpose of the bot?"]
      );
    } else {
      description = botJson.faqs["What is the primary purpose of the bot?"];
    }
    if (item.signature_bot.is_approved) {
      if (!item.signature_bot.is_private){
      knowledgeBots.push({
        bot_id: botJson.bot_id,
        bot_name: item.bot_attributes.bot_name,
        bot_type: botJson.bot_type,
        description: description,
        scenario_case: botJson.bot_scenario_case,
        creator_name: botJson.creator_name,
      });
      } else {
        if (item.signature_bot.user_id === userId){
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

  console.log("Parsed knowledge Bots : ", knowledgeBots)

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

    if (profileType === "coach" || profileType === "mentor") {
      responseData = responseData.coach_mentor;
    } else if (profileType === "coachee" || profileType === "mentee") {
      responseData = responseData.coachee_mentee;
    } else {
      responseData = responseData.full_data;
    }

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
    if (responseData[0] != "Bot not Found") {
      const convertedData: ConvertedConversation[] =
        convertJsonToExpectedFormat(responseData);
      convertsationDataAdmin = convertedData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
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
    if (responseData[0] != "Bot not Found") {
      const convertedData: ConvertedConversation[] =
        convertJsonToExpectedFormat(responseData);
      conversationDataUser = convertedData.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
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
      const FeedbackConvo: FeedbackConversationType[] =
        responseData.message.map((entry: any) => ({
          participant_name: entry.is_anonymous
            ? "Anonymous User"
            : entry.participant_name,
          date: entry.date,
          msg: {
            question: Object.keys(entry.msg)[0],
            answer: Object.values(entry.msg)[0],
          },
        }));
      console.log(FeedbackConvo, "FeedbackConvo");
      feedbackConversations = FeedbackConvo.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
    }
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
    console.log(responseData)
    return sortByDateDescending(responseData);
  } else {
    return [];
  }
};
