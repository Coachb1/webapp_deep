import BookPageClient from "@/components/books/BookPageClient";
import { UserProvider } from "@/components/books/context/UserContext";
import UserInfoGate from "@/components/books/Userinfogate";
import "@/index.css";
import { constructMetadata } from "@/lib/utils";


export const metadata = constructMetadata({
  title: "Library - Coachbot",
});
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
