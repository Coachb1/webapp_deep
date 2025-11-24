
"use client";

import { useState, useEffect } from "react";
import BookSection from "@/components/books/BookSection";
import { Book, CoursePackage } from "@/lib/types";
import { fetchBooks } from "@/lib/api";
import BookDescription from "@/components/books/BookDescription";
import Header from "@/components/books/Header";
import Hero from "@/components/books/Hero";
import AudioPlayer from "@/components/books/AudioPlayer";
import TinyTalkWidget from "./TinyTalk";
import CoachBotsWidget from "./CoachWidget";
import { usePortalUser } from "./context/UserContext";

interface BookPageClientProps {
  id: string;
}

export default function BookPageClient({ id }: BookPageClientProps) {
  const { user, userInfo, loading } = usePortalUser();
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [LibraryLoading, setLoading] = useState(true);
  const [title, setTitle] = useState<string>("TransformationIQ: AI-Powered Analyst for Value Acceleration");
  const [subTitle, setSubTitle] = useState<string>(
    "The AI research and implementation intelligence engine powered by the world's largest case repository."
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
  
  useEffect(()=>{
    console.info('transformiq', userInfo.libraryBotConfig)
    if (userInfo.libraryBotConfig?.feature_and_button_controls?.transform_iq_feature){
      setShowTransformIQ(userInfo.libraryBotConfig?.feature_and_button_controls?.transform_iq_feature?.show === true);
    }
  }, [userInfo])

  // Load books
  useEffect(() => {
    const loadBooks = async () => {
      try {
        const data: CoursePackage = await fetchBooks(id);
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
  }, [id]);

  useEffect(() => {
    console.log('userInfo updated:', userInfo.libraryBotConfig?.bot_config?.coaching?.show, loading);
  }, [userInfo]);

  const handleSearch = (searchTerm: string) => {
    const queryStr = searchTerm.trim();

    if (!queryStr) {
      setFilteredBooks(allBooks);
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
  setFilteredBooks(filtered);
};


  const handleFilterChange = (filter: string) => {
    const normalized = filter.trim().toLowerCase();

    if (!normalized || normalized === "filter") {
      setFilteredBooks(allBooks);
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
  };

  const handlePlayBook = (book: Book, index: number) => {
    setCurrentBook(book);
    setCurrentBookIndex(index);
    setShowAudioPlayer(true);
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
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
    setSelectedBook(null);
  };

  return (
      <>
      <main id="top">
        <Header packageCourseId={id} jobaidId={jobAidId}/>
        <Hero title={title} subTitle={subTitle} imageLink={heroImageLink} />

        {LibraryLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-t-4 border-b-4 border-[#00c193]"></div>
          </div>
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
            packageDetails={packageDetails}
          />
        )}
      </main>

      <footer className="bg-white text-black py-6 mt-8 border-t">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm sm:text-base leading-relaxed">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">CoachBoT</span>. All rights reserved.
          </p>
          <p className="text-xs sm:text-sm mt-2 max-w-2xl mx-auto">
            Copyright for all books belongs to their respective authors and
            publishers. We encourage you to buy and read actual books.
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
      />

      <BookDescription
        book={selectedBook}
        onClose={handleCloseDescription}
        isTransFormIQ={showTransformIQ}
      />

      {/* <TinyTalkWidget up={showAudioPlayer} /> */}
      {!loading && userInfo?.libraryBotConfig?.bot_config?.coaching?.show === true &&(
        <CoachBotsWidget 
          clientId={userInfo.clientName || "First-Demo"}
          botId = {userInfo?.libraryBotConfig?.bot_config?.coaching.show === true ? userInfo?.libraryBotConfig?.bot_config?.coaching.bot_id : "avatar-bot-4837d-coachbot-master-coach--multi-modal-professional-development"}
          up={showAudioPlayer} 
        />
        )}
    </>
  );
}
