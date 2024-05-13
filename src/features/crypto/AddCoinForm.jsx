import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreateCoin } from "./useCreateCoin";
import Spinner from "../../ui/Spinner";

function AddCoinForm({ onCloseModal }) {
  const { register, handleSubmit, reset, formState } = useForm();
  const { udateCoin, isUpdating } = useCreateCoin();

  const { errors } = formState;

  function onHandleSubmit({ coinName, amount, spentUSD }) {
    udateCoin(
      { coinName, amount, spentUSD },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
    reset();
  }

  if (isUpdating) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onHandleSubmit)}>
      <FormRow label="Coin Name" error={errors?.coinName?.message}>
        <Input
          type="text"
          id="coinName"
          {...register("coinName", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow label="Amount" error={errors?.amount?.message}>
        <Input
          type="number"
          id="amount"
          {...register("amount", {
            required: "This field is required",
            validate: (value) => value > 0 || "Value must be greater than 0",
          })}
        />
      </FormRow>
      <FormRow label="Spent USD" error={errors?.spentUSD?.message}>
        <Input
          type="number"
          id="spentUSD"
          {...register("spentUSD", {
            required: "This field is required",
            validate: (value) => value > 0 || "Value must be greater than 0",
          })}
        />
      </FormRow>
      <Button>Add new income</Button>
    </Form>
  );
}

export default AddCoinForm;
