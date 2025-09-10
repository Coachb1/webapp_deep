"use client";

import { useState } from 'react';
import Header from '@/components/Header';
import AudioPlayer from '@/components/AudioPlayer';
import { books, Book } from '@/components/data/books';
import Link from 'next/link';
import '@/index.css';
import '@/app.css';

interface BookDetailPageProps {
  params: { id: string };
}

const BookDetailPage = ({ params }: BookDetailPageProps) => {
  const [showAudioPlayer, setShowAudioPlayer] = useState(false);
  const [currentBook, setCurrentBook] = useState<Book | null>(null);

  const bookIndex = parseInt(params.id);
  const book = books[bookIndex];

  if (!book) {
    return (
      <>
        <Header />
        <main>
          <h1>Book not found</h1>
          <Link href="/library-bot">Back to Library</Link>
        </main>
      </>
    );
  }

  const handlePlayBook = () => {
    setCurrentBook(book);
    setShowAudioPlayer(true);
  };

  const handleClosePlayer = () => {
    setShowAudioPlayer(false);
    setCurrentBook(null);
  };

  return (
    <>
      <Header />
      <main>
        <div className="book-detail">
          <img src={book.img} alt={book.title} />
          <h1>{book.title}</h1>
          <h2>by {book.author}</h2>
          <p>{book.desc}</p>
          <div className="tags">
            {book.tag.map((tag, index) => (
              <span key={index} className="tag">{tag}</span>
            ))}
          </div>
          <button onClick={handlePlayBook} className="play-button">Play Audio</button>
          <Link href="/library-bot" className="back-button">Back to Library</Link>
        </div>
      </main>

      <AudioPlayer
        show={showAudioPlayer}
        book={currentBook}
        onClose={handleClosePlayer}
        onNext={() => {}} // Implement if needed
        onPrev={() => {}} // Implement if needed
      />
    </>
  );
};

export default BookDetailPage;
