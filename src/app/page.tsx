import { baseURL, basicAuth, constructMetadata } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Coaches from "./Coaches";

export const metadata = constructMetadata({
  title: "Network - Coachbots",
});

const getClientUserInfo = async (userEmail: string | null | undefined) => {
  if (userEmail !== null && userEmail !== undefined) {
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

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const { isDemoUser, isRestricted } = await getClientUserInfo(user?.email);

  let directoryProfilesData;

  if (!isRestricted || isDemoUser) {
    directoryProfilesData = await getDirectoryProfiles(user?.email);
  }

  const UserJoiningPreviledges = await getUserJoiningPreviledges(user?.email);

  return (
    <div>
      <Coaches
        user={user}
        coachesDataa={directoryProfilesData}
        UserJoiningPreviledges={UserJoiningPreviledges}
      />
    </div>
  );
};

export default Page;
