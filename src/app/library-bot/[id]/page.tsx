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
  searchParams: { email?: string };

}

export default function Page({ params, searchParams}: BookPageProps) {
  const autoLoginEmail = searchParams.email || undefined;
  if (autoLoginEmail ){
    return <UserProvider >
      <UserInfoGate autoLoginEmail={autoLoginEmail}>
        <BookPageClient id={params.id} onlyClientSetup={true} />
      </UserInfoGate>
    </UserProvider>
  }

  return (
    <UserProvider >
      <UserInfoWall>
        <BookPageClient id={params.id} onlyClientSetup={true}/>
      </UserInfoWall>
    </UserProvider>
  );
}
