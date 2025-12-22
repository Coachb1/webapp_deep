import BookPageClient from "@/components/books/BookPageClient";
import { UserProvider } from "@/components/books/context/UserContext";
import UserInfoGate from "@/components/books/Userinfogate";
import UserInfoWall from "@/components/books/UserLoginWall";
import "@/index.css";
import { constructMetadata } from "@/lib/utils";
import { getClientbyClientId } from "@/lib/api";

export const metadata = constructMetadata({
  title: "Library - Coachbot",
});
interface BookPageProps {
  params: { id: string };
  searchParams: {
    email?: string;
    clientId?: string;
  };
}

export default async function Page({
  params,
  searchParams,
}: BookPageProps) {
  let autoLoginEmail: string | undefined = searchParams.email;

  // ✅ If no email but clientId exists → fetch client
  if (!autoLoginEmail && searchParams.clientId) {
    const client = await getClientbyClientId(searchParams.clientId);
    autoLoginEmail = client?.owner_email_id;
  }

  // ✅ Auto-login path
  if (autoLoginEmail) {
    return (
      <UserProvider>
        <UserInfoGate autoLoginEmail={autoLoginEmail}>
          <BookPageClient id={params.id} onlyClientSetup />
        </UserInfoGate>
      </UserProvider>
    );
  }

  return (
    <UserProvider>
      <UserInfoWall>
        <BookPageClient id={params.id} />
      </UserInfoWall>
    </UserProvider>
  );
}
