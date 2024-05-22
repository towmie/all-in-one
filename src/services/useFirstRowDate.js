import { useQuery } from "@tanstack/react-query";
import { getFirstDate } from "./apiFiat";

export function useFirstRowDate() {
  const { data: firstDates, isLoading: isLoadingDates } = useQuery({
    queryKey: ["firstDates"],
    queryFn: getFirstDate,
  });

  return { firstDates, isLoadingDates };
}
