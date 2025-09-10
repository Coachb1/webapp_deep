import { useState, useEffect } from 'react';
import BookCard from './BookCard';

import { Button } from '@/components/ui/buttonn';
import BookDescription from './BookDescription';

interface Book {
  title: string;
  author: string;
  tag: string[];
  desc: string;
  img: string;
  audio: string;
}

interface BookCarouselProps {
  books: Book[];
  onPlayBook: (book: Book, index: number) => void;
}

const BookCarousel = ({ books, onPlayBook }: BookCarouselProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showDescription, setShowDescription] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const booksPerSlide = 4;
  const totalSlides = Math.ceil(books.length / booksPerSlide);

  const handleMoreClick = (book: Book) => {
    setSelectedBook(book);
    setShowDescription(true);
    document.getElementById('search-container')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleCloseDescription = () => {
    setShowDescription(false);
    setSelectedBook(null);
  };

  const showSlide = (index: number) => {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;
    setCurrentSlide(index);
  };

  const createPaginationButtons = () => {
    const buttons = [];
    
    if (totalSlides <= 5) {
      for (let i = 0; i < totalSlides; i++) {
        buttons.push(
          <Button
            key={i}
            className={`page-btn ${i === currentSlide ? 'active' : ''}`}
            onClick={() => showSlide(i)}
            disabled={i === currentSlide}
          >
            {i + 1}
          </Button>
        );
      }
    } else {
      buttons.push(
        <Button
          key={0}
          className={`page-btn ${0 === currentSlide ? 'active' : ''}`}
          onClick={() => showSlide(0)}
          disabled={0 === currentSlide}
        >
          1
        </Button>
      );

      if (currentSlide > 2) {
        buttons.push(<span key="ellipsis1" className="ellipsis">...</span>);
      }

      const start = Math.max(1, currentSlide - 1);
      const end = Math.min(totalSlides - 1, currentSlide + 1);

      for (let i = start; i < end; i++) {
        buttons.push(
          <Button
            key={i}
            className={`page-btn ${i === currentSlide ? 'active' : ''}`}
            onClick={() => showSlide(i)}
            disabled={i === currentSlide}
          >
            {i + 1}
          </Button>
        );
      }

      if (currentSlide < totalSlides - 3) {
        buttons.push(<span key="ellipsis2" className="ellipsis">...</span>);
      }

      if (totalSlides > 1) {
        buttons.push(
          <Button
            key={totalSlides - 1}
            className={`page-btn ${totalSlides - 1 === currentSlide ? 'active' : ''}`}
            onClick={() => showSlide(totalSlides - 1)}
            disabled={totalSlides - 1 === currentSlide}
          >
            {totalSlides}
          </Button>
        );
      }
    }

    return buttons;
  };

  const getCurrentSlideBooks = () => {
    const start = currentSlide * booksPerSlide;
    const end = start + booksPerSlide;
    return books.slice(start, end);
  };

  if (books.length === 0) {
    return (
      <div className="container book-section-container">
        <div className="carousel-container">
          <p style={{ fontSize: '18px', fontWeight: 'bold', color: 'red', textAlign: 'center', padding: '20px' }}>
            Sorry, we couldn't find any books matching your search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container book-section-container">
      {!showDescription ? (
        <div className="carousel-container">
          <h3 className="section-label">Our Library's</h3>
          <div className="carousel-wrapper">
            <div className="carousel-slides">
              <div className="slide active">
                <div className="card-row">
                  {getCurrentSlideBooks().map((book, index) => (
                    <BookCard
                      key={`${book.title}-${currentSlide * booksPerSlide + index}`}
                      book={book}
                      index={currentSlide * booksPerSlide + index}
                      onPlay={onPlayBook}
                      onMore={handleMoreClick}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="carousel-controls">
            <Button
              className={`carousel-btn ${currentSlide === 0 ? 'disabled' : ''}`}
              onClick={() => showSlide(currentSlide - 1)}
              disabled={currentSlide === 0}
            >
              Prev
            </Button>
            <div className="carousel-indicators">
              {createPaginationButtons()}
            </div>
            <Button
              className={`carousel-btn ${currentSlide === totalSlides - 1 ? 'disabled' : ''}`}
              onClick={() => showSlide(currentSlide + 1)}
              disabled={currentSlide === totalSlides - 1}
            >
              Next
            </Button>
          </div>
        </div>
      ) : (
        <BookDescription book={selectedBook} onClose={handleCloseDescription} />
      )}
    </div>
  );
};

export default BookCarousel;