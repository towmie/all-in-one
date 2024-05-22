import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getFiatIncome } from "../../services/apiFiat";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../services/constants";
import { startOfMonth, startOfYear, subMonths } from "date-fns";

export function useIncome() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  // Filter by category
  const filterValue = searchParams.get("filterBy") || "all";

  const filter = !filterValue
    ? null
    : { field: "category", value: filterValue };

  // Filter by date
  const filterByDate = searchParams.get("last") || "all";
  let filterToDate;
  const now = new Date();
  if (filterByDate === "all") filterToDate = "all";
  if (filterByDate === "month") filterToDate = startOfMonth(now).toISOString();
  if (filterByDate === "three-month")
    filterToDate = subMonths(startOfMonth(now), 2).toISOString();
  if (filterByDate === "year") filterToDate = startOfYear(now).toISOString();

  const filterDate = !filterByDate
    ? null
    : { field: "date", value: filterToDate };

  // pagination page Count
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  const { data: { data: fiatIncome, count } = {}, isLoading: isLoadingIncome } =
    useQuery({
      queryKey: ["fiatIncome", filter, filterDate, page],
      queryFn: () => getFiatIncome({ filter, filterDate, page }),
    });

  // Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount) {
    queryClient.prefetchQuery({
      queryKey: ["fiatIncome", filter, page + 1],
      queryFn: () => getFiatIncome({ filter, filterDate, page: page + 1 }),
    });
  }

  if (page > 1) {
    queryClient.prefetchQuery({
      queryKey: ["fiatIncome", filter, page - 1],
      queryFn: () => getFiatIncome({ filter, filterDate, page: page - 1 }),
    });
  }

  return { fiatIncome, isLoadingIncome, count };
}
