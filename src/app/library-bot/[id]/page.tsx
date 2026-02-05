import BookPageClient from "@/components/books/BookPageClient";
import { UserProvider } from "@/components/books/context/UserContext";
import UserInfoGate from "@/components/books/Userinfogate";
import UserInfoWall from "@/components/books/UserLoginWall";
import "@/index.css";
import { constructMetadata } from "@/lib/utils";
import { getClientbyClientId } from "@/lib/api";

export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";
export const dynamicParams = true; // Important for dynamic routes

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

export default async function Page({ params, searchParams }: BookPageProps) {
  let autoLoginEmail: string | undefined | null = searchParams.email;
  let loginView: string = "email_password";
  let onlyClientSetup = false;
  let allowedDomain = "";

  // ✅ If no email but clientId exists → fetch client
  if (!autoLoginEmail && searchParams.clientId) {
    const client = await getClientbyClientId(searchParams.clientId);
    loginView =
      client?.libraryBotConfig?.login_view ??
      searchParams?.tempLoginView ??
      "email_password";
    allowedDomain = client?.allowed_domain || "";

    if (loginView === "no_login") {
      if (client?.owner_email_id && isNonEmptyString(client.owner_email_id)) {
        autoLoginEmail = client.owner_email_id.trim();
      } else {
        loginView = "email_password";
      }
    }

    if (client?.libraryBotConfig?.login_dashboard === "client_only_setup") {
      onlyClientSetup = true;
    }
  }

  // ✅ Auto-login path
  if (autoLoginEmail && autoLoginEmail.length > 0 && onlyClientSetup) {
    return (
      <UserProvider LoginView={loginView}>
        <UserInfoGate autoLoginEmail={autoLoginEmail} LoginView={loginView}>
          <BookPageClient id={params.id} onlyClientSetup={onlyClientSetup} userLogin={false} />
        </UserInfoGate>
      </UserProvider>
    );
  }

  if (loginView === "email_password") {
    return (
      <UserProvider LoginView={loginView}>
        <UserInfoWall
          allowedDomains={allowedDomain}
          clientId={searchParams?.clientId}
        >
          <BookPageClient id={params.id} onlyClientSetup={onlyClientSetup}/>
        </UserInfoWall>
      </UserProvider>
    );
  }

  if (loginView === "email_only") {
    return (
      <UserProvider LoginView={loginView}>
        <UserInfoGate
          LoginView={loginView}
          allowedDomains={allowedDomain}
          clientId={searchParams?.clientId}
        >
          <BookPageClient id={params.id} onlyClientSetup={onlyClientSetup}/>
        </UserInfoGate>
      </UserProvider>
    );
  }
}

const isNonEmptyString = (value?: string | null): value is string =>
  typeof value === "string" && value.trim().length > 0;
