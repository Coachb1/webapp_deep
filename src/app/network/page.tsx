
import {
  constructMetadata,
} from "@/lib/utils";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { connectionType } from "@/lib/types";
import Coaches from "../Coaches";

export const metadata = constructMetadata({
  title: "Network - Coachbot",
});

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  // const {
  //   isDemoUser,
  //   isRestricted,
  //   clientDepartments,
  //   clientExpertise,
  //   restrictedFeatures,
  //   restrictedPages,
  //   headings,
  //   helpText,
  // } =  await getClientUserInfo(user?.email, user);
  const restrictedFeatures = "";
  const restrictedPages = "";
  const clientDepartments = "";
  const clientExpertise = "";
  const helpText = "";
  const headings = null;

  let directoryProfilesData;
  // if (!isRestricted || isDemoUser) {
  //   directoryProfilesData = await getDirectoryProfiles(user?.email, user);
  // }

  let userConnections: connectionType[] = [];
  // if (user) {
  //   userConnections = await getUserConnections(user);
  // }

  const UserJoiningPreviledges = ""; //await getUserJoiningPreviledges(user?.email);

  // const { userInfo, userConnections, directoryProfiles, joiningPrevileges } =
  //   useUser();

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
