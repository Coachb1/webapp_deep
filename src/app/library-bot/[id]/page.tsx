import BookPageClient from "@/components/books/BookPageClient";
import UserInfoGate from "@/components/books/Userinfogate";

import "@/index.css";

interface BookPageProps {
  params: { id: string };
}

export default function Page({ params }: BookPageProps) {
  return (
    <UserInfoGate>
      <BookPageClient id={params.id} />
    </UserInfoGate>
)
}
