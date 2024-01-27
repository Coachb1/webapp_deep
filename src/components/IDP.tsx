"use client";

import { Loader } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const IDP = ({ user }: any) => {
  const [loading, setLoading] = useState(false);

  return (
    <div className="bg-accent p-2 mt-2 rounded-md">
      <div className="pl-4 max-sm:pl-2 pt-2">Individual Development Plan</div>
      {loading && (
        <>
          <div className="text-xs w-full h-20 flex items-center justify-center">
            <div>
              <Loader className="h-4 w-4 mr-2 animate-spin inline" /> Loading
            </div>
          </div>
        </>
      )}
      {true && (
        <>
          <div className="text-xs w-full h-20 flex items-center justify-center">
            <div>You don't have IDP's yet.</div>{" "}
            <Link href={"/intake/?type=IDP"}></Link>
            <Button className="pl-1" variant={"link"}>
              Create one?
            </Button>
          </div>
        </>
      )}
      <div className="m-4 text-sm max-sm:m-2"></div>
    </div>
  );
};

export default IDP;
