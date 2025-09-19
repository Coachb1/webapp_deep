// import { useState, useRef, useEffect, useMemo } from 'react';
// import { Button } from '@/components/books/ui/buttonn';
// import { Input } from '@/components/books/ui/input';
// import { Book } from '@/lib/types';

// interface SearchFilterProps {
//   onSearch: (term: string) => void;
//   onFilterChange: (filter: string) => void;
//   setViewMode: (index: string) => void;
//   books: Book[];
//   viewMode: string;
//   handleResetLibrary: () => void;
// }

// const SearchFilter = ({ onSearch, onFilterChange, setViewMode, books, viewMode, handleResetLibrary }: SearchFilterProps) => {
//   const [activeButton, setActiveButton] = useState<'like' | 'later' | null>(null);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [showDropdown, setShowDropdown] = useState(false);
//   const [selectedFilter, setSelectedFilter] = useState('Filter');
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const handleLikeClick = () => {
//     if (activeButton === 'like') {
//       // 🔹 second click → disable and return to old stage
//       setActiveButton(null);
//       onSearch(''); // show all again
//       setViewMode('all')
//     } else {
//       // 🔹 first click → activate and show liked
//       setActiveButton('like');
//       setViewMode('liked')
//     }
//   };

//   useEffect(() => {
//     // if viewmode is all then reset like and later button
//     if (viewMode.includes('reset-')) {
//       setActiveButton(null);
//       onSearch(''); 
//       setSearchTerm('');
//       setSelectedFilter('Filter');
//       setShowDropdown(false);
//       onFilterChange('');
//       setViewMode('all');
//     }
//   }, [viewMode]);

//   // Log state changes after reset for debugging
//   useEffect(() => {
//     console.log('searchfilter state changed:', {
//       viewMode,
//       searchTerm,
//       selectedFilter,
//       activeButton
//     });
//   }, [viewMode, searchTerm, selectedFilter, activeButton]);

//   const handleLaterClick = () => {
//     if (activeButton === 'later') {
//       // 🔹 second click → disable and return to old stage
//       setActiveButton(null);
//       onSearch(''); // show all again
//       setViewMode('all')
//     } else {
//       // 🔹 first click → activate and show later
//       setActiveButton('later');
//       setViewMode('later')
//     }
//   };
//   // Extract unique categories from book.tag
//   const categories = useMemo(() => {
//     const normalized = books.flatMap(book => book.tag?.map((t: string) => t.toLowerCase().trim()) ?? []);
//     const unique = Array.from(new Set(normalized));
//     const capitalized = unique.map(t => t.charAt(0).toUpperCase() + t.slice(1));
//     console.log("Categories:", capitalized);
//     return capitalized;
//   }, []);


//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, []);

//   const handleSearch = () => {
//     if (searchTerm.trim() === '') {
//       alert('Please enter a search term to find books.');
//       return;
//     }
//     onSearch(searchTerm);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === 'Enter') {
//       handleSearch();
//     }
//   };

//   const handleCategorySelect = (category: string) => {
//     setSearchTerm(category);
//     setSelectedFilter(category);
//     setShowDropdown(false);
//     onFilterChange(category);
//     onSearch(category);
//   };
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setShowDropdown(false);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, []);

//   return (
//     <div className="search-container w-full max-w-6xl mx-auto px-2 sm:px-4 flex flex-col gap-3" id="search-container">
//       {/* Search Bar */}
//       <div className="flex flex-col sm:flex-row justify-center items-center gap-2 w-full">
//         <Button onClick={handleResetLibrary} className="like-button px-6 sm:py-4 text-sm sm:text-base rounded-2xl shadow-md bg-[#00c193] text-white">
//           Reset
//         </Button>
//         <div className="search-bar-wrapper flex gap-2 items-center w-full sm:w-auto">
//           <Input
//             type="text"
//             placeholder="What are you looking for?"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             onKeyDown={handleKeyPress} // ✅ changed from onKeyPress
//             className="search-input w-full sm:w-80"
//           />
//           <Button
//             onClick={handleSearch}
//             className="search-button"
//             aria-label="Search"
//           >
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="#ffffff"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <circle cx="11" cy="11" r="8"></circle>
//               <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
//             </svg>
//           </Button>
//         </div>

//         {/* Filter + Extra Buttons */}
//         <div className="flex  flex-wrap gap-2 items-center relative " ref={dropdownRef}>
//           {/* Filter Button */}
//           <Button
//             variant="ghost"
//             onClick={() => setShowDropdown(!showDropdown)}
//             className="dropdown-button flex items-center gap-1"
//           >
//             {selectedFilter}
//             <svg
//               width="16"
//               height="16"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="2"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
//             </svg>
//           </Button>
//           {/* Dropdown Menu */}
//           {showDropdown && (
//             <ul className="dropdown-menu absolute mt-12 bg-white shadow-md rounded-md p-2 z-20">
//               {categories.map((category) => (
//                 <li
//                   key={category}
//                   className="dropdown-item px-3 py-1 cursor-pointer hover:bg-gray-200 rounded-md"
//                   onClick={() => handleCategorySelect(category)}
//                 >
//                   {category}
//                 </li>
//               ))}
//             </ul>
//           )}
          
//           {/* Dropdown Menu */}
//           {showDropdown && (
//             <ul className="dropdown-menu absolute mt-12 bg-white shadow-md rounded-md p-2 z-20">
//               {categories.map((category) => (
//                 <li
//                   key={category}
//                   className="dropdown-item px-3 py-1 cursor-pointer hover:bg-gray-200 rounded-md"
//                   onClick={() => handleCategorySelect(category)}
//                 >
//                   {category}
//                 </li>
//               ))}
//             </ul>
//           )}

//           {/* Like Button */}
//           <div className="flex gap-2 items-center">
//             {/* Like Button */}
//             <Button
//               onClick={handleLikeClick}
//               className={`like-button px-6 sm:py-4 text-sm sm:text-base rounded-2xl shadow-md 
//           ${activeButton === 'like' ? 'bg-green-600 text-white' : 'bg-[#00c193] text-white hover:bg-green-600'}`}
//             >
//               Like
//             </Button>

//             {/* Later Button */}
//             <Button
//               onClick={handleLaterClick}
//               className={`later-button px-6 py-2 rounded-2xl shadow-md 
//           ${activeButton === 'later' ? 'bg-green-600 text-white' : 'bg-[#00c193] text-white hover:bg-green-600'}`}
//             >
//              Listen Later
//             </Button>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default SearchFilter;

import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/books/ui/buttonn";
import { Input } from "@/components/books/ui/input";
import { Book } from "@/lib/types";

interface SearchFilterProps {
  onSearch: (term: string) => void;
  onFilterChange: (filter: string) => void;
  setViewMode: (index: string) => void;
  books: Book[];
  viewMode: string;
  handleResetLibrary: () => void;
}

const SearchFilter = ({
  onSearch,
  onFilterChange,
  setViewMode,
  books,
  viewMode,
  handleResetLibrary,
}: SearchFilterProps) => {
  const [activeButton, setActiveButton] = useState<"like" | "later" | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLikeClick = () => {
    if (activeButton === "like") {
      setActiveButton(null);
      onSearch("");
      setViewMode("all");
    } else {
      setActiveButton("like");
      setViewMode("liked");
    }
  };

  const handleLaterClick = () => {
    if (activeButton === "later") {
      setActiveButton(null);
      onSearch("");
      setViewMode("all");
    } else {
      setActiveButton("later");
      setViewMode("later");
    }
  };

  // Reset handling
  useEffect(() => {
    if (viewMode.includes("reset-")) {
      setActiveButton(null);
      onSearch("");
      setSearchTerm("");
      setSelectedFilter("Filter");
      setShowDropdown(false);
      onFilterChange("");
      setViewMode("all");
    }
  }, [viewMode]);

  // Categories
  const categories = useMemo(() => {
    const normalized = books.flatMap(
      (book) => book.tag?.map((t: string) => t.toLowerCase().trim()) ?? []
    );
    const unique = Array.from(new Set(normalized));
    const capitalized = unique.map(
      (t) => t.charAt(0).toUpperCase() + t.slice(1)
    );
    return capitalized;
  }, []);

  // Dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      alert("Please enter a search term to find books.");
      return;
    }
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCategorySelect = (category: string) => {
    setSearchTerm(category);
    setSelectedFilter(category);
    setShowDropdown(false);
    onFilterChange(category);
    onSearch(category);
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 flex flex-col gap-3">
      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 w-full">
        {/* Reset */}
        <Button
          className="px-6 py-2 sm:py-3 text-sm sm:text-base rounded-2xl shadow-md bg-[#00c193] text-white hover:bg-green-600 transition"
          onClick={handleResetLibrary}
        >
          Reset
        </Button>

        {/* Search */}
        <div className="flex items-center gap-2 bg-white rounded-full px-3 py-2 shadow border border-gray-200 w-full sm:max-w-md">
          <Input
            type="text"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-grow border-none focus:ring-0 text-base sm:text-sm"
          />
          <Button
            onClick={handleSearch}
            className="flex items-center justify-center bg-[#00c193] hover:bg-green-600 rounded-full w-10 h-10 transition"
            aria-label="Search"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </Button>
        </div>

        {/* Filter + Like/Later */}
        <div
          className="flex flex-wrap gap-2 items-center relative"
          ref={dropdownRef}
        >


          {/* Like + Later */}
          <div className="flex gap-2 items-center">
                      {/* Filter */}
          <Button
            variant="ghost"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1 border border-gray-300 rounded-xl bg-white shadow px-3 py-2 text-sm sm:text-base text-gray-600"
          >
            {selectedFilter}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
          </Button>

          {showDropdown && (
            <ul className="absolute top-full mt-2 bg-white shadow-lg rounded-md p-2 z-20 w-40">
              {categories.map((category) => (
                <li
                  key={category}
                  className="px-3 py-2 text-sm cursor-pointer hover:bg-gray-100 rounded"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
            <Button
              onClick={handleLikeClick}
              className={`px-6 py-2 sm:py-3 text-sm sm:text-base rounded-2xl shadow-md transition ${
                activeButton === "like"
                  ? "bg-green-600 text-white"
                  : "bg-[#00c193] text-white hover:bg-green-600"
              }`}
            >
              Like
            </Button>

            <Button
              onClick={handleLaterClick}
              className={`px-6 py-2 sm:py-3 text-sm sm:text-base rounded-2xl shadow-md transition ${
                activeButton === "later"
                  ? "bg-green-600 text-white"
                  : "bg-[#00c193] text-white hover:bg-green-600"
              }`}
            >
              Listen Later
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;

