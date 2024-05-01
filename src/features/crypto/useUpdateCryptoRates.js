import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCoinsData } from "../../services/apiCrypto";
import toast from "react-hot-toast";

export function useUpdateCrypto() {
  const queryClient = useQueryClient();

  const { mutateAsync: updateCryptoBalance, isLoading } = useMutation({
    mutationFn: (coins) => updateCoinsData(coins),
    onSuccess: () => {
      toast.success("Balance successfully updated");
      queryClient.invalidateQueries({ queryKey: ["cryptolist"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateCryptoBalance, isLoading };
}
