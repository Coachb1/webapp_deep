// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function HeartButton() {
//   const [liked, setLiked] = useState(false);

//   const toggleLike = () => {
//     setLiked(!liked);
//   };

//   return (
//     <motion.button
//       onClick={toggleLike}
//       whileTap={{ scale: 0.8 }}
//       className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg ml-16"
//     >
//       {/* Circle background animation */}
//       <motion.span
//         initial={false}
//         animate={{
//           scale: liked ? [0, 1.3, 1] : 0,
//           opacity: liked ? [0, 1, 0] : 0,
//         }}
//         transition={{ duration: 0.5 }}
//         className="absolute inset-0 rounded-full bg-pink-200"
//       />

//       {/* Heart */}
//       <motion.span
//         animate={{
//           scale: liked ? 1.3 : 1,
//           color: liked ? "#ef4444" : "#9ca3af", // red-500 or gray-400
//         }}
//         transition={{ type: "spring", stiffness: 500, damping: 20 }}
//         className="text-xl"
//       >
//         ♥
//       </motion.span>
//     </motion.button>
//   );
// }


import { motion } from "framer-motion";

interface HeartButtonProps {
  isActive: boolean;
  onToggle: () => void;
}

export default function HeartButton({ isActive, onToggle }: HeartButtonProps) {
  return (
    <motion.button
      onClick={onToggle}
      whileTap={{ scale: 0.8 }}
      className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-lg ml-10 "
    >
      {/* Circle background animation */}
      <motion.span
       
        initial={false}
        animate={{
          scale: isActive ? [0, 1.3, 1] : 0,
          opacity: isActive ? [0, 1, 0] : 0,
        }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 rounded-full bg-pink-200"
      />

      {/* Heart */}
      <motion.span
        onClick={onToggle}
        animate={{
          scale: isActive ? 1.3 : 1,
          color: isActive ? "#ef4444" : "#9ca3af",
        }}
        transition={{ type: "spring", stiffness: 500, damping: 20 }}
        className="text-xl "
      >
        ♥
      </motion.span>
    </motion.button>
  );
}

