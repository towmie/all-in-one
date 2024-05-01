import { useQuery } from "@tanstack/react-query";
import { getCryptoData } from "../../services/apiCrypto";

export function useCryptoList() {
  const {
    data: cryptoData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cryptolist"],
    queryFn: getCryptoData,
  });
  return { cryptoData, isLoading, error };
}
