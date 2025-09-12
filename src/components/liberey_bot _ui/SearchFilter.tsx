import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/liberey_bot _ui/ui/buttonn';
import { Input } from '@/components/liberey_bot _ui/ui/input';

interface SearchFilterProps {
  onSearch: (term: string) => void;
  onFilterChange: (filter: string) => void;
}

const SearchFilter = ({ onSearch, onFilterChange }: SearchFilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Filter');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const categories = ['Leadership', 'Innovation', 'Productivity', 'Strategy', 'Finance', 'Marketing', 'Impact'];

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

  return (
    <div className="search-container" id="search-container">
      <div className="search-bar-wrapper">
        <Input
          type="text"
          placeholder="What are you looking for?"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <Button onClick={handleSearch} className="search-button" aria-label="Search">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </Button>
      </div>
      <div className="dropdown" ref={dropdownRef}>
        <Button
          variant="ghost"
          onClick={() => setShowDropdown(!showDropdown)}
          className="dropdown-button"
        >
          {selectedFilter}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
          </svg>
        </Button>
        {showDropdown && (
          <ul className="dropdown-menu">
            {categories.map((category) => (
              <li
                key={category}
                className="dropdown-item"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;