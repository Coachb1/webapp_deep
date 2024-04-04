import { baseURL, basicAuth, constructMetadata } from "@/lib/utils";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import Coaches from "./Coaches";

export const metadata = constructMetadata({
  title: "Network - Coachbots",
});

const getDirectoryProfiles = async (userEmail: string | null | undefined) => {
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
};

const getUserJoiningPreviledges = async (
  userEmail: string | null | undefined
) => {
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
};

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const directoryProfilesData = await getDirectoryProfiles(user?.email);

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
