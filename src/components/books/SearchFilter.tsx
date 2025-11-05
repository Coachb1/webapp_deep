import { useState, useRef, useEffect, useMemo } from "react";
import { Button } from "@/components/books/ui/buttonn";
import { Input } from "@/components/books/ui/input";
import { Book } from "@/lib/types";

interface FilterCategory {
  filterName: string;
  filterOptions: string[];
}

interface SearchFilterProps {
  onSearch: (term: string) => void;
  onMultipleSearch: (
    tag?: string,
    listName?: string,
    businessOutcome?: string,
    implementationComplexity?: string,
    unexpectedOutcomes?: string,
    emergingPlayers?: string,
    Function?: string
  ) => void;
  onFilterChange: (filter: string) => void;
  setViewMode: (index: string) => void;
  books: Book[];
  viewMode: string;
  handleResetLibrary: () => void;
  availableFilters: string;
  showSearchBar: boolean;
  defaultFilters: Record<string, string>;
  clientDepartments?: string;
  clientExpertise?: string;
}

const SearchFilter = ({
  onSearch,
  onMultipleSearch,
  onFilterChange,
  setViewMode,
  books,
  viewMode,
  handleResetLibrary,
  clientDepartments,
  clientExpertise,
  availableFilters,
  showSearchBar,
  defaultFilters
}: SearchFilterProps) => {
  const [activeButton, setActiveButton] = useState<"like" | "later" | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [emergingPlayersChecked, setEmergingPlayersChecked] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const [hasEmergingPlayers, setHasEmergingPlayers] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>(
    []
  );
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<
    string | null
  >(null);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  // Categories - MOVE HERE (before the useEffect)
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
  const functions = useMemo(() => {
    const normalized = books.flatMap(
      (book) => book.function?.map((f: string) => f.trim()) ?? []
    );
    return Array.from(new Set(normalized)).filter(Boolean);
  }, []);

  const businessOutcomes = useMemo(() => {
    const normalized = books.flatMap(
      (book) => book.business_outcome?.map((b: string) => b.trim()) ?? []
    );
    return Array.from(new Set(normalized)).filter(Boolean);
  }, []);

  const implementationComplexities = useMemo(() => {
    const normalized = books.flatMap(
      (book) =>
        book.implementation_complexity?.map((c: string) => c.trim()) ?? []
    );
    return Array.from(new Set(normalized)).filter(Boolean);
  }, []);

  const unexpectedOutcomes = useMemo(() => {
    const normalized = books.flatMap(
      (book) => book.unexpected_outcomes?.map((u: string) => u.trim()) ?? []
    );
    return Array.from(new Set(normalized)).filter(Boolean);
  }, []);


  // Initialize filter categories
  useEffect(() => {
    
  let filterCategories = [];

  if (availableFilters.includes("Industry")) {
    filterCategories.push({
      filterName: "Industry",
      filterOptions: categories,
    });
  }
  if (availableFilters.includes("Function")) {
    filterCategories.push({
      filterName: "Function",
      filterOptions: functions?.length > 0
        ? functions
        : [],
    });
  }
  if (availableFilters.includes("Business Outcome")) {
    filterCategories.push({
      filterName: "Business Outcome",
      filterOptions: businessOutcomes?.length > 0
        ? businessOutcomes
        : [],
    });
  }
  if (availableFilters.includes("Implementation Complexity")) {
    filterCategories.push({
      filterName: "Implementation Complexity",
      filterOptions: implementationComplexities?.length > 0
        ? implementationComplexities
        : [],
    });
  }
  if (availableFilters.includes("Unexpected Outcomes")) {
    filterCategories.push({
      filterName: "Unexpected Outcomes",
      filterOptions: unexpectedOutcomes?.length > 0
        ? unexpectedOutcomes
        : [],
    });
  }

  setFilterCategories(filterCategories);
  setHasEmergingPlayers(availableFilters.includes("Emerging Players"));
}, [
  availableFilters,
  categories,
  functions,
  businessOutcomes,
  implementationComplexities,
  unexpectedOutcomes,
]);



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
      setSelectedFilters({});
      setSelectedIndustries([]);
      setActiveFilterDropdown(null);
      onFilterChange("");
      setViewMode("all");
      setEmergingPlayersChecked(false);
    }
  }, [viewMode]);

  // Dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveFilterDropdown(null);
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

  const handleIndustryToggle = (option: string) => {
    const newIndustries = selectedIndustries.includes(option)
      ? selectedIndustries.filter((ind) => ind !== option)
      : [...selectedIndustries, option];

    setSelectedIndustries(newIndustries);

    // Apply filter for each selected industry
    if (newIndustries.length > 0) {
      // Pass all industries to parent - parent should handle multi-filter logic
      onFilterChange(newIndustries.join(","));
    } else {
      onSearch("");
      onFilterChange("");
      setSearchTerm("");
    }
  };

  const handleRemoveIndustry = (industry: string) => {
    const newIndustries = selectedIndustries.filter((ind) => ind !== industry);
    setSelectedIndustries(newIndustries);

    if (newIndustries.length > 0) {
      onFilterChange(newIndustries.join(","));
    } else {
      onSearch("");
      onFilterChange("");
      setSearchTerm("");
    }
  };

  const handleFilterSelect = (filterName: string, option: string) => {
    // Skip if it's Industries - handled by checkboxes
    if (filterName === "Industries") return;

    console.log("handlefilterselect")

    const newFilters = { ...selectedFilters };
    console.log("Selected filter:", filterName, "Option:", option, selectedFilters);
    if (newFilters[filterName] === option) {
      // Deselecting - clear filter
      delete newFilters[filterName];
    } else {
      // Selecting - apply filter
      newFilters[filterName] = option;
    }
    setSelectedFilters(newFilters);
    setActiveFilterDropdown(null);
    onMultipleSearch(
      newFilters["Industry"],
      "",
      newFilters["Business Outcome"],
      newFilters["Implementation Complexity"],
      newFilters["Unexpected Outcomes"],
      "" , // Reset emerging players on other filter change
      newFilters["Function"],
    );
    console.log("Applied filters:", newFilters,newFilters["Function"]);
  };

  const handleEmergingPlayersToggle = () => {
    setEmergingPlayersChecked(!emergingPlayersChecked);
    onMultipleSearch(
      selectedFilters["Industry"],
      "",
      selectedFilters["Business Outcome"],
      selectedFilters["Implementation Complexity"],
      selectedFilters["Unexpected Outcomes"],
      !emergingPlayersChecked ? "true" : "false",
      selectedFilters["Function"],
    );
  }

    useEffect(() => {
    // On mount, apply default filters if defaults
    
    const defaultSelectedFilters: Record<string, string> = {};

    // Industry take from defaults
    if (defaultFilters["industry"]?.length > 0) {
      defaultSelectedFilters["Industry"] = defaultFilters["industry"];
    }
    
    // Other filters
    if (defaultFilters["business_outcome"]?.length > 0) {
      defaultSelectedFilters["Business Outcome"] = defaultFilters["business_outcome"];
    }
    if (defaultFilters["implementation_complexity"]?.length > 0) {
      defaultSelectedFilters["Implementation Complexity"] = defaultFilters["implementation_complexity"];
    }
    if (defaultFilters["unexpected_outcomes"]?.length > 0) {
      defaultSelectedFilters["Unexpected Outcomes"] = defaultFilters["unexpected_outcomes"];
    }
    if (defaultFilters["function"]?.length > 0) {
      defaultSelectedFilters["Function"] = defaultFilters["function"];
    }
    let defaultEmergingPlayers= ""
    if (defaultFilters['emerging_players']?.length >0 ){
      defaultEmergingPlayers = defaultFilters["emerging_players"] === "true" ? "true" : "false"
      setEmergingPlayersChecked(defaultEmergingPlayers === "true"? true: false);
    }

    
    // apply defaults to visible UI state
    setSelectedFilters(defaultSelectedFilters);
    setActiveFilterDropdown(null);

    console.log('[Applying default filters on mount:', defaultSelectedFilters, defaultEmergingPlayers);
    onMultipleSearch(
      defaultSelectedFilters?.['Industry'] || "",
      "",
      defaultSelectedFilters?.["Business Outcome"] || "",
      defaultSelectedFilters?.["Implementation Complexity"]|| "",
      defaultSelectedFilters?.["Unexpected Outcomes"] || "",
      defaultEmergingPlayers,
      defaultSelectedFilters?.["Function"] || ""
    );
    // run once on mount
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto px-2 sm:px-4 flex flex-col gap-4">
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

        {/* Like + Later */}
        <div className="flex gap-2 items-center">
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
            Let's Discuss
          </Button>
        </div>
      </div>

      {/* Filter Categories - Below Search Bar */}
      <div
        ref={dropdownRef}
        className="flex flex-wrap gap-2 w-full items-center justify-center"
      >
        {filterCategories.map((category) => (
          <div key={category.filterName} className="relative">
            <Button
              variant="ghost"
              onClick={() =>
                setActiveFilterDropdown(
                  activeFilterDropdown === category.filterName
                    ? null
                    : category.filterName
                )
              }
              disabled={category.filterOptions.length === 0}
              className={`flex items-center gap-2 border rounded-lg px-3 py-2 text-sm transition ${
                (category.filterName === "Industries" &&
                  selectedIndustries.length > 0) ||
                selectedFilters[category.filterName]
                  ? "bg-[#00c193] text-white border-[#00c193]"
                  : "bg-white text-gray-600 border-gray-300 hover:border-[#00c193]"
              }`}
            >
              {category.filterName === "Industries" &&
              selectedIndustries.length > 0
                ? `${category.filterName} (${selectedIndustries.length})`
                : selectedFilters[category.filterName] || category.filterName}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`transition-transform ${
                  activeFilterDropdown === category.filterName
                    ? "rotate-180"
                    : ""
                }`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </Button>

            {activeFilterDropdown === category.filterName && (
              <ul className="absolute top-full mt-2 bg-white shadow-lg rounded-lg border border-gray-200 py-2 z-20 w-56 max-h-64 overflow-y-auto">
                {category.filterOptions.map((option) => (
                  <li
                    key={option}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition ${
                      category.filterName === "Industries"
                        ? "hover:bg-gray-50"
                        : selectedFilters[category.filterName] === option
                        ? "bg-[#00c193] text-white"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={(e) => {
                      e.stopPropagation(); // prevent dropdown from closing
                      if (category.filterName === "Industries") {
                        handleIndustryToggle(option);
                      } else {
                        handleFilterSelect(category.filterName, option);
                        setActiveFilterDropdown(null); // close only for single-select filters
                      }
                    }}
                  >
                    {category.filterName === "Industries" ? (
                      <>
                        <div className="relative flex items-center justify-center">
                          <input
                            type="checkbox"
                            checked={selectedIndustries.includes(option)}
                            onChange={() => {}}
                            className="w-5 h-5 rounded border-2 border-gray-300 appearance-none cursor-pointer checked:bg-blue-600 checked:border-blue-600 transition"
                            style={{
                              backgroundImage: selectedIndustries.includes(
                                option
                              )
                                ? "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='white'%3E%3Cpath fill-rule='evenodd' d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z' clip-rule='evenodd'/%3E%3C/svg%3E\")"
                                : "none",
                              backgroundSize: "100% 100%",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          />
                        </div>
                        <span className="text-sm text-gray-700 font-medium">
                          {option}
                        </span>
                      </>
                    ) : (
                      option
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}

        {/* Emerging Players Checkbox */}
        {hasEmergingPlayers && (
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-3 py-2 shadow">
            <input
              type="checkbox"
              id="emerging-players"
              checked={emergingPlayersChecked}
              onChange={handleEmergingPlayersToggle}
              className="w-4 h-4 accent-[#00c193] cursor-pointer rounded"
            />
            <label
              htmlFor="emerging-players"
            className="text-sm font-medium text-gray-700 cursor-pointer whitespace-nowrap"
          >
            Latest
          </label>
          </div>
        )}
      </div>

      {/* Selected Industries Tags */}
      {selectedIndustries.length > 0 && (
        <div className="flex flex-wrap gap-2 w-full items-center">
          {selectedIndustries.map((industry) => (
            <div
              key={industry}
              className="flex items-center gap-2 bg-[#D1FAE5] text-gray-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm"
            >
              <div className="flex items-center gap-2">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="text-blue-600"
                >
                  <rect
                    x="3"
                    y="3"
                    width="14"
                    height="14"
                    rx="3"
                    fill="#3B82F6"
                  />
                  <path
                    d="M14.5 7L8.5 13L5.5 10"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>{industry}</span>
              </div>
              <button
                onClick={() => handleRemoveIndustry(industry)}
                className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition"
                aria-label={`Remove ${industry}`}
              >
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
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchFilter;
