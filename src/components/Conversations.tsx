"use client";

import { useEffect } from "react";
import { Badge } from "./ui/badge";
import ConversationChat from "./ConversationChat";

const subdomain =
  typeof window !== "undefined" ? window.location.hostname.split(".")[0] : null;
const devUrl = "https://coach-api-ovh.coachbots.com/api/v1";
// const devUrl = "https://coach-api-gcp.coachbots.com/api/v1";
const prodUrl = "https://coach-api-prod-ovh.coachbots.com/api/v1";
const baseURL = subdomain === "platform" ? prodUrl : devUrl;
const basicAuth =
  "Basic Yzc3MjFmZGItYTllMC00YTYxLWEzMTYtNDRhODA1N2VkMjY0OjhjNWNlZWZlLTY2Y2QtNDliZi04MTY5LTBhNjMwMmU5NmZlMA==";

const Conversations = () => {
  useEffect(() => {
    fetch(
      `${baseURL}/coaching-conversations/bot-conversation-data/?for=admin&user_id=535d8e8c-3a48-4bc2-bd78-30bece9331c5`,
      {
        method: "GET",
        headers: {
          Authorization: basicAuth,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("Coaching Conversation : ", data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2">Conversations</div>
      <div className="">
        <div className="text-sm w-full m-4 ml-0 p-2 rounded-md text-slate-800 flex flex-col gap-2 max-sm:text-xs min-h-[109px]">
          <Badge className="w-fit ml-2">Admin Conversations</Badge>
          <div className="flex flex-row justify-center items-center bg-gray-200 mx-2 rounded-md">
            <ConversationChat />
            {/* <div className="flex justify-start ">
              <div className="flex flex-col items-start justify-start p-2 w-[80%]">
                <div className="bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md max-sm:full">
                  <h4 className="font-bold">Question</h4>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Vitae quasi minima impedit nemo fugiat voluptatum
                    consectetur molestias enim officiis iure.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex  p-2 w-[80%] flex-col items-end justify-end rounded-2xl">
                <div className=" bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md  max-sm:w-full">
                  <h4 className="font-bold">Response</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolor, facere? Iste reiciendis sapiente debitis, ratione
                    beatae error qui repellat eaque!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-start ">
              <div className="flex flex-col items-start justify-start p-2 w-[80%]">
                <div className="bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md max-sm:full">
                  <h4 className="font-bold">Question</h4>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Vitae quasi minima impedit nemo fugiat voluptatum
                    consectetur molestias enim officiis iure.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex  p-2 w-[80%] flex-col items-end justify-end rounded-2xl">
                <div className=" bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md  max-sm:w-full">
                  <h4 className="font-bold">Response</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolor, facere? Iste reiciendis sapiente debitis, ratione
                    beatae error qui repellat eaque!
                  </p>
                </div>
              </div>
            </div> */}
          </div>
          <hr className="my-2" />
          <Badge className="w-fit ml-2">User Conversations</Badge>
          <div>
            <div className="flex justify-start ">
              <div className="flex flex-col items-start justify-start p-2 w-[80%]">
                <div className="bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md max-sm:full">
                  {/* <h4 className="font-bold">Question</h4> */}
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Vitae quasi minima impedit nemo fugiat voluptatum
                    consectetur molestias enim officiis iure.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex  p-2 w-[80%] flex-col items-end justify-end rounded-2xl">
                <div className=" bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md  max-sm:w-full">
                  <h4 className="font-bold">Response</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolor, facere? Iste reiciendis sapiente debitis, ratione
                    beatae error qui repellat eaque!
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-start ">
              <div className="flex flex-col items-start justify-start p-2 w-[80%]">
                <div className="bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md max-sm:full">
                  <h4 className="font-bold">Question</h4>
                  <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Vitae quasi minima impedit nemo fugiat voluptatum
                    consectetur molestias enim officiis iure.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className="flex  p-2 w-[80%] flex-col items-end justify-end rounded-2xl">
                <div className=" bg-blue-100 text-sm max-sm:text-xs p-2 rounded-md  max-sm:w-full">
                  <h4 className="font-bold">Response</h4>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Dolor, facere? Iste reiciendis sapiente debitis, ratione
                    beatae error qui repellat eaque!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversations;
