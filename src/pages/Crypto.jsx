import { Outlet } from "react-router-dom";
import CryptoSummary from "../features/crypto/CryptoSummary";

function Crypto() {
  return (
    <div>
      <CryptoSummary />
      <Outlet />
    </div>
  );
}

export default Crypto;
