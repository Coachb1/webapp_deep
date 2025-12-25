import React, { useState } from "react";
import { HeroLoader } from "./Loaders";

interface HeroProps {
  title: string | null;
  subTitle: string | null;
  imageLink?: string | null;
}

const Hero: React.FC<HeroProps> = ({ title, subTitle, imageLink }) => {

  const scrollToSection = () => {
    document.getElementById("section")?.scrollIntoView({ behavior: "smooth" });
  };


  // ⭐ LOADER CHECK
  const isLoading = !title && !subTitle;

  if (isLoading) {
    return <HeroLoader />;
  }


  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#ffffff] text-white py-1 sm:py-2 md:py-3 lg:py-4 xl:py-5 border border-[#00c193]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-6 sm:gap-8 md:gap-10 lg:gap-12 px-4 sm:px-6 lg:px-8">
          {/* Text Content */}
          <div className="text-center md:text-left">
            <h1 className="
              font-inter
              font-medium
              text-[22px]
              xs:text-[26px]
              sm:text-[30px]
              md:text-[34px]
              lg:text-[38px]
              xl:text-[42px]
              leading-[1.25]
              tracking-[-0.01em]
              text-black
              title-bold
              uppercase
            ">
              {title}
            </h1>


            <p className="text-black mt-3 sm:mt-4 md:mt-5 text-sm xs:text-base sm:text-lg md:text-xl lg:text-[22px] leading-relaxed">
              {subTitle}
            </p>

            {/* Uncomment if needed
            <button
              onClick={scrollToSection}
              className="mt-4 sm:mt-5 md:mt-6 inline-block bg-[whitesmoke] text-black px-4 sm:px-5 py-2.5 sm:py-3 text-sm sm:text-base font-bold hover:opacity-90 transition border border-[#00c193]"
              style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
            >
              Let's Go
            </button>
            */}
          </div>

          {/* Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src={
                imageLink ||
                "https://storage.googleapis.com/publicvid/Case%20Study/WhatsApp%20Image%202025-10-14%20at%2011.39.38_475117de.jpg"
              }
              alt="Hero Art"
              className="w-[180px] xs:w-[200px] sm:w-[240px] md:w-[260px] lg:w-[300px] xl:w-[340px] max-w-full h-auto shadow-[0_12px_28px_rgba(0,0,0,0.25)] sm:shadow-[0_16px_32px_rgba(0,0,0,0.3)] md:shadow-[0_18px_40px_rgba(0,0,0,0.35)] border border-[#00c193]"
              style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
