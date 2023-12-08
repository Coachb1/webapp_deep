import Image from "next/image";
import Link from "next/link";

const PageFooter = () => {
  return (
    <>
      <hr className="my-4 mt-16  max-sm:mt-4 w-[80%] mx-auto" />
      <div className="h-[10vh] max-sm:h-[8vh] text-sm text-gray-700 mx-16 mb-0 max-sm:mx-8 ">
        <div className="flex flex-col items-center justify-between text-center">
          <div>
            <Link href={"https://www.coachbots.com/"}>
              <Image
                src={"/coachbots-logo-ts.svg"}
                alt="coachbots-logo-lg"
                height={80}
                width={180}
                className="max-sm:h-[40px] max-sm:w-[120px]"
              />
            </Link>
          </div>
          <div className="flex gap-4 max-sm:flex-col max-sm:gap-1 max-sm:text-xs mt-2">
            <Link
              href={"https://www.coachbots.com/interaction-report-analysis"}
              target="_blank"
            >
              Interaction Analysis
            </Link>
            <Link
              href={"https://www.coachbots.com/terms-privacy-policy"}
              target="_blank"
            >
              Terms & Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-center mt-2 max-sm:text-xs">
          <p>&copy; 2023 Coachbots™. All Rights Reserved.</p>
        </div>
      </div>
    </>
  );
};

export default PageFooter;
