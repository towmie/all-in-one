import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateFiatItem } from "../../services/apiFiat";

export function useUpdateFiat() {
  const queryClient = useQueryClient();

  const { mutate: updateFiat, isLoading: isLoadingUpdate } = useMutation({
    mutationFn: (value) => updateFiatItem(value),
    onSuccess: ({ supabaseTable }) => {
      queryClient.invalidateQueries({
        queryKey: [`${supabaseTable}`, "summary"],
      });
      toast.success("Data successfully updated");
    },
    onError: (error) => toast.error(error.message),
  });

  return { updateFiat, isLoadingUpdate };
}
