import { useQuery } from "@tanstack/react-query";
import { getFilteredEvents } from "../../../services/apiEvents";
import { useSearchParams } from "react-router-dom";
import { addDays, startOfToday } from "date-fns";
export const EVENTS_COLOR = ["red", "green", "blue"];

export function useFilteredEvents() {
  const [searchParams] = useSearchParams();

  const filterByDate = searchParams.get("events") || "today";
  let filterToDate;
  if (filterByDate === "all") filterToDate = "all";
  if (filterByDate === "today") filterToDate = startOfToday().toISOString();
  if (filterByDate === "tomorrow")
    filterToDate = addDays(startOfToday(), 1).toISOString();
  if (filterByDate === "week")
    filterToDate = addDays(startOfToday(), 7).toISOString();

  const filterDate = !filterByDate
    ? null
    : { field: "date", value: filterToDate, label: filterByDate };

  const { data: filteredEvents, isLoading: isLoadingFilteredEvents } = useQuery(
    {
      queryKey: ["filteredEvents", filterDate],
      queryFn: () => getFilteredEvents({ filterDate }),
    }
  );

  return { filteredEvents, isLoadingFilteredEvents };
}
