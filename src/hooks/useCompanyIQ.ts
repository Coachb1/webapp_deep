import { getCompanyIQData } from "@/lib/api";
import { CompanyIQ } from "@/lib/types";
import { useEffect, useState } from "react";

export function useCompanyIQ() {
  const [data, setData] = useState<CompanyIQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCompanyIQData()
      .then(setData)
      .catch(() => setError("Failed to load CompanyIQ"))
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
