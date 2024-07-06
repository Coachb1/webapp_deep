import React, { useState } from "react";
import { Button } from "./ui/button";

interface ReadMoreProps {
  text: string;
  maxWords?: number;
}

const ReadMore: React.FC<ReadMoreProps> = ({ text, maxWords = 70 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const words = text.split(" ");
  const shouldShowReadMore = words.length > maxWords;
  const displayedText = isExpanded
    ? text
    : words.slice(0, maxWords).join(" ") + (shouldShowReadMore ? "..." : "");

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      {text.split(" ").length <= 70 ? (
        <>{text}</>
      ) : (
        <div>
          <p className="inline">{displayedText}</p>
          {shouldShowReadMore && (
            <Button
              className="inline p-0 pl-1 m-0 mt-0 pt-0 text-sm max-sm:text-xs"
              variant={"link"}
              onClick={toggleReadMore}
            >
              {isExpanded ? "Show less" : "Read more"}
            </Button>
          )}
        </div>
      )}
    </>
  );
};

export default ReadMore;
