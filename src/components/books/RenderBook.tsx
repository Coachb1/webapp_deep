import BookPageClient from "./BookPageClient";
import { useUser } from "./context/UserContext";

export function RenderBookPage({ id }: { id: string }) {
    console.log("useUser type:", useUser);
  const {user, loading}= useUser();

  if (loading || !user?.user_data) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  return <BookPageClient id={id} />;
}
