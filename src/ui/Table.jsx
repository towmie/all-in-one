import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { getROI } from "../utils/utils";

const StyledTable = styled.div`
  border: 1px solid var(--color-grey-200);

  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  min-width: 72rem;
  overflow-x: scroll;
`;

const CommonRow = styled.div`
  display: grid;
  grid-template-columns: ${(props) => props.columns};
  column-gap: 2.4rem;
  align-items: center;
  transition: none;
`;

const StyledHeader = styled(CommonRow)`
  padding: 1.6rem 2.4rem;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
`;

const StyledRow = styled(CommonRow)`
  padding: 2rem 2.4rem;
  font-size: 1.8rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const StyledBody = styled.section`
  margin: 0.4rem 0;
`;

const Footer = styled.footer`
  background-color: var(--color-grey-50);
  display: flex;
  justify-content: center;
  padding: 1.2rem;

  /* This will hide the footer when it contains no child elements. Possible thanks to the parent selector :has 🎉 */
  &:not(:has(*)) {
    display: none;
  }
`;

const Empty = styled.p`
  font-size: 1.6rem;
  font-weight: 500;
  text-align: center;
  margin: 2.4rem;
`;

const TableContext = createContext();

function Table({ columns, children }) {
  return (
    <TableContext.Provider value={{ columns }}>
      <StyledTable role="table">{children}</StyledTable>
    </TableContext.Provider>
  );
}

function Header({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledHeader role="row" columns={columns} as="header">
      {children}
    </StyledHeader>
  );
}
function Row({ children }) {
  const { columns } = useContext(TableContext);
  return (
    <StyledRow role="row" columns={columns}>
      {children}
    </StyledRow>
  );
}

function Body({ data, render }) {
  const [searchParams] = useSearchParams();

  if (!data.length) return <Empty>No data to show at the moment</Empty>;

  const sortBy = searchParams.get("sortBy") || "";

  if (!sortBy) return <StyledBody>{data.map(render)}</StyledBody>;

  const [field, direction] = sortBy.split("-");
  let coinList = [];

  if (field === "profit") {
    coinList = data.map((coin) => {
      return { ...coin, profit: getROI(coin.amountInUSD, coin.amountSpent) };
    });
  } else {
    coinList = data;
  }

  const modifier = direction === "asc" ? 1 : -1;
  const sortedRows = coinList.sort((a, b) => (a[field] - b[field]) * modifier);

  return <StyledBody>{sortedRows.map(render)}</StyledBody>;
}

Table.Header = Header;
Table.Body = Body;
Table.Row = Row;
Table.Footer = Footer;

export default Table;
