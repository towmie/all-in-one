import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addFiatitem } from "../../services/apiFiat";
import toast from "react-hot-toast";

export function useAddFiat() {
  const queryClient = useQueryClient();

  const { mutate: addNewFiat, isLoading: isAddingNewFiat } = useMutation({
    mutationFn: (newValue) => addFiatitem(newValue),
    onSuccess: ({ moneyAction }) => {
      const queryArray = ["summary", `${moneyAction}`];
      queryArray.forEach((el) => {
        queryClient.invalidateQueries({
          queryKey: [`${el}`],
        });
      });
      toast.success("Data successfully updated");
    },
    onError: (error) => toast.error(error.message),
  });

  return { addNewFiat, isAddingNewFiat };
}
