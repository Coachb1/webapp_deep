import BookPageClient from "@/components/books/BookPageClient";
import { UserProvider } from "@/components/books/context/UserContext";
import UserInfoGate from "@/components/books/Userinfogate";
import "@/index.css";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Library - Coachbot",
});

export default function Page() {
  return (
    <UserProvider>
      <UserInfoGate>
        <BookPageClient id='492756d9-fe16-4336-a473-7f0db80c8716' />
      </UserInfoGate>
    </UserProvider>
  );
}
