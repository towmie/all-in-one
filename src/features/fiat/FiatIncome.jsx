import { INCOME_OPTIONS } from "../../services/constants";
import { FilterContainer } from "../../ui/FilterContainer";
import Pagination from "../../ui/Pagination";
import FilterBy from "../../ui/FilterBy";
import Spinner from "../../ui/Spinner";
import Table, { Cell } from "../../ui/Table";
import FiatRow from "./FiatRow";
import { useIncome } from "./useIncome";

function FiatIncome() {
  const { fiatIncome, isLoadingIncome, count: incomeCount } = useIncome();

  if (isLoadingIncome) return <Spinner />;

  return (
    <>
      <FilterContainer>
        <FilterBy
          options={[{ value: "all", label: "All" }, ...INCOME_OPTIONS]}
        />
      </FilterContainer>
      <Table columns="2.4rem 1fr 1fr 1fr 7rem">
        <Table.Header>
          <Cell>Nº</Cell>
          <Cell>Income $</Cell>
          <Cell>Date</Cell>
          <Cell>Category</Cell>
          <Cell></Cell>
        </Table.Header>
        <Table.Body
          data={fiatIncome}
          render={(income, i) => (
            <FiatRow
              fiatItem={income}
              index={i}
              key={income.id}
              type="income"
            />
          )}
        />
        <Table.Footer>
          <Pagination count={incomeCount} />
        </Table.Footer>
      </Table>
    </>
  );
}

export default FiatIncome;
