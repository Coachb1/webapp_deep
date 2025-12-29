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
    tempLoginView?: string;
  };
}

export default async function Page({
  params,
  searchParams,
}: BookPageProps) {
  let autoLoginEmail: string | undefined = searchParams.email;
  let LoginView: string = "email_password"
  let onlyClientSetup = false;
  let allowedDomain = "";

  // ✅ If no email but clientId exists → fetch client
  if (!autoLoginEmail && searchParams.clientId) {
    const client = await getClientbyClientId(searchParams.clientId);
    console.debug('loginviwe', client?.libraryBotConfig?.login_view, client)
    LoginView = client?.libraryBotConfig?.login_view ?? searchParams?.tempLoginView ?? "no_login"
    allowedDomain = client?.allowed_domain || ""
    if (LoginView === 'no_login'){
      autoLoginEmail = client?.owner_email_id;
      onlyClientSetup = true;
    }
  }

  // ✅ Auto-login path
  if (autoLoginEmail && onlyClientSetup) {
    return (
      <UserProvider LoginView={LoginView}>
        <UserInfoGate autoLoginEmail={autoLoginEmail} LoginView={LoginView}>
          <BookPageClient id={params.id} onlyClientSetup={onlyClientSetup} />
        </UserInfoGate>
      </UserProvider>
    );
  }

  if (LoginView === 'email_password'){
    return (
      <UserProvider LoginView={LoginView}>
        <UserInfoWall allowedDomains={allowedDomain}>
          <BookPageClient id={params.id} />
        </UserInfoWall>
      </UserProvider>
    );
  }

  if (LoginView === 'only_email'){
    return (
      <UserProvider LoginView={LoginView}>
        <UserInfoGate LoginView={LoginView} allowedDomains={allowedDomain}>
          <BookPageClient id={params.id} />
        </UserInfoGate>
      </UserProvider>
    );
  }

}
