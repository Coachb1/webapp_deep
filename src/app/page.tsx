import {
  baseURL,
  basicAuth,
  constructMetadata,
  findCoachUID,
  findCoacheeUID,
  getUserAccount,
} from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Coaches from "./Coaches";
import { KindeUser } from "@kinde-oss/kinde-auth-nextjs/dist/types";
import { connectionType } from "@/lib/types";

export const metadata = constructMetadata({
  title: "Network - Coachbots",
});

const getClientUserInfo = async (userEmail: string | null | undefined) => {
  if (userEmail !== null && userEmail !== undefined) {
    await CreateOrAssignClientId(userEmail);
    const response = await fetch(
      `${baseURL}/accounts/get-client-information/?for=user_info&email=${userEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      return {
        isDemoUser: data.data.user_info[0].is_demo_user,
        isRestricted: data.data.user_info[0].is_restricted,
      };
    } else {
      return {
        isDemoUser: false,
        isRestricted: true,
      };
    }
  } else {
    return {
      isDemoUser: false,
      isRestricted: true,
    };
  }
};

const getDirectoryProfiles = async (userEmail: string | null | undefined) => {
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

    return response.json();
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

const CreateOrAssignClientId = async (userEmail: string | null | undefined) => {
  if (userEmail !== null && userEmail !== undefined) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", basicAuth);
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
      "email": userEmail,
    });
    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    
    const response = await fetch(`${baseURL}/accounts/create-or-assign-client-id/`, requestOptions)

    const data = await response.json();


    if (response.ok){
      console.log(`Success : data:`, data)
    } else {
      console.error(`Failed to run CreateOrAssignClientId`)
    }
  }
    
};

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const { isDemoUser, isRestricted } = await getClientUserInfo(user?.email);

  let directoryProfilesData;
  if (!isRestricted || isDemoUser) {
    directoryProfilesData = await getDirectoryProfiles(user?.email);
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
        coachesDataa={directoryProfilesData}
        UserJoiningPreviledges={UserJoiningPreviledges}
        userConnections={userConnections}
      />
    </div>
  );
};

export default Page;
