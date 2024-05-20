import { useQuery } from "@tanstack/react-query";
import { getSaved } from "../../services/apiFiat";

export function useSaved() {
  const { data: saved, isLoading: isLoadingSaved } = useQuery({
    queryKey: ["saved"],
    queryFn: getSaved,
  });

  return { saved, isLoadingSaved };
}
