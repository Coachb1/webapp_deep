"use client";

import { Button } from "@/components/ui/buttonn";

interface Book {
  title: string;
  author: string;
  tag: string[];
  desc: string;
  img: string;
  audio: string;
}

interface BookDescriptionProps {
  book: Book | null;
  onClose: () => void;
}

const BookDescription = ({ book, onClose }: BookDescriptionProps) => {
  if (!book) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          onClick={onClose}
          className="absolute top-3 right-3"
          variant="destructive"
        >
          Close
        </Button>

        <img
          src={book.img}
          alt={book.title}
          className="w-40 h-auto rounded-md mb-4"
        />

        <h2 className="text-xl font-bold mb-2">{book.title}</h2>
        <h4 className="text-gray-600 mb-2">{book.author}</h4>
        <p className="text-sm text-gray-500 mb-2">
          <strong>Category:</strong> {book.tag.join(", ")}
        </p>
        <p className="text-gray-700">{book.desc}</p>
      </div>
    </div>
  );
};

export default BookDescription;

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/buttonn";
// import { books, Book } from "@/components/data/books"; // named imports

// export default function BookLibrary() {
//   const [selectedBook, setSelectedBook] = useState<Book | null>(null);

//   return (
//     <div className="p-4">
//       {/* Books Grid */}
//       <div className="grid grid-cols-2 gap-4">
//         {books.map((book: Book) => (
//           <div
//             key={book.id}
//             className="border rounded-lg p-3 hover:shadow-md flex flex-col items-center"
//           >
//             <img
//               src={book.img}
//               alt={book.title}
//               className="w-full h-40 object-cover rounded"
//             />
//             <h3 className="font-semibold mt-2">{book.title}</h3>
//             <p className="text-sm text-gray-600">{book.author}</p>

//             {/* More button */}
//             <Button
//               className="mt-2 px-3 py-1 bg-blue-500 text-white rounded"
//               onClick={() => setSelectedBook(book)}
//             >
//               More
//             </Button>
//           </div>
//         ))}
//       </div>

//       {/* Description Modal */}
//       {selectedBook && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
//           onClick={() => setSelectedBook(null)} // close on background click
//         >
//           <div
//             className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full relative"
//             onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
//           >
//             {/* Close Button */}
//             <Button
//               onClick={() => setSelectedBook(null)}
//               className="absolute top-3 right-3"
//               variant="destructive"
//             >
//               Close
//             </Button>

//             {/* Book Info */}
//             <img
//               src={selectedBook.img}
//               alt={selectedBook.title}
//               className="w-40 h-auto rounded-md mb-4 mx-auto"
//             />

//             <h2 className="text-xl font-bold mb-2 text-center">
//               {selectedBook.title}
//             </h2>
//             <h4 className="text-gray-600 mb-2 text-center">
//               {selectedBook.author}
//             </h4>
//             <p className="text-gray-700">{selectedBook.desc}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
