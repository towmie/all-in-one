import { useQuery } from "@tanstack/react-query";
import { getTotoalSummary } from "../../services/apiFiat";

export function useTotalsummary() {
  const { data: totalSummary, isLoading: isLoadingSummary } = useQuery({
    queryKey: ["summary"],
    queryFn: getTotoalSummary,
  });

  return { totalSummary, isLoadingSummary };
}
