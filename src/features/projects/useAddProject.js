import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { addProject as addProjectApi } from "../../services/apiProjects";

export function useAddProject() {
  const queryClient = useQueryClient();

  const { mutate: addProject, isLoading: isAddingProject } = useMutation({
    mutationFn: (newProject) => addProjectApi(newProject),
    onSuccess: () => {
      toast.success("New project successfully updated");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
    onError: (error) => toast.error(error.message),
  });

  return { addProject, isAddingProject };
}
