import { useState, useRef, useEffect, useMemo } from 'react';
import { Button } from '@/components/books/ui/buttonn';
import { Input } from '@/components/books/ui/input';
import { Book } from '@/lib/types';

interface SearchFilterProps {
  onSearch: (term: string) => void;
  onFilterChange: (filter: string) => void;
  setViewMode: (index: string) => void;
  books: Book[];
  viewMode: string;
}

const SearchFilter = ({ onSearch, onFilterChange, setViewMode, books, viewMode }: SearchFilterProps) => {
  const [activeButton, setActiveButton] = useState<'like' | 'later' | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Filter');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLikeClick = () => {
    if (activeButton === 'like') {
      // 🔹 second click → disable and return to old stage
      setActiveButton(null);
      onSearch(''); // show all again
      setViewMode('all')
    } else {
      // 🔹 first click → activate and show liked
      setActiveButton('like');
      setViewMode('liked')
    }
  };

  useEffect(() => {
    // if viewmode is all then reset like and later button
    if (viewMode.includes('reset-')) {
      setActiveButton(null);
      onSearch(''); 
      setSearchTerm('');
      setSelectedFilter('Filter');
      setShowDropdown(false);
      onFilterChange('');
      setViewMode('all');
    }
  }, [viewMode]);

  // Log state changes after reset for debugging
  useEffect(() => {
    console.log('searchfilter state changed:', {
      viewMode,
      searchTerm,
      selectedFilter,
      activeButton
    });
  }, [viewMode, searchTerm, selectedFilter, activeButton]);

  const handleLaterClick = () => {
    if (activeButton === 'later') {
      // 🔹 second click → disable and return to old stage
      setActiveButton(null);
      onSearch(''); // show all again
      setViewMode('all')
    } else {
      // 🔹 first click → activate and show later
      setActiveButton('later');
      setViewMode('later')
    }
  };
  // Extract unique categories from book.tag
  const categories = useMemo(() => {
    const normalized = books.flatMap(book => book.tag?.map((t: string) => t.toLowerCase().trim()) ?? []);
    const unique = Array.from(new Set(normalized));
    const capitalized = unique.map(t => t.charAt(0).toUpperCase() + t.slice(1));
    console.log("Categories:", capitalized);
    return capitalized;
  }, []);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === '') {
      alert('Please enter a search term to find books.');
      return;
    }
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
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
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div className="search-container w-full max-w-6xl mx-auto px-2 sm:px-4 flex flex-col gap-3" id="search-container">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-2 w-full">
        <div className="search-bar-wrapper flex gap-2 items-center w-full sm:w-auto">
          <Input
            type="text"
            placeholder="What are you looking for?"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyPress} // ✅ changed from onKeyPress
            className="search-input w-full sm:w-80"
          />
          <Button
            onClick={handleSearch}
            className="search-button"
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

        {/* Filter + Extra Buttons */}
        <div className="flex  flex-wrap gap-2 items-center relative " ref={dropdownRef}>
          {/* Filter Button */}
          <Button
            variant="ghost"
            onClick={() => setShowDropdown(!showDropdown)}
            className="dropdown-button flex items-center gap-1"
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
          {/* Dropdown Menu */}
          {showDropdown && (
            <ul className="dropdown-menu absolute mt-12 bg-white shadow-md rounded-md p-2 z-20">
              {categories.map((category) => (
                <li
                  key={category}
                  className="dropdown-item px-3 py-1 cursor-pointer hover:bg-gray-200 rounded-md"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}
          
          {/* Dropdown Menu */}
          {showDropdown && (
            <ul className="dropdown-menu absolute mt-12 bg-white shadow-md rounded-md p-2 z-20">
              {categories.map((category) => (
                <li
                  key={category}
                  className="dropdown-item px-3 py-1 cursor-pointer hover:bg-gray-200 rounded-md"
                  onClick={() => handleCategorySelect(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          )}

          {/* Like Button */}
          <div className="flex gap-2 items-center">
            {/* Like Button */}
            <Button
              onClick={handleLikeClick}
              className={`like-button px-6 sm:py-4 text-sm sm:text-base rounded-2xl shadow-md 
          ${activeButton === 'like' ? 'bg-green-600 text-white' : 'bg-[#00c193] text-white hover:bg-green-600'}`}
            >
              Like
            </Button>

            {/* Later Button */}
            <Button
              onClick={handleLaterClick}
              className={`later-button px-6 py-2 rounded-2xl shadow-md 
          ${activeButton === 'later' ? 'bg-green-600 text-white' : 'bg-[#00c193] text-white hover:bg-green-600'}`}
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

