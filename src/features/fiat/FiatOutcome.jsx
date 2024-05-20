import { OUTCOME_OPTIONS } from "../../services/constants";
import { FilterContainer } from "../../ui/FilterContainer";
import SortBy from "../../ui/SortBy";
import Spinner from "../../ui/Spinner";
import Table, { Cell } from "../../ui/Table";
import FiatRow from "./FiatRow";
import { useOutcome } from "./useOutcome";

function FiatOutcome() {
  const { fiatOutcome, isLoadingOutcome } = useOutcome();

  if (isLoadingOutcome) return <Spinner />;

  return (
    <>
      <FilterContainer>
        <SortBy
          options={[{ value: "all", label: "All" }, ...OUTCOME_OPTIONS]}
        />
      </FilterContainer>
      <Table columns="2.4rem 1fr 1fr 1fr 7rem">
        <Table.Header>
          <Cell>Nº</Cell>
          <Cell>Outcome $</Cell>
          <Cell>Date</Cell>
          <Cell>Category</Cell>
          <Cell></Cell>
        </Table.Header>
        <Table.Body
          data={fiatOutcome}
          render={(outcome, i) => (
            <FiatRow
              fiatItem={outcome}
              index={i}
              key={outcome.id}
              type="outcome"
            />
          )}
        />
      </Table>
    </>
  );
}

export default FiatOutcome;
