import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { StyledSelect } from "../../ui/Select";
import Button from "../../ui/Button";
import { useAddFiat } from "./useAddFiat";

function FiatAddForm({ onCloseModal }) {
  const { register, handleSubmit, watch, reset, formState } = useForm();
  const { addNewFiat, isAddingNewFiat } = useAddFiat();
  const { errors } = formState;

  const selectedMoneyTransaction = watch("moneyAction") || "fiatIncome";

  const moneyTransaction = [
    { value: "fiatIncome", label: "Add new Income" },
    { value: "fiatOutcome", label: "Add new Outcome" },
    { value: "saved", label: "Add new Savings" },
  ];

  const incomeOptions = [
    { value: "salary", label: "Salary" },
    { value: "side", label: "Side Hustle" },
    { value: "other", label: "Other" },
  ];

  const outcomeOptions = [
    { value: "entertainment", label: "Entertainment" },
    { value: "food", label: "Food" },
    { value: "family", label: "Family" },
    { value: "sport", label: "Sport" },
    { value: "gifts", label: "Gifts" },
    { value: "beauty", label: "Beauty" },
    { value: "house", label: "House" },
    { value: "transport", label: "Transport" },
    { value: "health", label: "Health" },
    { value: "education", label: "Education" },
    { value: "taxes", label: "Taxes" },
    { value: "restaurants", label: "Restaurants" },
  ];

  function onHandleSubmit(data) {
    console.log(data);
    let actionName;
    if (data.moneyAction === "fiatIncome") actionName = "income";
    if (data.moneyAction === "fiatOutcome") actionName = "outcome";
    if (data.moneyAction === "saved") actionName = "saved";

    addNewFiat(
      { ...data, actionName },
      {
        onSuccess: () => {
          reset();
          onCloseModal?.();
        },
      }
    );
  }

  return (
    <Form onSubmit={handleSubmit(onHandleSubmit)}>
      <FormRow label="Type of transaction" error={errors?.moneyAction?.message}>
        <StyledSelect
          id="moneyAction"
          defaultValue="fiatIncome"
          {...register("moneyAction", { required: "This field is required" })}
        >
          {moneyTransaction.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </FormRow>
      <FormRow label="Value" error={errors?.value?.message}>
        <Input
          type="number"
          id="number"
          {...register("value", {
            required: "This field is required",
            min: {
              value: 0,
              message: "The value should be greater than 0",
            },
          })}
        />
      </FormRow>
      <FormRow label="Date" error={errors?.date?.message}>
        <Input
          type="date"
          id="date"
          {...register("date", { required: "This field is required" })}
        />
      </FormRow>
      {selectedMoneyTransaction !== "saved" && (
        <FormRow label="Category" error={errors?.category?.message}>
          <StyledSelect
            {...register("category", {
              required: "This field is required",
            })}
          >
            {selectedMoneyTransaction === "fiatIncome" &&
              incomeOptions.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
            {selectedMoneyTransaction === "fiatOutcome" &&
              outcomeOptions.map((option) => (
                <option key={option.value} value={option.label}>
                  {option.label}
                </option>
              ))}
          </StyledSelect>
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
        <Button disabled={isAddingNewFiat}>Add</Button>
      </FormRow>
    </Form>
  );
}

export default FiatAddForm;
