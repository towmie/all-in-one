import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useTotalsummary } from "./useTotalsummary";
import { useSearchParams } from "react-router-dom";
import {
  differenceInDays,
  eachDayOfInterval,
  format,
  isSameDay,
  min,
  parseISO,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
} from "date-fns";
import { useFirstRowDate } from "../../services/useFirstRowDate";

const StyledSalesChart = styled.div`
  grid-column: 1 / -1;

  /* Hack to change grid line colors */
  & .recharts-cartesian-grid-horizontal line,
  & .recharts-cartesian-grid-vertical line {
    stroke: var(--color-grey-300);
  }
`;

function FiatOverview() {
  const [searchParams] = useSearchParams();
  const filterByDate = searchParams.get("last") || "month";
  const { firstDates, isLoadingDates } = useFirstRowDate();
  const { totalSummary, isLoadingSummary } = useTotalsummary();

  const isLoading = isLoadingDates || isLoadingSummary;

  if (isLoading) return <Spinner />;

  const { fiatIncome, fiatOutcome, fiatSaved } = totalSummary;

  const parsedDates = Object.values(firstDates).map((date) => parseISO(date));

  const earliestDate = min(parsedDates);

  let filterToDate;
  const now = new Date();
  if (filterByDate === "all")
    filterToDate = differenceInDays(now, earliestDate);
  if (filterByDate === "month")
    filterToDate = differenceInDays(now, startOfMonth(now));
  if (filterByDate === "three-month")
    filterToDate = differenceInDays(now, subMonths(startOfMonth(now), 2));
  if (filterByDate === "year")
    filterToDate = differenceInDays(now, startOfYear(now));

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), filterToDate),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      income: fiatIncome
        .filter((income) => isSameDay(date, new Date(income.date)))
        .reduce((acc, curr) => acc + curr.income, 0),
      outcome: fiatOutcome
        .filter((outcome) => isSameDay(date, new Date(outcome.date)))
        ?.reduce((acc, curr) => acc + curr.outcome, 0),
      saved: fiatSaved
        .filter((saved) => isSameDay(date, new Date(saved.date)))
        ?.reduce((acc, curr) => acc + curr.saved, 0),
    };
  });

  return (
    <StyledSalesChart>
      <ResponsiveContainer height={300} width="100%">
        <AreaChart data={data}>
          <XAxis dataKey="label" />
          <YAxis />
          <CartesianGrid />
          <Tooltip />
          <Area
            dataKey="income"
            type="monotone"
            stroke="#1e1b4b"
            fill="#818cf8"
            name="Income"
            unit="$"
          />
          <Area
            dataKey="outcome"
            type="monotone"
            stroke="#500724"
            fill="#f472b6"
            name="Outcome"
            unit="$"
          />
          <Area
            dataKey="saved"
            type="monotone"
            stroke="#052e16"
            fill="#4ade80"
            name="Saved"
            unit="$"
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledSalesChart>
  );
}

export default FiatOverview;
