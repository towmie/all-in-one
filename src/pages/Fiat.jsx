import { Outlet } from "react-router-dom";
import FiatSummary from "../features/fiat/FiatSummary";
import FiatMenu from "../features/fiat/FiatMenu";

function FiatOverview() {
  return (
    <div>
      <FiatSummary />
      <FiatMenu />
      <Outlet />
    </div>
  );
}

export default FiatOverview;
