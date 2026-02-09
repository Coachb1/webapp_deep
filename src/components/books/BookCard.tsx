"use client";

import { Book, CardButtonConfig } from "@/lib/types";
import React, { useEffect, useState } from "react";
import WatchLaterButton from "./ui/watchLaterButton";
import HeartButton from "./ui/heartbutton";
import { addModuleLater, addModuleLike, addModuleTotalLike, getModuleCompletion, track } from "@/lib/api";
import { usePortalUser } from "./context/UserContext";
import ThumbVoteButton from "./ui/LIkeDislikeButtons";
import { Sticker } from "./sticker";
import IframeViewer from "./IframeViewer";

interface BookCardProps {
  book: Book;
  onPlay: () => void;
  onMore: () => void;
  setViewMode: (item: string) => void;
  setLikedBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  setLaterBooks: React.Dispatch<React.SetStateAction<Book[]>>;
  laterBooks: Book[];
  likedBooks: Book[];
  onlyClientSetup: boolean; // Optional prop to handle client setup
  globalButtonConfig?: CardButtonConfig | null; // Optional global description label
}

const defaultButtonConfig: CardButtonConfig = {
  description: {
    show: true,
    label: "TransformIQ"
  },
  report: {
    show: true,
    label: "Report"
  },
  audio_button: {
    show: true,
    label: ""
  }
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  onPlay,
  onMore,
  setViewMode,
  setLikedBooks,
  setLaterBooks,
  likedBooks,
  laterBooks,
  onlyClientSetup, // Default to false if not provided
  globalButtonConfig
}) => {

  const { user, userInfo } = usePortalUser()
  const user_id = user?.user_data?.uid;
  const [progress, setProgress] = useState<number>(0);  // percentage
  const [status, setStatus] = useState<string>("in-progress"); // or "finished"
  const [completedDate, setCompletedDate] = useState<string | null>(null);
  const [isReadModalOpen, setIsReadModalOpen] = useState(false);
  const [showTransformIQ, setShowTransformIQ] = useState<boolean>(false);
  const [moduleLikes, setModuleLikes] = useState<number>(0);
  const [loadingLikeDislike, setLoadingLikeDislike] = useState<boolean>(false);

  const [cardButtonConfig, setCardButtonConfig] = useState<CardButtonConfig>(
    defaultButtonConfig
  );

  useEffect(() => {
    if (globalButtonConfig){
      setCardButtonConfig(globalButtonConfig);
    } else {
      if (book?.card_button_config) {
        setCardButtonConfig(book.card_button_config);
      }
    }
    
  }, [book]);

  useEffect(()=>{
    if (userInfo.libraryBotConfig?.feature_and_button_controls?.transform_iq_feature
      && book?.transform_iq?.overview && book?.transform_iq?.roles){
      setShowTransformIQ(userInfo.libraryBotConfig?.feature_and_button_controls?.transform_iq_feature?.show === true);
    }
  }, [userInfo])

  useEffect(() => {
    if (!user_id || !book.id) return;

    const fetchProgress = async () => {
      // const data = await getModuleCompletion(user_id, book.id);
      const data = book.userProgress;

      if (data) {
        console.log("Module progress data:", data);
        setModuleLikes(data.total_like || 0);
        setProgress(data.completed_in_percentage || 0);

        // Normalize status
        if (data.status === "completed" || data.status === "finished") {
          setStatus("finished");
        } else {
          setStatus("in-progress");
        }

        // Use end_time instead of completed_date
        if ((data.status === "completed" || data.status === "finished") && data.end_time) {
          setCompletedDate(
            new Date(data.end_time).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
            })
          );
        }
      }
    };

    fetchProgress();
  }, [user_id, book.id, book.userProgress?.completed_in_percentage]);

  const handleLikeDisLike = async (book: Book, vote: 1 | -1) => {
    // Update the like count
    setLoadingLikeDislike(true);
    setModuleLikes((prev) => {
      if (vote === 1) {
        return prev + 1;
      } else {
        return prev - 1;
      }
    });
    await addModuleTotalLike(user?.user_data?.uid ,book.id, vote);
    setLoadingLikeDislike(false);
  };

  const handleToggleLike = (book: Book) => {
    setLikedBooks((prev: Book[]) => {
      const isLiked = prev.find((b: Book) => b.title === book.title);
      if (isLiked) {
        const updated = prev.filter((b: Book) => b.title !== book.title);
        if (updated.length === 0) setViewMode("all");
        return updated;
      } else {
        return [...prev, book];
      }
    });
    console.log("user_id bookcard", user_id);
    addModuleLike(book.id, user_id!);
  };

  const handleToggleLater = (book: Book) => {
    setLaterBooks((prev) => {
      const isLater = prev.find((b) => b.title === book.title);
      if (isLater) {
        const updated = prev.filter((b) => b.title !== book.title);
        if (updated.length === 0) setViewMode("all");
        return updated;
      } else {
        return [...prev, book];
      }
    });
    addModuleLater(book.id, user_id!);
  };

  return (
    <>
      <article className="relative shadow-md rounded-lg bg-white p-3 flex flex-col justify-between border border-[#00c193]">
        <Sticker
          text={book.sticker}
        />
        {/* Book Cover */}
        <img
          src={book.img}
          alt={book.title}
          className="rounded-md mb-4 shadow-sm w-full object-cover aspect-[3/4]"
        />
        {/* Watch Later + Like */}
        <div className="flex items-center gap-1 sm:gap-2 md:gap-0 lg:justify-between">
          {/* Listen Later */}
          {!onlyClientSetup && (
            <button onClick={() => handleToggleLater(book)} className="shrink-0">
              <WatchLaterButton
                isActive={laterBooks.some((b) => b.title === book.title)}
                onToggle={() => { }}
              />
            </button>
          )}

          {/* The Watchlater button is commented for specific purpose to be uncommented later */}

          {/* Heart */}
        {onlyClientSetup ?(
            <ThumbVoteButton
              count={moduleLikes || 0}
              onVote={(value) => handleLikeDisLike(book, value)}
              loading={loadingLikeDislike}
            />
        ): (
            <button
              onClick={() => handleToggleLike(book)}
              className="shrink-0 md:-ml-1 lg:ml-auto"
            >
              <HeartButton
                isActive={likedBooks.some((b) => b.title === book.title)}
                onToggle={() => { }}
              />
            </button>
          )}
        </div>




        {/* Book Info */}
        <div>
          {/* <h4 className="font-bold text-lg mb-1 truncate" title={book.title}>
          {book.title}
        </h4> */}
          <p className="text-gray-600 mb-2 truncate" title={book.author}>
            {book.author}
          </p>
          <p
            
            className="
              inline-block mb-2 px-3 py-1
              bg-gray-200 text-gray-700 text-xs font-semibold
              rounded-full
            "
          >
            {book.tag[0]}
          </p>
          {(cardButtonConfig?.report?.show ?? true) && book?.report &&
            <button
              onClick={() => {setIsReadModalOpen(true)
                    track(book.title, user?.user_data?.uid, 'click', "Opened report")

              }}
            className={`ml-2 custom-btn btn-sm`}
            >
              {cardButtonConfig?.report?.label || "Report"}
            </button>
          }
          {/* <p
            className="custom-subtitle mb-4 line-clamp-2"
            title={book.desc}
          >
            {book.desc}
          </p> */}
        </div>

        {/* Buttons */}
        <div className="flex items-center justify-between gap-3 w-full mt-2">
          {/* ▶ Play Button */}
          { (cardButtonConfig?.audio_button?.show ?? true) &&
            <button
              className="rounded-full border border-green-500 text-green-500 
                w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center 
                hover:bg-green-100 transition shrink-0"
              aria-label="Play audio"
              onClick={onPlay}
            >
              ▶
            </button>
          }

          {/* More Button */}
          { (cardButtonConfig?.description?.show ?? true) &&
          <button
            className={`custom-btn btn-sm`}
            
            onClick={onMore}
          >
          {cardButtonConfig?.description?.label || "TransformIQ"}
          </button>
          }
        </div>


        {/* This section is commented to hide progress bar and finished status to be uncommented later. */}
        {/* Finished Status + Progress */}
        {!onlyClientSetup && (
          <div className="flex items-center mt-3 gap-2">
            {status === "finished" ? (
              <>

                <span className="text-gray-700 text-sm">
                  {completedDate ? `${completedDate} • Finished` : "Finished"}
                </span>
                <div className="flex items-center justify-center w-4 h-4 rounded-full bg-[#00c193] text-white text-xs font-bold shadow-md">
                  ✓
                </div>
              </>
            ) : (
              <>

                <span className="text-gray-700 text-sm">Progress</span>

                <div className="flex-1 h-2 bg-gray-300 rounded-full overflow-hidden">
                  <div
                    className="h-2 bg-green-500 transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </>
            )}
          </div>
        )}

      </article>
      {/* Read Modal with iframe */}
      {isReadModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setIsReadModalOpen(false)}
        >
          <div
            className="bg-white rounded-lg w-full  h-[100vh] flex flex-col shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-xl font-bold text-gray-800">{book.title}</h3>
              <button
                onClick={() => setIsReadModalOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="flex-1 overflow-hidden">
              <IframeViewer url={book.report!} title={book.title} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookCard;
