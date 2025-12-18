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
  <section className="bg-white border border-[#00c193] py-14 md:py-18 lg:py-9">
    <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-10 px-4 sm:px-6 lg:px-8">

      {/* Left skeleton */}
      <div className="space-y-4 animate-pulse">
        <div className="h-8 w-2/3 bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-10 w-32 bg-gray-300 rounded mt-6" />
      </div>

      {/* Right image skeleton */}
      <div className="flex justify-center md:justify-end">
        <div className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] h-[200px] bg-gray-200 rounded-md border border-[#00c193] shadow-md animate-pulse" />
      </div>

    </div>
  </section>
);



export const ConceptsBoxLoader = () => {
  return (
    <div className="w-full flex justify-center mt-10 px-4 animate-pulse">
      <div className="relative bg-white border rounded-2xl px-6 py-6 shadow-sm w-full max-w-6xl">

        {/* Title placeholder */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-5 py-[6px] rounded-xl shadow bg-gray-300 w-52 h-7" />

        {/* Tab pill loaders */}
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 mt-8">

          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="h-10 w-36 bg-gray-200 rounded-md border border-gray-300"
            />
          ))}

        </div>
      </div>
    </div>
  );
};

export const CompanyIQLoader = () => {
  return (
    <div className=" animate-pulse">

      {/* 🔰 HERO / TITLE BOX */}
      <div className=" mx-auto px-4 mt-6">
        <div className="border border-[#00c193] rounded-2xl p-6 bg-white">
          <div className="h-7 w-72 bg-gray-200 rounded mb-3" />
          <div className="h-4 w-[520px] max- bg-gray-200 rounded" />
        </div>
      </div>

      {/* 🔰 SEARCH BAR */}
      <div className=" mx-auto px-4 mt-6">
        <div className="h-12  bg-gray-200 rounded-full" />
      </div>

      {/* 🔰 FILTER BAR */}
      <div className=" mx-auto px-4 mt-6">
        <div className="border border-[#00c193] rounded-2xl p-5 bg-white flex flex-wrap gap-4 items-center justify-center">

          <div className="h-5 w-20 bg-gray-200 rounded" />

          <div className="h-10 w-36 bg-gray-200 rounded-md" />
          <div className="h-10 w-36 bg-gray-200 rounded-md" />
          <div className="h-10 w-36 bg-gray-200 rounded-md" />
          <div className="h-10 w-36 bg-gray-200 rounded-md" />

          <div className="h-10 w-24 bg-gray-300 rounded-md" />
          <div className="h-4 w-16 bg-gray-200 rounded" />
        </div>
      </div>

      {/* 🔰 RESULT COUNT */}
      <div className=" mx-auto px-4 mt-6">
        <div className="h-4 w-40 bg-gray-200 rounded" />
      </div>

      {/* 🔰 COMPANY CARD GRID */}
      <div className=" mx-auto px-4 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="border border-[#00c193] rounded-2xl p-5 bg-white shadow-sm"
          >
            {/* Company name */}
            <div className="h-5 w-32 bg-gray-300 rounded mb-2" />
            <div className="h-3 w-24 bg-gray-200 rounded mb-4" />

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-5">
              <div>
                <div className="h-3 w-10 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-20 bg-gray-300 rounded" />
              </div>
              <div>
                <div className="h-3 w-16 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-24 bg-gray-300 rounded" />
              </div>
              <div>
                <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
                <div className="h-4 w-16 bg-gray-300 rounded" />
              </div>
            </div>

            {/* Accordion placeholders */}
            <div className="space-y-3">
              <div className="h-10  bg-gray-200 rounded-md" />
              <div className="h-10  bg-gray-200 rounded-md" />
              <div className="h-10  bg-gray-200 rounded-md" />
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
