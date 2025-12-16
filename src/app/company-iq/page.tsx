import CompanyIQ from "@/components/company-iq/companyiq";
import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Company IQ",
  description: "Company IQ provides insights into company performance and metrics.",
});

export default function CompanyIQPage() {
  return (
      <CompanyIQ />
  );
}
