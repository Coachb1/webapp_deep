import BookPageClient from "@/components/books/BookPageClient";
import { UserProvider } from "@/components/books/context/UserContext";
import UserInfoGate from "@/components/books/Userinfogate";
import "@/index.css";

interface BookPageProps {
  params: { id: string };
}

export default function Page({ params }: BookPageProps) {
  return (
    <UserProvider>
      <UserInfoGate>
        <BookPageClient id={params.id} />
      </UserInfoGate>
    </UserProvider>
  );
}
