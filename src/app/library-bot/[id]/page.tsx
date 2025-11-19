import BookPageClient from "@/components/books/BookPageClient";
import { UserProvider } from "@/components/books/context/UserContext";
import UserInfoGate from "@/components/books/Userinfogate";
import UserInfoWall from "@/components/books/UserLoginWall";
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
      <UserInfoWall>
        <BookPageClient id={params.id} />
      </UserInfoWall>
    </UserProvider>
  );
}
