"use client";

import { Pen, PenBox } from "lucide-react";
import { Badge } from "./ui/badge";

const Competencies = ({ user }: any) => {
  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2">Competencies</div>
      <div className="m-4 text-sm max-sm:m-2">
        <div className="bg-gray-200 text-sm w-full m-2 ml-0 p-2 rounded-md">
          <p className="ml-2"> Current competency framework</p>
          <div className="my-2">
            <Badge variant={"secondary"} className="ml-2 p-2 w-fit rounded-sm">
              <span> Skill 1 : Communication Skills </span>{" "}
            </Badge>
            <Badge variant={"secondary"} className="ml-2 p-2 w-fit rounded-sm">
              Skill 2 : Teamwork
            </Badge>
            <Badge variant={"secondary"} className="ml-2 p-2 w-fit rounded-sm">
              Skill 3 : Planning and Organizing
            </Badge>
            <Badge variant={"secondary"} className="ml-2 p-2 w-fit rounded-sm">
              Skill 4 : Client Focus
            </Badge>
          </div>
        </div>
        <div className="bg-gray-200 text-sm w-full m-2 ml-0 p-2 rounded-md">
          <p className="ml-2"> Customize</p>
          <div className="my-2">
            <Badge variant={"secondary"} className="ml-2 p-2 w-fit rounded-sm">
              <span>
                {" "}
                Skill 1 :{" "}
                <span className="bg-green-200 p-1 rounded-sm">
                  Analytical Thinking
                </span>{" "}
              </span>{" "}
            </Badge>
            <Badge variant={"secondary"} className="ml-2 p-2 w-fit rounded-sm">
              Skill 2
            </Badge>
            <Badge variant={"secondary"} className="ml-2 p-2 w-fit rounded-sm">
              Skill 3
            </Badge>
            <Badge variant={"secondary"} className="ml-2 p-2 w-fit rounded-sm">
              Skill 4
            </Badge>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Competencies;
