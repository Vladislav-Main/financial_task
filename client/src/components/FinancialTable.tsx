import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { FC } from "react";
import { keys } from "../dumb";
import { useAppSelector } from "../hooks/useRedux";
import { selectAllEntities } from "../redux/reducers/PriceTickerSlice";
import Body from "./Body/Body";
import "./financialTable.scss";
import InfoMessage from "./InfoMessage/InfoMessage";

const FinancialTable: FC = () => {
  const quotes = useAppSelector(selectAllEntities);

  return (
    <>
      {quotes.length === 0 ? (
        <div className="tableBody">
          <InfoMessage />
        </div>
      ) : (
        <div className="tableBody">
          <TableContainer
            component={Paper}
            sx={{
              minWidth: 650,
            }}
          >
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  {keys.map((key, index) => (
                    <TableCell key={index} className="table-cell">
                      {key}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {quotes.map((ticker, index) => (
                  <Body ticker={ticker} key={index} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
    </>
  );
};

export default FinancialTable;
