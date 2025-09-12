import { Badge } from "./ui/badge";

const WhereToUse = () => {
  return (
    <div>
      <div className="w-full" id="howItWorks">
        <div className={`w-full flex justify-center`}>
          <Badge
            variant={"secondary"}
            className="bg-[#2DC092] z-10 h-6 w-fit text-white text-lg py-3 hover:bg-[#2DC092] text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-sm"
          >
            Where to use
          </Badge>
        </div>
        <div className="w-full ">
          <div className="relative isolate mx-auto">
            <div>
              <div className="mx-auto max-w-3xl px-6 lg:px-8  max-sm:w-full z-50">
                <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-full flex flex-row max-sm:flex-col gap-4 ">
                  <div>
                    <img
                      src="/feedbackSign.png"
                      alt="feedback email sign"
                      className="w-60 max-sm:w-full h-[150px] bg-white p-2 border border-gray-100 shadow-sm rounded-md object-contain"
                    />
                    <p className="text-sm font-semibold text-gray-700 mt-2">
                      Email Signature/ Web
                    </p>
                  </div>
                  <div>
                    <img
                      src="/chatwtu.png"
                      alt="whatsapp"
                      className="w-60 max-sm:w-full h-[150px] bg-white p-2 border bborder-gray-100 shadow-sm rounded-md object-contain"
                    />
                    <p className="text-sm font-semibold text-gray-700 mt-2">
                      Chat platforms - WhatsApp/Slack etc
                    </p>
                  </div>
                  <div>
                    <img
                      src="/lmspmswtu.jpg"
                      alt="feedback email sign"
                      className="w-60 max-sm:w-full  h-[150px] bg-white p-2 border border-gray-100 shadow-sm rounded-md"
                    />
                    <p className="text-sm font-semibold text-gray-700 mt-2">
                      Enterprise systems - LMS/PMS
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhereToUse;
