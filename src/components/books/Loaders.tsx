export const LibraryPageLoader = () => {
  return (
    <div className="w-full">

      {/* 🔰 TOP FILTER LOADING BOX */}
      <div className="w-full flex justify-center mt-8 px-4">
        <div className="bg-white border rounded-2xl px-6 py-6 shadow-sm w-full max-w-6xl animate-pulse">
          
          {/* Filter header placeholder */}
          <div className="h-5 w-40 bg-gray-200 rounded mb-5 mx-auto" />

          {/* Search + filter row */}
          <div className="flex flex-wrap justify-center gap-4">

            {/* Reset Button */}
            <div className="h-10 w-24 bg-gray-200 rounded" />

            {/* Search Bar */}
            <div className="h-10 w-72 bg-gray-200 rounded" />

            {/* Search Icon */}
            <div className="h-10 w-10 bg-gray-200 rounded-full" />

            {/* Like Button */}
            <div className="h-10 w-20 bg-gray-200 rounded" />

            {/* Discuss Button */}
            <div className="h-10 w-28 bg-gray-200 rounded" />
          </div>

          {/* Dropdown */}
          <div className="flex justify-center mt-6">
            <div className="h-10 w-40 bg-gray-200 rounded" />
          </div>
        </div>
      </div>

      {/* 🔰 MAIN BOOK GRID LOADER */}
      <div className="max-w-6xl mx-auto mt-10 px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate-pulse">
        
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="border rounded-xl p-4 shadow-sm"
          >
            {/* Book cover */}
            <div className="h-52 w-full bg-gray-200 rounded-xl mb-4" />

            {/* Title line 1 */}
            <div className="h-4 w-3/4 bg-gray-300 rounded mb-2" />

            {/* Title line 2 */}
            <div className="h-3 w-1/2 bg-gray-300 rounded mb-2" />

            {/* Subtitle */}
            <div className="h-3 w-2/3 bg-gray-200 rounded" />
          </div>
        ))}

      </div>

    </div>
  );
};


export const HeroLoader = () => (
  <section className="bg-[#00c193] text-white py-14 md:py-18 lg:py-9">
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-10 px-4 sm:px-6 lg:px-8">

      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-2/3 bg-white/30 rounded" />
        <div className="h-4 w-3/4 bg-white/20 rounded" />
        <div className="h-10 w-40 bg-white/30 rounded mt-6" />
      </div>

      <div className="flex justify-center md:justify-end">
        <div className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] h-[200px] bg-white/20 rounded-md animate-pulse" />
      </div>

    </div>
  </section>
);
