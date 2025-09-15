// "use client";
// import { useRouter } from "next/navigation";

// export default function pagerefresh() {
//   const router = useRouter();

//   const handleRefresh = () => {
//     router.refresh(); // ✅ Refreshes data/components without full reload
//   };

//   return (
//     <div className="relative">
//       <h5
//         onClick={handleRefresh}
//         className="absolute top-[-2rem] left-48 text-sm font-bold uppercase tracking-wide text-blue-600"
//       >
//         Our Library
//       </h5>
//     </div>
//   );
// }
"use client";

interface PageRefreshProps {
  onReset: () => void;
}

export default function PageRefresh({ onReset }: { onReset: () => void }) {
  return (
    <div className="relative">
      <h5
        onClick={onReset}
        className="absolute top-[-2rem] left-48 text-sm font-bold uppercase tracking-wide text-blue-600 cursor-pointer"
      >
        Our Library
      </h5>
    </div>
  );
}

