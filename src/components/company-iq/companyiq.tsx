"use client";
import { useRef, useState, useEffect, useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AdvMarkdownHandler from "../MarkdownAdvance";


/* ------------------------    MOCK DATA (24 COMPANIES)   -------------------------- */
const companies = Array.from({ length: 24 }).map((_, i) => {
    const industries = ["Technology", "Finance", "Healthcare", "Retail"];
    const hqs = ["USA", "UK", "Germany", "Japan"];
    const randomIndustry = industries[Math.floor(Math.random() * industries.length)];
    const randomHQ = hqs[Math.floor(Math.random() * hqs.length)];
    const randomRevenue = `$${Math.floor(Math.random() * 900) + 100}M`;
    const randomEmployees = `${Math.floor(Math.random() * 9) + 1}k`;

    return {
        id: i + 1,
        name: `Company ${i + 1}`,
        industry: randomIndustry,
        hq: randomHQ,
        revenue: randomRevenue,
        employees: randomEmployees,
        reports: {
            digital:
                "Public and digital initiatives include platform modernization, customer portals, and ecosystem integrations.",
            cloud:
                "Cloud stack includes AWS/Azure, containerization, CI/CD pipelines, and DevOps tooling.",
            ai:
                "AI use cases include chatbots, predictive analytics, recommendation systems, and automation.",
            outlook:
                "Transformation outlook indicates moderate to strong execution capability over the next 12–24 months.",
            explanation:
                "Align Score is derived from cloud maturity, AI adoption, leadership intent, and execution readiness."
        }
    };
});

/* -------------------------
   CAROUSEL COMPONENT
-------------------------- */
function Carousel({ onFilterChange }: { onFilterChange: (filter: string) => void }) {
    const categories = useMemo(() => [
        { label: "All Companies", filter: "all" },
        { label: "Technology", filter: "technology" },
        { label: "Finance", filter: "finance" },
        { label: "Healthcare", filter: "healthcare" },
        { label: "Retail", filter: "retail" },
        { label: "High Revenue", filter: "high-revenue" },
        { label: "Large Teams", filter: "large-teams" }
    ], []);

    const containerRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollButtons = () => {
        const el = containerRef.current;
        if (!el) {
            setCanScrollLeft(false);
            setCanScrollRight(false);
            return;
        }
        setCanScrollLeft(el.scrollLeft > 1);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
    };

    useEffect(() => {
        updateScrollButtons();
        const el = containerRef.current;
        if (!el) return;

        const onScroll = () => updateScrollButtons();
        el.addEventListener("scroll", onScroll, { passive: true });

        const ro = new ResizeObserver(updateScrollButtons);
        ro.observe(el);

        window.addEventListener("resize", updateScrollButtons);

        return () => {
            el.removeEventListener("scroll", onScroll);
            ro.disconnect();
            window.removeEventListener("resize", updateScrollButtons);
        };
    }, [categories.length]);

    const prevSlide = () => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollBy({ left: -el.clientWidth, behavior: "smooth" });
    };

    const nextSlide = () => {
        const el = containerRef.current;
        if (!el) return;
        el.scrollBy({ left: el.clientWidth, behavior: "smooth" });
    };

    return (
        <div className="w-full">
            <h4 className="text-sm font-bold uppercase tracking-wide text-gray-700 mb-4">
                Quick Filters
            </h4>

            <div className="relative w-full flex items-center gap-4">
                {/* Left arrow */}
                <button
                    onClick={prevSlide}
                    disabled={!canScrollLeft}
                    aria-label="Previous"
                    className="bg-[#00c193] text-white px-4 py-3 rounded-full shadow-md hover:bg-[#069473] z-10 disabled:opacity-40 transition-all"
                >
                    {"<<"}
                </button>

                {/* Scroll container */}
                <div
                    ref={containerRef}
                    className="flex-1 overflow-x-auto scroll-smooth"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <style>{`
                        div::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    <div className="flex gap-4 items-center">
                        {categories.map((btn, i) => (
                            <div key={i} className="flex-shrink-0">
                                <button
                                    onClick={() => onFilterChange(btn.label)}
                                    title={btn.label}
                                    className="text-[#00c193] font-bold text-sm px-4 py-2 rounded-lg 
                                        bg-green-100 cursor-pointer transition-colors 
                                        duration-300 text-center border-b-2 border-[#00c193] 
                                        hover:text-white hover:bg-[#00c193] hover:border-[#069473]"
                                >
                                    {btn.label}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right arrow */}
                <button
                    onClick={nextSlide}
                    disabled={!canScrollRight}
                    aria-label="Next"
                    className="bg-[#00c193] text-white px-4 py-3 rounded-full shadow-md hover:bg-[#069473] z-10 disabled:opacity-40 transition-all"
                >
                    {">>"}
                </button>
            </div>
        </div>
    );
}

/* -------------------------
   PAGINATION COMPONENT
-------------------------- */
function PaginationComponent({ totalPages, currentPage, onPageChange }: { totalPages: number; currentPage: number; onPageChange: (page: number) => void }) {
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
                pages.push('ellipsis');
                pages.push(totalPages);
            } else if (currentPage >= totalPages - 2) {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
                    pages.push(i);
                }
            } else {
                pages.push(1);
                pages.push('ellipsis');
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pages.push(i);
                }
                pages.push('ellipsis');
                pages.push(totalPages);
            }
        }
        return pages;
    };

    return (
        <nav className="mx-auto flex w-full justify-center" role="navigation" aria-label="pagination">
            <ul className="flex flex-row items-center gap-1">
                {/* Previous Button */}
                <li>
                    <button
                        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                        className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        style={{
                            backgroundColor: currentPage === 1 ? '#e5e7eb' : '#e5e7eb',
                            color: currentPage === 1 ? '#9ca3af' : '#374151'
                        }}
                        aria-label="Go to previous page"
                    >
                        <span>Prev</span>
                    </button>
                </li>

                {/* Page Numbers */}
                {getPageNumbers().map((page, idx) => (
                    <li key={idx}>
                        {page === 'ellipsis' ? (
                            <span className="flex h-9 w-9 items-center justify-center">
                                <span className="text-gray-600">...</span>
                            </span>
                        ) : (
                            <button
                                onClick={() => onPageChange(page as number)}
                                className="inline-flex items-center justify-center text-sm font-medium transition-colors h-9 w-9 rounded-lg"
                                style={{
                                    backgroundColor: currentPage === page ? '#00c193' : 'transparent',
                                    color: currentPage === page ? 'white' : '#374151'
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
                            backgroundColor: currentPage === totalPages ? '#e5e7eb' : '#e5e7eb',
                            color: currentPage === totalPages ? '#9ca3af' : '#374151'
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
    const [activeSection, setActiveSection] = useState<Record<number, string | null>>({});
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState("All Companies");
    const itemsPerPage = 8;
    const paginationRef = useRef<HTMLDivElement | null>(null);

    const toggleSection = (companyId: number, section: string) => {
        setActiveSection(prev => ({
            ...prev,
            [companyId]: prev[companyId] === section ? null : section
        }));
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);

        requestAnimationFrame(() => {
            if (!paginationRef.current) return;

            const top = paginationRef.current.getBoundingClientRect().top + window.scrollY;

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

    const filteredCompanies = companies.filter(company => {
        const matchesSearch = company.name.toLowerCase().includes(searchTerm.toLowerCase());

        if (selectedFilter === "All Companies") return matchesSearch;
        if (selectedFilter === "Technology") return matchesSearch && company.industry === "Technology";
        if (selectedFilter === "Finance") return matchesSearch && company.industry === "Finance";
        if (selectedFilter === "Healthcare") return matchesSearch && company.industry === "Healthcare";
        if (selectedFilter === "Retail") return matchesSearch && company.industry === "Retail";
        if (selectedFilter === "High Revenue") {
            const revenue = parseInt(company.revenue.replace(/\D/g, ''));
            return matchesSearch && revenue > 500;
        }
        if (selectedFilter === "Large Teams") {
            const employees = parseInt(company.employees.replace(/\D/g, ''));
            return matchesSearch && employees > 5;
        }

        return matchesSearch;
    });

    const totalPages = Math.ceil(filteredCompanies.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCompanies = filteredCompanies.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="max-w-[1600px] mx-auto p-6 space-y-6">
                {/* Header with Gradient */}
                <div
                    className="bg-gradient-to-r rounded-2xl p-8 bg-gray-100"
                    style={{
                        border: "2px solid #00c193",
                        boxShadow: "0 10px 25px rgba(0, 193, 147, 0.25)"
                    }}
                >
                    <h1 className="text-3xl font-bold text-black">CompanyIQ</h1>

                    <p className="text-gray-700 mt-2">
                        AI-powered company intelligence, transformation scores, and strategic insights
                    </p>

                    <div className="mt-4 flex gap-4 text-sm">
                        <span className="bg-white px-3 py-1 rounded-full text-black border border-gray-300">
                            {companies.length} Companies
                        </span>

                        <span className="bg-white px-3 py-1 rounded-full text-black border border-gray-300">
                            Real-time Data
                        </span>
                    </div>
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
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-xl text-sm focus:outline-none focus:border-[#00c193] transition-colors shadow-sm"
                        style={{
                            borderWidth: "2px",
                            borderColor: "#00c193"
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
                            className="px-4 py-2 rounded-lg text-sm bg-white focus:outline-none"
                            style={{ borderWidth: "2px", borderColor: "#00c193" }}
                        >
                            <option value="">Industry</option>
                            <option>Technology</option>
                            <option>Finance</option>
                            <option>Healthcare</option>
                            <option>Retail</option>
                        </select>

                        {/* HQ */}
                        <select
                            className="px-4 py-2 rounded-lg text-sm bg-white focus:outline-none"
                            style={{ borderWidth: "2px", borderColor: "#00c193" }}
                        >
                            <option value="">HQ</option>
                            <option>USA</option>
                            <option>UK</option>
                            <option>Germany</option>
                            <option>Japan</option>
                        </select>

                        {/* Revenue */}
                        <select
                            className="px-4 py-2 rounded-lg text-sm bg-white focus:outline-none"
                            style={{ borderWidth: "2px", borderColor: "#00c193" }}
                        >
                            <option value="">Revenue</option>
                            <option>$0–100M</option>
                            <option>$100–500M</option>
                            <option>$500M+</option>
                        </select>

                        {/* Employees */}
                        <select
                            className="px-4 py-2 rounded-lg text-sm bg-white focus:outline-none"
                            style={{ borderWidth: "2px", borderColor: "#00c193" }}
                        >
                            <option value="">Employees</option>
                            <option>0–500</option>
                            <option>500–2000</option>
                            <option>2000+</option>
                        </select>

                        {/* Apply Button */}
                        <button
                            className="px-5 py-2 rounded-lg text-sm font-medium text-white transition-colors"
                            style={{ backgroundColor: "#00c193" }}
                        >
                            Apply
                        </button>

                        {/* Clear All */}
                        <button
                            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            style={{ color: "#00c193" }}
                        >
                            Clear All
                        </button>
                    </div>
                </div>



                {/* Results Count */}
                <div className="text-sm text-gray-600">
                    Showing {paginatedCompanies.length} of {filteredCompanies.length} companies
                </div>

                {/* GRID: Company Cards - 3 Rows x 4 Cards */}
                <div className="grid grid-cols-4 gap-6">
                    {paginatedCompanies.map(company => (
                        <div
                            key={company.id}
                            className="rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-1"
                            style={{ borderWidth: "1px", borderColor: "#00c193" }}
                        >
                            {/* Card Header */}
                            <div className="mb-4">
                                <h3 className="font-semibold text-gray-900">{company.name}</h3>
                                <p className="text-xs text-gray-500">{company.industry}</p>
                            </div>

                            {/* Quick Info */}
                            <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
                                <div className="bg-gray-50 p-2 rounded-lg">
                                    <div className="text-gray-500">HQ</div>
                                    <div className="font-semibold text-gray-900">{company.hq}</div>
                                </div>
                                <div className="bg-gray-50 p-2 rounded-lg">
                                    <div className="text-gray-500">Revenue</div>
                                    <div className="font-semibold text-gray-900">{company.revenue}</div>
                                </div>
                            </div>

                            {/* Report Sections */}
                            <div className="space-y-2">
                                {[
                                    ["digital", "Public / Digital Initiatives", "🌐"],
                                    ["cloud", "Cloud / Tech Stack", "☁️"],
                                    ["ai", "AI Use Cases", "🤖"],
                                    ["outlook", "Transformation Outlook", "📊"],
                                    ["explanation", "Score Explanation", "💡"]
                                ].map(([key, label, icon]) => {
                                    const isActive = activeSection[company.id] === key;
                                    const hasActiveSection = activeSection[company.id] !== null && activeSection[company.id] !== undefined;
                                    const shouldShow = !hasActiveSection || isActive;

                                    return shouldShow ? (
                                        <div key={key}>
                                            <button
                                                onClick={() => toggleSection(company.id, key as string)}
                                                className="w-full flex justify-between items-center px-3 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors rounded-lg"
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
                                                    className="mt-2 px-3 py-3 bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg overflow-y-auto"
                                                    style={{
                                                        borderWidth: "1px",
                                                        borderColor: "#00c193",
                                                        height: "200px"
                                                    }}
                                                >
                                                    <AdvMarkdownHandler
                                                        content={company.reports[key as keyof typeof company.reports]}
                                                    />
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