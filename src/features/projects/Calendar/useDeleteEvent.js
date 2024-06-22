import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteEvent as deleteEventApi } from "../../../services/apiEvents";

export function useDeleteEvent() {
  const queryClient = useQueryClient();

  const { mutate: deleteEvent, isPending: isDeleteing } = useMutation({
    mutationFn: (id) => deleteEventApi(id),
    onSuccess: () => {
      toast.success("Event successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["events"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteEvent, isDeleteing };
}
