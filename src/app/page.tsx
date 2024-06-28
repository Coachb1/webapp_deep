import {
  baseURL,
  basicAuth,
  constructMetadata,
  findCoachUID,
  findCoacheeUID,
  getUserAccount,
  parseStringList,
} from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Coaches, { CoachesDataType } from "./Coaches";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { connectionType } from "@/lib/types";

export const metadata = constructMetadata({
  title: "Network - Coachbots",
});

const emptyData = {
  isDemoUser: false,
  isRestricted: true,
  clientExpertise: null,
  clientDepartments: null,
  restrictedPages: null,
  restrictedFeatures: null,
  headings: null,
  helpText: null,
};

const getClientUserInfo = async (
  userEmail: string | null | undefined,
  user: KindeUser | null
) => {
  if (userEmail !== null && userEmail !== undefined) {
    const userCreateResponse = await getUserAccount(user);
    const userCreateResults = await userCreateResponse.json();

    console.log("getUserAccount : ", userCreateResults);
    if (userCreateResponse.ok) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", basicAuth);
      myHeaders.append("Content-Type", "application/json");
      const raw = JSON.stringify({
        email: userEmail,
      });
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(
        `${baseURL}/accounts/create-or-assign-client-id/`,
        requestOptions
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
  } else {
    return emptyData;
  }
};

const getDirectoryProfiles = async (
  userEmail: string | null | undefined,
  user: KindeUser | null
) => {
  const accountResponse = await getUserAccount(user);
  const userAccount = await accountResponse.json();

  const recommendationProfileIDs: string[] = userAccount.coach_recommendation;
  if (userEmail) {
    const response = await fetch(
      `${baseURL}/accounts/get-directory-informations/?email=${userEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    );
    if (response.ok) {
      let responseData = await response.json();
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
  }
};

const getUserJoiningPreviledges = async (
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

const getUserConnections = async (user: KindeUser | null) => {
  const accountResponse = await getUserAccount(user);
  const userAccount = await accountResponse.json();

  const profileResponse = await fetch(
    `${baseURL}/accounts/coach-coachee-mentor-mentee-profile/?user_id=${userAccount.uid}`,
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

  return connections;
};

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const {
    isDemoUser,
    isRestricted,
    clientDepartments,
    clientExpertise,
    restrictedFeatures,
    restrictedPages,
    headings,
    helpText,
  } = await getClientUserInfo(user?.email, user);

  let directoryProfilesData;
  if (!isRestricted || isDemoUser) {
    directoryProfilesData = await getDirectoryProfiles(user?.email, user);
  }

  let userConnections: connectionType[] = [];
  if (user) {
    userConnections = await getUserConnections(user);
  }

  const UserJoiningPreviledges = await getUserJoiningPreviledges(user?.email);

  return (
    <div suppressHydrationWarning>
      <Coaches
        user={user}
        coachesDataa={directoryProfilesData || []}
        UserJoiningPreviledges={UserJoiningPreviledges}
        userConnections={userConnections}
        clientDepartments={clientDepartments}
        clientExpertise={clientExpertise}
        restrictedFeatures={restrictedFeatures}
        restrictedPages={restrictedPages}
        headings={headings}
        helpModeText={helpText}
      />
    </div>
  );
};

export default Page;
