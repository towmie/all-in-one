import { useQuery } from "@tanstack/react-query";
import { getFiatOutcome } from "../../services/apiFiat";

export function useTotalOutcome() {
  const { data: fiatOutcome, isLoading: isLoadingOutcome } = useQuery({
    queryKey: ["fiatOutcome"],
    queryFn: getFiatOutcome,
  });

  return { fiatOutcome, isLoadingOutcome };
}
