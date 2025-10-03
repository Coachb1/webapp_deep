// const CTA = () => {
//   return (
//     <section className="cta mt-4">
//       <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
//         {/* Text Section */}
//         <div className="cta-text text-center md:text-left">
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
//             Got questions on featured books?
//           </h2>
//           <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
//             Chat with our <span className="font-semibold">StoryInsight BoT</span> 
//             to dig deeper for more insights and unlock real insights for the workplace.
//           </p>
//         </div>

//         {/* Image Section */}
//         <div className="flex justify-center md:justify-end">
//           <img
//             src="https://res.cloudinary.com/dtbl4jg02/image/upload/v1758006047/qv7wtviy89dy26pg2w2p.png"
//             alt="Reader illustration"
//             className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full h-auto"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CTA;


const CTA = () => {
  return (
    <section className="bg-[#fff0f2] border-y border-[#f0d9db] py-14 mt-4">
      <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 md:grid-cols-[1.1fr_1fr] items-center gap-8">
        {/* Text Section */}
        <div className="text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#0e3a3f] leading-tight mb-5">
            Got questions on featured books?
          </h2>
          <p className="text-[#0e3a3f] font-normal max-w-prose mx-auto md:mx-0 text-sm sm:text-base">
            Would you like to request a book innovation guide? Request it via the chat widget.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://res.cloudinary.com/dtbl4jg02/image/upload/v1758006047/qv7wtviy89dy26pg2w2p.png"
            alt="Reader illustration"
            className="w-full h-auto max-w-xs sm:max-w-sm md:max-w-md lg:max-w-[620px] rounded-lg object-cover md:ml-10"
          />
        </div>
      </div>
    </section>
  );
};

export default CTA;

