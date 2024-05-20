import Spinner from "../../ui/Spinner";
import Table, { Cell } from "../../ui/Table";
import FiatRow from "./FiatRow";
import { useSaved } from "./useSaved";

function FiatSavings() {
  const { saved, isLoadingSaved } = useSaved();

  if (isLoadingSaved) return <Spinner />;

  return (
    <Table columns="2.4rem 1fr 1fr 8rem">
      <Table.Header>
        <Cell>Nº</Cell>
        <Cell>Saved $</Cell>
        <Cell>Date</Cell>
        <Cell></Cell>
      </Table.Header>
      <Table.Body
        data={saved}
        render={(outcome, i) => (
          <FiatRow fiatItem={outcome} index={i} key={outcome.id} type="saved" />
        )}
      />
    </Table>
  );
}

export default FiatSavings;
