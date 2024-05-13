import Spinner from "../../ui/Spinner";
import Table, { Cell } from "../../ui/Table";
import FiatRow from "./FiatRow";
import { useTotalIncome } from "./useTotalIncome";

function FiatIncome() {
  const { fiatIncome, isLoadingIncome } = useTotalIncome();
  if (isLoadingIncome) return <Spinner />;

  const { fiatIncomes } = fiatIncome;

  return (
    <Table columns="2.4rem 1fr 1fr 1fr 7rem">
      <Table.Header>
        <Cell>Nº</Cell>
        <Cell>Income $</Cell>
        <Cell>Date</Cell>
        <Cell>Category</Cell>
        <Cell></Cell>
      </Table.Header>
      <Table.Body
        data={fiatIncomes}
        render={(income, i) => (
          <FiatRow fiatItem={income} index={i} key={income.id} type="income" />
        )}
      />
    </Table>
  );
}

export default FiatIncome;
