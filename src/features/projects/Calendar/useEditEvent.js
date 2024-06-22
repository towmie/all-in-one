import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editEvent as editEventApi } from "../../../services/apiEvents";
import toast from "react-hot-toast";

export function useEditEvent() {
  const queryClient = useQueryClient();

  const { mutate: editEvent, isPending: isEditing } = useMutation({
    mutationFn: (event, id) => editEventApi(event, id),
    onSuccess: () => {
      toast.success("Event successfully edited");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { editEvent, isEditing };
}
