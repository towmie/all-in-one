import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Button from "../../ui/Button";
import { useCreateCoin } from "./useCreateCoin";
import Spinner from "../../ui/Spinner";
import { useCryptoList } from "./useCryptoBalance";
import Select from "../../ui/Select";

function AddCoinForm({ onCloseModal, newCoin = {} }) {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { udateCoin, isUpdating } = useCreateCoin();
  const { cryptoData } = useCryptoList();
  console.log(cryptoData);

  function onHandleSubmit({ newCoin, coinName, amount, spentUSD }) {
    if (!newCoin) {
      udateCoin({ coinName, amount, spentUSD });
    }
    reset();
  }

  if (isUpdating) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onHandleSubmit)}>
      <FormRow label="Coin Name">
        <Input type="text" id="coinName" {...register("coinName")} />
      </FormRow>
      <FormRow label="Amount">
        <Input type="number" id="amount" {...register("amount")} />
      </FormRow>
      <FormRow label="Spent USD">
        <Input type="number" id="spentUSD" {...register("spentUSD")} />
      </FormRow>
      <Button>Add new income</Button>
    </Form>
  );
}

export default AddCoinForm;
