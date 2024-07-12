import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import {
  baseURL,
  basicAuth,
  convertTestsData,
  emptyData,
  findCoachUID,
  findCoacheeUID,
  getUserAccount,
  parseStringList,
} from "./utils";
import { CoachesDataType } from "@/app/Coaches";
import { CategoryData, TestsType, UserInfoType } from "./types";

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
    `${baseURL}/accounts/get-bots/?user_id=${userId}`,
    {
      headers: {
        Authorization: basicAuth,
      },
    }
  );

  return response.json();
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
  const isApprovedData = userProfiles.data.filter(
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

export const getTestsByCompetencies = async (userId: string) => {
  try {
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
    console.log(competencyData[0]);

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
    return [convertedCompetencyTests];
  } catch (err) {
    console.error(err);
  }
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
