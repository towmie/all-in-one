import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCoin as deleteCoinApi } from "./../../services/apiCrypto";

export function useDeleteCoin() {
  const queryClient = useQueryClient();
  const { mutate: deleteCoin, isLoading: isDeleting } = useMutation({
    mutationFn: deleteCoinApi,
    onSuccess: () => {
      toast.success("Coin successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["cryptolist"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteCoin, isDeleting };
}
