const CTA = () => {
  return (
    <section className="cta mt-4">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        {/* Text Section */}
        <div className="cta-text text-center md:text-left">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Got questions on featured books?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-700 leading-relaxed">
            Chat with our <span className="font-semibold">StoryInsight BoT</span> 
            to dig deeper for more insights and unlock real insights for the workplace.
          </p>
        </div>

        {/* Image Section */}
        <div className="flex justify-center md:justify-end">
          <img
            src="https://res.cloudinary.com/dtbl4jg02/image/upload/v1758006047/qv7wtviy89dy26pg2w2p.png"
            alt="Reader illustration"
            className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg w-full h-auto"
          />
        </div>
      </div>
    </section>
  );
};

export default CTA;
