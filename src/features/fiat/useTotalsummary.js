import { useQuery } from "@tanstack/react-query";
import { getTotoalSummary } from "../../services/apiFiat";
import { useSearchParams } from "react-router-dom";
import { startOfMonth, startOfYear, subMonths } from "date-fns";

export function useTotalsummary() {
  const [searchParams] = useSearchParams();

  const filterByDate = searchParams.get("last") || "month";
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
  const { data: totalSummary, isLoading: isLoadingSummary } = useQuery({
    queryKey: ["summary", filterDate],
    queryFn: () => getTotoalSummary({ filterDate }),
  });

  return { totalSummary, isLoadingSummary };
}
