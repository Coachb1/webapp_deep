import '@/index.css';
import '@/app.css';
import Link from 'next/link';

interface Book {
  title: string;
  author: string;
  tag: string[];
  desc: string;
  img: string;
  audio: string;
}

interface BookCardProps {
  book: Book;
  onPlay: (book: Book, index: number) => void;
  onMore: (book: Book) => void;
  index: number;
}

const BookCard = ({ book, onPlay, onMore, index }: BookCardProps) => {
  return (
    <article className="book-card shadow-md rounded-lg bg-white p-4 flex flex-col justify-between">
      <img src={book.img} alt={book.title} className="rounded-md mb-4 shadow-sm" />
      <div>
        <h4 className="font-bold text-lg mb-1">{book.title}</h4>
        <p className="text-gray-600 mb-2">{book.author}</p>
        <a href="#search-container" className="tag inline-block mb-2 px-3 py-1 rounded-full bg-gray-200 text-gray-700 text-xs font-semibold">
          {book.tag[0]}
        </a>
        <p className="dec text-gray-700 text-sm mb-4 line-clamp-3">{book.desc}</p>
      </div>
      <div className="button-container flex items-center gap-4">
        <button
          className="play-button rounded-full border border-green-500 text-green-500 w-10 h-10 flex items-center justify-center hover:bg-green-100 transition"
          aria-label="Play audio"
          onClick={() => onPlay(book, index)}
        >
          ▶
        </button>
        <button
          className="more-button bg-green-600 text-white rounded-full px-4 py-2 hover:bg-green-700 transition"
          onClick={() => onMore(book)}
        >
          More
        </button>
        <Link href={`/library-bot/${index}`}>
          <button className="details-button bg-green-600 text-white rounded-full px-4 py-2 hover:bg-green-700 transition">
            View Details
          </button>
        </Link>
      </div>
    </article>
  );
};

export default BookCard;