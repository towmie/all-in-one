import { useQuery } from "@tanstack/react-query";
import { getFiatIncome } from "../../services/apiFiat";

export function useTotalIncome() {
  const { data: fiatIncome, isLoading: isLoadingIncome } = useQuery({
    queryKey: ["fiatIncome"],
    queryFn: getFiatIncome,
  });

  return { fiatIncome, isLoadingIncome };
}
