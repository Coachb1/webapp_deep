export const Sticker = ({
  text,
  type = "hot",
}: {
  text?: string;
  type?: "default" | "sale" | "new" | "hot" | "tab";
}) => {
  if (!text) return null;

  const styles = {
    default: "bg-green-500 text-white font-bold",
    sale: "bg-red-500 text-white",
    new: "bg-blue-500 text-white",
    hot: "bg-green-500 text-white animate-pulse",

    // 👇 Your requested tab UI style
    tab: "text-green-800 bg-transparent text-[20px] font-bold",
  };

  // Special UI for tab sticker
  if (type === "tab") {
    return (
      <p className="absolute -top-4 -right-1 px-1 py-0.5 text-green-800 text-[10px]">
        {text}
      </p>
    );
  }

  // Default card sticker
  return (
    <span
      className={`absolute -top-4 -right-2 px-2 py-0.5 text-xs font-semibold rounded-md shadow z-10 ${styles[type]}`}
    >
      {text}
    </span>
  );
};