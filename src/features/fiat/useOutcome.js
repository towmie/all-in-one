import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFiatOutcome } from "../../services/apiFiat";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../services/constants";

export function useOutcome() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("filterBy") || "all";

  const filter = !filterValue
    ? null
    : { field: "category", value: filterValue };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const {
    data: { data: fiatOutcome, count } = {},
    isLoading: isLoadingOutcome,
  } = useQuery({
    queryKey: ["fiatOutcome", filter, page],
    queryFn: () => getFiatOutcome({ filter, page }),
  });

  // Pre-fetching
  const pageCount = Math.ceil(fiatOutcome?.length / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["fiatOutcome", filter, page + 1],
      queryFn: () => getFiatOutcome({ filter, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["fiatOutcome", filter, page - 1],
      queryFn: () => getFiatOutcome({ filter, page: page - 1 }),
    });

  return { fiatOutcome, isLoadingOutcome, count };
}
