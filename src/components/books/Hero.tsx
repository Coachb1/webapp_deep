import React, { useState } from "react";
import { usePortalUser } from "./context/UserContext";

interface HeroProps {
  title: string;
  subTitle: string;
  imageLink?: string | null;
}

const Hero: React.FC<HeroProps> = ({ title, subTitle, imageLink }) => {
  const { user, userInfo } = usePortalUser();

  // ⭐ Selected tab for popup
  const [selectedTab, setSelectedTab] = useState<any>(null);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);

  // ⭐ All categories with links
  const foundationalconceptsTabs = [
  { name: "Fine-Tuning", link: "https://cdn.coachbots.com/Case%20Study/Enterprise/fine%20tuning%202.html" },
  { name: "RAG Systems", link: "https://cdn.coachbots.com/Case%20Study/Enterprise/Rag%20system%20new.html" },
  { name: "Embeddings", link: "" },
  { name: "Knowledge Graphs", link: "" },
  { name: "MLOps", link: "" },
  { name: "Prompt Engineering", link: "" },
  { name: "Multi-Agent Systems", link: "" },
  { name: "LLM Safety", link: "" },
  { name: "Model Evaluation", link: "" },
];

const enterpriseAIconceptsTabs = [
  { name: "AI Governance", link: "https://cdn.coachbots.com/Case%20Study/Enterprise/ai%20governance%202.html" },
  { name: "AI Risk", link: "https://cdn.coachbots.com/Case%20Study/Enterprise/ai%20risk%20(2).html" },
  { name: "Data Quality", link: "" },
  { name: "AI Scalability", link: "" },
  { name: "Automation Pipelines", link: "" },
  { name: "Predictive Analytics", link: "" },
  { name: "Causal Inference", link: "" },
  { name: "Digital Twins", link: "" },
  { name: "Personalization Engines", link: "" },
  { name: "Workflow Orchestration", link: "" },
];

  const scrollToSection = () => {
    document.getElementById("section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Hero Section */}
      <section className="bg-[#00c193] text-white py-14 md:py-18 lg:py-9">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-[1.1fr_0.9fr] items-center gap-10 px-4 sm:px-6 lg:px-8">
          <div>
            <h1 className="font-['Playfair_Display',serif] text-[28px] sm:text-[32px] md:text-[40px] lg:text-[36px] leading-tight">
              {title}
            </h1>

            <p className="text-gray-100 mt-4 text-base sm:text-lg lg:text-[16px]">
              {subTitle}
            </p>

            <button
              onClick={scrollToSection}
              className="mt-6 inline-block bg-[whitesmoke] text-[#00c193] px-5 py-3 rounded-lg font-bold shadow-[0_8px_16px_rgba(255,107,107,0.25)] hover:opacity-90 transition"
            >
              View Library
            </button>
          </div>

          <div className="flex justify-center md:justify-end">
            <img
              src={
                imageLink ||
                "https://storage.googleapis.com/publicvid/Case%20Study/WhatsApp%20Image%202025-10-14%20at%2011.39.38_475117de.jpg"
              }
              alt="Hero Art"
              className="w-[200px] sm:w-[240px] md:w-[280px] lg:w-[320px] rounded-md shadow-[0_18px_40px_rgba(0,0,0,0.35)]"
            />
          </div>
        </div>
      </section>

      {/* ⭐ FIRST TAB BOX */}
      <div className="w-full flex justify-center mt-8 px-4">
        <div className="relative bg-white border rounded-2xl px-6 py-6 shadow-sm w-full max-w-6xl">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00c193] hover:bg-gray-300 text-white hover:text-black text-sm font-medium px-5 py-[6px] rounded-xl shadow">
            Foundational Concepts
          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 mt-6">
            {foundationalconceptsTabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => {
                  setSelectedTab(tab);
                  setIsReadModalOpen(true);
                }}
                className="px-4 py-2 rounded-md border text-sm bg-gray-100 border-gray-300"
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ⭐ SECOND TAB BOX */}
      <div className="w-full flex justify-center mt-8 px-4">
        <div className="relative bg-white border rounded-2xl px-6 py-6 shadow-sm w-full max-w-6xl">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#00c193] hover:bg-gray-300 text-white hover:text-black text-sm font-medium px-5 py-[6px] rounded-xl shadow">
            Enterprise AI Concepts
          </div>

          <div className="flex flex-wrap justify-center gap-x-4 gap-y-4 mt-6">
            {enterpriseAIconceptsTabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => {
                  setSelectedTab(tab);
                  setIsReadModalOpen(true);
                }}
                className="px-4 py-2 rounded-md border text-sm bg-gray-100 border-gray-300"
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ⭐ POPUP MODAL */}
      {isReadModalOpen && selectedTab && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsReadModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg w-full max-w-6xl h-[90vh] flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold text-gray-800">
                {selectedTab.name}
              </h3>

              <button
                onClick={() => setIsReadModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <iframe
                src={selectedTab.link}
                className="w-full h-full border-0"
                title={selectedTab.name}
                allow="fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
