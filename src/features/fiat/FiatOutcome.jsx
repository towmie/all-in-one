import Spinner from "../../ui/Spinner";
import Table, { Cell } from "../../ui/Table";
import FiatRow from "./FiatRow";
import { useTotalOutcome } from "./useTotalOutcome";

function FiatOutcome() {
  const { fiatOutcome, isLoadingOutcome } = useTotalOutcome();
  const { fiatOutcomes } = fiatOutcome;

  if (isLoadingOutcome) return <Spinner />;

  return (
    <Table columns="2.4rem 1fr 1fr 1fr 7rem">
      <Table.Header>
        <Cell>Nº</Cell>
        <Cell>Outcome $</Cell>
        <Cell>Date</Cell>
        <Cell>Category</Cell>
        <Cell></Cell>
      </Table.Header>
      <Table.Body
        data={fiatOutcomes}
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
  );
}

export default FiatOutcome;
