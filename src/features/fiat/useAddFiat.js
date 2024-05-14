import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFiatitem } from "../../services/apiFiat";
import toast from "react-hot-toast";

export function useAddFiat() {
  const queryClient = useQueryClient();

  const { mutate: addNewFiat, isLoading: isAddingNewFiat } = useMutation({
    mutationFn: (newValue) => addFiatitem(newValue),
    onSuccess: ({ moneyAction }) => {
      queryClient.invalidateQueries({
        queryKey: [`${moneyAction}`],
      });
      toast.success("Data successfully updated");
    },
    onError: (error) => toast.error(error.message),
  });

  return { addNewFiat, isAddingNewFiat };
}
