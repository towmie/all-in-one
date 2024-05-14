import { Cardlist } from "../../ui/CardList";
import CardItem from "../../ui/CardItem";
import { useTotalIncome } from "./useTotalIncome";
import Spinner from "./../../ui/Spinner";
import Heading from "./../../ui/Heading";
import { useTotalOutcome } from "./useTotalOutcome";
import { formatCurrency } from "./../../utils/utils";
import { useTotalSaved } from "./useTotalSaved";

function FiatSummary() {
  const { fiatIncome, isLoadingIncome } = useTotalIncome();
  const { fiatOutcome, isLoadingOutcome } = useTotalOutcome();
  const { saved, isLoadingSaved } = useTotalSaved();

  const isWorking = isLoadingIncome || isLoadingOutcome || isLoadingSaved;

  if (isWorking) return <Spinner />;

  const { totalIncome } = fiatIncome;
  const { totalOutcome } = fiatOutcome;
  const { totalSaved } = saved;

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
                <Heading>
                  <small></small>
                  No outcome in this month
                </Heading>
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
        <Heading as="h1">No data</Heading>
      )}
    </>
  );
}

export default FiatSummary;
