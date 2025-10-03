// import React from 'react';

// interface HeroProps {
//   title: string;
//   subTitle: string;
//   imageLink?: string; // Optional, if you want to use a different image
// }

// const Hero: React.FC<HeroProps> = ({ title, subTitle, imageLink }) => {
//   const scrollToSection = () => {
//     document.getElementById('section')?.scrollIntoView({ behavior: 'smooth' });
//   };

//   return (
//     <section className="hero">
//       <div className="container hero-grid">
//         <div className="hero-text">
//           <h1>{title}</h1>
//           <p className="meta">
//             {subTitle}
//           </p>
//           <button className="btn mt-2" onClick={scrollToSection}>
//             View Library
//           </button>
//         </div>
//         <div className="hero-art">
//           {imageLink ? (
//             <img src={imageLink} alt="Hero Art" className="book-hero" />
//           ) : (
//             <img src="/images/Top-1.jpg" alt="Default Hero Art" className="book-hero" />
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default Hero;

import React from "react";

interface HeroProps {
  title: string;
  subTitle: string;
  imageLink?: string;
}

const Hero: React.FC<HeroProps> = ({ title, subTitle, imageLink }) => {
  const scrollToSection = () => {
    document
      .getElementById("section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-[#00c193] text-white py-14 md:py-18 lg:py-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-10 px-4 sm:px-6 lg:px-8">
        {/* Text Section */}
        <div>
          <h1 className="font-['Playfair_Display',serif] text-[28px] sm:text-[32px] md:text-[40px] lg:text-[47px] leading-tight">
            {title}
          </h1>
          <p className="text-gray-100 mt-4 text-base sm:text-lg">{subTitle}</p>
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
            src={imageLink || "/images/Top-1.png"}
            alt="Hero Art"
            className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] rounded-md shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
