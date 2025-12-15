import CompanyIQ from "@/components/company-iq/companyiq";

export default function CompanyIQPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div>
      <CompanyIQ />
    </div>
  );
}
