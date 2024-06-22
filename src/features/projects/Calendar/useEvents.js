import { useQuery } from "@tanstack/react-query";
import { getEvents } from "../../../services/apiEvents";

export const EVENTS_COLOR = ["red", "green", "blue"];

export function useEvents() {
  const { data: events, isLoading: isLoadingEvents } = useQuery({
    queryKey: ["events"],
    queryFn: getEvents,
  });

  return { events, isLoadingEvents };
}
