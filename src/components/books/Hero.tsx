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
<section className="bg-[#ffffff] text-white py-14 md:py-18 lg:py-9 border border-[#00c193]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-10 px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-bold text-[28px] sm:text-[32px] md:text-[40px] lg:text-[36px] leading-tight text-black">
              {title}
            </h1>

            <p className="text-black mt-4 text-base sm:text-lg lg:text-[22px]">
              {subTitle}
            </p>

            <button
              onClick={scrollToSection}
              className="mt-6 inline-block bg-[whitesmoke] text-black px-5 py-3 font-bold  hover:opacity-90 transition border border-[#00c193]"
              style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
            >
              Let's Go
            </button>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={
                imageLink ||
                "https://storage.googleapis.com/publicvid/Case%20Study/WhatsApp%20Image%202025-10-14%20at%2011.39.38_475117de.jpg"
              }
              alt="Hero Art"
              className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] shadow-[0_18px_40px_rgba(0,0,0,0.35)] border border-[#00c193]"style={{ borderRadius: 'calc(var(--radius) - 6px)' }}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
