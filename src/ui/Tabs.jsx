import { useNavigate } from "react-router-dom";
import { FilterButtonTab, StyledFilterTab } from "./FliterTab";

function Tabs({ options }) {
  const navigate = useNavigate();
  return (
    <StyledFilterTab>
      {options.map((option) => (
        <FilterButtonTab
          key={option.value}
          onClick={() => navigate(option.value)}
        >
          {option.label}
        </FilterButtonTab>
      ))}
    </StyledFilterTab>
  );
}

export default Tabs;
