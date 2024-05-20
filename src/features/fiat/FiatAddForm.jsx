import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useAddFiat } from "./useAddFiat";
import styled from "styled-components";
import {
  INCOME_OPTIONS,
  MONEY_TRANSACTION,
  OUTCOME_OPTIONS,
} from "../../services/constants";

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
`;

function FiatAddForm({ onCloseModal }) {
  const { register, handleSubmit, watch, reset, formState } = useForm();
  const { addNewFiat, isAddingNewFiat } = useAddFiat();
  const { errors } = formState;

  const selectedMoneyTransaction = watch("moneyAction") || "fiatIncome";

  function onHandleSubmit(data) {
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
          {MONEY_TRANSACTION.map((option) => (
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
              INCOME_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            {selectedMoneyTransaction === "fiatOutcome" &&
              OUTCOME_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
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
