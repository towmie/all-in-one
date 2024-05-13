import { useSearchParams } from "react-router-dom";
import { FilterButtonTab, StyledFilterTab } from "./FliterTab";

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get("page")) searchParams.set("page", 1);

    setSearchParams(searchParams);
  }

  return (
    <StyledFilterTab>
      {options.map((option) => (
        <FilterButtonTab
          key={option.value}
          onClick={() => handleClick(option.value)}
          active={option.value === currentFilter}
          disabled={option.value === currentFilter}
        >
          {option.label}
        </FilterButtonTab>
      ))}
    </StyledFilterTab>
  );
}

export default Filter;
