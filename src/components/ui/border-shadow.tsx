"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Card } from "./card-hover-effect";
import { ReactNode, useState } from "react";

const BorderShadow = ({ children }: { children: ReactNode }) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  return (
    <div
      key={0}
      className="relative group block p-2 h-full w-full bg-white rounded-2xl"
      onMouseEnter={() => setHoveredIndex(0)}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <AnimatePresence>
        {hoveredIndex === 0 && (
          <motion.span
            className="absolute inset-0 h-full w-full bg-neutral-200  block rounded-2xl"
            layoutId="hoverBackground"
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.15 },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.15, delay: 0.2 },
            }}
          />
        )}
      </AnimatePresence>
      <Card className="p-0 rounded-2xl border overflow-visible">
        {children}
      </Card>
    </div>
  );
};

export default BorderShadow;
