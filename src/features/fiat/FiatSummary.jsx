import { Cardlist } from "../../ui/CardList";
import CardItem from "../../ui/CardItem";
import Spinner from "./../../ui/Spinner";
import Heading from "./../../ui/Heading";
import { Empty } from "./../../ui/Empty";
import { formatCurrency } from "./../../utils/utils";
import { useTotalsummary } from "./useTotalsummary";

function FiatSummary() {
  const { totalSummary, isLoadingSummary } = useTotalsummary();

  if (isLoadingSummary) return <Spinner />;

  const totalIncome = totalSummary.fiatIncome.reduce(
    (acc, cur) => cur.income + acc,
    0
  );
  const totalOutcome = totalSummary.fiatOutcome.reduce(
    (acc, cur) => cur.outcome + acc,
    0
  );
  const totalSaved = totalSummary.fiatSaved.reduce(
    (acc, cur) => cur.saved + acc,
    0
  );

  return (
    <>
      {totalIncome !== 0 || totalOutcome !== 0 ? (
        <Cardlist columns="1fr 1fr 1fr 1fr">
          <CardItem type="total-balance">
            <div>
              <Heading as="h5">Income this Month: </Heading>
              <Heading>
                <small>+</small>
                {formatCurrency(totalIncome)}
              </Heading>
            </div>
          </CardItem>
          <CardItem type="total-balance">
            <div>
              <Heading as="h5">Outcome this Month: </Heading>
              {totalOutcome ? (
                <Heading>
                  <small>-</small>
                  {formatCurrency(totalOutcome)}
                </Heading>
              ) : (
                <small>No outcome in this month</small>
              )}
            </div>
          </CardItem>
          <CardItem type="total-balance">
            <div>
              <Heading as="h5">Monthly balance:</Heading>
              <Heading
                roi={totalIncome - totalOutcome > 0 ? "positive" : "negative"}
              >
                {formatCurrency(totalIncome - totalOutcome)}
              </Heading>
            </div>
          </CardItem>
          <CardItem type="total-balance">
            <div>
              <Heading as="h5">Saved:</Heading>
              <Heading>{formatCurrency(totalSaved)}</Heading>
            </div>
          </CardItem>
        </Cardlist>
      ) : (
        <Empty>No data to show at the moment</Empty>
      )}
    </>
  );
}

export default FiatSummary;
