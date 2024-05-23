import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { baseURL, basicAuth, constructMetadata } from "@/lib/utils";
import CreateOwn from "./CreateOwn";
import { knowledgeBotJson } from "@/lib/types";

export const metadata = constructMetadata({
  title: "Creator Studio - Coachbots",
});

const getknowledgeBotss = async (userEmail: string) => {
  if (userEmail) {
    const response = await fetch(
      `${baseURL}/accounts/get-client-information/?for=user_info&email=${userEmail}`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    );

    const responseData = await response.json();
    const clientName = responseData.data.user_info[0].client_name;
    const restrictedFeatures =
      responseData.data.user_info[0].restricted_features;

    if (clientName) {
      const getBotsDataResponse = await fetch(
        `${baseURL}/accounts/get-bots/?bot_type=user_bot&client_name=${clientName}`,
        {
          headers: {
            Authorization: basicAuth,
          },
        }
      );

      const getBotsDataResponseData = await getBotsDataResponse.json();

      let knowledgeBotss: {
        bot_id: string;
        bot_name: string;
        description: string;
        bot_type: string;
        scenario_case: string;
        creator_name: string;
      }[] = [];

      try {
        getBotsDataResponseData.data.forEach((item: knowledgeBotJson) => {
          const botJson = item.signature_bot;
          let description: string = "";
          if (typeof botJson.faqs === "string") {
            description = JSON.parse(
              //@ts-ignore
              botJson.faqs["What is the primary purpose of the bot?"]
            );
          } else {
            description =
              botJson.faqs["What is the primary purpose of the bot?"];
          }
          if (item.signature_bot.is_approved) {
            knowledgeBotss.push({
              bot_id: botJson.bot_id,
              bot_name: item.bot_attributes.bot_name,
              bot_type: botJson.bot_type,
              description: description,
              scenario_case: botJson.bot_scenario_case,
              creator_name: botJson.creator_name,
            });
          }
        });
        return { knowledgeBotss, restrictedFeatures, clientName };
      } catch (error) {
        return {
          knowledgeBotss: [],
          restrictedFeatures: "",
          clientName: "",
        };
      }
    } else {
      return {
        knowledgeBotss: [],
        restrictedFeatures: "",
        clientName: "",
      };
    }
  } else {
    return {
      knowledgeBotss: [],
      restrictedFeatures: "",
      clientName: "",
    };
  }
};

const getDeepDiveCreationAcess = async (
  userEmail: string | undefined | null
) => {
  if (userEmail) {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", basicAuth);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    const response = await fetch(
      `${baseURL}/coaching-conversations/get-deep-dive-create-access/?email=${userEmail}`,
      requestOptions
    );

    if (response.ok) {
      const responseData = await response.json();
      return responseData.has_access;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  const { knowledgeBotss, restrictedFeatures, clientName } =
    await getknowledgeBotss(user?.email!);

  console.log(clientName);
  const deepdiveCreationAccess = await getDeepDiveCreationAcess(user?.email);

  return (
    <div>
      <CreateOwn
        user={user}
        restrictedFeatures={restrictedFeatures}
        knowledgeBots={knowledgeBotss}
        deepdiveCreationAccess={deepdiveCreationAccess}
        clientName={clientName}
      />
    </div>
  );
};

export default Page;
