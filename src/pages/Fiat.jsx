import { Outlet } from "react-router-dom";
import FiatSummary from "../features/fiat/FiatSummary";
import FiatMenu from "../features/fiat/FiatMenu";
import FilterTab from "../ui/FliterTab";
import { FilterContainer } from "./../ui/FilterContainer";

function FiatOverview() {
  return (
    <div>
      <FilterContainer>
        <FilterTab
          filterField="last"
          options={[
            { value: "all", label: "All" },
            { value: "month", label: "This Month" },
            { value: "three-month", label: "Last 3 Months" },
            { value: "year", label: "This Year" },
          ]}
        />
      </FilterContainer>
      <FiatSummary />
      <FiatMenu />
      <Outlet />
    </div>
  );
}

export default FiatOverview;
