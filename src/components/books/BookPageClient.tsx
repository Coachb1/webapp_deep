
"use client";

import { useState, useEffect } from "react";
import BookSection from "@/components/books/BookSection";
import { Book, CardButtonConfig, CoursePackage } from "@/lib/types";
import { fetchBooks, track } from "@/lib/api";
import BookDescription from "@/components/books/BookDescription";
import Header from "@/components/books/Header";
import Hero from "@/components/books/Hero";
import AudioPlayer from "@/components/books/AudioPlayer";
import TinyTalkWidget from "./TinyTalk";
import CoachBotsWidget from "./CoachWidget";
import { usePortalUser } from "./context/UserContext";
import { LibraryPageLoader } from "./Loaders";
import ConceptsViewer from "./ConceptTabCollections";
import ActionDashboard from "./ActionDashboard";
import CompanyIQ from "../company-iq/companyiq";
import { IdeaBoardReport } from "./leaderboard/ideaboardReport";
import ConversationalForm from "../job-aid/ConversationalForm";
import ElfsightContactFormWidget from "../ContactForm";


const DefaultFeatureBox = [
                "AI Literacy ⬆️",
                "Digital Tools Adoption ⬆️",
                "Workflows Augmented ⬆️",
                "Decision Readiness ⬆️",
                "Project Pipeline ⬆️",
                "Org Productivity ⬆️",
              ];
interface BookPageClientProps {
  id: string;
  onlyClientSetup?: boolean;
  userLogin?: boolean;
}

export default function BookPageClient({ id, onlyClientSetup=false, userLogin=true }: BookPageClientProps) {
  const { user, userInfo, loading } = usePortalUser();
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [LibraryLoading, setLoading] = useState(true);
  const [title, setTitle] = useState<string|null>(null);
  const [subTitle, setSubTitle] = useState<string|null>(
    null
  );
  const [courseId, setCourseId] = useState("");
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [jobAidId, setJobaidID] = useState<string|null>(null);
  const [heroImageLink, setHeroImageLink] = useState<string|null>(null);
  const [packageDetails, setPackageDetails] = useState<any>(null);
  const [showTransformIQ, setShowTransformIQ] = useState<boolean>(false);
  const [actionKey, setActionKey] = useState<string | null>(null);
  const [featureBox, setFeatureBox] = useState<string[]>(DefaultFeatureBox);
  const [cardButtonConfig, setCardButtonConfig] = useState<CardButtonConfig | null>();
  const [actionType, setActionType] = useState<string | null>(null);


  useEffect(() => {
    console.info('transformiq', userInfo.libraryBotConfig)
    if (userInfo.libraryBotConfig?.feature_and_button_controls?.transform_iq_feature) {
      setShowTransformIQ(userInfo.libraryBotConfig?.feature_and_button_controls?.transform_iq_feature?.show === true);
    }
  }, [userInfo])

  // Load books
  useEffect(() => {
    const loadBooks = async () => {
      if (!user?.user_data?.uid) return;
      try {
        const data: CoursePackage = await fetchBooks(id, user?.user_data?.uid);
        if (!data) return;

        setTitle(data.package_name);
        setSubTitle(data.package_description);
        setCourseId(data.books[0].course_id);
        setJobaidID(data.jobaid_id);
        setHeroImageLink(data.image_link);
        setPackageDetails({
          package_id: data.package_id,
          package_name: data.package_name,
          package_description: data.package_description,
          image_link: data.image_link,
          jobaid_id: data.jobaid_id,
          prompt_job_aid_uid: data.prompt_job_aid_uid ?? null,
          report_config: data.report_config || {},
        });
        localStorage.setItem('jobaid', data.jobaid_id);

        setAllBooks(data.books);
        setFilteredBooks(data.books);
      } catch (err) {
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };
    loadBooks();
  }, [id, user?.user_data?.uid]);

  useEffect(() => {
    if (loading) return;
    console.log('userInfo updated:', userInfo.libraryBotConfig?.bot_config?.coaching?.show, loading);
    if (!loading && userInfo.libraryBotConfig?.card_button_config) {
      setCardButtonConfig(userInfo.libraryBotConfig?.card_button_config);
    }
    setFeatureBox(userInfo.libraryBotConfig?.feature_boxs || DefaultFeatureBox);
  }, [userInfo]);

  const handleSearch = (searchTerm: string) => {
    const queryStr = searchTerm.trim();

    if (!queryStr) {
      // setFilteredBooks(allBooks);
      return;
    }

    const queries = queryStr
      .split(",")
      .map((q) => q.trim().toLowerCase().trim())
      .filter((f) => f.length > 0);

    const filtered = allBooks.filter((book) => {
      const title = book.title?.toLowerCase() || "";
      const author = book.author?.toLowerCase() || "";
      const listName = book.list_name?.toLowerCase() || "";
      const tags = book.tag?.map((t) => t.toLowerCase()) || [];
      const key_words = book.keywords?.map((k) => k.toLowerCase().trim()) || [];

      return queries.some(
        (query) =>
          title.includes(query) ||
          author === query ||
          key_words.some((keyword) => keyword === query)
      );
    });

    setFilteredBooks(filtered);
    setCurrentSlide(0);

  };

  // it will get 'tag', 'list_name', 'business_outcome', 'implementation_complexity', 'unexpected_outcomes', and 'emerging_players' from the book object
  // and there will be AND filter applied on these fields.
  const handleMultipleSearch = (
    tag?: string,
    listName?: string,
    businessOutcome?: string,
    implementationComplexity?: string,
    unexpectedOutcomes?: string,
    emergingPlayers?: string,
    Function?: string,
    startUp?: string
  ) => {
    // Normalize only when provided
    const normalize = (val?: string) => val?.trim().toLowerCase() || null;

    const normalized = {
      tag: normalize(tag),
      listName: normalize(listName),
      businessOutcome: normalize(businessOutcome),
      implementationComplexity: normalize(implementationComplexity),
      unexpectedOutcomes: normalize(unexpectedOutcomes),
      emergingPlayers: normalize(emergingPlayers),
      function: normalize(Function),
      startUp: normalize(startUp),
    };
    console.log("Multiple search with filters:", normalized);

    const filtered = allBooks.filter((book) => {
      const bookTag = book.tag?.map((t: string) => t.toLowerCase()) || [];
      const bookBusinessOutcome = book.business_outcome?.map((b: string) => b.toLowerCase()) || [];
      const bookImplementationComplexity = book.implementation_complexity?.map((i: string) => i.toLowerCase()) || [];
      const bookUnexpectedOutcomes = book.unexpected_outcomes?.map((u: string) => u.toLowerCase()) || [];
      const bookEmergingPlayers = String(book.emerging_players || "").toLowerCase();
      const bookFunction = book.function?.map((f: string) => f.toLowerCase()) || [];
      const bookStartUp = String(book.start_up || "").toLowerCase();

      return (
        (!normalized.tag || bookTag.includes(normalized.tag)) &&
        (!normalized.businessOutcome || bookBusinessOutcome.includes(normalized.businessOutcome)) &&
        (!normalized.implementationComplexity || bookImplementationComplexity.includes(normalized.implementationComplexity)) &&
        (!normalized.unexpectedOutcomes || bookUnexpectedOutcomes.includes(normalized.unexpectedOutcomes)) &&
        (!normalized.emergingPlayers || bookEmergingPlayers === normalized.emergingPlayers) &&
        (!normalized.function || bookFunction.includes(normalized.function)) &&
        (!normalized.startUp || bookStartUp === normalized.startUp)
      );
    });

    // Update state
    console.info('filter', filtered)
    setFilteredBooks(filtered);
    setCurrentSlide(0);

  };


  const handleFilterChange = (filter: string) => {
    const normalized = filter.trim().toLowerCase();

    if (!normalized || normalized === "filter") {
      // setFilteredBooks(allBooks);
      return;
    }

    const filters = normalized
      .split(",")
      .map((f) => f.trim().toLowerCase())
      .filter((f) => f.length > 0);

    const filtered = allBooks.filter((book) => {
      const listName = book.list_name?.toLowerCase() || "";
      const tags = book.tag?.map((t) => t.toLowerCase()) || [];
            return filters.some(
              (f) => listName === f || tags.some((tag) => tag === f)
            );
          });
      
          setFilteredBooks(filtered);
          setCurrentSlide(0);
        };

  const handlePlayBook = (book: Book, index: number) => {
    setCurrentBook(book);
    setCurrentBookIndex(index);
    setShowAudioPlayer(true);
    track(book.title, user?.user_data?.uid, "click", "played book")
  };

  const handleClosePlayer = () => {
    setShowAudioPlayer(false);
    setCurrentBook(null);
  };

  const handleNextBook = () => {
    const nextIndex = (currentBookIndex + 1) % filteredBooks.length;
    setCurrentBook(filteredBooks[nextIndex]);
    setCurrentBookIndex(nextIndex);
  };

  const handlePrevBook = () => {
    const prevIndex =
      (currentBookIndex - 1 + filteredBooks.length) % filteredBooks.length;
    setCurrentBook(filteredBooks[prevIndex]);
    setCurrentBookIndex(prevIndex);
  };

  const handleOpenDescription = (book: Book) => {
    setSelectedBook(book);
    setShowDescription(true);
    track(book.title, user?.user_data?.uid, "click", "TransformIQ opened")
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
    setSelectedBook(null);
  };
  console.debug("de", actionKey, actionType)


  return (
    <div
      className="main_font_family"
      style={{
        zoom: "0.8",
        width: "100%",
      }}
    >
      <main id="top">
        <Header packageCourseId={id} 
        jobaidId={jobAidId} 
        onlyClientSetup={onlyClientSetup} 
        clientLogoUrl={userInfo?.clientLogoUrl}
        onAction={(value, type) => {
            setActionKey(value);
            setActionType(type?.trim() || null);

            setTimeout(() => {
              document
                .getElementById("action-section")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 120);
            track(`${value.replace("CONCEPTS_",'')}`, user?.user_data?.uid)
          }}
        
        />
        <Hero title={title} subTitle={subTitle} imageLink={heroImageLink} featureBox={featureBox} />

        {(loading || LibraryLoading) &&  (
          <div
            // full-page hovering overlay
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
            role="status"
            aria-live="polite"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow-lg">
              <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin" />
              <p className="mt-3 text-gray-700 dark:text-gray-200 text-sm">
                Updating the latest adoption intelligence. Please wait…
              </p>
            </div>
          </div>
        )}

        <ActionDashboard
          selectedAction={actionKey}
          onAction={(value, type) => {
            setActionKey(value);
            setActionType(type?.trim() || null);

            setTimeout(() => {
              document
                .getElementById("action-section")
                ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 120);
            track(`${value.replace("CONCEPTS_",'')}`, user?.user_data?.uid)
          }}
        />


        {/* 🔥 Smooth Action Section */}
        <div
          id="action-section"
          className={`
            transition-all duration-500 ease-in-out
            ${actionKey?.includes("CONCEPTS")
              ? "overflow-visible max-h-none"
              : actionKey
                ? "overflow-hidden max-h-[3000px]"
                : "overflow-hidden max-h-0"}
            `}
          >

            

          {actionType ? (
            <>
            {actionType === 'jobaid' && 
              <div className="flex justify-center items-center bg-gray-100 p-6 rounded-lg">
                <ConversationalForm
                  job_aid_id={actionKey!}
                  isEmailSection={!userLogin}
                  inputEmail={user?.user_data?.email || "undefined@gmail.com"}
                  inputName={user?.user_data?.name || "User"}
                  clientId={userInfo?.clientId}
                />
              </div>
            }
            </>
          ): (
          <>
          {actionKey?.includes("CONCEPTS") && (
            <ConceptsViewer actionKey={actionKey!} />
          )}

          {actionKey === "AI_LANDSCAPE" && <CompanyIQ />}

          {actionKey === "SHOW_AI_CASES" && (
            <>
              {LibraryLoading || loading ? (
                <LibraryPageLoader />
              ) : (
                <BookSection
                  books={filteredBooks}
                  currentSlide={currentSlide}
                  onSlideChange={setCurrentSlide}
                  onSearch={handleSearch}
                  onMultipleSearch={handleMultipleSearch}
                  onFilterChange={handleFilterChange}
                  onPlayBook={handlePlayBook}
                  onOpenDescription={handleOpenDescription}
                  setFilteredBooks={setFilteredBooks}
                  setCurrentSlide={setCurrentSlide}
                  name={user?.user_data?.name}
                  email={user?.user_data?.email}
                  all_books={allBooks}
                  jobAidId={jobAidId}
                  promptJobAidId={packageDetails?.prompt_job_aid_uid}
                  packageDetails={packageDetails}
                  onlyClientSetup={onlyClientSetup}
                  cardButtonConfig={cardButtonConfig}
                />
              )}
            </>
          )}

          {!loading && jobAidId && actionKey === "INTERNAL_TRANSFORMATION_ALIGN" && (
            <IdeaBoardReport
              jobaid={jobAidId}
              userEmail={user?.user_data?.email}
              onlyclientsetup={onlyClientSetup}
            />
          )}

          {!loading && jobAidId && actionKey === "INTERNAL_TRANSFORMATION_PROPOSE" && (
            <div className="flex justify-center items-center bg-gray-100 p-6 rounded-lg">
              <ConversationalForm
                job_aid_id={jobAidId}
                isEmailSection={!userLogin}
                inputEmail={user?.user_data?.email || "undefined@gmail.com"}
                inputName={user?.user_data?.name || "User"}
                clientId={userInfo?.clientId}
              />
            </div>
          )}
        </>
          )}

        </div>
        

      </main>

      <footer className="bg-white text-black py-6 mt-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base leading-relaxed">
            {/* © {new Date().getFullYear()}{" "} */}
            © 2026 <span className="font-semibold">AIAdopTs</span>. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm mt-2 max-w-2xl mx-auto">
            Frameworks Licenses from respective owners. Cases curated through independent research, verification, and third-party data sources.
          </p>
        </div>
      </footer>

      <AudioPlayer
        show={showAudioPlayer}
        book={currentBook}
        onClose={handleClosePlayer}
        onNext={handleNextBook}
        onPrev={handlePrevBook}
        courseId={courseId}
        trackCompletion={onlyClientSetup ? false : true} // Track completion only if not in client setup mode
      />

      <BookDescription
        book={selectedBook}
        onClose={handleCloseDescription}
        isTransFormIQ={showTransformIQ}
        clientName={userInfo.clientName}
      />

      {/* <TinyTalkWidget up={showAudioPlayer} /> */}
      {!loading && userInfo?.libraryBotConfig?.bot_config?.coaching?.show === true && (
        <CoachBotsWidget
          clientId={userInfo.clientName || "First-Demo"}
          botId={userInfo?.libraryBotConfig?.bot_config?.coaching.show === true ? userInfo?.libraryBotConfig?.bot_config?.coaching.bot_id : "avatar-bot-4837d-coachbot-master-coach--multi-modal-professional-development"}
          up={showAudioPlayer}
        />
      )}
        <ElfsightContactFormWidget up={showAudioPlayer} />
    </div>
  );
}
