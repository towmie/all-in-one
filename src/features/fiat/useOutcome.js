import { useQuery } from "@tanstack/react-query";
import { getFiatOutcome } from "../../services/apiFiat";
import { useSearchParams } from "react-router-dom";

export function useOutcome() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("sortBy") || "all";

  const filter = !filterValue
    ? null
    : { field: "category", value: filterValue };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: fiatOutcome, isLoading: isLoadingOutcome } = useQuery({
    queryKey: ["fiatOutcome", filter, page],
    queryFn: () => getFiatOutcome({ filter, page: page - 1 }),
  });

  return { fiatOutcome, isLoadingOutcome };
}
