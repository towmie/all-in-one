import { useQuery } from "@tanstack/react-query";
import { getFiatIncome } from "../../services/apiFiat";
import { useSearchParams } from "react-router-dom";

export function useIncome() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("sortBy") || "all";

  const filter = !filterValue
    ? null
    : { field: "category", value: filterValue };

  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: fiatIncome, isLoading: isLoadingIncome } = useQuery({
    queryKey: ["fiatIncome", filter, page - 1],
    queryFn: () => getFiatIncome({ filter, page: page - 1 }),
  });
  return { fiatIncome, isLoadingIncome };
}
