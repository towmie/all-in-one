import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCoin } from "../../services/apiCrypto";
import toast from "react-hot-toast";

export function useCreateCoin() {
  const clientQuery = useQueryClient();

  const { mutate: udateCoin, isLoading: isUpdating } = useMutation({
    mutationFn: (coin) => createCoin(coin),
    onSuccess: () => {
      toast.success("New coin added");
      clientQuery.invalidateQueries({ queryKey: ["cryptolist"] });
    },
    onError: () => {
      toast.error('Coin cannot be found')
    }
  });

  return {
    udateCoin,
    isUpdating,
  };
}
