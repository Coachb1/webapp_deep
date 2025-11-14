import React, { useEffect, useState } from "react";
import { usePortalUser } from "./context/UserContext";
import { ActionsPerMonth } from "@/lib/api";

interface HeroProps {
  title: string;
  subTitle: string;
  imageLink?: string|null;
  completedCases?: number;
  completedTransformations?: number;
}

const Hero: React.FC<HeroProps> = ({ title, subTitle, imageLink }) => {
  // State to manage user loading status
  const {user, userInfo} = usePortalUser();
  const [showBadge, setShowBadge] = useState(false);
  const [completedTransformations, setCompletedTransformations]  = useState(0);
  const [completedCases, setCompletedCases] = useState(0);

  const scrollToSection = () => {
    document
      .getElementById("section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

    useEffect(() => {
    // Show badge if user has admin access
    if (userInfo?.libraryBotConfig?.show_certification_badge === true) {
      setShowBadge(true);
    } else {
      setShowBadge(false);
    }


    async function getLibActions(userId:string){
      const data = await ActionsPerMonth(userId);
      if (data.jobaid_sessions_created){
        setCompletedTransformations(data.jobaid_sessions_created);
      }
      if (data.modules_completed){
        setCompletedCases(data.modules_completed);
      }
    }
    if (user?.user_data?.uid){
      getLibActions(user?.user_data?.uid)
    }
  }, [userInfo]);

  return (
    <>
      <section className="bg-[#00c193] text-white py-14 md:py-18 lg:py-9">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-10 px-4 sm:px-6 lg:px-8">
          {/* Text Section */}
          <div>
            <h1 className="font-['Playfair_Display',serif] text-[28px] sm:text-[32px] md:text-[40px] lg:text-[36px] leading-tight">
            {title}
            </h1>
          <p className="text-gray-100 mt-4 text-base sm:text-lg lg:text-[16px]">{subTitle}</p>
            <button
              onClick={scrollToSection}
              className="mt-6 inline-block bg-[whitesmoke] text-[#00c193] px-5 py-3 rounded-lg font-bold shadow-[0_8px_16px_rgba(255,107,107,0.25)] border-none cursor-pointer hover:opacity-90 transition"
            >
              View Library
            </button>
          </div>

          {/* Image Section */}
          <div className="flex justify-center md:justify-end">
            <img
              src={imageLink || "/images/Top-1.jpg"}
              alt="Hero Art"
              className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] rounded-md shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </section>

      {/* Progress Section */}
      { showBadge && (
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Title Section */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Master the case library. Earn a verifiable credential: Certified Transformation leader</h2>
            <p className="text-lg text-gray-600 max-w-[90%] xl:max-w-[80%] mx-auto">
              Awarded to leaders who demonstrate consistent mastery of real-world case patterns while logging innovation ideas. Earn this verifiable badge by deeply analyzing 5+ cases and/or logging two transformation project ideas every month. 
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Case Progress Card */}
            <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Based on your Case Progress this Month</h3>
              <div className="flex items-center justify-center space-x-3 text-4xl my-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className={i < Math.min(completedCases, 5) ? "text-yellow-400" : "text-gray-200"}>★</span>
                ))}
              </div>
              <p className="mt-3 text-center text-gray-600">{Math.min(completedCases, 5)}/5 cases completed this month</p>
            </div>

            {/* Transformation Logs Card */}
            <div className="bg-white rounded-xl p-2 shadow-lg border border-gray-100">
              <h3 className="text-xl font-semibold text-gray-800 mb-3 text-center">Based on your Tranformation Logs this Month</h3>
              <div className="flex items-center justify-center space-x-3 text-4xl my-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <span key={i} className={i < Math.min(completedTransformations, 3) ? "text-yellow-400" : "text-gray-200"}>★</span>
                ))}
              </div>
              <p className="mt-3 text-center text-gray-600">{Math.min(completedTransformations, 3)}/3 transformations logs this month</p>
            </div>
          </div>
        </div>
      </section>
      )}
    </>
  );
};

export default Hero;
