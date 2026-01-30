import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import ReactDOM from "react-dom";

interface SearchableDropdownProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  isMultiSelect?: boolean;
  allowCustomText?: boolean;
  className?: string;
}

/* Compact sizes */
const DROPDOWN_MAX_HEIGHT_PX = 10 * 16; // 10rem -> 160px (was 256)
const GAP_PX = 6; // slightly tighter gap
const PANEL_ZINDEX = 2147483647;

const SearchableDropdown: React.FC<SearchableDropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select an option...",
  isMultiSelect = false,
  allowCustomText = false,
  className = "",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customInput, setCustomInput] = useState("");
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const [panelStyle, setPanelStyle] = useState<React.CSSProperties>({
    visibility: "hidden",
  });

  const selectedValues =
    isMultiSelect && value
      ? value
          .split(",")
          .map((v) => v.trim())
          .filter(Boolean)
      : [];

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchTerm("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const updatePanelPosition = () => {
    if (!triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const availableBelow = viewportHeight - rect.bottom - GAP_PX;
    const availableAbove = rect.top - GAP_PX;

    const panelHeight = Math.min(
      DROPDOWN_MAX_HEIGHT_PX,
      panelRef.current?.scrollHeight || DROPDOWN_MAX_HEIGHT_PX,
    );

    let top: number;
    let maxHeight = DROPDOWN_MAX_HEIGHT_PX;
    if (availableBelow >= Math.min(panelHeight, DROPDOWN_MAX_HEIGHT_PX)) {
      top = rect.bottom + GAP_PX;
      maxHeight = Math.min(availableBelow, DROPDOWN_MAX_HEIGHT_PX);
    } else if (availableAbove >= Math.min(panelHeight, DROPDOWN_MAX_HEIGHT_PX)) {
      top = rect.top - GAP_PX - Math.min(panelHeight, DROPDOWN_MAX_HEIGHT_PX);
      maxHeight = Math.min(availableAbove, DROPDOWN_MAX_HEIGHT_PX);
    } else {
      if (availableBelow >= availableAbove) {
        top = rect.bottom + GAP_PX;
        maxHeight = Math.max(
          40,
          Math.min(availableBelow, DROPDOWN_MAX_HEIGHT_PX),
        );
      } else {
        top = Math.max(
          GAP_PX,
          rect.top - GAP_PX - Math.min(availableAbove, DROPDOWN_MAX_HEIGHT_PX),
        );
        maxHeight = Math.max(
          40,
          Math.min(availableAbove, DROPDOWN_MAX_HEIGHT_PX),
        );
      }
    }

    const left = rect.left;
    const width = rect.width;

    setPanelStyle({
      position: "fixed",
      top: Math.round(top),
      left: Math.round(left),
      width: Math.round(width),
      maxHeight: Math.round(maxHeight),
      overflow: "hidden",
      zIndex: PANEL_ZINDEX,
      visibility: "visible",
    });
  };

  useLayoutEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => {
        updatePanelPosition();
      });
    } else {
      setPanelStyle({ visibility: "hidden" });
    }
  }, [isOpen, searchTerm, customInput, filteredOptions.length]);

  useEffect(() => {
    const onResize = () => isOpen && updatePanelPosition();
    const onScroll = () => isOpen && updatePanelPosition();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, true);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll, true);
    };
  }, [isOpen]);

  const handleSelect = (option: string) => {
    if (isMultiSelect) {
      const newValues = selectedValues.includes(option)
        ? selectedValues.filter((v) => v !== option)
        : [...selectedValues, option];
      onChange(newValues.join(", "));
    } else {
      onChange(option);
      setIsOpen(false);
      setSearchTerm("");
    }
  };

  const handleRemoveTag = (optionToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newValues = selectedValues.filter((v) => v !== optionToRemove);
    onChange(newValues.join(", "));
  };

  const handleCustomTextAdd = (text?: string) => {
    const payload = (text ?? customInput).trim();
    if (!payload) return;

    if (isMultiSelect) {
      const newValues = [...selectedValues, payload];
      onChange(newValues.join(", "));
    } else {
      onChange(payload);
    }

    setCustomInput("");
    setSearchTerm("");
    if (!isMultiSelect) {
      setIsOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (allowCustomText && e.key === "Enter" && customInput.trim()) {
      e.preventDefault();
      handleCustomTextAdd();
    }
  };

  const getDisplayValue = () => {
    if (isMultiSelect) {
      return selectedValues.length > 0
        ? `${selectedValues.length} selected`
        : placeholder;
    }
    return value || placeholder;
  };

  const isCustomTextOnly = options.length === 0 && allowCustomText;

  const panel =
    isOpen && !isCustomTextOnly ? (
      <div
        ref={panelRef}
        className="bg-white border border-gray-300 rounded-md shadow-sm flex flex-col"
        style={{
          ...panelStyle,
          boxSizing: "border-box",
        }}
        onMouseDown={(e) => e.stopPropagation()}
      >
        {/* compact search input */}
        <div className="px-2 py-2 border-b border-gray-200 flex-shrink-0">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search..."
            className="w-full px-2 py-1 border border-gray-200 rounded-sm text-sm
                         focus:outline-none focus:border-gray-400"
            onClick={(e) => e.stopPropagation()}
            autoFocus
          />
        </div>

        <div
          className="overflow-y-auto"
          style={{ maxHeight: panelStyle.maxHeight }}
        >
          {filteredOptions.length === 0 ? (
            <div className="px-3 py-2 text-center">
              <p className="text-gray-500 text-xs mb-2">No options found</p>

              {allowCustomText && searchTerm.trim() && (
                <button
                  onClick={() => {
                    const newValue = searchTerm.trim();
                    if (isMultiSelect) {
                      onChange([...selectedValues, newValue].join(", "));
                    } else {
                      onChange(newValue);
                      setIsOpen(false);
                    }
                    setSearchTerm("");
                  }}
                  className="px-2 py-1 bg-[#00c193] text-white text-xs rounded-sm hover:bg-[#00a67d] transition"
                >
                  Add "{searchTerm}"
                </button>
              )}
            </div>
          ) : (
            filteredOptions.map((option, index) => {
              const isSelected = isMultiSelect
                ? selectedValues.includes(option)
                : value === option;

              return (
                <div
                  key={index}
                  onClick={() => handleSelect(option)}
                  className={`px-3 py-2 cursor-pointer transition-colors flex items-center gap-2 text-sm
                     ${isSelected ? "bg-gray-50 text-gray-900" : "hover:bg-gray-50 text-gray-700"}`}
                >
                  {isMultiSelect && (
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      className="w-3 h-3 text-[#00c193] border-gray-300 rounded cursor-pointer"
                    />
                  )}
                  <span className="flex-1 text-sm">{option}</span>
                </div>
              );
            })
          )}
        </div>

        {isMultiSelect && selectedValues.length > 0 && (
          <div className="px-2 py-2 border-t border-gray-200 bg-gray-50 flex justify-between items-center flex-shrink-0 text-xs">
            <span className="text-gray-600">
              {selectedValues.length} item
              {selectedValues.length !== 1 ? "s" : ""} selected
            </span>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onChange("");
              }}
              className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    ) : null;

  return (
    <div
      ref={dropdownRef}
      className={`relative ${className}`}
      style={{ zIndex: isOpen ? PANEL_ZINDEX : "auto" }}
    >
      <div
        ref={triggerRef}
        onClick={() => !isCustomTextOnly && setIsOpen((prev) => !prev)}
        className={`w-full px-3 py-2 bg-white border border-gray-300 rounded-md text-sm 
                   ${!isCustomTextOnly ? "cursor-pointer hover:border-gray-400" : ""} 
                   transition-colors focus-within:border-gray-400 focus-within:outline-none
                   flex items-center justify-between`}
      >
        <div className="flex-1 flex flex-wrap gap-1">
          {isMultiSelect && selectedValues.length > 0 ? (
            selectedValues.map((val, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-gray-100 
                           text-gray-700 rounded text-xs border border-gray-200"
              >
                {val}
                <button
                  onClick={(e) => handleRemoveTag(val, e)}
                  className="hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                  type="button"
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </span>
            ))
          ) : isCustomTextOnly ? (
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && customInput.trim()) {
                  e.preventDefault();
                  handleCustomTextAdd();
                }
              }}
              onBlur={() => {
                if (customInput.trim()) {
                  handleCustomTextAdd();
                }
              }}
              placeholder={placeholder}
              className="w-full outline-none bg-transparent text-gray-700 text-sm"
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <span className={!value ? "text-gray-400 text-sm" : "text-gray-700 text-sm"}>
              {getDisplayValue()}
            </span>
          )}
        </div>
        {!isCustomTextOnly && (
          <svg
            className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-2 ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </div>

      {panel ? ReactDOM.createPortal(panel, document.body) : null}
    </div>
  );
};

export default SearchableDropdown;