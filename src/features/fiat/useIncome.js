import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFiatIncome } from "../../services/apiFiat";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../services/constants";

export function useIncome() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  const filterValue = searchParams.get("filterBy") || "all";

  const filter = !filterValue
    ? null
    : { field: "category", value: filterValue };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: { data: fiatIncome, count } = {}, isLoading: isLoadingIncome } =
    useQuery({
      queryKey: ["fiatIncome", filter, page],
      queryFn: () => getFiatIncome({ filter, page }),
    });

  // Pre-fetching
  const pageCount = Math.ceil(fiatIncome?.length / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["fiatIncome", filter, page + 1],
      queryFn: () => getFiatIncome({ filter, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["fiatIncome", filter, page - 1],
      queryFn: () => getFiatIncome({ filter, page: page - 1 }),
    });

  return { fiatIncome, isLoadingIncome, count };
}
