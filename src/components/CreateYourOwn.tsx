import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

const CreateYourOwn = () => {
  return (
    <div>
      <div className={`w-full flex justify-center`}>
        <Badge
          variant={"default"}
          className="bg-[#5a7eca] h-6 w-fit text-white text-lg py-3 hover:bg-[#5a7eca] z-50 text-center mb-8 mt-12 max-sm:mt-8 max-sm:text-sm"
        >
          ✨ Create your own Senario
        </Badge>
      </div>
      <div>
        <div className="relative isolate mx-auto">
          <div>
            <div className="mx-auto max-w-3xl px-6 lg:px-8 mt-[-1.5rem] max-sm:w-[100%] z-50">
              <div className="rounded-xl bg-white p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4 max-sm:w-[100%]">
                <div>
                  <p className="text-lg text-gray-600 text-center">
                    Create your own senaior
                  </p>
                  <textarea
                    rows={3}
                    className="p-2 max-sm:p-2 mt-3 bg-accent rounded-lg border border-gray-400 w-full text-sm text-gray-600"
                  />
                  <Button className="max-sm:p-2 h-8 bg-[#2DC092] hover:brightness-105 hover:bg-[#2DC092]">
                    Generate
                  </Button>{" "}
                  <span className="text-sm max-sm:text-xs text-gray-500">
                    Please wait, We are generating your senario.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateYourOwn;
