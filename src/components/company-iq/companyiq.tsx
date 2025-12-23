"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import AdvMarkdownHandler from "../MarkdownAdvance";
import { useCompanyIQ } from "@/hooks/useCompanyIQ";
import { CompanyIQLoader } from "../books/Loaders";

/* -------------------------
   PAGINATION COMPONENT
-------------------------- */
function PaginationComponent({
  totalPages,
  currentPage,
  onPageChange,
}: {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= maxVisible; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }
    return pages;
  };

  return (
    <nav
      className="mx-auto flex w-full justify-center"
      role="navigation"
      aria-label="pagination"
    >
      <ul className="flex flex-row items-center gap-1">
        {/* Previous Button */}
        <li>
          <button
            onClick={() => onPageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: currentPage === 1 ? "#e5e7eb" : "#e5e7eb",
              color: currentPage === 1 ? "#9ca3af" : "#374151",
            }}
            aria-label="Go to previous page"
          >
            <span>Prev</span>
          </button>
        </li>

        {/* Page Numbers */}
        {getPageNumbers().map((page, idx) => (
          <li key={idx}>
            {page === "ellipsis" ? (
              <span className="flex h-9 w-9 items-center justify-center">
                <span className="text-gray-600">...</span>
              </span>
            ) : (
              <button
                onClick={() => onPageChange(page as number)}
                className="inline-flex items-center justify-center text-sm font-medium transition-colors h-9 w-9 rounded-lg"
                style={{
                  backgroundColor:
                    currentPage === page ? "#00c193" : "transparent",
                  color: currentPage === page ? "white" : "#374151",
                }}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        {/* Next Button */}
        <li>
          <button
            onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor:
                currentPage === totalPages ? "#e5e7eb" : "#e5e7eb",
              color: currentPage === totalPages ? "#9ca3af" : "#374151",
            }}
            aria-label="Go to next page"
          >
            <span>Next</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

/* -------------------------
   MAIN COMPONENT
-------------------------- */
export default function CompanyIQ() {
  const { data, loading, error } = useCompanyIQ();
  const companies = data ?? [];

  const [activeSection, setActiveSection] = useState<
    Record<string | number, string | null>
  >({});

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("All Companies");

  // Temporary filter states (before Apply is clicked)
  const [tempIndustry, setTempIndustry] = useState("");
  const [tempHQ, setTempHQ] = useState("");
  const [tempRevenue, setTempRevenue] = useState("");
  const [tempEmployees, setTempEmployees] = useState("");

  // Applied filter states (after Apply is clicked)
  const [appliedIndustry, setAppliedIndustry] = useState("");
  const [appliedHQ, setAppliedHQ] = useState("");
  const [appliedRevenue, setAppliedRevenue] = useState("");
  const [appliedEmployees, setAppliedEmployees] = useState("");

  const itemsPerPage = 6;
  const paginationRef = useRef<HTMLDivElement | null>(null);

  // Dynamically extract unique industries and HQs from companies
  const uniqueIndustries = useMemo(() => {
    return Array.from(new Set(companies.map((c) => c.industry).filter(Boolean))).sort();
  }, [companies]);

  const uniqueHQs = useMemo(() => {
    return Array.from(new Set(companies.map((c) => c.hq).filter(Boolean))).sort();
  }, [companies]);

  const toggleSection = (companyId: string | number, section: string) => {
    setActiveSection((prev) => ({
      ...prev,
      [companyId]: prev[companyId] === section ? null : section,
    }));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    requestAnimationFrame(() => {
      if (!paginationRef.current) return;

      const top =
        paginationRef.current.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: top - 120,
        behavior: "smooth",
      });
    });
  };

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    setCurrentPage(1);
  };

  const handleApplyFilters = () => {
    setAppliedIndustry(tempIndustry);
    setAppliedHQ(tempHQ);
    setAppliedRevenue(tempRevenue);
    setAppliedEmployees(tempEmployees);
    setCurrentPage(1);
  };

  const handleClearAll = () => {
    setTempIndustry("");
    setTempHQ("");
    setTempRevenue("");
    setTempEmployees("");
    setAppliedIndustry("");
    setAppliedHQ("");
    setAppliedRevenue("");
    setAppliedEmployees("");
    setSelectedFilter("All Companies");
    setSearchTerm("");
    setCurrentPage(1);
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      const matchesSearch = company.company
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      if (appliedIndustry && company.industry !== appliedIndustry) return false;
      if (appliedHQ && company.hq !== appliedHQ) return false;

      if (appliedRevenue) {
        if (appliedRevenue === "$0–100M" && company.revenue > 100) return false;
        if (
          appliedRevenue === "$100–500M" &&
          (company.revenue <= 100 || company.revenue > 500)
        )
          return false;
        if (appliedRevenue === "$500M+" && company.revenue <= 500) return false;
      }

      if (appliedEmployees) {
        if (appliedEmployees === "0–500" && company.employees > 500)
          return false;
        if (
          appliedEmployees === "500–2000" &&
          (company.employees <= 500 || company.employees > 2000)
        )
          return false;
        if (
          appliedEmployees === "2000-10000" &&
          (company.employees <= 2000 || company.employees > 10000)
        ) 
          return false
        if (
          appliedEmployees === "10000-50000" &&
          (company.employees <= 10000 || company.employees > 50000)
        ) 
          return false
        if (appliedEmployees === "50000+" && company.employees <= 50000)
          return false;
      }

      if (selectedFilter === "All Companies") return matchesSearch;
      if (selectedFilter === "Technology")
        return matchesSearch && company.industry === "Technology";
      if (selectedFilter === "Finance")
        return matchesSearch && company.industry === "Finance";
      if (selectedFilter === "Healthcare")
        return matchesSearch && company.industry === "Healthcare";
      if (selectedFilter === "Retail")
        return matchesSearch && company.industry === "Retail";
      if (selectedFilter === "High Revenue")
        return matchesSearch && company.revenue > 500;
      if (selectedFilter === "Large Teams")
        return matchesSearch && company.employees > 2000;

      return matchesSearch;
    });
  }, [
    companies,
    searchTerm,
    selectedFilter,
    appliedIndustry,
    appliedHQ,
    appliedRevenue,
    appliedEmployees,
  ]);

  const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCompanies = filteredCompanies.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  if (loading) {
    return (
      <CompanyIQLoader />
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="max-w-[1600px] mx-auto p-6 space-y-6">
        {/* Header with Gradient */}
        <div
          className="bg-gradient-to-r rounded-2xl p-8 bg-gray-100"
          style={{
            border: "2px solid #00c193",
            boxShadow: "0 10px 25px rgba(0, 193, 147, 0.25)",
          }}
        >
          <h1 className="text-3xl font-bold text-black">AI Landscape Snapshot</h1>

          <p className="text-gray-700 mt-2">
            AI-powered company intelligence, transformation scores, and
            strategic insights
          </p>

          {/* <div className="mt-4 flex gap-4 text-sm">
            <span className="bg-white px-3 py-1 rounded-full text-black border border-gray-300">
              {companies.length} Companies
            </span>

            <span className="bg-white px-3 py-1 rounded-full text-black border border-gray-300">
              Real-time Data
            </span>
          </div> */}
        </div>

        {/* Search Bar with Icon */}
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00c193] transition-colors shadow-sm"
            style={{
              borderWidth: "2px",
              borderColor: "#00c193",
            }}
          />
        </div>

        {/* Filters with Better Styling */}
        <div
          className="bg-white rounded-xl p-5 shadow-sm"
          style={{ borderWidth: "1px", borderColor: "#00c193" }}
        >
          <div className="flex items-center justify-center gap-4">
            {/* Filters Label */}
            <div className="flex items-center gap-2 mr-2">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
              <span className="font-semibold text-gray-700">Filters</span>
            </div>

            {/* Industry */}
            <select
              value={tempIndustry}
              onChange={(e) => setTempIndustry(e.target.value)}
              className="px-4 py-2 rounded-lg text-sm bg-white focus:outline-none"
              style={{ borderWidth: "2px", borderColor: "#00c193" }}
            >
              <option value="">Industry</option>
              {uniqueIndustries.map((industry) => (
                <option key={industry} value={industry}>
                  {industry}
                </option>
              ))}
            </select>

            {/* HQ */}
            <select
              value={tempHQ}
              onChange={(e) => setTempHQ(e.target.value)}
              className="px-4 py-2 rounded-lg text-sm bg-white focus:outline-none"
              style={{ borderWidth: "2px", borderColor: "#00c193" }}
            >
              <option value="">HQ</option>
              {uniqueHQs.map((hq) => (
                <option key={hq} value={hq}>
                  {hq}
                </option>
              ))}
            </select>

            {/* Revenue */}
            <select
              value={tempRevenue}
              onChange={(e) => setTempRevenue(e.target.value)}
              className="px-4 py-2 rounded-lg text-sm bg-white focus:outline-none"
              style={{ borderWidth: "2px", borderColor: "#00c193" }}
            >
              <option value="">Revenue  (USD)</option>
              <option>$0–100M</option>
              <option>$100–500M</option>
              <option>$500M+</option>
            </select>

            {/* Employees */}
            <select
              value={tempEmployees}
              onChange={(e) => setTempEmployees(e.target.value)}
              className="px-4 py-2 rounded-lg text-sm bg-white focus:outline-none"
              style={{ borderWidth: "2px", borderColor: "#00c193" }}
            >
              <option value="">Employees</option>
              <option>0–500</option>
              <option>500–2000</option>
              <option>2000-10000</option>
              <option>10000-50000</option>
              <option>50000+</option>
            </select>

            {/* Apply Button */}
            <button
              onClick={handleApplyFilters}
              className="px-5 py-2 rounded-lg text-sm font-medium text-white transition-colors hover:bg-[#069473]"
              style={{ backgroundColor: "#00c193" }}
            >
              Apply
            </button>

            {/* Clear All */}
            <button
              onClick={handleClearAll}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-gray-100"
              style={{ color: "#00c193" }}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-600">
          Showing {paginatedCompanies.length} of {filteredCompanies.length}{" "}
          companies
        </div>

        {/* GRID: Company Cards - 3 Rows x 2 Cards */}
        <div className="grid grid-cols-2 gap-8">
          {paginatedCompanies.map((company) => (
            <div
              key={company.id}
              className="rounded-xl p-6 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              style={{ borderWidth: "1px", borderColor: "#00c193" }}
            >
              {/* Card Header */}
              <div className="mb-4">
                <h3 className="font-semibold text-lg text-gray-900">
                  {company.company}
                </h3>
                <p className="text-sm text-gray-500">{company.industry}</p>
              </div>

              {/* Quick Info */}
              <div className="flex gap-28 mb-4 text-sm">
                <div>
                  <div className="text-gray-500">HQ</div>
                  <div className="font-semibold text-gray-900">
                    {company.hq}
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Revenue</div>
                  <div className="font-semibold text-gray-900">
                    ${company.revenue}M
                  </div>
                </div>
                <div>
                  <div className="text-gray-500">Employees</div>
                  <div className="font-semibold text-gray-900">
                    {company.employees}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                {[
                  // ["leadership", "AI/Cloud Leadership Roles", "👔"],
                  ["initiatives", "Digital Initiatives", "🌐"],
                  ["techStack", "Cloud / Tech Stack", "☁️"],
                  ["useCases", "AI Use Cases", "🤖"],

                ].map(([key, label, icon]) => {
                  const isActive = activeSection[company.id] === key;
                  const hasActiveSection =
                    activeSection[company.id] !== null &&
                    activeSection[company.id] !== undefined;
                  const shouldShow = !hasActiveSection || isActive;

                  return shouldShow ? (
                    <div key={key}>
                      <button
                        onClick={() => toggleSection(company.id, key as string)}
                        className="w-full flex justify-between items-center px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors rounded-lg"
                        style={{ borderWidth: "1px", borderColor: "#00c193" }}
                      >
                        <span className="flex items-center gap-2">
                          <span>{icon}</span>
                          {label}
                        </span>
                        <span style={{ color: "#00c193" }}>
                          {isActive ? "✕" : "▼"}
                        </span>
                      </button>

                      {isActive && (
                        <div
                          className="mt-2 px-4 py-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg overflow-y-auto"
                          style={{
                            borderWidth: "1px",
                            borderColor: "#00c193",
                          }}
                        >
                          <ul className="space-y-2">
                            {Array.isArray((company as any)[key])
                              ? (company as any)[key].map((item: string, idx: number) => (
                                <li key={idx} className="flex gap-3 text-sm text-gray-700">
                                  <span className="text-green-500 font-bold mt-0.5"><strong>•</strong></span>
                                  <span>{<AdvMarkdownHandler content={item.replace('*', '')} />}</span>
                                </li>
                              ))
                              : typeof (company as any)[key] === "string" && (company as any)[key]
                                ? (company as any)[key].split("\n").filter((line: string) => line.trim()).map((item: string, idx: number) => (
                                  <li key={idx} className="flex gap-3 text-sm text-gray-700">
                                    <span className="text-green-500 font-bold mt-0.5">•</span>
                                    <span>{item.trim()}</span>
                                  </li>
                                ))
                                : (
                                  <li className="flex gap-3 text-sm text-gray-700">
                                    <span className="text-green-500 font-bold mt-0.5">•</span>
                                    <span>No data available.</span>
                                  </li>
                                )}
                          </ul>
                        </div>
                      )}
                    </div>
                  ) : null;
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div ref={paginationRef}>
          <PaginationComponent
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </div>
    </div>
  );
}
