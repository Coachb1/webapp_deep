"use client";

import BotsNavigation from "@/components/BotsNavigation";
import NavProfile from "@/components/NavProfile";
import Widgets from "@/components/Widgets";

const CreateOwn = ({ user }: any) => {
  return (
    <>
      <div className="bg-gray-100 min-h-screen h-full grainy max-sm:h-full max-sm:min-h-screen pb-16">
        <div className="fixed w-full flex items-center justify-end p-4 h-6 py-8 !z-[800]">
          <NavProfile user={user} />
          <BotsNavigation user={user} />
        </div>
        <div className="flex pt-20 flex-col items-center justify-center text-center px-24 max-sm:px-8">
          <h1 className="text-[#2DC092] border-2 border-[#2DC092] p-[3px] text-xl font-extrabold mt-10 mb-6">
            <span className="bg-[#2DC092] text-white text-lg font-bold mr-[4px] p-[4px]">
              COACH
            </span>
            BOTS
          </h1>
        </div>
      </div>
      <Widgets />
    </>
  );
};

export default CreateOwn;
