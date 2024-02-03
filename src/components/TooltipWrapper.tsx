import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";

export function TooltipWrapper({
  body,
  tooltipName,
  className,
}: {
  body: React.ReactNode;
  tooltipName: string;
  className: string;
}) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{body}</TooltipTrigger>
        <TooltipContent className={className}>{tooltipName}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
