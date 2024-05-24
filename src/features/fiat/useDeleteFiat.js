import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFiatitem } from "../../services/apiFiat";
import toast from "react-hot-toast";

export function useDeleteFiat() {
  const queryClient = useQueryClient();
  const { mutate: deleteFiat, isLoading: isDeleting } = useMutation({
    mutationFn: (value) => deleteFiatitem(value),
    onSuccess: ({ supabaseTable }) => {
      const queryArray = ["summary", `${supabaseTable}`];

      queryArray.forEach((el) => {
        queryClient.invalidateQueries({
          queryKey: [`${el}`],
        });
      });

      toast.success("Data successfully deleted");
    },
    onError: (error) => toast.error(error.message),
  });

  return { deleteFiat, isDeleting };
}
