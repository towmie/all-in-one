import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { getProjectBg, getRandomHexColor } from "../../utils/utils";
import { useAddProject } from "./useAddProject";

function ProjectAddForm({ onCloseModal }) {
  const { handleSubmit, formState, reset, register } = useForm();
  const { errors } = formState;

  const { addProject, isAddingProject } = useAddProject();

  async function onHandleSubmit(data) {
    const projectBg = (await getProjectBg(data.projectName)) || "";
    const color = getRandomHexColor();

    addProject(
      { projectName: data.projectName, bg: projectBg, color },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }
  return (
    <div>
      <Form onSubmit={handleSubmit(onHandleSubmit)}>
        <FormRow label="Project Name" error={errors?.projectName?.message}>
          <Input
            id="projectName"
            {...register("projectName", { required: "This field is required" })}
          />
        </FormRow>
        <FormRow>
          <Button
            variation="secondary"
            type="reset"
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button disabled={isAddingProject}>Add</Button>
        </FormRow>
      </Form>
    </div>
  );
}

export default ProjectAddForm;
