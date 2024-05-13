import { Outlet } from "react-router-dom";
import FiatSummary from "../features/fiat/FiatSummary";

function FiatOverview() {
  return (
    <div>
      <FiatSummary />

      <Outlet />
    </div>
  );
}

export default FiatOverview;
