import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "./button";
import { ClientUserType } from "@/lib/types";
import { ReactNode } from "react";
import { Separator } from "./separator";

const UsersPopover = ({
  Users,
  triggerComponent,
}: {
  Users: ClientUserType[];
  triggerComponent: ReactNode;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{triggerComponent}</PopoverTrigger>
      <PopoverContent className="w-80 max-sm:w-56 p-4">
        <p className="text-sm font-semibold my-1">Users</p>
        <div className="max-h-[30vh]  overflow-auto w-full">
          {Users.map((user, i) => (
            <div key={i}>
              <div className="w-full my-2">
                <p className="text-sm font-semibold">{user.userName}</p>
                <p className="text-[12px] text-blue-500">{user.userEmail}</p>
              </div>
              {Users.length !== i + 1 && <Separator />}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UsersPopover;
