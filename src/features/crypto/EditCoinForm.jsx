import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useUpdateCoin } from "./useUpdateCoin";

function EditCoinForm({ coinToEdit = {}, onCloseModal }) {
  const { register, handleSubmit, formState, reset } = useForm();
  const { updateCoin, isUpdating } = useUpdateCoin();
  const { errors } = formState;

  function onHandleSubmit(data) {
    updateCoin({
      newCoin: {
        ...data,
        amountInUSD: coinToEdit.rate * +data.amount,
        rate: coinToEdit.rate,
      },
      id: coinToEdit.id,
    });
    onCloseModal?.();
    reset();
  }

  return (
    <Form onSubmit={handleSubmit(onHandleSubmit)}>
      <FormRow label="Coin Name">
        <Input
          type="text"
          id="coinName"
          value={coinToEdit?.coinName}
          disabled
        />
      </FormRow>
      <FormRow label="Rate">
        <Input type="number" id="rate" value={coinToEdit?.rate} disabled />
      </FormRow>
      <FormRow label="Amount" error={errors?.amount?.message}>
        <Input
          type="number"
          defaultValue={coinToEdit?.amount}
          id="amount"
          {...register("amount", {
            required: "This field is required",
            validate: (value) => value > 0 || "Value must be greater than 0",
          })}
        />
      </FormRow>
      <FormRow label="Spent USD" error={errors?.amountSpent?.message}>
        <Input
          type="number"
          defaultValue={coinToEdit?.amountSpent}
          id="amountSpent"
          {...register("amountSpent", {
            required: "This field is required",
            validate: (value) => value > 0 || "Value must be greater than 0",
          })}
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
        <Button>Update</Button>
      </FormRow>
    </Form>
  );
}

export default EditCoinForm;
