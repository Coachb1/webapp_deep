import { Book } from "../data/books";

interface BookCardProps {
  book: Book;
  onPlay: () => void;
  onMore: () => void;
}

const BookCard = ({ book, onPlay, onMore }: BookCardProps) => {
  return (
    <article className="book-card shadow-md rounded-lg bg-white p-4 flex flex-col justify-between">
      <img src={book.img} alt={book.title} className="rounded-md mb-4 shadow-sm" />
      <div>
        <h4 className="font-bold text-lg mb-1">{book.title}</h4>
        <p className="text-gray-600 mb-2">{book.author}</p>
        <span className="inline-block mb-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">
          {book.tag[0]}
        </span>
        <p className="text-gray-700 text-sm mb-4 line-clamp-3">{book.desc}</p>
      </div>
      <div className="button-container flex items-center gap-4">
        <button
          className="rounded-full border border-green-500 text-green-500 w-10 h-10 flex items-center justify-center hover:bg-green-100 transition"
          aria-label="Play audio"
          onClick={onPlay}
        >
          ▶
        </button>
        <button
          className="bg-green-600 text-white rounded-full px-4 py-2 hover:bg-green-700 transition"
          onClick={onMore}
        >
          More
        </button>
      </div>
    </article>
  );
};

export default BookCard;
