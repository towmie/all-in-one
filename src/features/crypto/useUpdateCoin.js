import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCoin as updateCoinApi } from "../../services/apiCrypto";
import toast from "react-hot-toast";

export function useUpdateCoin() {
  const queryClient = useQueryClient();
  const { mutate: updateCoin, isLoading: isUpdating } = useMutation({
    mutationFn: ({ newCoin, id }) => updateCoinApi(newCoin, id),
    onSuccess: () => {
      toast.success("Coin successfully updated");
      queryClient.invalidateQueries({ queryKey: ["cryptolist"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateCoin, isUpdating };
}
