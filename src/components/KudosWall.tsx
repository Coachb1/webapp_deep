import { Quote, ThumbsUpIcon } from "lucide-react";

interface FeedbackType {
  name: string;
  feedback: string;
  date: string;
}

const KudosWall = ({ name, feedback, date }: FeedbackType) => {
  return (
    <div className="w-full border border-gray-100 shadow-sm rounded-md text-center text-sm max-sm:text-xs p-4 pl-2 text-gray-600 flex flex-row items-center justify-center">
      <div className="p-4">
        <p className="my-2 font-semibold">
          {name} | {date}
        </p>
        <p className=" text-xs">{feedback}</p>
      </div>
      <div className="ml-4">
        <ThumbsUpIcon className="h-8 w-8 text-green-400" />
      </div>
    </div>
  );
};

export default KudosWall;
