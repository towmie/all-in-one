import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterBy = searchParams.get("filterBy") || "";

  function handleChange(e) {
    searchParams.set("filterBy", e.target.value);
    if (searchParams.get("page")) searchParams.set("page", 1);
    setSearchParams(searchParams);
  }

  return (
    <Select
      value={filterBy}
      options={options}
      type="white"
      onChange={handleChange}
    />
  );
}

export default SortBy;
