import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { baseURL, basicAuth, constructMetadata } from "@/lib/utils";
import Widgets from "@/components/Widgets";
import Guides from "./Guides";
import {
  SkillnRoleBotsType,
  knowledgeBotJson,
  knowledgeBotType,
} from "@/lib/types";

export const metadata = constructMetadata({
  title: "Guides",
});

const getAllBots = async () => {
  const response = await fetch(`${baseURL}/accounts/get-skill-and-role-bots/`, {
    method: "GET",
    headers: {
      Authorization: basicAuth,
      "Content-Type": "application/json",
    },
  });

  return response.json();
};

const getknowledgeBotss = async (userEmail: string) => {
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
    }[] = [];
    getBotsDataResponseData.data.forEach((item: knowledgeBotJson) => {
      const botJson = item.signature_bot;
      console.log(botJson);
      const description = JSON.parse(botJson.faqs)[
        "What is the primary purpose of the bot?"
      ];
      knowledgeBotss.push({
        bot_id: botJson.bot_id,
        bot_name: item.bot_attributes.bot_name,
        bot_type: botJson.bot_type,
        description: description,
        scenario_case: botJson.bot_scenario_case,
      });
    });

    return knowledgeBotss;
  } else {
    return [];
  }
};

const Page = async () => {
  const { getUser } = getKindeServerSession();
  const user: any = await getUser();

  const getGuidesListResponse: SkillnRoleBotsType[] = await getAllBots();

  const roleBots: SkillnRoleBotsType[] = getGuidesListResponse.filter(
    (bot) => bot.scenario_case === "role_bot"
  );
  const skillBots: SkillnRoleBotsType[] = getGuidesListResponse.filter(
    (bot) => bot.scenario_case === "skill_guide"
  );

  const knowledgeBots = await getknowledgeBotss(user?.email!);
  // console.log(knowledgeBots);

  return (
    <div>
      <Guides
        user={user}
        roleBots={roleBots}
        skillBots={skillBots}
        knowledgeBots={knowledgeBots}
      />
    </div>
  );
};

export default Page;
