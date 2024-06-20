import { useContext } from "react";
import { CalendarContext } from "./events";

export const EVENTS_COLOR = ["red", "green", "blue"];

export function useEvents() {
  const value = useContext(CalendarContext);
  if (value === null)
    throw new Error("useEvents must be used within a EventsProvider");
  return value;
}
