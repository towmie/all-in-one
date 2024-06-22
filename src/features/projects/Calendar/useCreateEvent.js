import toast from "react-hot-toast";
import { createEvent as createEventApi } from "../../../services/apiEvents";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateEvent() {
  const queryClient = useQueryClient();

  const { mutate: createEvent, isPending } = useMutation({
    mutationFn: (event) => createEventApi(event),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      queryClient.invalidateQueries({ queryKey: ["filteredEvents"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { createEvent, isPending };
}
