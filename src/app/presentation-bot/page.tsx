import PresentationPage from "@/components/presentation/PresentationPage";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Presentation Bot - Coachbot",
});

export default function Page() {
  return (
    <PresentationPage />
  )
}
  