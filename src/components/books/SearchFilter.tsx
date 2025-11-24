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
    Function?: string,
    startUp?: string
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
  allBooks: Book[];
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
  defaultFilters,
  allBooks
}: SearchFilterProps) => {
  const [activeButton, setActiveButton] = useState<"like" | "later" | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(-1);
  const [emergingPlayersChecked, setEmergingPlayersChecked] = useState(false);
  const [startUpChecked, setStartUpChecked] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Filter");
  const [hasEmergingPlayers, setHasEmergingPlayers] = useState(false);
  const [hasStartUp, setHasStartUp] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>(
    []
  );
  const [activeFilterDropdown, setActiveFilterDropdown] = useState<
    string | null
  >(null);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string>
  >({});
  // const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);

  // Categories - MOVE HERE (before the useEffect)
  const categories = useMemo(() => {
    const normalized = allBooks.flatMap(
      (book) => book.tag?.map((t: string) => t.toLowerCase().trim()) ?? []
    );
    const unique = Array.from(new Set(normalized));
    const capitalized = unique.map(
      (t) => t.charAt(0).toUpperCase() + t.slice(1)
    );
    return capitalized;
  }, []);

  // Build a list of suggestion candidates from books (titles, authors, list_names, tags, keywords)
  const suggestionCandidates = useMemo(() => {
    const items: string[] = [];
    console.log
    allBooks.forEach((book) => {
      if (book.title) items.push(book.title.trim());
      if (book.author) items.push(book.author.trim());
      // if (book.list_name) items.push(book.list_name.trim());
      // if (Array.isArray(book.tag)) items.push(...book.tag.map((t) => t.trim()));
      if (Array.isArray(book.keywords)) items.push(...book.keywords.map((k) => k.trim()));
    });
    const normalized = items
      .filter(Boolean)
      .map((s) => s)
      .filter((v, i, a) => a.indexOf(v) === i);
    return normalized;

  }, []);

  // Update suggestions as searchTerm changes
  useEffect(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) {
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveSuggestionIndex(-1);
      return;
    }

    const matched = suggestionCandidates
      .filter((cand) => cand.toLowerCase().includes(q))
      .slice(0, 8); // limit suggestions

    setSuggestions(matched);
    setShowSuggestions(matched.length > 0);
    setActiveSuggestionIndex(-1);
  }, [searchTerm]);

  const functions = useMemo(() => {
    const normalized = allBooks.flatMap(
      (book) => book.function?.map((f: string) => f.trim()) ?? []
    );
    return Array.from(new Set(normalized)).filter(Boolean);
  }, []);

  const businessOutcomes = useMemo(() => {
    const normalized = allBooks.flatMap(
      (book) => book.business_outcome?.map((b: string) => b.trim()) ?? []
    );
    return Array.from(new Set(normalized)).filter(Boolean);
  }, []);

  const implementationComplexities = useMemo(() => {
    const normalized = allBooks.flatMap(
      (book) =>
        book.implementation_complexity?.map((c: string) => c.trim()) ?? []
    );
    return Array.from(new Set(normalized)).filter(Boolean);
  }, []);

  const unexpectedOutcomes = useMemo(() => {
    const normalized = allBooks.flatMap(
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
        filterOptions: categories?.length > 0
        ? categories.length > 1 ? ["ALL", ...categories] : categories
        : []
        ,
      });
    }
    if (availableFilters.includes("Function")) {
      filterCategories.push({
        filterName: "Function",
        filterOptions: functions?.length > 0
          ? functions.length > 1 ? ["ALL", ...functions] : functions
          : [],
      });
    }
    if (availableFilters.includes("Business Outcome")) {
      filterCategories.push({
        filterName: "Business Outcome",
        filterOptions: businessOutcomes?.length > 0
          ? businessOutcomes.length > 1 ? ["ALL", ...businessOutcomes] : businessOutcomes
          : [],
      });
    }
    if (availableFilters.includes("Implementation Complexity")) {
      filterCategories.push({
        filterName: "Implementation Complexity",
        filterOptions: implementationComplexities?.length > 0
          ? implementationComplexities.length > 1 ? ["ALL", ...implementationComplexities] : implementationComplexities
          : [],
      });
    }
    if (availableFilters.includes("Unexpected Outcomes")) {
      filterCategories.push({
        filterName: "Unexpected Outcomes",
        filterOptions: unexpectedOutcomes?.length > 0
          ? unexpectedOutcomes.length > 1 ? ["ALL", ...unexpectedOutcomes] : unexpectedOutcomes
          : [],
      });
    }

    setFilterCategories(filterCategories);
    setHasEmergingPlayers(availableFilters.includes("Emerging Players"));
    setHasStartUp(availableFilters.includes("Start Up"));
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
      // setSelectedIndustries([]);
      setActiveFilterDropdown(null);
      onFilterChange("");
      setViewMode("all");
      setEmergingPlayersChecked(false);
      setStartUpChecked(false);
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
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  // Close search suggestions on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      alert("Please enter a search term to find books.");
      return;
    }
    // 🔥 Reset filters whenever search runs
    setSelectedFilters({});
    setEmergingPlayersChecked(false);
    setStartUpChecked(false);
    setActiveFilterDropdown(null);

    onMultipleSearch("", "", "", "", "", "", "", "");
    setShowSuggestions(false);
    onSearch(searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // If a suggestion is active, choose it
      if (activeSuggestionIndex >= 0 && suggestions[activeSuggestionIndex]) {
        const chosen = suggestions[activeSuggestionIndex];
        setSearchTerm(chosen);
        setShowSuggestions(false);
        onSearch(chosen);
      } else {
        handleSearch();
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (!showSuggestions) return;
      setActiveSuggestionIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (!showSuggestions) return;
      setActiveSuggestionIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };


  const handleFilterSelect = (filterName: string, option: string) => {
    setSearchTerm("");     // 🔥 reset search box
    onSearch("");          // clear search results
    let newFilters = { ...selectedFilters };

    if (option === "ALL") {
      // Remove this filter from selected filters
      newFilters[filterName] = "ALL";
    }

    // --- TOGGLE BEHAVIOR ---
    // If user clicks the same selected option → unselect it
    if (newFilters[filterName] === option) {
      // Industry special case → just clear industry, keep second-box filters
      if (filterName === "Industry") {
        newFilters["Industry"] = "";
      } else {
        // For second-box filters, only clear that filter
        delete newFilters[filterName];
      }

      setSelectedFilters(newFilters);
      setActiveFilterDropdown(null);

      onMultipleSearch(
        newFilters["Industry"] || "",
        "",
        newFilters["Business Outcome"] || "",
        newFilters["Implementation Complexity"] || "",
        newFilters["Unexpected Outcomes"] || "",
        emergingPlayersChecked ? "true" : "",
        newFilters["Function"] || "",
        startUpChecked ? "true" : ""
      );

      return; // STOP HERE
    }

    // --- NORMAL SELECTION LOGIC ---
    if (filterName === "Industry") {
      // change industry but DO NOT clear second-box selections
      newFilters["Industry"] = option;
    } else {
      // selecting a second-box filter clears all other second-box filters
      newFilters = {
        Industry: selectedFilters["Industry"] || "",
        [filterName]: option,
      };

      // Clear checkboxes on second-box select
      setEmergingPlayersChecked(false);
      setStartUpChecked(false);
    }

    setSelectedFilters(newFilters);
    setActiveFilterDropdown(null);

    onMultipleSearch(
      newFilters["Industry"] || "",
      "",
      newFilters["Business Outcome"] || "",
      newFilters["Implementation Complexity"] || "",
      newFilters["Unexpected Outcomes"] || "",
      "", // Emerging Players
      newFilters["Function"] || "",
      ""  // StartUp
    );
  };

  const handleCheckboxToggle = (category: string) => {
    setSearchTerm("");
    onSearch("");
    setShowSuggestions(false);

    // Toggle logic
    let newEmerging = emergingPlayersChecked;
    let newStartup = startUpChecked;

    if (category === "Latest") {
      newEmerging = !emergingPlayersChecked;
      newStartup = false;
      setEmergingPlayersChecked(newEmerging);
      setStartUpChecked(false);
    } else if (category === "Start Up") {
      newStartup = !startUpChecked;
      newEmerging = false;
      setStartUpChecked(newStartup);
      setEmergingPlayersChecked(false);
    }

    // ❗ CLEAR all dropdowns except Industry
    const newFilters: Record<string, string> = {
      Industry: selectedFilters["Industry"] || "",
    };

    setSelectedFilters(newFilters); // clear dropdown values

    onMultipleSearch(
      newFilters["Industry"] || "",
      "",
      "", // Business Outcome cleared
      "", // Implementation Complexity cleared
      "", // Unexpected Outcomes cleared
      newEmerging ? "true" : "",
      "", // Function cleared
      newStartup ? "true" : ""
    );
  };

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
    let defaultEmergingPlayers = ""
    if (defaultFilters['emerging_players']?.length > 0) {
      defaultEmergingPlayers = defaultFilters["emerging_players"] === "true" ? "true" : ""
      defaultEmergingPlayers === "true" && setEmergingPlayersChecked(true);
    }
    let defaultStartUp = ""
    if (defaultFilters['start_up']?.length > 0) {
      defaultStartUp = defaultFilters["start_up"] === "true" ? "true" : ""
      defaultStartUp === "true" && setStartUpChecked(true)
    }



    // apply defaults to visible UI state
    setSelectedFilters(defaultSelectedFilters);
    setActiveFilterDropdown(null);

    console.log('[Applying default filters on mount:', defaultSelectedFilters, defaultEmergingPlayers);
    onMultipleSearch(
      defaultSelectedFilters?.['Industry'] || "",
      "",
      defaultSelectedFilters?.["Business Outcome"] || "",
      defaultSelectedFilters?.["Implementation Complexity"] || "",
      defaultSelectedFilters?.["Unexpected Outcomes"] || "",
      defaultEmergingPlayers,
      defaultSelectedFilters?.["Function"] || "",
      defaultStartUp
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
          <div className="relative flex-grow" ref={suggestionsRef}>
            <Input
              type="text"
              placeholder="What are you looking for?"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);

                // 🔥 Clear filters on typing
                setSelectedFilters({});
                setEmergingPlayersChecked(false);
                setStartUpChecked(false);
                onMultipleSearch("", "", "", "", "", "", "", "");
              }}
              onKeyDown={handleKeyPress}
              onFocus={() => { if (suggestions.length > 0) setShowSuggestions(true); }}
              className="w-full border-none focus:ring-0 text-base sm:text-sm"
              aria-autocomplete="list"
              aria-haspopup="true"
              aria-expanded={showSuggestions}
            />

            {/* Suggestions dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute left-0 right-0 z-30 mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-56 overflow-auto">
                {suggestions.map((sugg, idx) => (
                  <li
                    key={sugg + idx}
                    role="option"
                    aria-selected={activeSuggestionIndex === idx}
                    className={`px-3 py-2 cursor-pointer text-sm hover:bg-gray-100 flex items-center justify-between ${activeSuggestionIndex === idx ? "bg-[#D1FAE5]" : ""
                      }`}
                    onMouseDown={(e) => {
                      // prevent input blur before click
                      e.preventDefault();
                    }}
                    onClick={() => {
                      setSearchTerm(sugg);
                      setShowSuggestions(false);
                      onSearch(sugg);
                    }}
                    onMouseEnter={() => setActiveSuggestionIndex(idx)}
                  >
                    <span className="truncate">{sugg}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
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
            className={`px-6 py-2 sm:py-3 text-sm sm:text-base rounded-2xl shadow-md transition ${activeButton === "like"
              ? "bg-green-600 text-white"
              : "bg-[#00c193] text-white hover:bg-green-600"
              }`}
          >
            Like
          </Button>

          <Button
            onClick={handleLaterClick}
            className={`px-6 py-2 sm:py-3 text-sm sm:text-base rounded-2xl shadow-md transition ${activeButton === "later"
              ? "bg-green-600 text-white"
              : "bg-[#00c193] text-white hover:bg-green-600"
              }`}
          >
            Let's Discuss
          </Button>
        </div>
      </div>

      {/* Filter Categories - Below Search Bar */}
      <div ref={dropdownRef} className="relative w-full">
        {/* ===== TOP BAR WITH INDUSTRY ONLY ===== */}

        <div className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-4 justify-center mb-4">
          {filterCategories
            .filter((c) => c.filterName === "Industry")
            .map((category) => (
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
                  className={`flex items-center gap-2 border rounded-lg px-4 py-2 text-sm transition
                ${selectedFilters[category.filterName]
                      ? "bg-[#00c193] text-white border-[#00c193]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-[#00c193]"
                    }
                  `}
                >
                  {selectedFilters["Industry"] || category.filterName}



                  {/* ▼ DROPDOWN ARROW */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform ${activeFilterDropdown === category.filterName ? "rotate-180" : ""
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
                        className={`px-4 py-2 text-sm cursor-pointer
                      ${selectedFilters[category.filterName] === option
                            ? "bg-[#1ED3A6] text-white"
                            : "hover:bg-gray-100"
                          }
                        `}
                        onClick={() => handleFilterSelect(category.filterName, option)}
                      >
                        {option}
                      </li>

                    ))}
                  </ul>
                )}
              </div>
            ))}
        </div>

        {/* ===== SECOND ROW WITH ALL OTHER FILTERS ===== */}
        <div className="w-full bg-gray-100 border border-gray-200 rounded-xl px-4 py-3 flex flex-wrap items-center gap-3 justify-center">

          {filterCategories
            .filter((c) => c.filterName !== "Industry")
            .map((category) => (
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
                  className={`flex items-center gap-2 border rounded-lg px-4 py-2 text-sm transition
                ${selectedFilters[category.filterName]
                      ? "bg-[#00c193] text-white border-[#00c193]"
                      : "bg-white text-gray-700 border-gray-300 hover:border-[#00c193]"
                    }
                  `}
                >
                  {selectedFilters[category.filterName] || category.filterName}

                  {/* ▼ DROPDOWN ARROW */}
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`transition-transform ${activeFilterDropdown === category.filterName ? "rotate-180" : ""
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
                        className={`px-4 py-2 text-sm cursor-pointer
                      ${selectedFilters[category.filterName] === option
                            ? "bg-[#1ED3A6] text-white"
                            : "hover:bg-gray-100"
                          }
                        `}
                        onClick={() => handleFilterSelect(category.filterName, option)}
                      >
                        {option}
                      </li>

                    ))}
                  </ul>
                )}
              </div>
            ))}

          {/* Latest checkbox */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={emergingPlayersChecked}
              onChange={() => handleCheckboxToggle("Latest")}
              className="w-4 h-4 accent-[#00c193]"
            />
            Latest
          </label>

          {/* Start Up checkbox */}
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={startUpChecked}
              onChange={() => handleCheckboxToggle("Start Up")}
              className="w-4 h-4 accent-[#00c193]"
            />
            Start Up
          </label>
        </div>
      </div>

    </div>
  );
};

export default SearchFilter;
