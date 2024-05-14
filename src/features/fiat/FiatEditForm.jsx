import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useUpdateFiat } from "./useUpdateFiat";
import Spinner from "../../ui/Spinner";

function FiatEditForm({ item, type, onCloseModal }) {
  const { handleSubmit, formState, reset, register } = useForm();
  const { updateFiat, isLoadingUpdate } = useUpdateFiat();
  const { errors } = formState;

  function onHandleSubmit(data) {
    updateFiat(
      {
        data,
        id: item.id,
        type,
      },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  if (isLoadingUpdate) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onHandleSubmit)}>
      <FormRow
        error={errors?.type?.message}
        label={type.charAt(0).toUpperCase() + type.slice(1)}
      >
        <Input
          type="number"
          id={type}
          defaultValue={item.item}
          {...register(`${type}`, {
            required: "This field is required",
            min: {
              value: 0,
              message: `${
                type.charAt(0).toUpperCase() + type.slice(1)
              } should be at greater than 0`,
            },
          })}
        />
      </FormRow>
      <FormRow label="Date" error={errors?.date?.message}>
        <Input
          type="date"
          defaultValue={item.date}
          id="date"
          {...register("date", { required: "This field is required" })}
        />
      </FormRow>
      {type !== "saved" && (
        <FormRow label="Category" error={errors?.category?.message}>
          <Input
            type="text"
            defaultValue={item.category}
            id="category"
            {...register("category")}
          />
        </FormRow>
      )}

      <FormRow>
        <Button
          variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button disabled={isLoadingUpdate}>Update</Button>
      </FormRow>
    </Form>
  );
}

export default FiatEditForm;
