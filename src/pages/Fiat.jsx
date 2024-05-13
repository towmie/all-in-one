import { Outlet } from "react-router-dom";
import FiatSummary from "../features/fiat/FiatSummary";
import FiatMenu from "../features/crypto/FiatMenu";

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
