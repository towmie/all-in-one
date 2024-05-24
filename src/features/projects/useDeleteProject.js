import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProject as deleteProjectApi } from "./../../services/apiProjects";
import toast from "react-hot-toast";

export function useDeleteProject() {
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isLoading: isDeleteing } = useMutation({
    mutationFn: (id) => deleteProjectApi(id),
    onSuccess: () => {
      toast.success("Project successfully deleted");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (err) => toast.error(err.message),
  });

  return { deleteProject, isDeleteing };
}
