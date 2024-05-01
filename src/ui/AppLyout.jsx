import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Sidebar from "./Sidebar";
import { useCryptoList } from "../features/crypto/useCryptoBalance";
import { useUpdateCrypto } from "../features/crypto/useUpdateCryptoRates";
import { getTotalCryptoBalance } from "../services/apiCrypto";
import SpinnerMini from "./SpinnerMini";

const Main = styled.main`
  flex-grow: 1;
  padding: 3.2rem 4rem;
`;

const StyledAppLyout = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
`;

function AppLyout() {
  const { cryptoData, isLoading } = useCryptoList();
  const { updateCryptoBalance, isUpdating } = useUpdateCrypto();

  if (isLoading) return <p>Loading...</p>;

  return (
    <StyledAppLyout>
      <Sidebar />
      <Main>
        <button
          disabled={isUpdating}
          onClick={() => updateCryptoBalance(cryptoData)}
        >
          Update
        </button>
        {isUpdating ? (
          <SpinnerMini />
        ) : (
          <h1>{getTotalCryptoBalance(cryptoData)}</h1>
        )}
        <Outlet />
      </Main>
    </StyledAppLyout>
  );
}

export default AppLyout;
