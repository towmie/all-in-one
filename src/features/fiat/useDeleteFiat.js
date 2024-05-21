import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFiatitem } from "../../services/apiFiat";
import toast from "react-hot-toast";

export function useDeleteFiat() {
  const queryClient = useQueryClient();
  const { mutate: deleteFiat, isLoading: isDeleting } = useMutation({
    mutationFn: (value) => deleteFiatitem(value),
    onSuccess: ({ supabaseTable }) => {
      queryClient.invalidateQueries({
        queryKey: [`${supabaseTable}`, "summary"],
      });
      toast.success("Data successfully updated");
    },
    onError: (error) => toast.error(error.message),
  });

  return { deleteFiat, isDeleting };
}
