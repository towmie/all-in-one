import { createContext, useEffect, useState } from "react";

export const CalendarContext = createContext(null);

export function EventsProvider({ children }) {
  const [events, setEvents] = useLocalStorage("events", []);

  function addEvent(event) {
    setEvents((e) => [...e, { ...event, id: crypto.randomUUID() }]);
  }

  function updateEvent(eventDetails, id) {
    setEvents((e) => {
      return e.map((event) =>
        event.id === id ? { ...eventDetails, id } : event
      );
    });
  }
  function deleteEvent(id) {
    setEvents((e) => e.filter((event) => event.id !== id));
  }

  return (
    <CalendarContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </CalendarContext.Provider>
  );
}

function useLocalStorage(key, initialvalue) {
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(key);

    if (jsonValue == null) return initialvalue;

    return JSON.parse(jsonValue).map((ev) => {
      if (ev.date instanceof Date) return ev;
      return { ...ev, date: new Date(ev.date) };
    });
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
